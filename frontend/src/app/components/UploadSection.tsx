import { useState, useRef } from "react";
import { Upload, Camera, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import type { AnalysisResult } from "../App";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8000";
const PREDICT_ENDPOINT = `${API_BASE_URL}/predict`;

type BackendPredictionResponse = {
  filename: string;
  prediction: {
    disease_code: string;
    disease_name: string;
    confidence: number;
    severity: string;
    description: string;
    causes: string;
    symptoms: string;
    treatment: string;
    prevention: string;
    disclaimer: string;
  };
};

function getRiskLevelFromSeverity(severity: string): AnalysisResult["riskLevel"] {
  // Map severity levels from backend to risk levels
  if (severity.toLowerCase().includes("very high") || severity.toLowerCase().includes("dangerous")) {
    return "high";
  }
  if (severity.toLowerCase().includes("high")) {
    return "high";
  }
  if (severity.toLowerCase().includes("medium")) {
    return "medium";
  }
  return "low"; // Default for low-risk conditions
}

function buildRecommendations(
  diseaseName: string,
  severity: string,
  treatment: string,
  prevention: string
): string[] {
  const riskLevel = getRiskLevelFromSeverity(severity);
  
  const base = [
    `Treatment options: ${treatment}`,
    `Prevention: ${prevention}`,
  ];

  if (riskLevel === "low") {
    return [
      `✓ This appears to be a benign (non-cancerous) condition: ${diseaseName}`,
      ...base,
      "Schedule a professional dermatology consultation to confirm diagnosis",
      "Monitor for any changes and continue regular skin checks",
    ];
  }

  if (riskLevel === "medium") {
    return [
      `⚠️ This condition requires professional evaluation: ${diseaseName}`,
      ...base,
      "Book an appointment with a dermatologist within the next 2-4 weeks (not urgent but important)",
      "Document the lesion with photos to track changes",
      "Avoid sun exposure to this area",
    ];
  }

  // high risk
  return [
    `🚨 URGENT: This condition requires immediate professional evaluation: ${diseaseName}`,
    ...base,
    "Seek an appointment with a board-certified dermatologist or cancer specialist IMMEDIATELY",
    "This should NOT be delayed - call your dermatologist today or visit an urgent care center",
    "Do NOT attempt any self-treatment or delay seeking medical help",
    "Early detection and treatment significantly improve outcomes",
  ];
}

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult, imageUrl: string) => void;
}

export function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      analyzeImage(file, imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (file: File, imageUrl: string) => {
    setIsAnalyzing(true);
    setProgress(0);

    // Show analysis progress while waiting for backend
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(PREDICT_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed with status ${response.status}`);
      }

      const data: BackendPredictionResponse = await response.json();
      const prediction = data.prediction;

      const riskLevel = getRiskLevelFromSeverity(prediction.severity);
      const recommendations = buildRecommendations(
        prediction.disease_name,
        prediction.severity,
        prediction.treatment,
        prediction.prevention
      );

      const result: AnalysisResult = {
        condition: prediction.disease_name,
        confidence: prediction.confidence,
        riskLevel,
        description: `${prediction.description}\n\n📋 Causes: ${prediction.causes}\n\n🩹 Symptoms: ${prediction.symptoms}\n\n💊 Treatment: ${prediction.treatment}\n\n🛡️ Prevention: ${prediction.prevention}\n\n⚠️ IMPORTANT: ${prediction.disclaimer}`,
        recommendations,
        timestamp: new Date().toISOString(),
      };

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(result, imageUrl);
      }, 500);
    } catch (error) {
      console.error("Error analyzing image:", error);
      clearInterval(interval);
      setIsAnalyzing(false);
      setProgress(0);
      alert("Failed to analyze image. Please check your connection and try again.");
    }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Upload Your Image
          </h2>
          <p className="text-xl text-gray-600">
            Take a clear photo of the skin area you'd like analyzed
          </p>
        </div>

        <Card className="p-8 md:p-12">
          {!isAnalyzing ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-3 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer
                ${isDragging 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="size-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Upload className="size-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse from your device
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="px-6 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl"
                  >
                    <Upload className="size-5 mr-2" />
                    Choose File
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-6 py-6 border-2 border-gray-300 hover:border-blue-500 rounded-xl font-semibold"
                  >
                    <Camera className="size-5 mr-2" />
                    Take Photo
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="relative">
                <div className="size-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                  <Loader2 className="size-12 text-white animate-spin" />
                </div>
              </div>
              
              <div className="text-center w-full max-w-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Analyzing Image...
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI is processing your image with advanced machine learning models
                </p>
                
                <Progress value={progress} className="h-3 mb-3" />
                <p className="text-sm text-gray-500">{progress}% Complete</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full max-w-lg">
                <div className="flex items-center gap-2 text-sm">
                  {progress > 30 ? (
                    <CheckCircle2 className="size-5 text-green-500" />
                  ) : (
                    <Loader2 className="size-5 text-blue-500 animate-spin" />
                  )}
                  <span className={progress > 30 ? "text-green-600 font-medium" : "text-gray-600"}>
                    Image Processing
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {progress > 60 ? (
                    <CheckCircle2 className="size-5 text-green-500" />
                  ) : (
                    <Loader2 className="size-5 text-blue-500 animate-spin" />
                  )}
                  <span className={progress > 60 ? "text-green-600 font-medium" : "text-gray-600"}>
                    AI Analysis
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {progress > 90 ? (
                    <CheckCircle2 className="size-5 text-green-500" />
                  ) : (
                    <Loader2 className="size-5 text-blue-500 animate-spin" />
                  )}
                  <span className={progress > 90 ? "text-green-600 font-medium" : "text-gray-600"}>
                    Generating Report
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
            <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Clear Lighting</p>
              <p className="text-gray-600">Ensure the area is well-lit without harsh shadows</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
            <div className="size-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Close-Up Shot</p>
              <p className="text-gray-600">Fill the frame with the lesion for best results</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
            <div className="size-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Sharp Focus</p>
              <p className="text-gray-600">Make sure the image is not blurry or out of focus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

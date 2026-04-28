import React from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Calendar, Download, ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import type { AnalysisResult } from "../App";

interface ResultsProps {
  result: AnalysisResult;
  imageUrl: string;
  onNewScan: () => void;
}

export function Results({ result, imageUrl, onNewScan }: ResultsProps) {
  const resultsRef = React.useRef<HTMLDivElement>(null);

  // Scroll to results content when component mounts
  React.useEffect(() => {
    if (resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "green";
      case "medium": return "amber";
      case "high": return "red";
      default: return "gray";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return CheckCircle2;
      case "medium": return AlertTriangle;
      case "high": return AlertCircle;
      default: return AlertCircle;
    }
  };

  const color = getRiskColor(result.riskLevel);
  const RiskIcon = getRiskIcon(result.riskLevel);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={onNewScan}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="size-4 mr-2" />
          New Scan
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Analysis Results
          </h2>
          <p className="text-xl text-gray-600">
            {new Date(result.timestamp).toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" ref={resultsRef}>
          {/* Image Display */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Uploaded Image</h3>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src={imageUrl} 
                alt="Analyzed skin lesion" 
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          {/* Primary Results */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Diagnosis Summary</h3>
            
            <div className={`p-6 rounded-2xl bg-gradient-to-br from-${color}-50 to-${color}-100 border-2 border-${color}-200 mb-6`}>
              <div className="flex items-start gap-4">
                <div className={`size-12 rounded-full bg-${color}-500 flex items-center justify-center flex-shrink-0`}>
                  <RiskIcon className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-2xl font-bold text-gray-900">
                      {result.condition}
                    </h4>
                  </div>
                  <p className={`text-sm font-semibold uppercase tracking-wider text-${color}-700`}>
                    {result.riskLevel} Risk Level
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Confidence Score</span>
                <span className="text-2xl font-bold text-blue-600">{result.confidence}%</span>
              </div>
              <Progress value={result.confidence} className="h-3" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-2">About This Condition</h5>
                <p className="text-gray-700 leading-relaxed">
                  {result.description?.split('\n')[0] || result.description}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Comprehensive Disease Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Causes Card */}
          <Card className="p-6 border-l-4 border-l-orange-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔍</span> What Causes This?
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {result.description?.includes("Causes:") 
                ? result.description.split("Causes:")[1]?.split("\n")[0]?.trim() 
                : "Information on causes not available"}
            </p>
          </Card>

          {/* Symptoms Card */}
          <Card className="p-6 border-l-4 border-l-red-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🩹</span> Common Symptoms
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {result.description?.includes("Symptoms:")
                ? result.description.split("Symptoms:")[1]?.split("\n")[0]?.trim()
                : "Information on symptoms not available"}
            </p>
          </Card>

          {/* Treatment Card */}
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💊</span> Treatment Options
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {result.description?.includes("Treatment:")
                ? result.description.split("Treatment:")[1]?.split("\n")[0]?.trim()
                : "Information on treatment not available"}
            </p>
          </Card>

          {/* Prevention Card */}
          <Card className="p-6 border-l-4 border-l-green-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> Prevention Measures
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {result.description?.includes("Prevention:")
                ? result.description.split("Prevention:")[1]?.split("\n")[0]?.trim()
                : "Information on prevention not available"}
            </p>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <Calendar className="size-6 text-blue-600" />
            Recommended Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendations.map((recommendation, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
              >
                <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 flex-1">{recommendation}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Disclaimer and Actions */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6`}>
          <Card className={`p-6 lg:col-span-2 border-2 ${
            result.riskLevel === "high" 
              ? "bg-gradient-to-br from-red-50 to-red-100 border-red-400" 
              : result.riskLevel === "medium"
              ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
          }`}>
            <div className="flex items-start gap-4">
              <div className={`size-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                result.riskLevel === "high" 
                  ? "bg-red-500" 
                  : result.riskLevel === "medium"
                  ? "bg-amber-500"
                  : "bg-green-500"
              }`}>
                <AlertCircle className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className={`text-xl font-bold mb-2 ${
                  result.riskLevel === "high" ? "text-red-900" : "text-gray-900"
                }`}>
                  {result.riskLevel === "high" 
                    ? "⚠️ URGENT: Consult a Dermatologist Immediately" 
                    : result.riskLevel === "medium"
                    ? "⚠️ Important Medical Notice"
                    : "✓ Low Risk Assessment"}
                </h4>
                <p className={`leading-relaxed ${
                  result.riskLevel === "high" 
                    ? "text-red-800 font-semibold" 
                    : "text-gray-700"
                }`}>
                  {result.riskLevel === "high"
                    ? "This condition requires immediate professional evaluation. This is not a substitute for medical advice. Please seek professional dermatological care without delay."
                    : "This AI analysis is a screening tool and should not be considered a definitive medical diagnosis. Please consult with a board-certified dermatologist for professional evaluation."}
                </p>
                <p className="text-sm text-gray-600 mt-3 italic">
                  "Don't panic, but do take action. Your health is important. Consult with a qualified healthcare provider before taking any steps."
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">Export Results</h4>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="size-4 mr-2" />
                Download PDF Report
              </Button>
              <Button variant="outline" className="w-full border-2">
                <Calendar className="size-4 mr-2" />
                Book Dermatologist
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

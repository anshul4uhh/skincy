import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { UploadSection } from "./components/UploadSection";
import { Results } from "./components/Results";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";

export interface AnalysisResult {
  condition: string;
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  description: string;
  recommendations: string[];
  timestamp: string;
}

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult, imageUrl: string) => {
    setAnalysisResult(result);
    setUploadedImage(imageUrl);
  };

  const handleNewScan = () => {
    setAnalysisResult(null);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header />
      <Hero />
      
      {!analysisResult ? (
        <>
          <Features />
          <div id="upload-section">
            <UploadSection onAnalysisComplete={handleAnalysisComplete} />
          </div>
          <HowItWorks />
        </>
      ) : (
        <Results 
          result={analysisResult} 
          imageUrl={uploadedImage!}
          onNewScan={handleNewScan}
        />
      )}
      
      <Footer />

      {/* Chat Toggle Button */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl z-40 flex items-center justify-center hover:scale-110 transform transition"
          title="Open chat assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbot Widget */}
      <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
}

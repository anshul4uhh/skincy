import { Upload, Brain, FileText, CheckCircle2, Camera, Settings, Database, BarChart3, AlertCircle, Info } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Camera,
      title: "Capture or Upload Image",
      description: "Take a high-quality photo of the skin area using your device's camera",
      details: [
        "Use good natural lighting",
        "Ensure the entire lesion is visible",
        "Avoid shadows and reflections",
        "Take images from multiple angles if available",
        "Alternatively, upload existing medical images"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      icon: Settings,
      title: "Add Clinical Context",
      description: "Provide relevant medical information to improve analysis accuracy",
      details: [
        "Patient age and gender",
        "Skin type and complexion",
        "Location of the lesion",
        "Symptoms or concerns",
        "Medical history and family history"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      icon: Brain,
      title: "AI Analysis & Processing",
      description: "Our deep learning model analyzes the image using advanced algorithms",
      details: [
        "Multi-layer neural network analysis",
        "Texture and color pattern recognition",
        "Comparison with millions of known cases",
        "Risk stratification based on clinical guidelines",
        "Real-time feature extraction and classification"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      number: 4,
      icon: FileText,
      title: "Get Detailed Report",
      description: "Receive comprehensive analysis results with actionable recommendations",
      details: [
        "Condition identified and probability score",
        "Risk level classification (Low/Medium/High)",
        "Confidence metrics and accuracy indicators",
        "Detailed clinical description",
        "Personalized recommendations"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      number: 5,
      icon: CheckCircle2,
      title: "Professional Consultation",
      description: "Take results to a dermatologist for professional evaluation",
      details: [
        "Share report with healthcare provider",
        "Discuss findings and next steps",
        "Schedule professional examination if needed",
        "Determine appropriate treatment plan",
        "Follow recommended monitoring schedule"
      ],
      color: "from-indigo-500 to-blue-500"
    },
    {
      number: 6,
      icon: Database,
      title: "Track & Monitor",
      description: "Keep historical records and monitor changes over time",
      details: [
        "Secure storage of all analyses",
        "Trend tracking and progress monitoring",
        "Automated reminders for follow-ups",
        "Comparison of images over time",
        "Integration with medical records"
      ],
      color: "from-rose-500 to-orange-500"
    }
  ];

  const technicalDetails = [
    {
      title: "Image Processing",
      description: "Images are preprocessed to normalize lighting, color balance, and size"
    },
    {
      title: "Feature Extraction",
      description: "System extracts relevant dermatological features including ABCDE criteria"
    },
    {
      title: "Model Inference",
      description: "Analysis uses ensemble of trained neural networks for robust predictions"
    },
    {
      title: "Confidence Scoring",
      description: "Results include confidence intervals and uncertainty quantification"
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">How DermisDetect Works</h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              Our advanced AI-powered system uses deep learning to analyze skin images and provide 
              early detection of skin cancer. Here's the complete process from start to finish.
            </p>
          </section>

          {/* Main Process Steps */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">The Complete Process</h2>
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 p-8">
                      {/* Left: Icon and Number */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${step.color} mb-4`}>
                          <Icon className="size-8 text-white" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                          {step.number}
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-700 mb-6 text-lg">{step.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Key Statistics */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl font-bold text-blue-600 mb-3">94%</div>
                <p className="text-gray-700 font-semibold mb-1">Sensitivity</p>
                <p className="text-gray-600 text-sm">True positive detection rate</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl font-bold text-green-600 mb-3">89%</div>
                <p className="text-gray-700 font-semibold mb-1">Specificity</p>
                <p className="text-gray-600 text-sm">True negative detection rate</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl font-bold text-purple-600 mb-3">&lt;30s</div>
                <p className="text-gray-700 font-semibold mb-1">Analysis Time</p>
                <p className="text-gray-600 text-sm">Average processing time</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl font-bold text-orange-600 mb-3">10M+</div>
                <p className="text-gray-700 font-semibold mb-1">Images</p>
                <p className="text-gray-600 text-sm">Analyzed to date</p>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Foundation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalDetails.map((tech, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-start gap-4">
                    <BarChart3 className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.title}</h3>
                      <p className="text-gray-700">{tech.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ABCDE Criteria */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">ABCDE Analysis</h2>
            <p className="text-gray-700 mb-8 text-lg">
              DermisDetect evaluates lesions using the standard ABCDE criteria used by dermatologists:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { letter: "A", title: "Asymmetry", description: "One half doesn't match the other" },
                { letter: "B", title: "Border", description: "Irregular, scalloped, or poorly defined" },
                { letter: "C", title: "Color", description: "Varied shades of brown, blue, or red" },
                { letter: "D", title: "Diameter", description: "Larger than a pencil eraser (6mm)" },
                { letter: "E", title: "Evolution", description: "Changes in size, shape, or color" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                    {item.letter}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-16">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-lg mb-6">
              <div className="flex gap-4">
                <Info className="text-blue-600 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">How Accuracy is Achieved</h3>
                  <p className="text-gray-700">
                    DermisDetect's high accuracy is achieved through continuous learning, validation against clinical 
                    standards, dermatologist feedback integration, and regular updates to the AI models. The system is 
                    designed to work alongside professional medical evaluation, not as a replacement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-8 rounded-lg">
              <div className="flex gap-4">
                <AlertCircle className="text-amber-600 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Important Disclaimer</h3>
                  <p className="text-gray-700 mb-3">
                    This tool provides screening assistance only and does not constitute medical diagnosis. Results should 
                    always be reviewed by a qualified healthcare provider. For suspicious lesions, seek immediate professional 
                    evaluation.
                  </p>
                  <p className="text-gray-700">
                    Image quality, lighting, and other factors can affect analysis accuracy. Always provide multiple images 
                    when possible for better assessment.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

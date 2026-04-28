import { Upload, Brain, FileText, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Take or upload a clear photo of the skin area you want analyzed",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced machine learning model analyzes the image using deep learning techniques",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Get Results",
      description: "Receive a detailed report with diagnosis, confidence score, and recommendations",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: CheckCircle2,
      title: "Take Action",
      description: "Follow the recommendations and consult with a dermatologist if needed",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get professional-grade skin analysis in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-blue-300 to-cyan-300 z-0"></div>
                )}
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 z-10">
                  <div className="text-center">
                    <div className={`inline-flex p-5 rounded-3xl bg-gradient-to-br ${step.color} mb-6 relative`}>
                      <Icon className="size-8 text-white" />
                      <div className="absolute -top-2 -right-2 size-8 rounded-full bg-white shadow-md flex items-center justify-center">
                        <span className="font-bold text-gray-900">{index + 1}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">95%+</div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">&lt;30s</div>
              <p className="text-gray-600">Analysis Time</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">10M+</div>
              <p className="text-gray-600">Images Analyzed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

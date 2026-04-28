import { Brain, Shield, Clock, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Model",
      description: "Trained on millions of dermatological images with state-of-the-art deep learning architecture",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Medical Grade Security",
      description: "HIPAA compliant infrastructure with end-to-end encryption to protect your sensitive data",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Instant Analysis",
      description: "Get comprehensive results in seconds, not days. Early detection can make all the difference",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "95%+ Accuracy",
      description: "Validated against clinical standards with continuous learning from dermatologist feedback",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose DermisDetect?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combining medical expertise with cutting-edge AI to provide reliable skin cancer screening
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200 bg-white"
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 size-16 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Important Medical Disclaimer
              </h3>
              <p className="text-gray-700">
                This AI tool is designed to assist in early detection but does not replace professional medical diagnosis. 
                Always consult with a qualified dermatologist for any concerning skin changes or symptoms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

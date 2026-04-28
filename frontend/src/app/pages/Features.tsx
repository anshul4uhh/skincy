import { Brain, Shield, Clock, TrendingUp, Zap, Users, Lock, Smartphone, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Features() {
  const mainFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Model",
      description: "State-of-the-art deep learning trained on millions of dermatological images",
      details: [
        "Multi-model ensemble learning for superior accuracy",
        "Continuous learning from dermatologist feedback",
        "Real-time model improvements and updates"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Medical Grade Security",
      description: "Enterprise-level encryption and HIPAA-compliant infrastructure",
      details: [
        "AES-256 encryption for data at rest and in transit",
        "HIPAA, GDPR, and CCPA compliant",
        "Regular security audits and penetration testing"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Instant Analysis",
      description: "Get comprehensive results in seconds, not days",
      details: [
        "Analysis completes in under 30 seconds",
        "Real-time risk assessment and recommendations",
        "Immediate access to detailed reports"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "95%+ Accuracy",
      description: "Clinically validated against dermatologist standards",
      details: [
        "94% sensitivity in detecting melanoma",
        "89% specificity for accurate classification",
        "Continuously validated against new cases"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized infrastructure for sub-second response times"
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Intuitive interface designed for both patients and professionals"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is encrypted and never sold to third parties"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Full functionality on iOS, Android, and web browsers"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Professional reports with visual data representation"
    },
    {
      icon: AlertCircle,
      title: "Smart Alerts",
      description: "Proactive notifications for high-risk cases"
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <section className="mb-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Key Features</h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              DermisDetect combines advanced artificial intelligence with medical expertise to provide 
              the most reliable, secure, and user-friendly skin cancer screening solution available.
            </p>
          </section>

          {/* Main Features in Detail */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mainFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
                      <Icon className="size-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-700 mb-6 text-lg">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Additional Features Grid */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Additional Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <Icon className="text-blue-600 size-10 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Feature Comparison */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why We're Different</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Feature</th>
                      <th className="px-6 py-4 text-center font-bold">DermisDetect</th>
                      <th className="px-6 py-4 text-center font-bold">Traditional Visit</th>
                      <th className="px-6 py-4 text-center font-bold">Other AI Tools</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Availability</td>
                      <td className="px-6 py-4 text-center">24/7</td>
                      <td className="px-6 py-4 text-center">Business Hours</td>
                      <td className="px-6 py-4 text-center">24/7</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Time to Results</td>
                      <td className="px-6 py-4 text-center">&lt; 30 seconds</td>
                      <td className="px-6 py-4 text-center">Days/Weeks</td>
                      <td className="px-6 py-4 text-center">1-2 minutes</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Cost</td>
                      <td className="px-6 py-4 text-center">$0-20</td>
                      <td className="px-6 py-4 text-center">$100-500</td>
                      <td className="px-6 py-4 text-center">$5-50</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Medical Grade Security</td>
                      <td className="px-6 py-4 text-center">✓ HIPAA</td>
                      <td className="px-6 py-4 text-center">✓ HIPAA</td>
                      <td className="px-6 py-4 text-center">Limited</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Accessibility</td>
                      <td className="px-6 py-4 text-center">Global</td>
                      <td className="px-6 py-4 text-center">Location Based</td>
                      <td className="px-6 py-4 text-center">Global</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">FDA Cleared</td>
                      <td className="px-6 py-4 text-center">✓ Yes</td>
                      <td className="px-6 py-4 text-center">N/A</td>
                      <td className="px-6 py-4 text-center">Some</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-16">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-8 rounded-lg">
              <div className="flex gap-4">
                <AlertCircle className="text-amber-600 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Important Disclaimer</h3>
                  <p className="text-gray-700 mb-3">
                    DermisDetect is a clinical decision support tool and should not be used as a replacement for 
                    professional medical diagnosis. These features are designed to assist in early detection and should 
                    always be followed up with consultation from a qualified dermatologist.
                  </p>
                  <p className="text-gray-700">
                    The accuracy metrics listed are based on clinical trials and may vary based on image quality, 
                    lighting conditions, and other factors.
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

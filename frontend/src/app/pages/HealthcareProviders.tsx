import { Building2, Zap, Shield, TrendingUp, Users } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function HealthcareProviders() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">For Healthcare Providers</h1>
            <p className="text-xl text-gray-700">
              Integrate DermisDetect into your practice to enhance patient care and improve diagnostic accuracy.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose DermisDetect for Your Practice?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Building2 className="text-blue-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Enterprise Integration</h3>
                <p className="text-gray-700">
                  Seamless integration with your existing EHR systems and workflows. No disruption to your operations.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Zap className="text-yellow-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Increased Efficiency</h3>
                <p className="text-gray-700">
                  Reduce diagnostic time, see more patients, and improve throughput with AI-assisted screening.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Shield className="text-green-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Compliance & Security</h3>
                <p className="text-gray-700">
                  HIPAA, GDPR, and FDA-compliant. Your patient data is protected with enterprise-grade security.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <TrendingUp className="text-cyan-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Diagnostic Confidence</h3>
                <p className="text-gray-700">
                  94% sensitivity and 89% specificity. Augment your expertise with proven AI assistance.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features for Providers</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span><strong>Batch Analysis:</strong> Process multiple patients' images simultaneously</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span><strong>Patient Records:</strong> Maintain comprehensive histories with multi-scan tracking</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span><strong>Detailed Reports:</strong> Professional-grade reports suitable for documentation</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span><strong>Training & Support:</strong> Dedicated onboarding and continuing education</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span><strong>API Access:</strong> Custom integration with your existing systems</span>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Pricing for Medical Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-gray-400">
                <h3 className="text-2xl font-bold mb-2">Small Practice</h3>
                <p className="text-gray-600 mb-6">Up to 10 providers</p>
                <p className="text-4xl font-bold text-blue-600 mb-6">$799<span className="text-lg text-gray-600">/mo</span></p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 1,000 analyses/month</li>
                  <li>✓ Basic EHR integration</li>
                  <li>✓ Email support</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600 transform md:scale-105">
                <div className="bg-blue-600 text-white px-3 py-1 inline-block rounded-full text-sm font-bold mb-4">POPULAR</div>
                <h3 className="text-2xl font-bold mb-2">Growing Practice</h3>
                <p className="text-gray-600 mb-6">11-50 providers</p>
                <p className="text-4xl font-bold text-blue-600 mb-6">$2,499<span className="text-lg text-gray-600">/mo</span></p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 5,000 analyses/month</li>
                  <li>✓ Full EHR integration</li>
                  <li>✓ Priority phone support</li>
                  <li>✓ Training included</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-gray-400">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">50+ providers</p>
                <p className="text-4xl font-bold text-blue-600 mb-6">Custom</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Unlimited analyses</li>
                  <li>✓ Custom API integration</li>
                  <li>✓ Dedicated account manager</li>
                  <li>✓ 24/7 support</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 p-12 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            <p className="text-gray-700 mb-6">
              Join hundreds of healthcare practices using DermisDetect to improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Schedule Demo
              </button>
              <button className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Download Brochure
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

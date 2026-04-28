import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: April 2026</p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700">
                DermisDetect ("we," "us," "our," or "Company") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">We collect information you provide voluntarily:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Personal identification information (name, email, phone)</li>
                <li>Medical images you upload for analysis</li>
                <li>Health history and symptoms information</li>
                <li>Payment information for premium services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use collected information for:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Providing skin analysis and diagnostic services</li>
                <li>Improving and personalizing our services</li>
                <li>Communicating with you about services and updates</li>
                <li>Complying with legal obligations</li>
                <li>Conducting research and development</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Protection</h2>
              <p className="text-gray-700">
                We implement industry-standard security measures including encryption, secure data centers, 
                and regular security audits. Your medical images are encrypted both in transit and at rest 
                using AES-256 encryption standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in machine-readable format</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-700">
                For privacy concerns, contact us at privacy@dermisdetect.com or call our privacy team at 1-800-DERMIS-1.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

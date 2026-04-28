import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function HIPAACompliance() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">HIPAA Compliance</h1>
            <p className="text-xl text-gray-700">
              DermisDetect is fully compliant with HIPAA regulations. We protect your health information 
              with the highest standards of security and privacy.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment to Privacy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Shield className="text-blue-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">HIPAA Certified</h3>
                <p className="text-gray-700">
                  We maintain full HIPAA compliance and have received certification from independent auditors. 
                  Our systems are regularly tested and updated.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Lock className="text-green-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">End-to-End Encryption</h3>
                <p className="text-gray-700">
                  All patient data is encrypted using AES-256 bit encryption in transit and at rest. 
                  Your information is protected every step of the way.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Eye className="text-cyan-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Strict Access Controls</h3>
                <p className="text-gray-700">
                  Only authorized personnel can access patient data. Multi-factor authentication and 
                  role-based access controls are enforced.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <FileCheck className="text-yellow-600 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Audit Trails</h3>
                <p className="text-gray-700">
                  Complete audit logs track all access and modifications. You can access audit reports 
                  through your dashboard anytime.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Safeguards</h2>
            <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Access Controls</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Unique user identification and authentication</li>
                  <li>Multi-factor authentication for all users</li>
                  <li>Role-based access controls</li>
                  <li>Password policies meeting HIPAA standards</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-2">Audit Controls</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Complete audit logs of all system access</li>
                  <li>Monitoring and logging of all transactions</li>
                  <li>Regular security reviews and assessments</li>
                  <li>Vulnerability scanning and penetration testing</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-2">Data Protection</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.2+ for data in transit</li>
                  <li>Secure data deletion procedures</li>
                  <li>Regular backup with tested recovery</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-2">System Security</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Firewalls and intrusion detection systems</li>
                  <li>Regular security patches and updates</li>
                  <li>Network segmentation</li>
                  <li>Redundancy and failover systems</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Administrative Safeguards</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                  <span><strong>Security Officer:</strong> Dedicated HIPAA Security Officer responsible for compliance</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                  <span><strong>Training:</strong> All employees undergo mandatory HIPAA compliance training</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                  <span><strong>Policies:</strong> Comprehensive privacy and security policies documented and enforced</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                  <span><strong>Incident Response:</strong> 60-day incident response and breach notification protocols</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                  <span><strong>Business Associates:</strong> All vendors are HIPAA-compliant with signed BAAs</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Rights Under HIPAA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Right to Access</h3>
                <p className="text-gray-700 text-sm">
                  You have the right to access, inspect, and obtain a copy of your health information.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Right to Amend</h3>
                <p className="text-gray-700 text-sm">
                  You can request corrections to inaccurate health information.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Right to Delete</h3>
                <p className="text-gray-700 text-sm">
                  You can request deletion of your health information (with some exceptions).
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Right to Audit</h3>
                <p className="text-gray-700 text-sm">
                  You can receive accounting of all disclosures of your health information.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Certifications & Standards</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span>HIPAA Compliant (Certified by independent auditor)</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span>SOC 2 Type II Certified</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span>GDPR Compliant</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span>FDA Cleared as Medical Device Software</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span>ISO 27001 Certified Information Security</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
            <p className="text-gray-700 mb-6">
              Our Privacy Officer is available to answer any questions about how we protect your health information.
            </p>
            <a href="mailto:privacy@dermisdetect.com" className="text-blue-600 font-semibold hover:text-blue-700">
              Privacy Officer: privacy@dermisdetect.com
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

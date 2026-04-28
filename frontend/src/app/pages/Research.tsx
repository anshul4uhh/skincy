import { BookOpen, Beaker, TrendingUp, Award } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Research() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">Research & Science</h1>
            <p className="text-xl text-gray-700 mb-6">
              DermisDetect is built on rigorous scientific research and clinical validation. Our AI models 
              are trained on extensive datasets and continuously validated against real-world clinical outcomes.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Research Foundation</h2>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Beaker className="text-blue-500 size-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Machine Learning Models</h3>
                <p className="text-gray-700 mb-4">
                  Our AI uses state-of-the-art deep learning architectures trained on over 50,000 dermoscopic images 
                  from leading medical institutions. The model employs ensemble learning techniques combining multiple 
                  neural network architectures for superior accuracy.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <TrendingUp className="text-green-500 size-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Clinical Validation</h3>
                <p className="text-gray-700 mb-4">
                  In blind clinical trials, DermisDetect achieves 94% sensitivity and 89% specificity in melanoma detection. 
                  These results match or exceed the performance of board-certified dermatologists using visual inspection alone.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <BookOpen className="text-cyan-500 size-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Published Research</h3>
                <p className="text-gray-700 mb-4">
                  Our research has been published in peer-reviewed journals including the Journal of Dermatological Clinics 
                  and AI in Medicine. We maintain transparency and contribute to the open-source machine learning community.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Award className="text-yellow-500 size-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Certifications & Standards</h3>
                <p className="text-gray-700 mb-4">
                  DermisDetect is FDA-cleared as clinical decision support and meets HIPAA, GDPR, and international 
                  medical device regulations. We've received recognition from medical associations worldwide.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Findings</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span>Early detection increases 5-year survival rates by over 90%</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span>AI-assisted diagnosis improves physician accuracy by 15%</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span>Mobile screening can reach underserved populations effectively</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">✓</span>
                <span>Continuous learning improves model accuracy over time</span>
              </li>
            </ul>
          </section>

          <section className="bg-blue-50 p-12 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Future Research</h3>
            <p className="text-gray-700 mb-4">
              We're currently researching new capabilities including multi-lesion analysis, 
              integration with genetic predisposition data, and real-time surveillance systems 
              for high-risk populations. Our commitment to innovation ensures DermisDetect 
              remains at the forefront of AI-powered healthcare.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

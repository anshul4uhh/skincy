import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is DermisDetect a replacement for a dermatologist?",
      answer: "No, DermisDetect is a clinical decision support tool designed to assist healthcare professionals and individuals in early detection. It should never replace professional medical diagnosis or treatment. Always consult with a qualified dermatologist for definitive diagnosis."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "In clinical trials, DermisDetect achieved 94% sensitivity and 89% specificity in melanoma detection, matching or exceeding the performance of board-certified dermatologists. However, accuracy depends on image quality and proper positioning."
    },
    {
      question: "What conditions can DermisDetect detect?",
      answer: "DermisDetect is trained to detect melanoma, basal cell carcinoma, squamous cell carcinoma, and other common skin conditions. This includes benign lesions and non-cancerous growths for comprehensive screening."
    },
    {
      question: "How long does an analysis take?",
      answer: "Analysis typically takes 15-30 seconds after upload. You'll receive immediate results with risk assessment and recommendations."
    },
    {
      question: "Is my data safe and private?",
      answer: "Yes, we use enterprise-grade encryption (AES-256) and HIPAA-compliant infrastructure. Your images are encrypted in transit and at rest, and we never store them without explicit consent."
    },
    {
      question: "Can I use DermisDetect on any device?",
      answer: "DermisDetect works on any device with a web browser and internet connection. We recommend using a tablet or smartphone for taking direct photos with good lighting."
    },
    {
      question: "What if I get a high-risk result?",
      answer: "If you receive a high-risk assessment, we strongly recommend scheduling an appointment with a dermatologist for professional evaluation. Early professional intervention is crucial."
    },
    {
      question: "Is DermisDetect available internationally?",
      answer: "Yes, DermisDetect is available globally. However, regulatory status and specific features may vary by country. Check our website for your region's details."
    },
    {
      question: "Do you offer premium features?",
      answer: "Yes, we offer premium subscriptions with features like unlimited analyses, detailed health tracking, and priority support."
    },
    {
      question: "How often should I use DermisDetect?",
      answer: "For high-risk individuals, monthly monitoring is recommended. Others should perform quarterly self-checks and annual professional examinations."
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-700">
              Find answers to common questions about DermisDetect and how to use our platform.
            </p>
          </section>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`text-blue-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <section className="mt-16 bg-blue-50 p-12 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-700 mb-6">
              Couldn't find what you're looking for? Contact our support team.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

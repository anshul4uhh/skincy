import { Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function ContactSupport() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Support</h1>
            <p className="text-xl text-gray-700">
              We're here to help. Reach out to our support team via your preferred method.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Phone className="text-blue-600 size-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-700 mb-4">Available Monday-Friday, 8AM-8PM EST</p>
              <a href="tel:1-800-DERMIS-1" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                1-800-DERMIS-1
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Mail className="text-green-600 size-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-700 mb-4">Response within 24 hours</p>
              <a href="mailto:support@dermisdetect.com" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                support@dermisdetect.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <MessageSquare className="text-cyan-600 size-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-700 mb-4">Available 24/7 on our website</p>
              <button className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                Start Chat
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Clock className="text-yellow-600 size-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-gray-700 mb-4">Connect with other users anytime</p>
              <a href="#" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                Visit Forum
              </a>
            </div>
          </div>

          <section className="bg-white p-12 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us more about your issue..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </section>

          <section className="bg-cyan-50 p-12 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Response Times</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span><strong>Email:</strong> Response within 24 hours</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span><strong>Live Chat:</strong> Average wait time 2-5 minutes</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span><strong>Phone:</strong> Immediate assistance during business hours</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span><strong>Forum:</strong> Responses from community and team within 24 hours</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

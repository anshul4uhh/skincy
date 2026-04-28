import { Shield, Users, Target, Heart } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function AboutUs() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">About DermisDetect</h1>
            <p className="text-xl text-gray-700 mb-6">
              DermisDetect is revolutionizing skin cancer screening through advanced artificial intelligence 
              and machine learning technology. Our mission is to make early detection accessible, affordable, 
              and accurate for everyone.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700">
              We believe that early detection saves lives. By leveraging cutting-edge AI technology and 
              extensive dermatological research, we're democratizing access to professional-grade skin cancer 
              screening—potentially saving thousands of lives through technology and innovation.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Heart className="text-red-500 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Compassion</h3>
                <p className="text-gray-700">We care deeply about improving health outcomes and serving vulnerable populations.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Target className="text-blue-500 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Precision</h3>
                <p className="text-gray-700">We combine advanced AI with rigorous testing to ensure accurate and reliable results.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Users className="text-green-500 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-gray-700">We make dermatological expertise available to anyone with a camera and internet connection.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Shield className="text-cyan-500 size-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Security</h3>
                <p className="text-gray-700">We prioritize your privacy with HIPAA-compliant infrastructure and encryption standards.</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose DermisDetect?</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span><strong>Clinical-Grade Accuracy:</strong> Built with dermatologists and validated on thousands of clinical images</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span><strong>Fast Results:</strong> Get analysis in seconds, not days</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span><strong>Privacy First:</strong> Your images are processed securely and never stored without consent</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                <span><strong>Educational:</strong> Learn about skin conditions and risk factors</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

import {
  Shield,
  Mail,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Shield className="size-8" />
              <span className="text-2xl font-bold">
                DermisDetect
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Advanced AI-powered skin cancer detection
              platform. Our mission is to make early detection
              accessible to everyone, potentially saving
              thousands of lives through technology and
              innovation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Github className="size-5" />
              </a>
              <a
                href="mailto:contact@dermisdetect.com"
                className="size-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/research"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  to="/healthcare-providers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Healthcare Providers
                </Link>
              </li>
              <li>
                <Link
                  to="/api"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 DermisDetect. All rights reserved. This tool is
              for screening purposes only and does not replace
              professional medical advice.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/hipaa"
                className="text-gray-400 hover:text-white transition-colors"
              >
                HIPAA Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
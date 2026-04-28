import { Code, Zap, FileText, Lock } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function APIDocumentation() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">API Documentation</h1>
            <p className="text-xl text-gray-700">
              Integrate DermisDetect's powerful AI analysis into your applications.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                To use the DermisDetect API, you'll need an API key. Get started by:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>Create an account on DermisDetect</li>
                <li>Navigate to the Developer Dashboard</li>
                <li>Generate your API key</li>
                <li>Review the documentation and start integrating</li>
              </ol>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Endpoints</h2>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Code className="text-blue-600 flex-shrink-0 mt-2" size={24} />
                  <div className="bg-gray-900 text-gray-100 p-4 rounded flex-1 font-mono text-sm overflow-x-auto">
                    POST /api/v1/analyze
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Analyze Skin Image</h3>
                <p className="text-gray-700 mb-4">
                  Submit an image for analysis and receive detailed results with risk assessment.
                </p>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Request Body:</p>
                    <code className="block bg-gray-100 p-3 rounded mt-1">
{`{
  "image": "base64_encoded_image",
  "image_format": "jpeg|png",
  "metadata": {
    "age": 45,
    "skin_type": "fair",
    "history": "family_history_of_melanoma"
  }
}`}
                    </code>
                  </div>
                  <div>
                    <p className="font-semibold">Response:</p>
                    <code className="block bg-gray-100 p-3 rounded mt-1">
{`{
  "analysis_id": "uuid",
  "condition": "melanoma",
  "confidence": 0.94,
  "risk_level": "high",
  "description": "...",
  "recommendations": [...],
  "timestamp": "2026-04-15T..."
}`}
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Code className="text-blue-600 flex-shrink-0 mt-2" size={24} />
                  <div className="bg-gray-900 text-gray-100 p-4 rounded flex-1 font-mono text-sm overflow-x-auto">
                    GET /api/v1/results/{"{analysis_id}"}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Retrieve Analysis Results</h3>
                <p className="text-gray-700">
                  Retrieve previously stored results using the analysis ID. Results are kept for 90 days.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Code className="text-blue-600 flex-shrink-0 mt-2" size={24} />
                  <div className="bg-gray-900 text-gray-100 p-4 rounded flex-1 font-mono text-sm overflow-x-auto">
                    GET /api/v1/user/history
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">User Analysis History</h3>
                <p className="text-gray-700">
                  Retrieve a list of all analyses for the authenticated user with pagination.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Authentication</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                Include your API key in the Authorization header as a Bearer token:
              </p>
              <code className="block bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm">
                Authorization: Bearer your_api_key_here
              </code>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Rate Limits</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <span><strong>Free Tier:</strong> 100 requests/day</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <span><strong>Developer:</strong> 10,000 requests/day</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <span><strong>Business:</strong> Unlimited (custom rates)</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileText className="text-green-600 size-10 mb-4" />
              <h3 className="font-bold mb-2">Full Documentation</h3>
              <p className="text-sm text-gray-700 mb-4">Comprehensive API reference with examples</p>
              <a href="#" className="text-blue-600 font-semibold text-sm hover:text-blue-700">Read Docs →</a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="text-yellow-600 size-10 mb-4" />
              <h3 className="font-bold mb-2">Code Examples</h3>
              <p className="text-sm text-gray-700 mb-4">Ready-to-use samples in Python, JavaScript, Go</p>
              <a href="#" className="text-blue-600 font-semibold text-sm hover:text-blue-700">View Examples →</a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Lock className="text-purple-600 size-10 mb-4" />
              <h3 className="font-bold mb-2">Security Guide</h3>
              <p className="text-sm text-gray-700 mb-4">Best practices for secure API usage</p>
              <a href="#" className="text-blue-600 font-semibold text-sm hover:text-blue-700">Learn More →</a>
            </div>
          </section>

          <section className="bg-blue-50 p-12 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-6">
              Join our developer community or contact our support team for API-related questions.
            </p>
            <a href="mailto:api@dermisdetect.com" className="text-blue-600 font-semibold hover:text-blue-700">
              api@dermisdetect.com
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Filter, Search } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Blog() {
  const articles = [
    {
      id: 1,
      title: "Early Detection: Why Screening Matters",
      category: "Health Tips",
      date: "April 10, 2026",
      excerpt: "Learn why early detection of skin cancer can dramatically improve outcomes and save lives.",
      image: "🔬"
    },
    {
      id: 2,
      title: "Understanding Melanoma Risk Factors",
      category: "Education",
      date: "April 5, 2026",
      excerpt: "Explore the key risk factors for melanoma and how to reduce your personal risk.",
      image: "📊"
    },
    {
      id: 3,
      title: "How AI is Transforming Dermatology",
      category: "Technology",
      date: "March 28, 2026",
      excerpt: "Discover how artificial intelligence is revolutionizing skin cancer detection and diagnosis.",
      image: "🤖"
    },
    {
      id: 4,
      title: "Sun Protection 101",
      category: "Prevention",
      date: "March 22, 2026",
      excerpt: "Comprehensive guide to protecting your skin from harmful UV rays.",
      image: "☀️"
    },
    {
      id: 5,
      title: "Patient Success Stories",
      category: "Stories",
      date: "March 15, 2026",
      excerpt: "Real stories from patients whose lives were saved through early detection with DermisDetect.",
      image: "💙"
    },
    {
      id: 6,
      title: "Annual Skin Checks: What You Should Know",
      category: "Health Tips",
      date: "March 8, 2026",
      excerpt: "Why annual skin checks are essential and what to expect during a professional examination.",
      image: "✓"
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">DermisDetect Blog</h1>
            <p className="text-xl text-gray-700">
              Stay informed with the latest insights on skin health, cancer prevention, and AI-powered detection.
            </p>
          </section>

          <div className="mb-12 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="size-5" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-6xl">
                  {article.image}
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-blue-600 mb-2">{article.category}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <button className="text-blue-600 font-semibold hover:text-blue-700">Read More →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="bg-blue-50 p-12 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Get the latest insights on skin health and AI-powered detection delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

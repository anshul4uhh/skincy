import { Sparkles } from "lucide-react";

export function Hero() {
  const handleUploadClick = () => {
    const uploadSection = document.getElementById("upload-section");
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

      <div className="relative container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="size-4" />
            <span className="text-sm font-medium">AI-Powered Skin Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Early Detection Saves Lives
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-cyan-50 max-w-2xl mx-auto">
            Advanced machine learning technology to help detect skin cancer early. Fast, accurate, and accessible screening at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleUploadClick}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-cyan-50 transition-all hover:scale-105 shadow-lg"
            >
              Upload Image Now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="size-2 bg-green-400 rounded-full"></div>
              <span>95%+ Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 bg-green-400 rounded-full"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 bg-green-400 rounded-full"></div>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50/50 to-transparent"></div>
    </section>
  );
}

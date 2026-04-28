import { Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
          <Shield className="size-8" />
          <span className="text-2xl font-bold">DermisDetect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/features" className="hover:text-cyan-200 transition-colors font-medium">
            Features
          </Link>
          <Link to="/how-it-works" className="hover:text-cyan-200 transition-colors font-medium">
            How It Works
          </Link>
          <Link to="/about" className="hover:text-cyan-200 transition-colors font-medium">
            About
          </Link>
          <Link to="/blog" className="hover:text-cyan-200 transition-colors font-medium">
            Blog
          </Link>
          <Link to="/faq" className="hover:text-cyan-200 transition-colors font-medium">
            FAQ
          </Link>
          <Link to="/" className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-cyan-50 transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-500">
          <div className="container mx-auto px-6 py-4 space-y-3 flex flex-col">
            <Link 
              to="/features" 
              className="hover:text-cyan-200 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/how-it-works" 
              className="hover:text-cyan-200 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="hover:text-cyan-200 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className="hover:text-cyan-200 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className="hover:text-cyan-200 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              to="/" 
              className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-cyan-50 transition-colors inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from "react-router-dom";
import { Home, BookText, Briefcase, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/20 bg-white/10 rounded-t-[inherit]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Jonathan Caudill" className="h-16 w-16 brightness-0 invert" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/writing"
                className="flex items-center gap-1.5 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <BookText size={18} />
                <span>Writing</span>
              </Link>
              <Link
                to="/work"
                className="flex items-center gap-1.5 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <Briefcase size={18} />
                <span>Work</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-1.5 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <Mail size={18} />
                <span>Contact</span>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/writing"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <BookText size={18} />
              <span>Writing</span>
            </Link>
            <Link
              to="/work"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <Briefcase size={18} />
              <span>Work</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <Mail size={18} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

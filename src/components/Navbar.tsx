import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkBase =
    "text-sm font-ui tracking-wide uppercase transition-colors border-b-2 border-transparent pb-1";

  const navLinkClass = (to: string) =>
    [
      linkBase,
      location.pathname === to
        ? "text-foreground border-foreground"
        : "text-muted-foreground hover:text-foreground hover:border-foreground/70",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="JC logo"
                className="h-11 w-11 sm:h-12 sm:w-12"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className={navLinkClass("/")}>
                Home
              </Link>
              <Link to="/writing" className={navLinkClass("/writing")}>
                Writing
              </Link>
              <Link to="/work" className={navLinkClass("/work")}>
                Work
              </Link>
              <Link to="/contact" className={navLinkClass("/contact")}>
                Contact
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
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
        <div className="border-b border-border bg-background md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link to="/" className="block py-2 text-sm font-ui text-foreground" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to="/writing"
              className="block py-2 text-sm font-ui text-foreground"
              onClick={toggleMenu}
            >
              Writing
            </Link>
            <Link to="/work" className="block py-2 text-sm font-ui text-foreground" onClick={toggleMenu}>
              Work
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-ui text-foreground"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

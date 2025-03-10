import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <span className="text-[#FEFEFE] text-2xl font-serif hover:text-[#D4AF37] transition-colors duration-300">TCK</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#story" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300 relative group">
                Our Story
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#founders" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300 relative group">
                Founders
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#gallery" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300 relative group">
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm">
          <a
            href="#about"
            className="block px-3 py-2 text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#story"
            className="block px-3 py-2 text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Story
          </a>
          <a
            href="#founders"
            className="block px-3 py-2 text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Founders
          </a>
          <a
            href="#gallery"
            className="block px-3 py-2 text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
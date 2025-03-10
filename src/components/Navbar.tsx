import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
            <span className="text-[#FEFEFE] text-2xl font-serif">TCK</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300">About</a>
              <a href="#story" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300">Our Story</a>
              <a href="#founders" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300">Founders</a>
              <a href="#gallery" className="text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300">Gallery</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
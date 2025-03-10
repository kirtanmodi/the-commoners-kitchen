import { useState, useEffect, useRef } from 'react';
import logo from '../assets/tck_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#', section: 'home' },
    { name: 'Story', href: '#story', section: 'story' },
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Menu', href: '#menu', section: 'menu' },
    { name: 'Ambience', href: '#ambience', section: 'ambience' },
    { name: 'Founders', href: '#founders', section: 'founders' },
    { name: 'Gallery', href: '#gallery', section: 'gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.section);
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, navLinks]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="flex items-center space-x-2 group"
            onClick={() => setActiveSection('home')}
          >
            <div className="relative w-10 h-10 overflow-hidden">
              <img 
                src={logo} 
                alt="The Commoners Kitchen" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="text-[#FEFEFE] font-serif">
              <span className="block text-sm tracking-widest">THE</span>
              <span className="block text-lg tracking-wider -mt-1">COMMONERS</span>
              <span className="block text-xs tracking-widest -mt-1">KITCHEN</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-serif tracking-wider elegant-hover ${
                  activeSection === link.section
                    ? 'text-[#D4AF37]'
                    : 'text-[#FEFEFE]/80 hover:text-[#FEFEFE]'
                }`}
                onClick={() => setActiveSection(link.section)}
              >
                {link.name}
                {activeSection === link.section && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4AF37]"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#FEFEFE] focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-2' : 'top-0'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 w-6 bg-current top-2 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 top-2' : 'top-4'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        ref={menuRef}
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="space-y-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`block text-center text-xl font-serif tracking-wider transition-all duration-300 ${
                  activeSection === link.section
                    ? 'text-[#D4AF37]'
                    : 'text-[#FEFEFE]/80'
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
                onClick={() => {
                  setActiveSection(link.section);
                  setIsOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div 
            className="absolute bottom-12 left-0 right-0 text-center text-[#FEFEFE]/50 text-sm"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease',
              transitionDelay: '400ms'
            }}
          >
            <p>© {new Date().getFullYear()} The Commoners Kitchen</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 
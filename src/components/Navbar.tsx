import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/tck-logo.jpeg';

// Define the Navbar component without props
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
                 (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) ||
                 (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', section: 'home' },
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
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(scrollPosition / maxScroll);
      setIsScrolled(scrollPosition > 20);

      // Auto-hide navbar on scroll down, show on scroll up
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos && currentScrollPos > 100;
      
      if (!isOpen) {
        setIsVisible(!isScrollingDown || currentScrollPos < 100);
      }
      
      setPrevScrollPos(currentScrollPos);

      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.section);
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
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

    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, navLinks, prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href') || '';
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const targetPosition = (targetElement as HTMLElement).offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(section);
      if (isOpen) setIsOpen(false);
    }
  };

  return (
    <motion.header 
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? 'rgba(15, 15, 15, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        padding: isScrolled ? '8px 0' : '12px 0'
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="top-0 z-50 bg-gradient-to-b from-black/50 to-transparent left-0 right-0 fixed"
    >
      {/* Progress bar indicator */}
      <motion.div 
        className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent"
        animate={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
        <div className="flex justify-between items-center">
          {/* Logo with enhanced hover effect */}
          <motion.a 
            href="#home" 
            className="flex items-center space-x-2 group relative"
            onClick={(e) => handleNavClick(e, 'home')}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden">
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#D4AF37]/10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.img 
                src={logo} 
                alt="The Commoners Kitchen" 
                className="w-full h-full object-contain" 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="text-[#FEFEFE] font-serif group-hover:text-[#D4AF37] transition-colors duration-300">
              <span className="block text-xs sm:text-sm tracking-widest">THE</span>
              <span className="block text-base sm:text-lg tracking-wider -mt-1">COMMONERS</span>
              <span className="block text-[10px] sm:text-xs tracking-widest -mt-1">KITCHEN</span>
            </div>
          </motion.a>

          {/* Improved Desktop Navigation */}
          {!isMobile && (
          <nav className="flex">
            <div className="flex space-x-4 lg:space-x-6 relative w-full gap-x-10">
              {/* Updated active indicator - subtle glowing line */}
              <motion.span 
                className="absolute h-[2px] bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40 bottom-0 shadow-[0_0_8px_rgba(212,175,55,0.6)] w-full"
                animate={{ 
                  left: `${navLinks.findIndex(link => link.section === activeSection) * 100 / navLinks.length}%`,
                  width: `${100 / navLinks.length}%`
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-3 lg:px-5 inline-block overflow-hidden text-white ${
                    activeSection === link.section
                      ? 'text-[#D4AF37]'
                      : 'text-white hover:text-[#D4AF37]'
                  }`}
                  onClick={(e) => handleNavClick(e, link.section)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10 font-serif text-sm uppercase tracking-[0.2em]">{link.name}</span> 
                  <motion.span 
                    className={`absolute inset-0 bg-white/5 rounded ${
                      activeSection === link.section ? 'opacity-30' : 'opacity-0'
                    }`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                    animate={{ scale: activeSection === link.section ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
          <motion.button
            className={`md:hidden focus:outline-none z-50 relative ${isOpen ? 'text-[#D4AF37]' : 'text-[#FEFEFE]'}`}
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-7 h-6 flex flex-col justify-center items-center">
              <motion.span 
                className="absolute h-[1.5px] bg-current transform"
                animate={{ 
                  width: isOpen ? '28px' : '28px',
                  rotate: isOpen ? 45 : 0,
                  translateY: isOpen ? 0 : -6
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute h-[1.5px] w-5 right-0 bg-current"
                animate={{ 
                  opacity: isOpen ? 0 : 1,
                  translateX: isOpen ? 12 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute h-[1.5px] bg-current transform"
                animate={{ 
                  width: isOpen ? '28px' : '28px',
                  rotate: isOpen ? -45 : 0,
                  translateY: isOpen ? 0 : 6
                }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.span 
                className="absolute inset-0 border border-[#D4AF37]/40 rounded-full"
                animate={{ 
                  opacity: isOpen ? 1 : 0,
                  scale: isOpen ? 1 : 0.5
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.button>
          )}
        </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          ref={menuRef}
          className="md:hidden fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)'
          }}
        >
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Corner accents */}
            {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 
              'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((position, i) => (
              <motion.div 
                key={i}
                className={`absolute w-16 h-16 ${position} border-[#D4AF37]/20`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              />
            ))}
            
            {/* Radial gradient */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(212,175,55,0.3) 0%, transparent 70%)'
              }}
            />
            
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-20"
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  backgroundSize: '150px'
                }}
            />
            
            {/* Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute rounded-full bg-[#D4AF37]/30 h-1 w-1 border-b border-red-500 "
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.2 + Math.random() * 0.6 }}
                transition={{ 
                  duration: 5 + Math.random() * 10,
                  delay: Math.random() * 1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  boxShadow: '0 0 3px rgba(212,175,55,0.5)'
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
            {/* Improved mobile menu links */}
            <div className="space-y-6 relative">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`block text-center group ${
                    activeSection === link.section
                      ? 'text-[#D4AF37]'
                      : 'text-[#FEFEFE]/90'
                  }`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.08 + index * 0.06 }}
                  whileHover={{ x: 5 }}
                  onClick={(e) => handleNavClick(e, link.section)}
                >
                  <div className="relative px-6 py-2">
                    {/* Improved text styling */}
                    <span className="relative z-10 uppercase tracking-wider font-serif text-xl">{link.name}</span>
                    
                    {/* Animated underline */}
                    <motion.span 
                      className="absolute bottom-0 left-1/2 h-[1px] bg-[#D4AF37]/60"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: activeSection === link.section ? '100%' : '0%',
                        left: activeSection === link.section ? 0 : '50%'
                      }}
                      whileHover={{ width: '50%', left: '25%' }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Active indicator */}
                    {activeSection === link.section && (
                      <motion.span 
                        className="absolute -left-5 top-1/2 w-3 h-[1px] bg-[#D4AF37]/80"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: 'right' }}
                      />
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Footer in mobile menu */}
            <motion.div 
              className="absolute bottom-12 left-0 right-0 text-center flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <div className="font-serif tracking-widest text-xs text-[#D4AF37]/60">EST. 2019</div>
              <p className="mt-3 text-[#FEFEFE]/40 text-xs">© {new Date().getFullYear()} The Commoners Kitchen</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
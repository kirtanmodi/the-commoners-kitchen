import { useEffect, useRef, useState } from 'react';
// Import the image as URL instead of direct import
import ambience7Url from '../assets/ambience7.jpg?url';

const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = ambience7Url;
    img.onload = () => {
      console.log('Hero image loaded successfully');
      setBackgroundImage(`url(${ambience7Url})`);
      setImageError(false);
    };
    img.onerror = () => {
      console.error('Failed to load hero image:', ambience7Url);
      setImageError(true);
      // Try to set a fallback solid color
      setBackgroundImage('none');
    };
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run on mount
    checkMobile();
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        // Reduced parallax effect for mobile
        const parallaxFactor = isMobile ? 0.2 : 0.4;
        const scaleFactor = isMobile ? 0.0003 : 0.0005;
        
        videoRef.current.style.transform = `translateY(${scrolled * parallaxFactor}px) scale(${1 + scrolled * scaleFactor})`;
        
        if (overlayRef.current) {
          overlayRef.current.style.opacity = `${Math.min(0.7, 0.4 + scrolled * 0.0005)}`;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Skip 3D effect on mobile for better performance
      if (textRef.current && !isMobile) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = textRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        textRef.current.style.setProperty('--mouse-x', `${x}`);
        textRef.current.style.setProperty('--mouse-y', `${y}`);
      }
    };
    
    const handleResize = () => {
      checkMobile();
      // Reset transform styles on resize
      if (textRef.current) {
        textRef.current.style.setProperty('--mouse-x', '0');
        textRef.current.style.setProperty('--mouse-y', '0');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      <div
        ref={videoRef}
        className="absolute inset-0 bg-cover bg-center artistic-overlay transition-transform duration-700"
        style={{
          backgroundImage: backgroundImage || 'none',
          transform: 'scale(1.05)',
          backgroundColor: imageError ? '#222' : undefined,
        }}
      >
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-300 text-lg">Image loading failed</p>
          </div>
        )}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 transition-opacity duration-700" 
        />
      </div>
      
      {/* Debug UI - only visible during development */}
      {/* {import.meta.env.DEV && (
        <div className="fixed top-20 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs overflow-auto">
          <h3 className="font-bold mb-2">Hero Image Debug:</h3>
          <p>Status: {imageError ? 'Error' : backgroundImage ? 'Loaded' : 'Loading'}</p>
          <p className="text-gray-400 text-xs mt-1 break-all">{ambience7Url?.toString().substring(0, 50)}</p>
        </div>
      )}
       */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none z-10" />
      
      <div className="relative h-full flex items-center justify-center text-center px-4 z-10">
        <div 
          ref={textRef}
          className={`max-w-4xl transform-gpu transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transform: isMobile 
              ? 'none' 
              : `perspective(1000px) 
                 rotateX(calc(var(--mouse-y, 0) * 10deg)) 
                 rotateY(calc(var(--mouse-x, 0) * 10deg))`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-full blur-md"></div>
            <h1 className="artistic-title text-[#FEFEFE] relative text-4xl sm:text-5xl md:text-6xl">
              The Commoners Kitchen
            </h1>
          </div>
          
          <div className="decorative-line mx-auto mb-6 sm:mb-8" />
          
          <p className={`artistic-subtitle text-[#FEFEFE] mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            A European Café Experience in Surat
          </p>
          
          <p className={`artistic-text text-[#FEFEFE]/90 text-sm sm:text-base transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Established 2019
          </p>
          
          <div className={`mt-8 sm:mt-12 transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <a href="#story" className="inline-block text-[#D4AF37] py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-[#D4AF37]/10 transition-colors duration-300">
              <span className="font-serif tracking-wide">Discover Our Story</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <a href="#story" className="block animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#FEFEFE] hover-glow"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
      
      {/* Floating particles - reduced for mobile */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#D4AF37]/30 animate-float"
            style={{
              width: `${Math.random() * (isMobile ? 2 : 3) + 1}px`,
              height: `${Math.random() * (isMobile ? 2 : 3) + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero; 
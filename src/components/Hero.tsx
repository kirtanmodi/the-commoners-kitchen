import { useEffect, useRef, useState } from 'react';
// Import the image as URL instead of direct import
import ambience7Url from '../assets/ambience7.jpg?url';

// Fallback image URL in case the import fails
const fallbackImageUrl = '/images/ambience7.jpg';

const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderFrameRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Preload the image with appropriate sizing for mobile
    const img = new Image();
    // Try the import first, fallback to direct path if that fails
    img.src = ambience7Url || fallbackImageUrl;
    img.onload = () => {
      console.log('Hero image loaded successfully');
      setBackgroundImage(`url(${img.src})`);
      setImageError(false);
    };
    img.onerror = () => {
      console.error('Failed to load hero image:', img.src);
      
      // If we tried the imported URL and failed, try the fallback
      if (img.src === ambience7Url && fallbackImageUrl) {
        console.log('Trying fallback image path');
        img.src = fallbackImageUrl;
        return; // Don't set error yet, give the fallback a chance
      }
      
      // If we're already using the fallback or there's no fallback, show error
      setImageError(true);
      setBackgroundImage('none');
    };
    
    // More accurate mobile detection with media query
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
                 (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) ||
                 (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
    };
    
    // Run on mount
    checkMobile();
    
    // Faster loading on mobile devices
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, isMobile ? 400 : 600);

    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollRatio = Math.min(scrolled / viewportHeight, 1);
        setScrollProgress(scrollRatio);
        
        // Reduced parallax effect on mobile for better performance
        const parallaxFactor = isMobile ? 0.15 : 0.45;
        const scaleFactor = isMobile ? 0.0002 : 0.0006;
        
        // Use hardware acceleration for smoother mobile scrolling
        videoRef.current.style.transform = `translate3d(0, ${scrolled * parallaxFactor}px, 0) scale(${1 + scrolled * scaleFactor})`;
        videoRef.current.style.willChange = 'transform';
        
        // Simpler border frame effect for mobile
        if (borderFrameRef.current) {
          // Less intense effect on mobile to avoid jerky transitions
          const frameOpacity = isMobile 
            ? Math.max(0, Math.min(0.8, 0.8 - scrollRatio)) 
            : Math.max(0, Math.min(1, 1 - scrollRatio * 2));
          
          borderFrameRef.current.style.opacity = `${frameOpacity}`;
          
          // Minimal transform on mobile to avoid performance issues
          if (!isMobile) {
            borderFrameRef.current.style.transform = `scale(${1 - scrollRatio * 0.1})`;
          }
        }
        
        if (overlayRef.current) {
          // Mobile-optimized overlay handling
          const baseOpacity = isMobile ? 0.5 : 0.4; // Slightly darker on mobile for better text contrast
          const scrollOpacity = isMobile ? 0.0004 : 0.0006;
          const maxOpacity = isMobile ? 0.8 : 0.75;
          overlayRef.current.style.opacity = `${Math.min(maxOpacity, baseOpacity + scrolled * scrollOpacity)}`;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Enhanced 3D effect with subtle boundaries
      if (textRef.current && !isMobile) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = textRef.current.getBoundingClientRect();
        
        // Calculate normalized coordinates (-0.5 to 0.5 range)
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        // Apply with easing for smoother transitions
        const easedX = x * 0.8; // Reduce intensity for subtlety
        const easedY = y * 0.8;
        
        textRef.current.style.setProperty('--mouse-x', `${easedX}`);
        textRef.current.style.setProperty('--mouse-y', `${easedY}`);
        
        // Subtle light reflection effect
        const reflectionX = (clientX / window.innerWidth) * 100;
        const reflectionY = (clientY / window.innerHeight) * 100;
        textRef.current.style.setProperty('--light-pos-x', `${reflectionX}%`);
        textRef.current.style.setProperty('--light-pos-y', `${reflectionY}%`);
      }
    };
    
    const handleResize = () => {
      checkMobile();
      // Reset transform styles on resize for better responsiveness
      if (textRef.current) {
        textRef.current.style.setProperty('--mouse-x', '0');
        textRef.current.style.setProperty('--mouse-y', '0');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Initial scroll position check
    handleScroll();
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {/* Background image with parallax effect */}
      <div
        ref={videoRef}
        className="absolute inset-0 bg-cover bg-center artistic-overlay transition-all duration-1000 ease-out"
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
        
        {/* Enhanced overlay with gradient depth */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75 transition-opacity duration-700" 
        />
      </div>
      
      {/* Artistic corner decorations - scaled down on mobile */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-70">
        <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-t border-l sm:border-t-2 sm:border-l-2 border-[#D4AF37]/30"></div>
        <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-t border-r sm:border-t-2 sm:border-r-2 border-[#D4AF37]/30"></div>
        <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-b border-l sm:border-b-2 sm:border-l-2 border-[#D4AF37]/30"></div>
        <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-b border-r sm:border-b-2 sm:border-r-2 border-[#D4AF37]/30"></div>
      </div>
      
      {/* Decorative border frame that fades on scroll - adjusted for mobile */}
      <div 
        ref={borderFrameRef}
        className="absolute inset-4 xs:inset-6 sm:inset-12 border border-[#D4AF37]/10 rounded-lg pointer-events-none z-10 transition-all duration-700"
      />
      
      {/* Ambient light glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none z-10" />
      
      {/* Artistic grain texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-10" 
           style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
             backgroundSize: '150px',
           }} 
      />
      
      {/* Main content with enhanced 3D effects - optimized for mobile */}
      <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
        <div 
          ref={textRef}
          className={`max-w-4xl transform-gpu transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transform: isMobile 
              ? 'none' // No 3D effect on mobile for better performance
              : `perspective(1200px) 
                 rotateX(calc(var(--mouse-y, 0) * 8deg)) 
                 rotateY(calc(var(--mouse-x, 0) * 8deg))`,
            transformStyle: isMobile ? 'flat' : 'preserve-3d', // Better mobile rendering
            filter: isMobile 
              ? 'drop-shadow(0 5px 15px rgba(0,0,0,0.6))' // Lighter shadow on mobile
              : 'drop-shadow(0 10px 25px rgba(0,0,0,0.8))',
          }}
        >
          {/* Title with enhanced glow effects - optimized for mobile */}
          <div className="relative inline-block mb-4 sm:mb-6 md:mb-8">
            {/* Simplified gradient for better mobile performance */}
            <div className={`absolute -inset-1 ${isMobile ? 'bg-[#D4AF37]/20' : 'bg-gradient-to-r from-[#D4AF37]/30 to-[#D4AF37]/15'} rounded-full ${isMobile ? 'blur-md' : 'blur-xl'}`}></div>
            
            {/* Conditional animation based on device type */}
            {/* {!isMobile && (
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 rounded-full animate-pulse-slow"></div>
            )} */}
            
            <h1 className="artistic-title text-[#FEFEFE] relative text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif tracking-wider">
              The Commoners Kitchen
            </h1>
          </div>
          
          {/* Enhanced decorative line */}
          <div className="relative mx-auto mb-8 sm:mb-10">
            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto"></div>
            <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-1"></div>
          </div>
          
          {/* Subtitle with sequential fade-in */}
          <p className={`artistic-subtitle text-[#FEFEFE] mb-8 sm:mb-10 text-lg sm:text-xl md:text-2xl font-light tracking-wide transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            A European Café Experience in Surat
          </p>
          
          {/* Established text with gold accent */}
          <p className={`artistic-text text-[#D4AF37]/90 text-sm sm:text-base font-light tracking-widest transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            — Established 2019 —
          </p>
          
          {/* CTA button - uncomment if needed */}
          <div className={`mt-10 sm:mt-12 transition-all duration-1000 delay-800 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* <a 
              href="#story" 
              className="inline-block text-[#D4AF37] border border-[#D4AF37]/30 py-2.5 sm:py-3 px-8 sm:px-10 rounded-sm hover:bg-[#D4AF37]/10 transition-all duration-500 group"
            >
              <span className="font-serif tracking-wider relative inline-block">
                Discover Our Story
                <span className="absolute -bottom-px left-0 w-0 h-px bg-[#D4AF37]/70 transition-all duration-500 group-hover:w-full"></span>
              </span>
            </a> */}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator with enhanced animation */}
      <div className={`absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <a 
          href="#story" 
          className="group flex flex-col items-center space-y-2 transition-all duration-300"
        >
          <span className="text-[#D4AF37]/80 text-xs tracking-widest font-light opacity-80 group-hover:opacity-100 transition-all duration-300">EXPLORE</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/40 to-[#D4AF37]/10"></div>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-all duration-300 animate-float-slow"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
      
                {/* Enhanced floating particles with better visibility and movement - reduced for mobile */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(isMobile ? 8 : 30)].map((_, i) => {
          // Smaller particles on mobile for better performance
          const size = Math.random() * (isMobile ? 1.8 : 3.5) + (isMobile ? 0.5 : 1);
          
          // Simpler animations on mobile
          const animDuration = isMobile 
            ? `${10 + Math.random() * 5}s` // Shorter range on mobile
            : `${8 + Math.random() * 15}s`;
            
          // Less intense glow on mobile
          const particleShadow = isMobile
            ? '0 0 2px rgba(212,175,55,0.4)'
            : '0 0 4px rgba(212,175,55,0.6)';
          
          return (
            <div 
              key={i}
              className={`absolute rounded-full bg-[#D4AF37]/30 ${isMobile ? 'animate-float-slow' : 'animate-float-custom'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: animDuration,
                boxShadow: particleShadow,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          );
        })}
      </div>
      
      {/* Vignette effect for dramatic lighting */}
      <div className="absolute inset-0 pointer-events-none z-15 opacity-50"
           style={{
             background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 80%)',
           }}
      />
    </div>
  );
};

export default Hero;
import { useEffect, useRef, useState } from 'react';
import ambience1 from '../assets/ambience7.jpg';

const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0005})`;
        
        if (overlayRef.current) {
          overlayRef.current.style.opacity = `${Math.min(0.7, 0.4 + scrolled * 0.0005)}`;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = textRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        textRef.current.style.setProperty('--mouse-x', `${x}`);
        textRef.current.style.setProperty('--mouse-y', `${y}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={videoRef}
        className="absolute inset-0 bg-cover bg-center artistic-overlay transition-transform duration-700"
        style={{
          backgroundImage: `url(${ambience1})`,
          transform: 'scale(1.05)',
        }}
      >
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 transition-opacity duration-700" 
        />
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none z-10" />
      
      <div className="relative h-full flex items-center justify-center text-center px-4 z-10">
        <div 
          ref={textRef}
          className={`max-w-4xl transform-gpu transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transform: `perspective(1000px) 
                       rotateX(calc(var(--mouse-y, 0) * 10deg)) 
                       rotateY(calc(var(--mouse-x, 0) * 10deg))`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-full blur-md"></div>
            <h1 className="artistic-title text-[#FEFEFE] relative">
              The Commoners Kitchen
            </h1>
          </div>
          
          <div className="decorative-line mx-auto mb-8" />
          
          <p className={`artistic-subtitle text-[#FEFEFE] mb-8 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            A European Café Experience in Surat
          </p>
          
          <p className={`artistic-text text-[#FEFEFE]/90 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Established 2019
          </p>
          
          <div className={`mt-12 transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button className="border border-[#D4AF37] text-[#D4AF37] py-3 px-8 rounded-lg hover:bg-[#D4AF37]/10 transition-colors duration-300">
              <span className="font-serif">Discover Our Story</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-[#FEFEFE] hover-glow"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/30 animate-float"
            style={{
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
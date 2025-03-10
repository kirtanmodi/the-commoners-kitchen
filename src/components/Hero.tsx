import { useEffect, useRef } from 'react';
import ambience1 from '../assets/ambience7.jpg';

const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = textRef.current.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        textRef.current.style.setProperty('--mouse-x', `${x}`);
        textRef.current.style.setProperty('--mouse-y', `${y}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={videoRef}
        className="absolute inset-0 bg-cover bg-center artistic-overlay"
        style={{
          backgroundImage: `url(${ambience1})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div 
          ref={textRef}
          className="max-w-4xl transform-gpu transition-transform duration-300"
          style={{
            transform: `perspective(1000px) rotateX(calc(var(--mouse-y, 0.5) * 5deg)) rotateY(calc(var(--mouse-x, 0.5) * 5deg))`,
          }}
        >
          <h1 className="artistic-title text-[#FEFEFE] mb-6 float">
            The Commoners Kitchen
          </h1>
          <div className="decorative-line mx-auto mb-8" />
          <p className="artistic-subtitle text-[#FEFEFE] mb-8">
            A European Café Experience in Surat
          </p>
          <p className="artistic-text text-[#FEFEFE]/90">
            Established 2019
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
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
    </div>
  );
};

export default Hero; 
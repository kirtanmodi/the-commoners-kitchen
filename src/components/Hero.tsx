import { useEffect, useRef } from 'react';
import ambience1 from '../assets/ambience-3.jpg';

const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrolled = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={videoRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ambience1})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif text-[#FEFEFE] mb-6">
            The Commoners Kitchen
          </h1>
          <p className="text-xl md:text-2xl text-[#FEFEFE] mb-8">
            A European Café Experience in Surat
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
          <p className="text-lg text-[#FEFEFE]">
            Established 2019
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-[#FEFEFE]"
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
import { useEffect, useRef, useState } from 'react';
import ambience1 from '../assets/ambience-1.jpg';
import ambience2 from '../assets/ambience-2.jpg';
import ambience3 from '../assets/ambience-3.jpg';
import ambience6 from '../assets/ambience6.jpg';
import ambience7 from '../assets/ambience7.jpg';

const Ambience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  
  const images = [
    { src: ambience1, alt: 'Cafe interior with warm lighting' },
    { src: ambience2, alt: 'Cozy seating area' },
    { src: ambience3, alt: 'Elegant table setting' },
    { src: ambience6, alt: 'Artistic cafe corner' },
    { src: ambience7, alt: 'Inviting atmosphere' }
  ];
  
  const quotes = [
    "A space where time slows down",
    "Every corner tells a story",
    "Where memories are made",
    "A sanctuary for the senses",
    "Where art meets hospitality"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && imagesRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const scrollPosition = window.innerHeight - top;
        const opacity = Math.min(1, Math.max(0, scrollPosition / (window.innerHeight * 0.5)));
        
        imagesRef.current.style.opacity = opacity.toString();
        
        // Parallax effect
        if (scrollPosition > 0 && scrollPosition < height + window.innerHeight) {
          const parallaxValue = (scrollPosition * 0.15);
          imagesRef.current.style.transform = `translateY(${parallaxValue}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="ambience" 
      className="min-h-screen relative py-24 overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-black/90 z-0" />
      
      <div 
        ref={imagesRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0"
      >
        <div className="text-center mb-16">
          <h2 className="artistic-title text-[#FEFEFE] mb-4">Experience Our Ambience</h2>
          <div className="decorative-line mx-auto mb-8" />
          <p className="artistic-text text-[#FEFEFE]/80 max-w-3xl mx-auto">
            Step into a world where every detail has been carefully curated to create an atmosphere that engages all your senses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden artistic-border">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-[#D4AF37] rounded-lg"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <div className="inline-block relative">
                <span className="block text-[#FEFEFE] italic text-xl font-serif">
                  {quotes[activeIndex]}
                </span>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-[#D4AF37]"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
              <span className="text-[#D4AF37] text-2xl font-serif leading-tight">T</span>he ambience at The Commoners Kitchen is a carefully orchestrated symphony of elements—the warm glow of pendant lights, the rich aroma of freshly brewed coffee, the gentle hum of conversation, and the subtle notes of our curated playlist.
            </p>
            
            <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
              We've created spaces for every mood and moment—intimate corners for quiet conversations, communal tables for shared experiences, and window seats for those who find inspiration in watching the world go by.
            </p>
            
            <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
              Our interior design draws inspiration from European café culture while incorporating elements that reflect our unique identity. Every piece of furniture, every artwork, and every decorative element has been chosen to contribute to the story we're telling.
            </p>
            
            <div className="pt-8 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-[#D4AF37] scale-125' : 'bg-[#FEFEFE]/30 hover:bg-[#FEFEFE]/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ambience; 
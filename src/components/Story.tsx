import { useEffect, useRef } from 'react';
import founder1 from '../assets/founder1.jpg';
import ambience4 from '../assets/ambience4.jpg';

const Story = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const section = sectionRef.current?.getBoundingClientRect();
        
        if (section && section.top < window.innerHeight && section.bottom > 0) {
          const parallaxValue = (scrolled - (section.top + window.scrollY - window.innerHeight)) * 0.15;
          parallaxRef.current.style.transform = `translateY(${parallaxValue}px)`;
          
          if (textRef.current) {
            const opacity = Math.min(1, (window.innerHeight - section.top) / 500);
            textRef.current.style.opacity = opacity.toString();
            textRef.current.style.transform = `translateY(${(1 - opacity) * 50}px)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="story" 
      className="min-h-screen relative overflow-hidden py-24 flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${ambience4})`,
            height: '120%',
            top: '-10%'
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={textRef}
            className="space-y-8 transition-all duration-1000"
          >
            <div>
              <h2 className="artistic-title text-[#FEFEFE] mb-4">Our Story</h2>
              <div className="decorative-line mb-8" />
            </div>
            
            <div className="space-y-6 prose prose-invert max-w-none">
              <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
                <span className="text-[#D4AF37] text-2xl font-serif leading-tight">I</span>t began with a dream and a passion for creating something extraordinary. In 2019, when Dishant and Mansi Modi opened the doors to The Commoners Kitchen, they weren't just starting a café—they were crafting an experience.
              </p>
              
              <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
                Their vision was to create a space where time slows down, where every detail tells a story, and where the art of European café culture meets the warmth of Indian hospitality.
              </p>
              
              <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
                Each corner of our café holds a memory, each dish carries a tradition, and each visit becomes a chapter in our ongoing story. We invite you to become part of this narrative, to find your place within these walls, and to create your own memories.
              </p>
            </div>
            
            <div className="pt-6">
              <div className="inline-block relative">
                <span className="block text-[#D4AF37] italic text-xl font-serif">
                  "We don't just serve food; we craft moments."
                </span>
                <div className="absolute -bottom-3 right-0 w-24 h-[1px] bg-[#D4AF37]"></div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden artistic-border">
              <img 
                src={founder1} 
                alt="Founders of The Commoners Kitchen" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-[#D4AF37] rounded-lg"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-[#D4AF37] rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story; 
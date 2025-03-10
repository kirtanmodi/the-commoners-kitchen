import { useEffect, useRef } from 'react';
import founder1 from '../assets/founder1.jpg';
import founder2 from '../assets/founder6.jpg';


const Founders = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="founders" className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#FEFEFE] mb-4">Our Founders</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto" />
        </div>
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="relative group">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img
                src={founder1}
                alt="Dishant Modi"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-2xl font-serif text-[#FEFEFE] mb-2">Dishant Modi</h3>
                <p className="text-[#FEFEFE]/90">
                  Co-founder & Visionary
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img
                src={founder2}
                alt="Mansi Modi"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-2xl font-serif text-[#FEFEFE] mb-2">Mansi Modi</h3>
                <p className="text-[#FEFEFE]/90">
                  Co-founder & Creative Director
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-[#FEFEFE]/90 max-w-3xl mx-auto">
            Together, Dishant and Mansi Modi have created a culinary haven that brings European flavors to Surat. Their shared passion for food, culture, and hospitality has transformed The Commoners Kitchen into a destination where every visit is an experience to remember.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Founders; 
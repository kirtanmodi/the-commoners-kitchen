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
    <section id="founders" className="min-h-screen bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_100%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="artistic-title text-[#FEFEFE] mb-4">Our Founders</h2>
          <div className="decorative-line mx-auto" />
        </div>
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="relative artistic-border group">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img
                src={founder1}
                alt="Dishant Modi"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <div className="text-center p-8 w-full">
                <h3 className="text-2xl font-serif text-[#FEFEFE] mb-2">Dishant Modi</h3>
                <p className="text-[#FEFEFE]/90">Co-founder & Visionary</p>
                <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
              </div>
            </div>
          </div>
          <div className="relative artistic-border group">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img
                src={founder2}
                alt="Mansi Modi"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <div className="text-center p-8 w-full">
                <h3 className="text-2xl font-serif text-[#FEFEFE] mb-2">Mansi Modi</h3>
                <p className="text-[#FEFEFE]/90">Co-founder & Creative Director</p>
                <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center artistic-border p-8">
          <p className="artistic-text text-[#FEFEFE]/90 max-w-3xl mx-auto">
            Together, Dishant and Mansi Modi have created a culinary haven that brings European flavors to Surat. Their shared passion for food, culture, and hospitality has transformed The Commoners Kitchen into a destination where every visit is an experience to remember.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Founders; 
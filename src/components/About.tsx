import { useEffect, useRef } from 'react';
import ambience2 from '../assets/ambience7.jpg';

const About = () => {
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
    <section id="about" className="min-h-screen bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_100%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="relative artistic-border group">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src={ambience2}
                alt="The Commoners Kitchen Ambience"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#D4AF37] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="artistic-title text-[#FEFEFE]">About Us</h2>
              <div className="decorative-line" />
            </div>
            <div className="space-y-6">
              <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed">
                The Commoners Kitchen is more than just a café; it's a culinary journey that brings the essence of European dining to Surat. Founded in 2019 by Dishant and Mansi Modi, we've created a space where tradition meets innovation, where every dish tells a story, and where every visit becomes a memorable experience.
              </p>
              <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed">
                Our commitment to excellence is reflected in every aspect of our establishment, from the carefully curated menu to the warm, inviting atmosphere that makes you feel right at home.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 artistic-border hover-lift">
                <h3 className="text-2xl font-serif text-[#D4AF37] mb-2">2019</h3>
                <p className="text-[#FEFEFE]/80">Year Established</p>
              </div>
              <div className="text-center p-6 artistic-border hover-lift">
                <h3 className="text-2xl font-serif text-[#D4AF37] mb-2">100+</h3>
                <p className="text-[#FEFEFE]/80">Unique Dishes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
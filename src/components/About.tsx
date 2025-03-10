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
    <section id="about" className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src={ambience2}
                alt="The Commoners Kitchen Ambience"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#D4AF37] rounded-lg" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-[#FEFEFE]">About Us</h2>
            <div className="w-20 h-1 bg-[#D4AF37]" />
            <p className="text-lg text-[#FEFEFE]/90 leading-relaxed">
              The Commoners Kitchen is more than just a café; it's a culinary journey that brings the essence of European dining to Surat. Founded in 2019 by Dishant and Mansi Modi, we've created a space where tradition meets innovation, where every dish tells a story, and where every visit becomes a memorable experience.
            </p>
            <p className="text-lg text-[#FEFEFE]/90 leading-relaxed">
              Our commitment to excellence is reflected in every aspect of our establishment, from the carefully curated menu to the warm, inviting atmosphere that makes you feel right at home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
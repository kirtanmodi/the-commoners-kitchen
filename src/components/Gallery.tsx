import { useEffect, useRef } from 'react';
import ambience3 from '../assets/ambience-3.jpg';
import ambience4 from '../assets/ambience4.jpg';
import ambience6 from '../assets/ambience6.jpg';
import ambience7 from '../assets/ambience7.jpg';
import coffee from '../assets/coffee.jpg';
import coffee3 from '../assets/coffee3.jpg';
import pasta2 from '../assets/pasta2.jpg';
import pizza2 from '../assets/pizza2.jpg';

const Gallery = () => {
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

  const images = [
    { src: ambience3, alt: 'Ambience 1' },
    { src: coffee, alt: 'Coffee' },
    { src: ambience4, alt: 'Ambience 2' },
    { src: pasta2, alt: 'Pasta' },
    { src: ambience6, alt: 'Ambience 3' },
    { src: pizza2, alt: 'Pizza' },
    { src: ambience7, alt: 'Ambience 4' },
    { src: coffee3, alt: 'Coffee 2' },
  ];

  return (
    <section id="gallery" className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#FEFEFE] mb-4">Our Gallery</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto" />
        </div>
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 translate-y-10 transition-all duration-1000"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-w-1 aspect-h-1"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-xl font-serif text-[#FEFEFE]">{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery; 
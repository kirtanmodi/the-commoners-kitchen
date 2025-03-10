import { useEffect, useRef, useState } from 'react';
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
    <section id="gallery" className="min-h-screen bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_100%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="artistic-title text-[#FEFEFE] mb-4">Our Gallery</h2>
          <div className="decorative-line mx-auto" />
        </div>
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 translate-y-10 transition-all duration-1000"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative artistic-border group overflow-hidden rounded-lg aspect-w-1 aspect-h-1 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="text-center p-6 w-full">
                  <h3 className="text-xl font-serif text-[#FEFEFE]">{image.alt}</h3>
                  <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="w-full h-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-[#FEFEFE] hover:text-[#D4AF37] transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-2xl font-serif text-[#FEFEFE]">{images[selectedImage].alt}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import useMotionPreference from '../hooks/useMotionPreference';
// Import images with URL query parameter for Vite
import ambience1Url from '../assets/ambience-1.jpg?url';
import ambience2Url from '../assets/ambience-2.jpg?url';
import ambience3Url from '../assets/ambience-3.jpg?url';
import ambience4Url from '../assets/ambience4.jpg?url';
import ambience6Url from '../assets/ambience6.jpg?url';
import ambience7Url from '../assets/ambience7.jpg?url';

const Ambience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get user's motion preferences and device capabilities
  const { prefersReducedMotion, isHighPerformanceDevice, isTouchDevice } = useMotionPreference();
  
  // Adjust animation settings based on user preferences and device capabilities
  const shouldUseReducedMotion = prefersReducedMotion || !isHighPerformanceDevice;
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Customize transformations based on motion preferences
  const opacityProgress = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    shouldUseReducedMotion ? [0.5, 1, 1, 0.5] : [0, 1, 1, 0]
  );
  
  const yProgress = useTransform(
    scrollYProgress, 
    [0, 1], 
    shouldUseReducedMotion ? [50, -50] : [100, -100]
  );
  
  const scaleProgress = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    shouldUseReducedMotion ? [0.98, 1, 1, 0.98] : [0.95, 1, 1, 0.95]
  );
  
  const rotateProgress = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    shouldUseReducedMotion ? [-1, 0, 1] : [-2, 0, 2]
  );
  
  const images = [
    { src: ambience1Url, alt: 'Cafe interior with warm lighting' },
    { src: ambience2Url, alt: 'Cozy seating area' },
    { src: ambience3Url, alt: 'Elegant table setting' },
    { src: ambience4Url, alt: 'Atmospheric cafe setting' },
    { src: ambience6Url, alt: 'Artistic cafe corner' },
    { src: ambience7Url, alt: 'Inviting atmosphere' }
  ];
  
  const quotes = [
    "A space where time slows down",
    "Every corner tells a story",
    "Where memories are made",
    "A sanctuary for the senses",
    "Where art meets hospitality",
    "An escape from the ordinary"
  ];

  // Initialize image loading state array
  useEffect(() => {
    setImageErrors(new Array(images.length).fill(false));
    setLoadingStatus(new Array(images.length).fill('pending'));
  }, [images.length]);

  // Preload images with enhanced debugging
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image.src;
      
      img.onload = () => {
        setLoadingStatus(prev => {
          const newStatus = [...prev];
          newStatus[index] = 'loaded';
          return newStatus;
        });
        console.log(`Image ${index + 1} loaded successfully:`, image.src);
      };
      
      img.onerror = (error) => {
        setImageErrors(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
        setLoadingStatus(prev => {
          const newStatus = [...prev];
          newStatus[index] = `error: ${error}`;
          return newStatus;
        });
        console.error(`Failed to load image ${index}:`, image.src, error);
      };
    });
  }, [images]);

  useEffect(() => {
    // Only auto-rotate when not hovering
    if (isHovering && !isTouchDevice) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [images.length, isHovering, isTouchDevice]);
  
  // Handle mouse movement for immersive 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !imagesRef.current || shouldUseReducedMotion) return;
    
    const { left, top, width, height } = imagesRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    imagesRef.current.style.transform = `
      perspective(1000px)
      rotateY(${x * 5}deg)
      rotateX(${-y * 5}deg)
      translateZ(10px)
    `;
  };
  
  const handleMouseLeave = () => {
    if (isTouchDevice || !imagesRef.current) return;
    
    imagesRef.current.style.transform = `
      perspective(1000px)
      rotateY(0deg)
      rotateX(0deg)
      translateZ(0px)
    `;
    setIsHovering(false);
  };

  // Animation variants based on motion preferences
  const titleAnimation = shouldUseReducedMotion
    ? { 
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
      }
    : {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      };

  // Handle image loading error
  const handleImageError = (index: number) => {
    console.error(`Error loading image at index ${index}`);
    setImageErrors(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Get the next valid image index
  const getValidImageIndex = (currentIndex: number): number => {
    if (!imageErrors[currentIndex]) return currentIndex;
    
    // Loop through all images to find the next non-error one
    for (let i = 0; i < images.length; i++) {
      const idx = (currentIndex + i) % images.length;
      if (!imageErrors[idx]) return idx;
    }
    
    return currentIndex; // Fallback to current even if it has error
  };

  const validIndex = getValidImageIndex(activeIndex);

  return (
    <motion.section 
      ref={sectionRef}
      id="ambience" 
      className="min-h-screen relative py-12 md:py-24 overflow-hidden flex items-center"
      style={{
        backgroundColor: "#080808",
      }}
    >
      {/* Debug UI - only visible during development */}
      {/* {import.meta.env.DEV && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs overflow-auto max-h-80">
          <h3 className="font-bold mb-2">Image Debug Info:</h3>
          <ul>
            {images.map((img, idx) => (
              <li key={idx} className="mb-1">
                <span className={`
                  ${loadingStatus[idx] === 'loaded' ? 'text-green-400' : ''}
                  ${loadingStatus[idx]?.startsWith('error') ? 'text-red-400' : ''}
                  ${loadingStatus[idx] === 'pending' ? 'text-yellow-400' : ''}
                `}>
                  Image {idx+1}: {loadingStatus[idx]}
                </span>
                <br />
                <span className="text-gray-400">{String(img.src).substring(0, 30)}...</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className="absolute inset-0 bg-gradient-radial from-black/70 via-black/90 to-black z-0" />
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light z-1" />
      
      <motion.div 
        ref={containerRef}
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{
          opacity: opacityProgress,
          y: yProgress,
          scale: scaleProgress,
          rotate: rotateProgress,
        }}
      >
        <div className="text-center mb-8 md:mb-16">
          <div className="overflow-hidden mb-2">
            <motion.h2 
              className="artistic-title text-[#FEFEFE] font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide"
              initial={titleAnimation.initial}
              animate={titleAnimation.animate}
              transition={titleAnimation.transition}
            >
              Experience Our Ambience
            </motion.h2>
          </div>
          <motion.div 
            className="decorative-line h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: shouldUseReducedMotion ? 0.7 : 1.2, delay: 0.4, ease: "easeOut" }}
          />
          <motion.p 
            className="artistic-text text-[#FEFEFE]/80 max-w-3xl mx-auto text-sm md:text-base italic font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldUseReducedMotion ? 0.5 : 1, delay: 0.6 }}
          >
            Step into a world where every detail has been carefully curated to create an atmosphere that engages all your senses.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div 
            className="relative order-2 lg:order-1"
            onMouseEnter={() => setIsHovering(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              ref={imagesRef}
              className={`aspect-w-4 aspect-h-5 sm:aspect-w-16 sm:aspect-h-12 md:aspect-w-4 md:aspect-h-5 rounded-lg overflow-hidden artistic-border transition-all duration-500 ${shouldUseReducedMotion ? '' : 'transform-3d'}`}
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                borderRadius: "0.5rem",
                willChange: "transform",
              }}
            >
              <AnimatePresence mode="wait">
                {images.map((image, index) => (
                  index === validIndex && (
                    <motion.div 
                      key={index}
                      className="absolute inset-0"
                      initial={shouldUseReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
                      animate={shouldUseReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={shouldUseReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: shouldUseReducedMotion ? 0.7 : 1.2,
                        ease: shouldUseReducedMotion ? "easeOut" : [0.16, 1, 0.3, 1]
                      }}
                    >
                      {imageErrors[index] ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <p className="text-gray-300">Image failed to load</p>
                        </div>
                      ) : (
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-full object-cover" 
                          onError={() => handleImageError(index)}
                          style={{
                            opacity: loadingStatus[index] === 'loaded' ? 1 : 0.5,
                            transition: 'opacity 0.5s ease'
                          }}
                        />
                      )}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              
              <motion.div 
                className="absolute bottom-6 left-6 right-6 text-center z-10"
                animate={shouldUseReducedMotion ? { opacity: 1 } : { y: [10, 0], opacity: [0, 1] }}
                transition={{ duration: shouldUseReducedMotion ? 0.5 : 1, delay: 0.3 }}
              >
                <div className="backdrop-blur-sm bg-black/30 p-4 rounded-sm inline-block">
                  <span className="block text-[#FEFEFE] italic text-xl font-serif">
                    {quotes[validIndex]}
                  </span>
                  <div className="mt-2 mx-auto w-16 h-[1px] bg-[#D4AF37]"></div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 w-24 h-24 md:w-32 md:h-32 border-2 border-[#D4AF37] rounded-lg z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: shouldUseReducedMotion ? 0.6 : 1, delay: 0.7 }}
            />
          </div>
          
          <div className="space-y-4 md:space-y-8 order-1 lg:order-2">
            <motion.p 
              className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-base md:text-lg font-light"
              initial={{ opacity: 0, y: shouldUseReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#D4AF37] text-2xl md:text-3xl font-serif leading-tight drop-shadow-glow">T</span>he ambience at The Commoners Kitchen is a carefully orchestrated symphony of elements—the warm glow of pendant lights, the rich aroma of freshly brewed coffee, the gentle hum of conversation, and the subtle notes of our curated playlist.
            </motion.p>
            
            <motion.p 
              className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-base md:text-lg font-light"
              initial={{ opacity: 0, y: shouldUseReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We've created spaces for every mood and moment—intimate corners for quiet conversations, communal tables for shared experiences, and window seats for those who find inspiration in watching the world go by.
            </motion.p>
            
            <motion.p 
              className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-base md:text-lg font-light hidden md:block"
              initial={{ opacity: 0, y: shouldUseReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Our interior design draws inspiration from European café culture while incorporating elements that reflect our unique identity. Every piece of furniture, every artwork, and every decorative element has been chosen to contribute to the story we're telling.
            </motion.p>
            
            <motion.div 
              className="pt-4 md:pt-8 flex justify-center lg:justify-start space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {images.map((_, index) => (
                !imageErrors[index] && (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative transition-all duration-300 ease-out ${imageErrors[index] ? 'opacity-30 cursor-not-allowed' : ''}`}
                    aria-label={`View image ${index + 1}`}
                    disabled={imageErrors[index]}
                  >
                    <span className={`block w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ${
                      index === validIndex 
                        ? 'bg-[#D4AF37] scale-125' 
                        : 'bg-[#FEFEFE]/30 hover:bg-[#FEFEFE]/50'
                    }`} />
                    <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#FEFEFE]/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                      {index + 1}
                    </span>
                  </button>
                )
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll prompt - hide if reduced motion is preferred */}
      {!shouldUseReducedMotion && (
        <motion.div 
          className="scroll-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="scroll-prompt-text">Explore our world</span>
          <div className="scroll-prompt-icon"></div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Ambience; 
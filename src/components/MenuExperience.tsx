import { useState, useEffect, useRef } from 'react';
import coffee from '../assets/coffee.jpg';
import pastry from '../assets/pastry.jpg';
import ramen from '../assets/ramen.jpg';
import pizza4 from '../assets/pizza4.jpg';
import burger5 from '../assets/burger5.jpg';
import salad from '../assets/salad.jpg';

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

const MenuExperience = () => {
  const [activeCategory, setActiveCategory] = useState<string>('coffee');
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  const categories: MenuCategory[] = [
    {
      id: 'coffee',
      name: 'Artisanal Coffee',
      description: 'Our coffee is more than a beverage—it\'s a ritual. Each cup is crafted with precision, using beans sourced from sustainable farms and roasted to perfection. The aroma, the texture, the flavor—all come together in a symphony of sensations.',
      image: coffee
    },
    {
      id: 'pastries',
      name: 'Handcrafted Pastries',
      description: 'Our pastries are small works of art, created daily by our passionate bakers. Using traditional European techniques and the finest ingredients, each bite tells a story of craftsmanship and dedication to the culinary arts.',
      image: pastry
    },
    {
      id: 'mains',
      name: 'Signature Mains',
      description: 'Our main courses are a celebration of flavors, textures, and traditions. Drawing inspiration from European classics and adding our unique touch, we create dishes that nourish both body and soul.',
      image: ramen
    },
    {
      id: 'pizza',
      name: 'Artisan Pizzas',
      description: 'Our pizzas are a canvas for creativity. Hand-stretched dough, house-made sauces, and thoughtfully selected toppings come together in perfect harmony, baked in our wood-fired oven to create a truly authentic experience.',
      image: pizza4
    },
    {
      id: 'burgers',
      name: 'Gourmet Burgers',
      description: 'Our burgers elevate the familiar to the extraordinary. Premium cuts of meat, freshly baked buns, and house-made condiments create a symphony of flavors that transform a simple meal into a memorable dining experience.',
      image: burger5
    },
    {
      id: 'salads',
      name: 'Garden Fresh Salads',
      description: 'Our salads celebrate the bounty of nature. Fresh, seasonal produce, artisanal cheeses, and house-made dressings come together in vibrant compositions that are as beautiful to behold as they are delicious to taste.',
      image: salad
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const opacity = Math.max(0, Math.min(1, 1 - (top / (window.innerHeight * 0.5))));
        
        if (categoriesRef.current) {
          categoriesRef.current.style.opacity = opacity.toString();
          categoriesRef.current.style.transform = `translateY(${(1 - opacity) * 50}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const activeItem = categories.find(cat => cat.id === activeCategory);

  return (
    <section 
      ref={sectionRef}
      id="menu" 
      className="min-h-screen relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="artistic-title text-[#FEFEFE] mb-4">Culinary Journey</h2>
          <div className="decorative-line mx-auto mb-8" />
          <p className="artistic-text text-[#FEFEFE]/80 max-w-3xl mx-auto">
            Our menu is not just a list of dishes—it's an invitation to explore, to savor, and to experience the passion that goes into every creation.
          </p>
        </div>
        
        <div 
          ref={categoriesRef}
          className="transition-all duration-1000"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#D4AF37] text-black'
                    : 'bg-black/40 text-[#FEFEFE]/80 hover:bg-black/60'
                }`}
              >
                <span className="block text-sm md:text-base font-serif">{category.name}</span>
              </button>
            ))}
          </div>
          
          {activeItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative artistic-border overflow-hidden rounded-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={activeItem.image} 
                    alt={activeItem.name} 
                    className="object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-serif text-[#FEFEFE]">{activeItem.name}</h3>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="artistic-text text-[#FEFEFE]/90 leading-relaxed text-lg">
                  {activeItem.description}
                </p>
                
                <div className="pt-4">
                  <div className="inline-block relative">
                    <span className="block text-[#D4AF37] italic text-xl font-serif">
                      "Every dish tells a story."
                    </span>
                    <div className="absolute -bottom-3 right-0 w-24 h-[1px] bg-[#D4AF37]"></div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <button className="border border-[#D4AF37] text-[#D4AF37] py-3 px-8 rounded-lg hover:bg-[#D4AF37]/10 transition-colors duration-300">
                    <span className="font-serif">Discover More</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuExperience; 
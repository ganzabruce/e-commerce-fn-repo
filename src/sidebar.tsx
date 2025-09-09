import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const headphoneimage = 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-slider-2.png';
const smartphoneimage = 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-slider-1.png';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  discount: string;
  image: string;
  bgColor: string;
  titleColor: string;
}

const categoryDropdowns: Record<string, { columns: { title: string; items: string[] }[] }> = {
  "Men's Clothing": {
    columns: [
      { title: "Top wear", items: ["T-Shirts", "Shirts", "Suits & Blazers", "Jackets"] },
      { title: "Winter wear", items: ["Sweaters", "Jackets", "Sweatshirts", "Thermals", "Pullovers"] },
      { title: "Innerwear & Sleepwear", items: ["Briefs & Trunks", "Vests", "Boxers", "Thermals"] },
      { title: "Bottom wear", items: ["Jeans", "Trousers", "Shorts", "Cargos", "Track pants"] },
      { title: "Sports wear", items: ["Sports T-Shirts", "Track Pants", "Track Suits", "Shorts", "Innerwear"] },
      { title: "Accessories", items: ["Backpacks", "Belts", "Sunglasses", "Luggage & Travel", "Frames", "Jewellery"] }
    ]
  },
  "Women's Clothing": {
    columns: [
      { title: "Western Wear", items: ["Tops", "T-Shirts", "Shirts", "Jeans & Jeggings", "Trousers & Capris"] },
      { title: "Sports & Active Wear", items: ["Clothing", "Footwear", "T-Shirts", "Sports Accessories", "Sports Equipment"] },
      { title: "Beauty & Personal Care", items: ["Makeup", "Skincare", "Premium Beauty", "Lipsticks"] },
      { title: "Accessories", items: ["Smart Bands", "Handbags"] },
      { title: "Fusion Wear", items: ["Sweaters & Sweatshirts", "Coats & Blazers", "Jackets & Waistcoats", "Shorts & Skirts", "Camisoles & Slips"] },
      { title: "Lingerie & Sleepwear", items: ["Bras & Lingerie Sets", "Briefs", "Shapewear", "Sleepwear & Loungewear", "Camisoles & Thermals"] }
    ]
  },
  Accessories: { columns: [{ title: "Women's Accessories", items: ["Smart Bands", "Wallets & Belts", "Luggage & Travel", "Sunglasses", "Handbags"] }] },
  Shoes: { columns: [{ title: "Men's Shoes", items: ["Sports Shoes", "Casual Shoes", "Formal Shoes"] }] },
  Watches: { columns: [{ title: "Smartwatches", items: ["Apple Watch", "Samsung Watch", "Fitbit"] }] },
  Dresses: { columns: [] },
  Shirts: { columns: [] }
};

const slides: SlideData[] = [
  {
    id: 1,
    title: "BEATS EP ON-EAR",
    subtitle: "PERSONALIZED HEADPHONE",
    description: "Premium sound quality with comfort",
    discount: "Min. 40-80% Off",
    image: headphoneimage,
    bgColor: "#fff5e6",
    titleColor: "#ffcc00"
  },
  {
    id: 2,
    title: "LATEST SMARTPHONE",
    subtitle: "CUTTING-EDGE TECHNOLOGY",
    description: "Experience the future in your hands",
    discount: "Up to 50% Off",
    image: smartphoneimage,
    bgColor: "#f0f8ff",
    titleColor: "#007bff"
  }
];

const ClothingSidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-white shadow-md relative z-10 ml-36">
        <div className="p-5">
          <h1 className="text-xl font-bold text-gray-800">Clothing Store</h1>
        </div>
        <nav className="mt-5">
          <ul>
            {Object.keys(categoryDropdowns).map((categoryName) => {
              const hasDropdown = categoryDropdowns[categoryName]?.columns.length > 0;
              return (
                <li
                  key={categoryName}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveCategory(categoryName)}
                  onMouseLeave={() => hasDropdown && setActiveCategory(null)}
                >
                  <button
                    className={`w-full text-left py-3 px-6 flex justify-between items-center transition-colors ${
                      activeCategory === categoryName ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{categoryName}</span>
                    {hasDropdown && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>

                  {/* Dropdown only if has columns */}
                  {activeCategory === categoryName && hasDropdown && (
                    <div className="absolute left-full top-0 w-[800px] bg-white shadow-lg rounded-lg z-50">
                      <div className="grid grid-cols-3 gap-6 p-6">
                        {categoryDropdowns[categoryName].columns.map((col, idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-gray-700 mb-2">{col.title}</h4>
                            <ul className="space-y-1">
                              {col.items.map((item, i) => (
                                <li key={i}>
                                  <a href="#" className="block text-gray-600 hover:text-blue-500">
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main slider content */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative flex items-center justify-between px-16"
              style={{ backgroundColor: slide.bgColor }}
            >
              {/* Text */}
              <div className="flex-1 z-10">
                <h1 className="text-2xl font-bold mb-4" style={{ color: slide.titleColor }}>
                  {slide.title}
                </h1>
                <h2 className="text-5xl font-bold text-black mb-4 leading-tight max-w-lg">{slide.subtitle}</h2>
                <p className="text-lg text-gray-600 mb-4">{slide.description}</p>
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">{slide.discount}</h3>
                <button
                  className="px-8 py-4 font-bold text-black rounded-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: slide.titleColor }}
                >
                  BUY NOW
                </button>
              </div>

              {/* Image */}
              <img src={slide.image} alt={slide.title} className="max-h-96 object-contain" />
            </div>
          ))}
        </div>

        {/* Slider arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-gray-800' : 'bg-gray-400 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-8 right-8 bg-white bg-opacity-80 px-4 py-2 rounded-full z-10">
          <span className="text-sm font-medium text-gray-700">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClothingSidebar;

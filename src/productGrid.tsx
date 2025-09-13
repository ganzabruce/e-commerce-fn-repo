import { Heart, ShoppingCart, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  badge?: string;
  image: string;
}

const ProductGrid = () => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Apple iPhone 11 Pro Max...",
      category: "ELECTRONICS",
      price: "$199.00",
      originalPrice: "$254.00",
      discount: "22% OFF",
      badge: "FEATURED",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-iPhone-11-Pro-Max-256GB-2-300x350.jpg"
    },
    {
      id: 2,
      name: "Apple Watch Series 5",
      category: "ELECTRONICS", 
      price: "$499.00 - $599.00",
      discount: "17% OFF",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-White-2-300x350.jpg"
    },
    {
      id: 3,
      name: "JBL Wireless Bluetooth S...",
      category: "ELECTRONICS",
      price: "$96.00",
      badge: "FEATURED",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/JBL-Wireless-Bluetooth-Speaker-2-300x350.jpg"
    },
    {
      id: 4,
      name: "JBL On-Ear Headphones",
      category: "ELECTRONICS",
      price: "$124.00",
      badge: "FEATURED",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/JBL-On-Ear-Headphones-2-300x350.jpg"
    },
    {
      id: 5,
      name: "Apple AirPods with Wirel...",
      category: "ELECTRONICS",
      price: "$85.00",
      badge: "FEATURED",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-AirPods-with-Wireless-Charging-2-300x350.jpg"
    },
    {
      id: 6,
      name: "Samsung Galaxy S20 8GB...",
      category: "ELECTRONICS",
      price: "$250.00",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Samsung-Galaxy-S20-8GB-RAM-128GB-Storage-2-300x350.jpg"
    },
    {
      id: 7,
      name: "Samsung Gear 360 Camera",
      category: "ELECTRONICS",
      price: "$29.00",
      originalPrice: "$43.00",
      discount: "40% OFF",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Samsung-Gear-360-Camera-2-300x350.jpg"
    },
    {
      id: 8,
      name: "Apple Watch Series 5 Blac...",
      category: "ELECTRONICS",
      price: "$599.00",
      image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-Black-Milanese-2-300x350.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Hot Deals Section */}
        <div className="lg:col-span-1">
          <div className="border-2 border-yellow-400 rounded-lg p-6 h-full">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b-2 border-yellow-400">HOT DEALS</h2>
            
            {/* Hot Deal Product */}
            <div className="text-center">
              <div className="relative mb-4">
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">17% OFF</span>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Heart size={20} />
                </button>
                
                <div className="py-8">
                  <div className="w-32 h-40 relative mx-auto">
                    <div className="w-24 h-32 bg-gray-200 rounded-xl mx-auto">
                      <div className="absolute inset-2 bg-black rounded-lg">
                        <div className="w-4 h-4 bg-white rounded-full mx-auto mt-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <p className="text-xs text-gray-500 mb-1">ELECTRONICS</p>
                <h3 className="font-semibold mb-2">Apple Watch Series 5</h3>
                <p className="font-bold text-lg mb-1">$499.00 - $599.00</p>
                <p className="text-xs text-gray-500 mb-4">Already Sold: 50</p>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-yellow-400 h-2 rounded-full w-2/3"></div>
                </div>
                
                <p className="text-xs text-gray-500">Available: 75</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">FEATURED PRODUCTS</h2>
              <div className="w-16 h-1 bg-yellow-400 mt-1"></div>
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
              VIEW ALL
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className="relative mb-4">
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
                      {product.discount}
                    </span>
                  )}
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-10">
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10">
                    <Heart size={16} />
                  </button>
                  
                    <div className="h-24 flex items-center justify-center py-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-24 object-contain" 
                      />
                    </div>

                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-sm font-medium mb-2 h-10 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Hover Action Buttons */}
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
                  <button className="flex-1 py-3 px-2 hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center border-r border-yellow-500">
                    <Heart size={16} className="text-gray-800" />
                  </button>
                  <button className="flex-1 py-3 px-2 hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center border-r border-yellow-500">
                    <ShoppingCart size={16} className="text-gray-800" />
                  </button>
                  <button className="flex-1 py-3 px-2 hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center">
                    <Search size={16} className="text-gray-800" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
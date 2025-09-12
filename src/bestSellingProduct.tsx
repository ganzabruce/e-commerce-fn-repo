import React from 'react';
import { Heart, Share2, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  badge?: string;
  image: string;
  backgroundColor?: string;
}




const products: Product[] = [
  {
    id: 1,
    category: 'ELECTRONICS',
    name: 'Apple Watch Series 5',
    price: 499.00,
    originalPrice: 599.00,
    discount: '17% OFF',
    image: 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-White-2-300x350.jpg',
    backgroundColor: 'bg-gray-50'
  },
  {
    id: 2,
    category: 'ELECTRONICS',
    name: 'Microsoft Xbox One Wireless Controller',
    price: 25.00,
    originalPrice: 45.00,
    discount: '44% OFF',
    image: 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/Microsoft-Xbox-One-Wireless-Controller-2-300x350.jpg',
    backgroundColor: 'bg-gray-50'
  },
  {
    id: 3,
    category: 'ELECTRONICS',
    name: 'JBL On-Ear Headphones',
    price: 124.00,
    badge: 'FEATURED',
    image: 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/JBL-On-Ear-Headphones-2-300x350.jpg',
    backgroundColor: 'bg-orange-50'
  },
  {
    id: 4,
    category: 'ELECTRONICS',
    name: 'Samsung Virtual Reality Headset',
    price: 18.00,
    image: 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/Samsung-Virtual-Reality-Headset-2-300x350.jpg',
    backgroundColor: 'bg-gray-50'
  },
  {
    id: 5,
    category: 'ELECTRONICS',
    name: 'Apple Watch Series 5 Black Milanese Loop',
    price: 399.00,
    image: 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-Black-Milanese-2-300x350.jpg',
    backgroundColor: 'bg-gray-50'
  },
  {
    id: 6,
    category: 'ELECTRONICS',
    name: 'Samsung Gear 360 Camera',
    price: 29.00,
    originalPrice: 49.00,
    discount: '42% OFF',
    image: 'https://kapee.presslayouts.com/wp-content/uploads/2020/07/Samsung-Gear-360-Camera-2-300x350.jpg',
    backgroundColor: 'bg-green-50'
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg hover:shadow-lg hover:border-gray-200 transition-all duration-300  group overflow-hidden">
      <div className="relative">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {product.discount}
          </div>
        )}

        {/* Featured Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart */}
        <button className="absolute top-3 right-3 p-2 z-10 hover:bg-white/80 rounded-full transition-colors">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </button>

        {/* Product Image */}
        <div className={`${product.backgroundColor} flex justify-center items-center h-48 p-6`}>
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full object-contain"
          />
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{product.category}</p>

        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 leading-tight min-h-[2.5rem] line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2.5 px-3 rounded transition-all duration-200 hover:shadow-md">
            <Share2 className="w-4 h-4 mx-auto" />
          </button>
          <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2.5 px-3 rounded transition-all duration-200 hover:shadow-md">
            <ShoppingCart className="w-4 h-4 mx-auto" />
          </button>
          <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2.5 px-3 rounded transition-all duration-200 hover:shadow-md">
            <Eye className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};


const BestSellingProducts: React.FC = () => {
  return (
    <div className="bg-gray-50  min-h-screen py-12">
      <div className="max-w-7xl p-10 bg-white mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">BEST SELLING PRODUCTS</h2>
            <div className="w-20 h-1 bg-yellow-400"></div>
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded font-medium transition-colors text-sm">
            VIEW ALL
          </button>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
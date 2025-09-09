import React from 'react';
import { Truck, RotateCcw, Shield, MessageCircle } from 'lucide-react';

interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  priceRange?: string;
  image: string;
}

interface ProductSection {
  title: string;
  products: Product[];
}

const serviceFeatures: ServiceFeature[] = [
  {
    icon: <Truck className="w-8 h-8 text-yellow-500" />,
    title: "FREE SHIPPING",
    description: "On All Orders Over $99"
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-yellow-500" />,
    title: "EASY RETURNS",
    description: "30 Days Return Policy"
  },
  {
    icon: <Shield className="w-8 h-8 text-yellow-500" />,
    title: "SECURE PAYMENT",
    description: "100% Secure Payment"
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-yellow-500" />,
    title: "24/7 SUPPORT",
    description: "Dedicated Support"
  }
];

const productSections: ProductSection[] = [
  {
    title: "FEATURED",
    products: [
      {
        id: 1,
        name: "Apple AirPods with Wireless Charging Case",
        price: 85.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-AirPods-with-Wireless-Charging-300x350.jpg"
      },
      {
        id: 2,
        name: "JBL Wireless Bluetooth Speaker",
        price: 96.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/JBL-Wireless-Bluetooth-Speaker-300x350.jpg"
      },
      {
        id: 3,
        name: "JBL On-Ear Headphones",
        price: 124.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/JBL-On-Ear-Headphones-300x350.jpg"
      }
    ]
  },
  {
    title: "RECENT",
    products: [
      {
        id: 4,
        name: "Apple iPhone 11 Pro Max 256GB",
        price: 199.00,
        originalPrice: 234.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-iPhone-11-Pro-Max-256GB-300x350.jpg"
      },
      {
        id: 5,
        name: "Apple AirPods with Wireless Charging Case",
        price: 85.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-AirPods-with-Wireless-Charging-300x350.jpg"
      },
      {
        id: 6,
        name: "Apple Watch Series 5",
        price: 299.00,
        priceRange: "$499.00 - $599.00",
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-White-300x350.jpg"
      }
    ]
  },
  {
    title: "ON SALE",
    products: [
      {
        id: 7,
        name: "Apple iPhone 11 Pro Max 256GB",
        price: 199.00,
        originalPrice: 234.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-iPhone-11-Pro-Max-256GB-300x350.jpg"
      },
      {
        id: 8,
        name: "Apple Watch Series 5",
        price: 199.00,
        priceRange: "$499.00 - $599.00",
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-White-300x350.jpg"
      },
      {
        id: 9,
        name: "Samsung Gear 360 Camera",
        price: 29.00,
        originalPrice: 48.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Samsung-Gear-360-Camera-300x350.jpg"
      }
    ]
  },
  {
    title: "TOP RATED",
    products: [
      {
        id: 10,
        name: "Samsung Virtual Reality Headset",
        price: 18.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Samsung-Virtual-Reality-Headset-300x350.jpg"
      },
      {
        id: 11,
        name: "Microsoft Xbox One Wireless Controller",
        price: 25.00,
        originalPrice: 45.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Microsoft-Xbox-One-Wireless-Controller-300x350.jpg"
      },
      {
        id: 12,
        name: "Apple Watch Series 5 Black Milanese Loop",
        price: 599.00,
        image: "https://kapee.presslayouts.com/wp-content/uploads/2020/07/Apple-Watch-Series-5-Black-Milanese-300x350.jpg"
      }
    ]
  }
];

const brandLogos = [
  { name: "BEAUTY", tagline: "BEAUTY TAGLINE", letter: "B" },
  { name: "DESIGN", tagline: "DESIGN TAGLINE", letter: "D" },
  { name: "DRESS", tagline: "DRESS TAGLINE", letter: "D" },
  { name: "FASHION", tagline: "FASHION TAGLINE", letter: "F" },
  { name: "JACKET", tagline: "JACKET TAGLINE", letter: "J" },
  { name: "SHOES", tagline: "SHOES TAGLINE", letter: "S" }
];

const ServiceFeatureCard: React.FC<{ feature: ServiceFeature }> = ({ feature }) => (
  <div className="flex items-center space-x-4 p-4">
    <div className="flex-shrink-0">
      {feature.icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-sm">{feature.title}</h3>
      <p className="text-gray-600 text-sm">{feature.description}</p>
    </div>
  </div>
);

const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
  <img 
    src={product.image} 
    alt={product.name} 
    className="w-full h-full object-contain rounded-lg"
  />
</div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
        {product.name}
      </h4>
      <div className="flex items-center space-x-2 mt-1">
        {product.priceRange ? (
          <span className="text-sm font-bold text-gray-900">{product.priceRange}</span>
        ) : product.price ? (
          <>
            <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </>
        ) : null}
      </div>
    </div>
  </div>
);

const ProductSection: React.FC<{ section: ProductSection }> = ({ section }) => (
  <div className="bg-white rounded-lg p-6">
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-1">{section.title}</h2>
      <div className="w-8 h-0.5 bg-yellow-400"></div>
    </div>
    <div className="space-y-2">
      {section.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  </div>
);

const BrandLogo: React.FC<{ brand: { name: string; tagline: string; letter: string } }> = ({ brand }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
    <div className="w-10 h-10 bg-gray-400 text-white rounded flex items-center justify-center font-bold text-lg">
      {brand.letter}
    </div>
    <div>
      <div className="font-bold text-gray-900 text-sm">{brand.name}</div>
      <div className="text-xs text-gray-600 uppercase tracking-wide">{brand.tagline}</div>
    </div>
  </div>
);

const FeaturedProductsSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <ServiceFeatureCard feature={feature} />
            </div>
          ))}
        </div>
        
        {/* Product Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productSections.map((section, index) => (
            <ProductSection key={index} section={section} />
          ))}
        </div>
        
        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandLogos.map((brand, index) => (
            <BrandLogo key={index} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
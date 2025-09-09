import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, MessageCircle, Rss, Youtube } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "INFORMATION",
    links: [
      { label: "About Us", href: "#" },
      { label: "Store Location", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Shipping & Delivery", href: "#" },
      { label: "Latest News", href: "#" },
      { label: "Our Sitemap", href: "#" }
    ]
  },
  {
    title: "OUR SERVICE",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Sale", href: "#" },
      { label: "Customer Service", href: "#" },
      { label: "Delivery Information", href: "#" },
      { label: "Payments", href: "#" },
      { label: "Saved Cards", href: "#" }
    ]
  },
  {
    title: "MY ACCOUNT",
    links: [
      { label: "My Account", href: "#" },
      { label: "My Shop", href: "#" },
      { label: "My Cart", href: "#" },
      { label: "Checkout", href: "#" },
      { label: "My Wishlist", href: "#" },
      { label: "Tracking Order", href: "#" }
    ]
  }
];

const socialIcons = [
  { icon: <Facebook className="w-4 h-4" />, href: "#", bgColor: "bg-blue-600" },
  { icon: <Twitter className="w-4 h-4" />, href: "#", bgColor: "bg-black" },
  { icon: <Linkedin className="w-4 h-4" />, href: "#", bgColor: "bg-blue-500" },
  { icon: <Instagram className="w-4 h-4" />, href: "#", bgColor: "bg-pink-500" },
  { icon: <MessageCircle className="w-4 h-4" />, href: "#", bgColor: "bg-red-500" },
  { icon: <Rss className="w-4 h-4" />, href: "#", bgColor: "bg-orange-500" },
  { icon: <Youtube className="w-4 h-4" />, href: "#", bgColor: "bg-red-600" }
];

const paymentMethods = [
  { name: "Visa", logo: "💳" },
  { name: "PayPal", logo: "🟦" },
  { name: "Discover", logo: "🔍" },
  { name: "Mastercard", logo: "🔴" },
  { name: "Mastercard", logo: "🟠" },
  { name: "American Express", logo: "🟢" }
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">kapee.</h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">Lorem Ipsum, 2046 Lorem Ipsum</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">576-245-2478</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">info@kapee.com</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">Mon - Fri / 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter - Now positioned on the right */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-4">NEWSLETTER</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Subscribe to our mailing list to get the new updates!
            </p>
            
            {/* Newsletter Form */}
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm font-medium rounded-r-md transition-colors">
                SIGN UP
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-2">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`${social.bgColor} text-white p-2 rounded hover:opacity-80 transition-opacity`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              Kapee © 2025 by <span className="font-medium">PressLayouts</span> All Rights Reserved.
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              {paymentMethods.map((payment, index) => (
                <div
                  key={index}
                  className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-xs"
                >
                  {payment.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
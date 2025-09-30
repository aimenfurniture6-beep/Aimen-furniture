import React from 'react';
import { Truck, Shield, HeadphonesIcon, User, Phone, MapPin, Calendar } from 'lucide-react';

const Footer = ({ setActiveSection, setSelectedProduct }) => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">FurniCraft</h3>
          <p className="text-gray-400">
            Crafting beautiful furniture since 2020. Transform your living space with our premium collection.
          </p>
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">F</span>
            </div>
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">I</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => {setActiveSection('home'); setSelectedProduct(null);}}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => {setActiveSection('products'); setSelectedProduct(null);}}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Products
              </button>
            </li>
            <li>
              <button 
                onClick={() => {setActiveSection('about'); setSelectedProduct(null);}}
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => {setActiveSection('admin'); setSelectedProduct(null);}}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Admin
              </button>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Free Delivery</span>
            </li>
            <li className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Quality Guarantee</span>
            </li>
            <li className="flex items-center space-x-2">
              <HeadphonesIcon className="w-4 h-4" />
              <span>24/7 Support</span>
            </li>
            <li className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Custom Orders</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>123 Furniture St, Craft City</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Mon - Sat: 9AM - 8PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2024 FurniCraft. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
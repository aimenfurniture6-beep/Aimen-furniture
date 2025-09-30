import React from 'react';
import { ShoppingBag } from 'lucide-react';

const HeroSection = ({ setActiveSection }) => (
  <div className="relative bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
            Transform Your
            <span className="text-orange-600 block">Living Space</span>
          </h1>
          <p className="text-lg sm:text-xl text-amber-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Discover our premium collection of handcrafted furniture designed to bring elegance and comfort to every corner of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => setActiveSection('products')}
              className="bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg"
            >
              Shop Now
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className="border-2 border-amber-600 text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="relative order-first lg:order-last">
          <div className="bg-amber-200 rounded-full p-4 sm:p-6 lg:p-8 shadow-2xl mx-auto max-w-sm lg:max-w-none">
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full flex items-center justify-center">
              <div className="text-center text-amber-800">
                <ShoppingBag className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 mx-auto mb-4" />
                <p className="text-xl sm:text-2xl font-bold">Premium Furniture</p>
                <p className="text-base sm:text-lg">Since 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
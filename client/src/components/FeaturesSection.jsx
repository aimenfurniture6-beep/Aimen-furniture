import React from 'react';
import { Truck, Shield, HeadphonesIcon } from 'lucide-react';

const FeaturesSection = () => (
  <div className="py-16 bg-amber-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-900 mb-4">Why Choose FurniCraft?</h2>
        <p className="text-xl text-amber-700">Experience the difference with our premium services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Truck className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-900 mb-2">Free Delivery</h3>
          <p className="text-amber-700">Free delivery on all orders above $500. Fast and reliable shipping.</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Shield className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-900 mb-2">Quality Guarantee</h3>
          <p className="text-amber-700">All our products come with a 5-year quality guarantee.</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <HeadphonesIcon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-900 mb-2">24/7 Support</h3>
          <p className="text-amber-700">Round-the-clock customer support for all your needs.</p>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturesSection;
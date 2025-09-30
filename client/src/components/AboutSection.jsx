import React from 'react';

const AboutSection = () => (
  <div className="bg-orange-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-amber-900 mb-4">About FurniCraft</h2>
        <p className="text-xl text-amber-700">Crafting beautiful furniture since 2020</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 className="text-3xl font-bold text-amber-900 mb-6">Our Story</h3>
          <p className="text-amber-700 leading-relaxed mb-6">
            FurniCraft was born from a passion for creating beautiful, functional furniture that transforms houses into homes. 
            Founded in 2020, we've been dedicated to bringing you the finest handcrafted pieces that combine traditional 
            craftsmanship with modern design.
          </p>
          <p className="text-amber-700 leading-relaxed mb-6">
            Every piece in our collection is carefully selected and crafted by skilled artisans who share our commitment 
            to quality and attention to detail. We believe that furniture should not just be functional, but should also 
            tell a story and create memories.
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg p-8">
          <div className="text-center">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-amber-900">500+</div>
                <div className="text-amber-700">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-900">50+</div>
                <div className="text-amber-700">Product Varieties</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-900">5</div>
                <div className="text-amber-700">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-900">24/7</div>
                <div className="text-amber-700">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-3xl font-bold text-amber-900 mb-6">Our Mission</h3>
        <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
          To provide exceptional furniture that enhances your living experience while maintaining the highest standards 
          of quality, sustainability, and customer service. We're not just selling furniture; we're helping you create 
          the perfect space for your life's most important moments.
        </p>
      </div>
    </div>
  </div>
);

export default AboutSection;
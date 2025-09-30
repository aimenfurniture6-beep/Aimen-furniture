import React from 'react';
import { ShoppingBag } from 'lucide-react';

const ProductsGrid = ({ furniture, setSelectedProduct, API_BASE }) => (
  <div className="bg-orange-50 min-h-screen py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Furniture Collection</h2>
        <p className="text-xl text-amber-700">Handpicked pieces for your perfect home</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {furniture.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => setSelectedProduct(item)}
          >
            {item.photo ? (
              <img
                src={`${API_BASE.replace('/api', '')}/uploads/${item.photo}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-amber-600" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">{item.name}</h3>
              <span className="text-2xl font-bold text-orange-600">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductsGrid;
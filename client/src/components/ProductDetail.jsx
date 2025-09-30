import React from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const ProductDetail = ({ product, setSelectedProduct, setShowBookingForm, API_BASE }) => (
  <div className="bg-orange-50 min-h-screen py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => setSelectedProduct(null)}
        className="mb-8 flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Products</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {product.photo ? (
            <img
              src={`${API_BASE.replace('/api', '')}/uploads/${product.photo}`}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-32 h-32 text-amber-600" />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>
            <span className="text-4xl font-bold text-orange-600">${product.price}</span>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-amber-900 mb-3">Description</h3>
            <p className="text-amber-700 leading-relaxed">{product.description}</p>
          </div>
          
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg text-sm font-medium">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-6">
            <button
              onClick={() => setShowBookingForm(product)}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors shadow-lg flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
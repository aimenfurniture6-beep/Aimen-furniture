import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import LoginPage from './LoginPage';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ProductsGrid from './ProductsGrid';
import ProductDetail from './ProductDetail';
import AboutSection from './AboutSection';
import Footer from './Footer';
import FurnitureForm from './FurnitureForm';
import BookingForm from './BookingForm';
import AdminPanel from './AdminPanel';
import { API_URL as API_BASE } from '../config';

const FurnitureShopApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [furniture, setFurniture] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFurniture, setEditingFurniture] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch furniture data
  const fetchFurniture = async () => {
    try {
      const response = await fetch(`${API_BASE}/furniture`);
      const data = await response.json();
      setFurniture(data);
    } catch (error) {
      console.error('Error fetching furniture:', error);
    }
  };

  // Fetch bookings data
  const fetchBookings = async () => {
    if (!authToken) return;
    
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      if (error.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchFurniture();
  }, []);

  useEffect(() => {
    if (activeSection === 'admin' && isAuthenticated) {
      fetchBookings();
    }
  }, [activeSection, isAuthenticated, authToken]); // Added authToken dependency

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminUser');
    
    if (token && adminData) {
      setAuthToken(token);
      setAdmin(JSON.parse(adminData));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (adminData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    setAdmin(adminData);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    setActiveSection('home');
  };

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  });

  // Delete functions
  const deleteFurniture = async (id) => {
    if (window.confirm('Are you sure you want to delete this furniture item?')) {
      try {
        const response = await fetch(`${API_BASE}/furniture/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        if (response.ok) {
          fetchFurniture();
        } else if (response.status === 401) {
          handleLogout();
        }
      } catch (error) {
        console.error('Error deleting furniture:', error);
      }
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`${API_BASE}/bookings/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        if (response.ok) {
          fetchBookings();
        } else if (response.status === 401) {
          handleLogout();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  if (!isAuthenticated && activeSection === 'admin') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setSelectedProduct={setSelectedProduct}
        isAuthenticated={isAuthenticated}
        admin={admin}
        handleLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Render different sections based on activeSection */}
      {activeSection === 'home' && !selectedProduct && (
        <>
          <HeroSection setActiveSection={setActiveSection} />
          <FeaturesSection />
          <div className="py-16 bg-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-amber-900 mb-4">Featured Products</h2>
                <p className="text-xl text-amber-700">Check out our most popular items</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {furniture.slice(0, 3).map((item) => (
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
              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveSection('products')}
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeSection === 'products' && !selectedProduct && (
        <ProductsGrid 
          furniture={furniture} 
          setSelectedProduct={setSelectedProduct} 
          API_BASE={API_BASE} 
        />
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          setSelectedProduct={setSelectedProduct} 
          setShowBookingForm={setShowBookingForm} 
          API_BASE={API_BASE} 
        />
      )}

      {activeSection === 'about' && <AboutSection />}

      {activeSection === 'admin' && (
        <AdminPanel 
          furniture={furniture}
          bookings={bookings}
          setShowAddForm={setShowAddForm}
          setEditingFurniture={setEditingFurniture}
          deleteFurniture={deleteFurniture}
          deleteBooking={deleteBooking}
          API_BASE={API_BASE}
        />
      )}

      {/* Footer - Always present */}
      <Footer 
        setActiveSection={setActiveSection} 
        setSelectedProduct={setSelectedProduct} 
      />

      {/* Forms */}
      {showAddForm && (
        <FurnitureForm
          onClose={() => setShowAddForm(false)}
          onSave={() => setShowAddForm(false)}
          API_BASE={API_BASE}
          authToken={authToken}
          handleLogout={handleLogout}
          fetchFurniture={fetchFurniture}
        />
      )}

      {editingFurniture && (
        <FurnitureForm
          furniture={editingFurniture}
          onClose={() => setEditingFurniture(null)}
          onSave={() => setEditingFurniture(null)}
          API_BASE={API_BASE}
          authToken={authToken}
          handleLogout={handleLogout}
          fetchFurniture={fetchFurniture}
        />
      )}

      {showBookingForm && (
        <BookingForm
          furnitureItem={showBookingForm}
          onClose={() => setShowBookingForm(null)}
          API_BASE={API_BASE}
        />
      )}
    </div>
  );
};

export default FurnitureShopApp;
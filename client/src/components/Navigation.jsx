import React from 'react';
import { Home, ShoppingBag, Info, User, LogOut, Menu, X } from 'lucide-react';

const Navigation = ({ 
  activeSection, 
  setActiveSection, 
  setSelectedProduct, 
  isAuthenticated, 
  admin, 
  handleLogout, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => (
  <nav className="bg-amber-900 shadow-lg sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-amber-100">Aimen Furniture</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <button
              onClick={() => {setActiveSection('home'); setSelectedProduct(null);}}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'home' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {setActiveSection('products'); setSelectedProduct(null);}}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'products' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => {setActiveSection('about'); setSelectedProduct(null);}}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'about' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
            <button
              onClick={() => {setActiveSection('admin'); setSelectedProduct(null);}}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'admin' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
          {isAuthenticated && activeSection === 'admin' && (
            <div className="flex items-center space-x-4 border-l border-amber-700 pl-4">
              <span className="text-sm text-amber-200">Welcome, {admin?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-800 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-amber-200 hover:text-amber-100 p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-amber-700 py-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                setActiveSection('home'); 
                setSelectedProduct(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'home' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setActiveSection('products'); 
                setSelectedProduct(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'products' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Products</span>
            </button>
            <button
              onClick={() => {
                setActiveSection('about'); 
                setSelectedProduct(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'about' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </button>
            <button
              onClick={() => {
                setActiveSection('admin'); 
                setSelectedProduct(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'admin' 
                  ? 'bg-amber-700 text-amber-100' 
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Admin</span>
            </button>
            {isAuthenticated && activeSection === 'admin' && (
              <div className="border-t border-amber-700 pt-4 mt-4">
                <div className="px-4 py-2">
                  <span className="text-sm text-amber-200">Welcome, {admin?.username}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-800 rounded-md transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </nav>
);

export default Navigation;
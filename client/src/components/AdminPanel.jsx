import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, X, User, Phone, MapPin, Calendar } from 'lucide-react';

const AdminPanel = ({ 
  furniture, 
  bookings, 
  setShowAddForm, 
  setEditingFurniture, 
  deleteFurniture, 
  deleteBooking, 
  API_BASE 
}) => {
  const [viewingFurniture, setViewingFurniture] = useState(null);
  const [viewingBooking, setViewingBooking] = useState(null);

  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="bg-orange-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-amber-900">Admin Panel</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Furniture</span>
          </button>
        </div>

        {/* Furniture Management */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Furniture Inventory</h3>
          
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-amber-200">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {furniture.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.photo && (
                          <img
                            className="h-10 w-10 rounded-lg object-cover mr-4 shadow-sm"
                            src={`${API_BASE.replace('/api', '')}/uploads/${item.photo}`}
                            alt={item.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-amber-900">{item.name}</div>
                          <div className="text-sm text-amber-600">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                      {item.features?.join(', ') || 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setViewingFurniture(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4 p-2 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingFurniture(item)}
                        className="text-amber-600 hover:text-amber-900 mr-4 p-2 hover:bg-amber-100 rounded-full transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteFurniture(item.id)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {furniture.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    {item.photo && (
                      <img
                        className="h-12 w-12 rounded-lg object-cover mr-3 shadow-sm"
                        src={`${API_BASE.replace('/api', '')}/uploads/${item.photo}`}
                        alt={item.name}
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-amber-900">{item.name}</div>
                      <div className="text-xs text-amber-600">{item.description}</div>
                      <div className="text-sm font-semibold text-orange-600 mt-1">${item.price}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewingFurniture(item)}
                    className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-100 rounded-full transition-colors ml-2"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Management */}
        <div>
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Customer Bookings</h3>
          
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-amber-200">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Contact & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-amber-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-amber-900">{booking.customer_name}</div>
                          <div className="text-sm text-amber-600 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            <button
                              onClick={() => handlePhoneCall(booking.customer_phone)}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {booking.customer_phone}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {booking.photo && (
                          <img
                            className="h-10 w-10 rounded-lg object-cover mr-3 shadow-sm"
                            src={`${API_BASE.replace('/api', '')}/uploads/${booking.photo}`}
                            alt={booking.furniture_name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-amber-900">{booking.furniture_name}</div>
                          <div className="text-sm font-semibold text-orange-600">${booking.price}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-amber-600" />
                        <div>
                          <div className="font-medium">{booking.place}</div>
                          <div className="text-xs text-amber-500">{booking.customer_address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setViewingBooking(booking)}
                        className="text-blue-600 hover:text-blue-900 mr-4 p-2 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="text-center py-8 text-amber-600">
                No bookings yet
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <User className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-amber-900">{booking.customer_name}</div>
                      <div className="text-xs text-amber-600 flex items-center mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        <button
                          onClick={() => handlePhoneCall(booking.customer_phone)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {booking.customer_phone}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-2">
                    <button
                      onClick={() => setViewingBooking(booking)}
                      className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="text-red-600 hover:text-red-900 p-2 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="text-center py-8 text-amber-600">
                No bookings yet
              </div>
            )}
          </div>
        </div>

        {/* Furniture Details Modal */}
        {viewingFurniture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-amber-900">Furniture Details</h3>
                  <button
                    onClick={() => setViewingFurniture(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {viewingFurniture.photo && (
                  <img
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                    src={`${API_BASE.replace('/api', '')}/uploads/${viewingFurniture.photo}`}
                    alt={viewingFurniture.name}
                  />
                )}
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Name</label>
                    <p className="text-sm text-amber-900 font-medium">{viewingFurniture.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Description</label>
                    <p className="text-sm text-amber-700">{viewingFurniture.description}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Price</label>
                    <p className="text-lg font-bold text-orange-600">${viewingFurniture.price}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Features</label>
                    <p className="text-sm text-amber-700">{viewingFurniture.features?.join(', ') || 'None'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {viewingBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-amber-900">Booking Details</h3>
                  <button
                    onClick={() => setViewingBooking(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {viewingBooking.photo && (
                  <img
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                    src={`${API_BASE.replace('/api', '')}/uploads/${viewingBooking.photo}`}
                    alt={viewingBooking.furniture_name}
                  />
                )}
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Customer Name</label>
                    <p className="text-sm text-amber-900 font-medium">{viewingBooking.customer_name}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Phone</label>
                    <button
                      onClick={() => handlePhoneCall(viewingBooking.customer_phone)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {viewingBooking.customer_phone}
                    </button>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Product</label>
                    <p className="text-sm text-amber-900 font-medium">{viewingBooking.furniture_name}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Price</label>
                    <p className="text-lg font-bold text-orange-600">${viewingBooking.price}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Place</label>
                    <p className="text-sm text-amber-700">{viewingBooking.place}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Address</label>
                    <p className="text-sm text-amber-700">{viewingBooking.customer_address}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-amber-800 uppercase tracking-wider">Booking Date</label>
                    <p className="text-sm text-amber-700">{new Date(viewingBooking.booking_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
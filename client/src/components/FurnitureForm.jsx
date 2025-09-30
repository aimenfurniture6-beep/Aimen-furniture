import React, { useState } from "react";

const FurnitureForm = ({
  furniture,
  onClose,
  onSave,
  API_BASE,
  authToken,
  handleLogout,
  fetchFurniture,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: furniture?.name || "",
    description: furniture?.description || "",
    price: furniture?.price || "",
    features: furniture?.features?.join(", ") || "",
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price);
    submitData.append("features", formData.features);
    if (formData.photo) {
      submitData.append("photo", formData.photo);
    }

    try {
      const url = furniture
        ? `${API_BASE}/furniture/${furniture.id}`
        : `${API_BASE}/furniture`;
      const method = furniture ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: submitData,
      });

      if (response.ok) {
        onSave();
        onClose();
        fetchFurniture();
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error("Error saving furniture:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-bold mb-4 text-amber-900">
          {furniture ? "Edit Furniture" : "Add New Furniture"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-800">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900"
              placeholder="Enter furniture name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-800">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900"
              rows="3"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-800">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-800">
              Features (comma-separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900"
              placeholder="Modern design, Durable, Eco-friendly"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-800">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FurnitureForm;

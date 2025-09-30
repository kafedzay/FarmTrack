import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const CreateFarm = () => {
  const [farms, setFarms] = useState([]);
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) return;

    if (editId) {
      setFarms(farms.map(farm => 
        farm.id === editId ? { ...farm, ...formData } : farm
      ));
      setEditId(null);
    } else {
      setFarms([...farms, { 
        id: Date.now(), 
        ...formData 
      }]);
    }

    setFormData({ name: '', location: '' });
    setIsModalOpen(false);
  };

  const handleEdit = (farm) => {
    setEditId(farm.id);
    setFormData({ name: farm.name, location: farm.location });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setFarms(farms.filter(farm => farm.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Farm Management</h1>
        
        {/* Add Farm Button */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => {
              setFormData({ name: '', location: '' });
              setEditId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <FaPlus /> Add Farm
          </button>
        </div>

        {/* Farm Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map(farm => (
            <div 
              key={farm.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{farm.name}</h2>
              <p className="text-gray-600 mb-4">{farm.location}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleEdit(farm)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(farm.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Create/Edit Farm */}
        {isModalOpen && (
          <div className="fixed inset-0  flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                {editId ? 'Edit Farm' : 'Create Farm'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter farm name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="location">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter location"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    {editId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateFarm;
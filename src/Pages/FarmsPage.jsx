import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateFarm = () => {
  const { axiosInstance } = useContext(AuthContext);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', size: '', type: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchFarms = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/farms');
      setFarms(response.data.farms);
    } catch (err) {
      setError('Failed to fetch farms');
      console.error('Fetch farms error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.size) return;

    try {
      if (editId) {
        await axiosInstance.patch(`/api/farms/${editId}`, {
          name: formData.name,
          location: formData.location,
          size: formData.size,
          type: formData.type,
          description: formData.description
        });
        setEditId(null);
      } else {
        await axiosInstance.post('/api/farms', {
          name: formData.name,
          location: formData.location,
          size: formData.size,
          type: formData.type,
          description: formData.description
        });
      }
      fetchFarms();
      setFormData({ name: '', location: '', size: '', type: '', description: '' });
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save farm');
      console.error(err);
    }
  };

  const handleEdit = (farm) => {
    setEditId(farm.id);
    setFormData({ name: farm.name, location: farm.location, size: farm.size, type: farm.type, description: farm.description });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/farms/${id}`);
      fetchFarms();
    } catch (err) {
      setError('Failed to delete farm');
      console.error(err);
    }
  };

  const handleView = (id) => {
    navigate(`/dashboard/farm/${id}`);
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-10  bg-gradient-to-r from-[#b58900] to-[#d4a017] bg-clip-text text-transparent">Farm Management</h1>
      
      {/* Add Farm Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setFormData({ name: '', location: '', size: '', type: '', description: '' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-6 py-3 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-lg"
        >
          <FaPlus /> Add Farm
        </button>
      </div>

      {/* Farm Cards */}
      {loading ? (
        <div className="text-center py-8">Loading farms...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map(farm => (
            <div
              key={farm.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#b58900]/30"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{farm.name}</h2>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {farm.location}</p>
              <p className="text-gray-600 mb-2"><strong>Size:</strong> {farm.size} acres</p>
              {farm.type && <p className="text-gray-600 mb-2"><strong>Type:</strong> {farm.type}</p>}
              {farm.description && <p className="text-gray-600 mb-4"><strong>Description:</strong> {farm.description}</p>}
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleView(farm.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-4 py-2 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-md"
                >
                  <FaEye size={16} /> View
                </button>
                <button
                  onClick={() => handleEdit(farm)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
                >
                  <FaEdit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(farm.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-300"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Create/Edit Farm */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              {editId ? 'Edit Farm' : 'Create New Farm'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="farmName">
                  Farm Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b58900] focus:border-transparent"
                  placeholder="Enter farm name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b58900] focus:border-transparent"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="size">
                  Farm Size (acres)
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b58900] focus:border-transparent"
                  placeholder="Enter farm size in acres"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="farmType">
                  Farm Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b58900] focus:border-transparent"
                  placeholder="Enter farm type"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b58900] focus:border-transparent"
                  placeholder="Enter description"
                  rows="3"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-6 py-3 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-lg"
                >
                  {editId ? 'Update Farm' : 'Create Farm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFarm;
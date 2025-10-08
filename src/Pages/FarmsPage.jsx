import React, { useState, useEffect, useContext } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const CreateFarm = () => {
  const { axiosInstance, user } = useContext(AuthContext);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // Loading state for actions
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    farmName: "",
    location: "",
    size: "",
    farmType: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({}); // Form validation errors
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Farm type options for dropdown
  const farmTypeOptions = ["Poultry", "Other"];

  // Fetch farms
  const fetchFarms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/farms");
      const activeFarms = response.data.farms.filter((farm) => farm.isActive);
      setFarms(activeFarms);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to fetch farms";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFarms();
    }
  }, [user]);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.farmName.trim()) errors.farmName = "Farm name is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (
      !formData.size ||
      isNaN(formData.size) ||
      parseFloat(formData.size) <= 0
    ) {
      errors.size = "Size must be a positive number";
    }
    if (!formData.farmType.trim()) errors.farmType = "Farm type is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field being edited
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setActionLoading(true);
    setError(null);
    try {
      const payload = {
        farmName: formData.farmName,
        location: formData.location,
        size: parseFloat(formData.size), // Ensure size is a float
        farmType: formData.farmType,
        ownerId: user.id,
      };
      if (formData.description.trim()) {
        payload.description = formData.description;
      }

      if (editId) {
        await axiosInstance.put(`/api/farms/${editId}`, payload);
        toast.success("Farm updated successfully");
      } else {
        await axiosInstance.post("/api/farms", payload);
        toast.success("Farm created successfully");
      }
      fetchFarms();
      setFormData({
        farmName: "",
        location: "",
        size: "",
        farmType: "",
        description: "",
      });
      setEditId(null);
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to save farm";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (farm) => {
    setEditId(farm.id);
    setFormData({
      farmName: farm.farmName,
      location: farm.location,
      size: farm.size.toString(), // Convert to string for input
      farmType: farm.farmType,
      description: farm.description || "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this farm?"))
      return;
    setActionLoading(true);
    setError(null);
    try {
      await axiosInstance.patch(`/api/farms/${id}`);
      toast.success("Farm deactivated successfully");
      fetchFarms();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to deactivate farm";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/dashboard/farm/${id}`);
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#b58900] to-[#d4a017] bg-clip-text text-transparent">
        Farm Management
      </h1>

      {/* Add Farm Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setFormData({
              farmName: "",
              location: "",
              size: "",
              farmType: "",
              description: "",
            });
            setEditId(null);
            setFormErrors({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-6 py-3 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-lg disabled:opacity-50"
          disabled={actionLoading}
        >
          <FaPlus /> Add Farm
        </button>
      </div>

      {/* Farm Cards */}
      {loading ? (
        <div className="text-center py-8">Loading farms...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : farms.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No active farms found. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#b58900]/30"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {farm.farmName}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {farm.location}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Size:</strong> {farm.size} acres
              </p>
              {farm.farmType && (
                <p className="text-gray-600 mb-2">
                  <strong>Type:</strong> {farm.farmType}
                </p>
              )}
              {farm.description && (
                <p className="text-gray-600 mb-4">
                  <strong>Description:</strong> {farm.description}
                </p>
              )}
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleView(farm.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-4 py-2 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-md disabled:opacity-50"
                  disabled={actionLoading}
                >
                  <FaEye size={16} /> View
                </button>
                <button
                  onClick={() => handleEdit(farm)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md disabled:opacity-50"
                  disabled={actionLoading}
                >
                  <FaEdit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(farm.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
                  disabled={actionLoading}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              {editId ? "Edit Farm" : "Create New Farm"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="farmName"
                  >
                    Farm Name
                  </label>
                  <input
                    type="text"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.farmName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter farm name"
                    required
                  />
                  {formErrors.farmName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.farmName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.location ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter location"
                    required
                  />
                  {formErrors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.location}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="size"
                  >
                    Farm Size (birds)
                  </label>
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.size ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter farm size in acres"
                    step="0.01"
                    required
                  />
                  {formErrors.size && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.size}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="farmType"
                  >
                    Farm Type
                  </label>
                  <select
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select farm type</option>
                    {farmTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2 font-semibold"
                  htmlFor="description"
                >
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                  rows="2"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50"
                  disabled={actionLoading}
                >
                  {actionLoading
                    ? "Saving..."
                    : editId
                    ? "Update Farm"
                    : "Create Farm"}
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

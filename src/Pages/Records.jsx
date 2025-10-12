import React, { useState, useEffect, useContext } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export default function Records() {
  const { axiosInstance, user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    farmId: "",
    date: "",
    feedUsedKg: "",
    eggsCollected: 0,
    birdsDied: 0,
    birdsSold: 0,
    expenses: 0,
    mortialityCause: "",
    photos: "",
    notes: "",
    weatherInfo: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selected farm and farm edit modal state
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [isFarmModalOpen, setIsFarmModalOpen] = useState(false);
  const [farmFormData, setFarmFormData] = useState({
    farmName: "",
    location: "",
    size: "",
    farmType: "",
    description: "",
  });

  // Fetch records
  const fetchRecords = async (farmId) => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/farms/${farmId}/records`);
      setRecords(response.data.records || response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to fetch records";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's farms for selection
  const fetchFarms = async () => {
    try {
      const response = await axiosInstance.get("/api/farms");
      const activeFarms =
        response.data.farms?.filter((farm) => farm.isActive) || [];
      setFarms(activeFarms);
      // Auto-select first farm if none selected
      if (activeFarms.length > 0 && !selectedFarmId) {
        setSelectedFarmId(activeFarms[0].id);
        setFormData((prev) => ({ ...prev, farmId: activeFarms[0].id }));
        fetchRecords(activeFarms[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch farms:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFarms();
    }
  }, [user]);

  // when selected farm changes, fetch records
  const location = useLocation();

  useEffect(() => {
    if (selectedFarmId) {
      fetchRecords(selectedFarmId);
    }
  }, [selectedFarmId]);

  // If navigated from dashboard with state.openCreate, open modal when farm is selected
  useEffect(() => {
    if (location.state?.openCreate && selectedFarmId) {
      resetForm();
      setFormData((prev) => ({ ...prev, farmId: selectedFarmId }));
      setIsModalOpen(true);
    }
  }, [location.state, selectedFarmId]);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.farmId) errors.farmId = "Farm is required";
    if (!formData.date) errors.date = "Date is required";
    if (
      formData.feedUsedKg === "" ||
      isNaN(formData.feedUsedKg) ||
      parseFloat(formData.feedUsedKg) < 0
    ) {
      errors.feedUsedKg = "Feed used must be a non-negative number";
    }
    if (
      formData.eggsCollected === "" ||
      isNaN(formData.eggsCollected) ||
      parseInt(formData.eggsCollected) < 0
    ) {
      errors.eggsCollected = "Eggs collected must be a non-negative integer";
    }
    if (
      formData.birdsDied === "" ||
      isNaN(formData.birdsDied) ||
      parseInt(formData.birdsDied) < 0
    ) {
      errors.birdsDied = "Birds died must be a non-negative integer";
    }
    if (
      formData.birdsSold === "" ||
      isNaN(formData.birdsSold) ||
      parseInt(formData.birdsSold) < 0
    ) {
      errors.birdsSold = "Birds sold must be a non-negative integer";
    }
    if (
      formData.expenses === "" ||
      isNaN(formData.expenses) ||
      parseFloat(formData.expenses) < 0
    ) {
      errors.expenses = "Expenses must be a non-negative number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  //handle create/update
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
        farmId: formData.farmId,
        date: formData.date,
        feedUsedKg: parseFloat(formData.feedUsedKg),
        eggsCollected: parseInt(formData.eggsCollected),
        birdsDied: parseInt(formData.birdsDied),
        birdsSold: parseInt(formData.birdsSold),
        expenses: parseFloat(formData.expenses),
        mortialityCause: formData.mortialityCause.trim() || null,
        photos: formData.photos
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url),
        notes: formData.notes.trim() || null,
        weatherInfo: formData.weatherInfo.trim() || null,
      };

      if (editId) {
        await axiosInstance.put(
          `/api/farms/${formData.farmId}/records/${editId}`,
          payload
        );
        toast.success("Record updated successfully");
      } else {
        await axiosInstance.post(
          `/api/farms/${formData.farmId}/records`,
          payload
        );
        toast.success("Record created successfully");
      }
      fetchRecords(formData.farmId);
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to save record";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  //reset form
  const resetForm = () => {
    setFormData({
      farmId: "",
      date: "",
      feedUsedKg: "",
      eggsCollected: 0,
      birdsDied: 0,
      birdsSold: 0,
      expenses: 0,
      mortialityCause: "",
      photos: "",
      notes: "",
      weatherInfo: "",
    });
    setEditId(null);
    setFormErrors({});
  };

  //edit record
  const handleEdit = (record) => {
    setEditId(record.id);
    setFormData({
      farmId: record.farmId,
      date: record.date.split("T")[0], // Format for date input
      feedUsedKg: record.feedUsedKg.toString(),
      eggsCollected: record.eggsCollected.toString(),
      birdsDied: record.birdsDied.toString(),
      birdsSold: record.birdsSold.toString(),
      expenses: record.expenses.toString(),
      mortialityCause: record.mortialityCause || "",
      photos: record.photos.join(", "),
      notes: record.notes || "",
      weatherInfo: record.weatherInfo || "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // delete record
  const handleDelete = async (farmId, recordId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setActionLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/api/farms/${farmId}/records/${recordId}`);
      toast.success("Record deleted successfully");
      fetchRecords(farmId);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to delete record";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  //get farm
  const getFarmName = (farmId) => {
    const farm = farms.find((f) => f.id === farmId);
    return farm ? farm.farmName : "Unknown Farm";
  };

  // Farm edit helpers
  const selectedFarm = farms.find((f) => f.id === selectedFarmId) || null;
  const openFarmEditModal = () => {
    if (!selectedFarm) return;
    setFarmFormData({
      farmName: selectedFarm.farmName || "",
      location: selectedFarm.location || "",
      size: String(selectedFarm.size ?? ""),
      farmType: selectedFarm.farmType || "",
      description: selectedFarm.description || "",
    });
    setIsFarmModalOpen(true);
  };

  const submitFarmEdit = async (e) => {
    e.preventDefault();
    if (!selectedFarmId) return;
    try {
      setActionLoading(true);
      const payload = {
        farmName: farmFormData.farmName,
        location: farmFormData.location,
        size: parseFloat(farmFormData.size),
        farmType: farmFormData.farmType,
        description: farmFormData.description,
      };
      await axiosInstance.put(`/api/farms/${selectedFarmId}`, payload);
      toast.success("Farm updated successfully");
      setIsFarmModalOpen(false);
      fetchFarms();
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to update farm";
      toast.error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteSelectedFarm = async () => {
    if (!selectedFarmId) return;
    if (!window.confirm("Are you sure you want to deactivate this farm?"))
      return;
    try {
      setActionLoading(true);
      await axiosInstance.patch(`/api/farms/${selectedFarmId}`);
      toast.success("Farm deactivated successfully");
      // Reset selection and refresh
      setSelectedFarmId("");
      setFormData((prev) => ({ ...prev, farmId: "" }));
      fetchFarms();
      setRecords([]);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to deactivate farm";
      toast.error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#b58900] to-[#d4a017] bg-clip-text text-transparent">
        Farm Records Management
      </h1>

      {/* Farm selector and actions */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <label
            className="block text-gray-700 mb-2 font-semibold"
            htmlFor="farmSelect"
          >
            Select Farm
          </label>
          <select
            id="farmSelect"
            value={selectedFarmId}
            onChange={(e) => {
              const fid = e.target.value;
              setSelectedFarmId(fid);
              setFormData((prev) => ({ ...prev, farmId: fid }));
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Choose a farm --</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.farmName} ({farm.location})
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!selectedFarmId) {
                toast.error("Select a farm first");
                return;
              }
              resetForm();
              setFormData((prev) => ({ ...prev, farmId: selectedFarmId }));
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-4 py-2 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-md disabled:opacity-50"
            disabled={actionLoading}
          >
            <FaPlus size={16} /> Add Record
          </button>
          <button
            onClick={openFarmEditModal}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md disabled:opacity-50"
            disabled={actionLoading || !selectedFarmId}
          >
            <FaEdit size={16} /> Edit Farm
          </button>
          <button
            onClick={deleteSelectedFarm}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md disabled:opacity-50"
            disabled={actionLoading || !selectedFarmId}
          >
            <FaTrash size={16} /> Delete Farm
          </button>
        </div>
      </div>

      {/* Records List */}
      {loading ? (
        <div className="text-center py-8">Loading records...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : records.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No records found. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#b58900]/30"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {getFarmName(record.farmId)}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(record.date).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <strong>Feed Used:</strong> {record.feedUsedKg} kg
                </p>
                <p>
                  <strong>Eggs Collected:</strong> {record.eggsCollected}
                </p>
                <p>
                  <strong>Birds Died:</strong> {record.birdsDied}
                </p>
                <p>
                  <strong>Birds Sold:</strong> {record.birdsSold}
                </p>
                <p>
                  <strong>Expenses:</strong> ${record.expenses}
                </p>
                {record.mortialityCause && (
                  <p className="col-span-2">
                    <strong>Mortality Cause:</strong> {record.mortialityCause}
                  </p>
                )}
                {record.weatherInfo && (
                  <p className="col-span-2">
                    <strong>Weather:</strong> {record.weatherInfo}
                  </p>
                )}
                {record.notes && (
                  <p className="col-span-2">
                    <strong>Notes:</strong> {record.notes}
                  </p>
                )}
              </div>
              {record.photos.length > 0 && (
                <div className="mt-4">
                  <strong>Photos:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {record.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-3 items-center mt-4">
                <button
                  onClick={() => handleEdit(record)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md disabled:opacity-50"
                  disabled={actionLoading}
                >
                  <FaEdit size={16} /> Edit
                </button>
                <button
                  onClick={() =>
                    handleDelete(selectedFarmId || record.farmId, record.id)
                  }
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

      {/* Modal for Edit Farm */}
      {isFarmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Edit Farm
            </h2>
            <form onSubmit={submitFarmEdit}>
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
                    value={farmFormData.farmName}
                    onChange={(e) =>
                      setFarmFormData((p) => ({
                        ...p,
                        farmName: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="Enter farm name"
                    required
                  />
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
                    value={farmFormData.location}
                    onChange={(e) =>
                      setFarmFormData((p) => ({
                        ...p,
                        location: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="Enter location"
                    required
                  />
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
                    value={farmFormData.size}
                    onChange={(e) =>
                      setFarmFormData((p) => ({ ...p, size: e.target.value }))
                    }
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="Enter size"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="farmType"
                  >
                    Farm Type
                  </label>
                  <input
                    type="text"
                    value={farmFormData.farmType}
                    onChange={(e) =>
                      setFarmFormData((p) => ({
                        ...p,
                        farmType: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="Poultry or Other"
                  />
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
                  value={farmFormData.description}
                  onChange={(e) =>
                    setFarmFormData((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                  rows="2"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsFarmModalOpen(false)}
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
                  {actionLoading ? "Saving..." : "Update Farm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Create/Edit Record */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              {editId ? "Edit Record" : "Create New Record"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="farmId"
                  >
                    Farm
                  </label>
                  <select
                    name="farmId"
                    value={formData.farmId}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.farmId ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Select a farm</option>
                    {farms.map((farm) => (
                      <option key={farm.id} value={farm.id}>
                        {farm.farmName}
                      </option>
                    ))}
                  </select>
                  {formErrors.farmId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.farmId}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.date ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {formErrors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.date}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="feedUsedKg"
                  >
                    Feed Used (kg)
                  </label>
                  <input
                    type="number"
                    name="feedUsedKg"
                    value={formData.feedUsedKg}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.feedUsedKg
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    step="0.01"
                    min="0"
                    required
                  />
                  {formErrors.feedUsedKg && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.feedUsedKg}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="eggsCollected"
                  >
                    Eggs Collected
                  </label>
                  <input
                    type="number"
                    name="eggsCollected"
                    value={formData.eggsCollected}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.eggsCollected
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    min="0"
                    required
                  />
                  {formErrors.eggsCollected && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.eggsCollected}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="birdsDied"
                  >
                    Birds Died
                  </label>
                  <input
                    type="number"
                    name="birdsDied"
                    value={formData.birdsDied}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.birdsDied
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    min="0"
                    required
                  />
                  {formErrors.birdsDied && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.birdsDied}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="birdsSold"
                  >
                    Birds Sold
                  </label>
                  <input
                    type="number"
                    name="birdsSold"
                    value={formData.birdsSold}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.birdsSold
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    min="0"
                    required
                  />
                  {formErrors.birdsSold && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.birdsSold}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="expenses"
                  >
                    Expenses ($)
                  </label>
                  <input
                    type="number"
                    name="expenses"
                    value={formData.expenses}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.expenses ? "border-red-500" : "border-gray-300"
                    }`}
                    step="0.01"
                    min="0"
                    required
                  />
                  {formErrors.expenses && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.expenses}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="mortialityCause"
                  >
                    Mortality Cause (Optional)
                  </label>
                  <input
                    type="text"
                    name="mortialityCause"
                    value={formData.mortialityCause}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cause of bird deaths"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2 font-semibold"
                  htmlFor="photos"
                >
                  Photos (URLs, comma-separated)
                </label>
                <input
                  type="text"
                  name="photos"
                  value={formData.photos}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2 font-semibold"
                  htmlFor="weatherInfo"
                >
                  Weather Info (Optional)
                </label>
                <input
                  type="text"
                  name="weatherInfo"
                  value={formData.weatherInfo}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Sunny, 25°C"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2 font-semibold"
                  htmlFor="notes"
                >
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional notes"
                />
              </div>
              <div className="flex gap-4 justify-end mt-6">
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
                  className="bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-6 py-3 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-lg disabled:opacity-50"
                  disabled={actionLoading}
                >
                  {actionLoading
                    ? "Saving..."
                    : editId
                    ? "Update Record"
                    : "Create Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Reminders() {
  const { axiosInstance, user } = useContext(AuthContext);

  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    type: "General",
    date: "",
    time: "",
    isCompleted: false,
  });

  const fetchFarms = async () => {
    try {
      const res = await axiosInstance.get("/api/farms");
      const activeFarms = res.data.farms?.filter((f) => f.isActive) || [];
      setFarms(activeFarms);
      if (activeFarms.length > 0 && !selectedFarmId) {
        setSelectedFarmId(activeFarms[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch farms:", err);
      toast.error(err.response?.data?.error || "Failed to fetch farms");
    }
  };

  const fetchReminders = async (farmId) => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/api/farms/${farmId}/reminders`);
      const data = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.reminders)
        ? res.data.reminders
        : Array.isArray(res.data)
        ? res.data
        : [];
      setReminders(data);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to fetch reminders";
      setError(msg);
      toast.error(msg);
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchFarms();
  }, [user]);

  useEffect(() => {
    if (selectedFarmId) fetchReminders(selectedFarmId);
  }, [selectedFarmId]);

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openCreateModal = () => {
    if (!selectedFarmId) {
      toast.error("Select a farm first");
      return;
    }
    setEditId(null);
    setFormErrors({});
    setFormData({
      title: "",
      type: "General",
      date: new Date().toISOString().slice(0, 10),
      time: "08:00",
      isCompleted: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (rem) => {
    setEditId(rem.id);
    setFormErrors({});
    const dt = rem.dueDate ? new Date(rem.dueDate) : null;
    const dateStr = dt ? dt.toISOString().slice(0, 10) : "";
    const timeStr = dt ? dt.toISOString().slice(11, 16) : "";
    setFormData({
      title: rem.title || "",
      type: rem.type || "General",
      date: dateStr,
      time: timeStr,
      isCompleted: Boolean(rem.isCompleted) || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (reminderId) => {
    if (!selectedFarmId) return;
    if (!window.confirm("Are you sure you want to delete this reminder?"))
      return;
    try {
      setActionLoading(true);
      await axiosInstance.delete(
        `/api/farms/${selectedFarmId}/reminders/${reminderId}`
      );
      toast.success("Reminder deleted successfully");
      fetchReminders(selectedFarmId);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete reminder");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }
    try {
      setActionLoading(true);
      const payload = {
        title: formData.title,
        type: formData.type,
        date: formData.date,
        time: formData.time,
        isCompleted: formData.isCompleted,
      };

      if (editId) {
        await axiosInstance.patch(
          `/api/farms/${selectedFarmId}/reminders/${editId}`,
          payload
        );
        toast.success("Reminder updated successfully");
      } else {
        await axiosInstance.post(
          `/api/farms/${selectedFarmId}/reminders`,
          payload
        );
        toast.success("Reminder created successfully");
      }

      setIsModalOpen(false);
      fetchReminders(selectedFarmId);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save reminder");
    } finally {
      setActionLoading(false);
    }
  };

  const selectedFarm = useMemo(
    () => farms.find((f) => f.id === selectedFarmId) || null,
    [farms, selectedFarmId]
  );

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#b58900] to-[#d4a017] bg-clip-text text-transparent">
        Reminders
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
            onChange={(e) => setSelectedFarmId(e.target.value)}
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
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white px-4 py-2 rounded-lg hover:from-[#a57800] hover:to-[#b58900] transition-all duration-300 shadow-md disabled:opacity-50"
            disabled={actionLoading}
          >
            <FaPlus size={16} /> Add Reminder
          </button>
        </div>
      </div>

      {/* Reminders Table */}
      {loading ? (
        <div className="text-center py-8">Loading reminders...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : reminders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reminders found. Add one to get started!
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reminders.map((r) => {
                const dt = r.dueDate ? new Date(r.dueDate) : null;
                const dtLabel = dt
                  ? `${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                  : "";
                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dtLabel}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{r.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{r.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{r.isCompleted ? "Completed" : "Pending"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openEditModal(r)}
                          className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                          disabled={actionLoading}
                        >
                          <FaEdit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                          disabled={actionLoading}
                        >
                          <FaTrash size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {editId ? "Edit Reminder" : "Add New Reminder"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.title ? "border-red-500" : "border-gray-300"}`}
                    placeholder="e.g., Vaccination, Feed Purchase"
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="type">Type</label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="General">General</option>
                    <option value="Feeding">Feeding</option>
                    <option value="Health">Health</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Procurement">Procurement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.date ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formErrors.date && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData((p) => ({ ...p, time: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.time ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formErrors.time && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.isCompleted ? "Completed" : "Pending"}
                    onChange={(e) => setFormData((p) => ({ ...p, isCompleted: e.target.value === "Completed" }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
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
                    ? "Update Reminder"
                    : "Create Reminder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

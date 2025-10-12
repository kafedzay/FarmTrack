import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Sales() {
  const { axiosInstance, user } = useContext(AuthContext);
  const location = useLocation();

  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    buyerName: "",
    date: "",
    notes: "",
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

  const fetchSales = async (farmId) => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/api/farms/${farmId}/sales`);
      const data = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.sales)
        ? res.data.sales
        : Array.isArray(res.data)
        ? res.data
        : [];
      setSales(data);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to fetch sales";
      setError(msg);
      toast.error(msg);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchFarms();
  }, [user]);

  useEffect(() => {
    if (selectedFarmId) fetchSales(selectedFarmId);
  }, [selectedFarmId]);

  // Auto-open create modal when coming from dashboard quick action
  useEffect(() => {
    if (location.state?.openCreate && selectedFarmId) {
      openCreateModal();
    }
  }, [location.state, selectedFarmId]);

  const validateForm = () => {
    const errors = {};
    if (!formData.product.trim()) errors.product = "Product is required";
    if (
      formData.quantity === "" ||
      isNaN(formData.quantity) ||
      parseInt(formData.quantity) <= 0
    )
      errors.quantity = "Quantity must be a positive integer";
    if (
      formData.unitPrice === "" ||
      isNaN(formData.unitPrice) ||
      parseFloat(formData.unitPrice) < 0
    )
      errors.unitPrice = "Unit price must be a non-negative number";
    if (!formData.date) errors.date = "Date is required";
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
      product: "",
      quantity: "",
      unitPrice: "",
      buyerName: "",
      date: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (sale) => {
    setEditId(sale.id);
    setFormErrors({});
    setFormData({
      product: sale.product || "",
      quantity: String(sale.quantity ?? ""),
      unitPrice: String(sale.unitPrice ?? ""),
      buyerName: sale.buyerName || "",
      date: sale.date ? String(sale.date).slice(0, 10) : "",
      notes: sale.notes || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (saleId) => {
    if (!selectedFarmId) return;
    if (!window.confirm("Are you sure you want to delete this sale?")) return;
    try {
      setActionLoading(true);
      await axiosInstance.delete(
        `/api/farms/${selectedFarmId}/sales/${saleId}`
      );
      toast.success("Sale deleted successfully");
      fetchSales(selectedFarmId);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete sale");
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
        product: formData.product,
        quantity: parseInt(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        buyerName: formData.buyerName?.trim() || undefined,
        date: formData.date,
        notes: formData.notes?.trim() || undefined,
      };

      if (editId) {
        await axiosInstance.patch(
          `/api/farms/${selectedFarmId}/sales/${editId}`,
          payload
        );
        toast.success("Sale updated successfully");
      } else {
        await axiosInstance.post(`/api/farms/${selectedFarmId}/sales`, payload);
        toast.success("Sale created successfully");
      }

      setIsModalOpen(false);
      fetchSales(selectedFarmId);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save sale");
    } finally {
      setActionLoading(false);
    }
  };

  const selectedFarm = useMemo(
    () => farms.find((f) => f.id === selectedFarmId) || null,
    [farms, selectedFarmId]
  );

  // Derived: filtered list and totals
  const filteredSales = useMemo(() => {
    let list = [...sales];
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((s) =>
        [s.product, s.buyerName, s.notes]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (dateFrom) {
      const from = new Date(dateFrom);
      list = list.filter((s) => new Date(s.date) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      list = list.filter((s) => new Date(s.date) <= to);
    }
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [sales, searchTerm, dateFrom, dateTo]);

  const totals = useMemo(() => {
    const totalRevenue = filteredSales.reduce(
      (sum, s) => sum + Number(s.revenue ?? s.quantity * s.unitPrice ?? 0),
      0
    );
    const totalQty = filteredSales.reduce(
      (sum, s) => sum + Number(s.quantity ?? 0),
      0
    );
    return { totalRevenue, totalQty };
  }, [filteredSales]);

  // Export CSV of current filtered list
  const handleExportCSV = () => {
    if (!filteredSales.length) {
      toast.info("No sales to export");
      return;
    }
    const headers = [
      "Date",
      "Product",
      "Quantity",
      "Unit Price",
      "Revenue",
      "Buyer",
      "Notes",
    ];
    const rows = filteredSales.map((s) => [
      new Date(s.date).toISOString(),
      s.product,
      s.quantity,
      s.unitPrice,
      (s.revenue ?? s.quantity * s.unitPrice).toFixed(2),
      s.buyerName || "",
      (s.notes || "").replace(/\n|\r/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((r) =>
        r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sales_${selectedFarmId}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#b58900] to-[#d4a017] bg-clip-text text-transparent">
        Sales Tracking
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
            <FaPlus size={16} /> Add Sale
          </button>
        </div>
      </div>

      {/* Filters / Summary */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1 text-sm">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product, buyer or notes"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setDateFrom("");
                setDateTo("");
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg"
            >
              Clear
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-700">
          <span className="mr-4">
            Total Qty: <strong>{totals.totalQty}</strong>
          </span>
          <span>
            Total Revenue: <strong>${totals.totalRevenue.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      {/* Sales Table */}
      {loading ? (
        <div className="text-center py-8">Loading sales...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : filteredSales.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No sales match your filters. Adjust filters or
          <button
            className="ml-2 text-blue-600 underline"
            onClick={openCreateModal}
          >
            add a sale
          </button>
          .
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {new Date(s.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {s.product}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    {s.quantity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    ${Number(s.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    ${Number(s.revenue ?? s.quantity * s.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {s.buyerName || "-"}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate"
                    title={s.notes || ""}
                  >
                    {s.notes || ""}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEditModal(s)}
                        className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                        disabled={actionLoading}
                      >
                        <FaEdit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        disabled={actionLoading}
                      >
                        <FaTrash size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {editId ? "Edit Sale" : "Add New Sale"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="product"
                  >
                    Product
                  </label>
                  <input
                    type="text"
                    id="product"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, product: e.target.value }))
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.product ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Eggs, Birds"
                  />
                  {formErrors.product && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.product}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="buyerName"
                  >
                    Buyer (Optional)
                  </label>
                  <input
                    type="text"
                    id="buyerName"
                    value={formData.buyerName}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, buyerName: e.target.value }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buyer name"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, quantity: e.target.value }))
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.quantity ? "border-red-500" : "border-gray-300"
                    }`}
                    min="1"
                  />
                  {formErrors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.quantity}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="unitPrice"
                  >
                    Unit Price ($)
                  </label>
                  <input
                    type="number"
                    id="unitPrice"
                    value={formData.unitPrice}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, unitPrice: e.target.value }))
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.unitPrice
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    min="0"
                    step="0.01"
                  />
                  {formErrors.unitPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.unitPrice}
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
                    id="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, date: e.target.value }))
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.date}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label
                    className="block text-gray-700 mb-2 font-semibold"
                    htmlFor="notes"
                  >
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, notes: e.target.value }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes"
                  />
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
                    ? "Update Sale"
                    : "Create Sale"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

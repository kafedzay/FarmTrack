import React, { useState, useEffect, useContext } from 'react';
import { Plus, Edit, Trash2, DollarSign, TrendingUp, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OperationsTracking() {
  const { axiosInstance, user } = useContext(AuthContext);
  const [sales, setSales] = useState([]);
  const [farms, setFarms] = useState([]);
  const [farmMap, setFarmMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [formData, setFormData] = useState({
    farmId: '',
    date: '',
    product: '',
    quantity: '',
    unitPrice: '',
    buyerName: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch sales
  const fetchSales = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/api/sales');
      const salesData = response.data.sales || response.data;
      setSales(salesData);
      setTotalSales(salesData.length);
      setTotalRevenue(salesData.reduce((sum, sale) => sum + sale.revenue, 0));
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch sales';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch farms for selection
  const fetchFarms = async () => {
    try {
      const response = await axiosInstance.get('/api/farms');
      const activeFarms = response.data.farms.filter((farm) => farm.isActive);
      setFarms(activeFarms);
      setFarmMap(activeFarms.reduce((acc, farm) => {
        acc[farm.id] = farm.farmName;
        return acc;
      }, {}));
    } catch (err) {
      console.error('Failed to fetch farms:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSales();
      fetchFarms();
    }
  }, [user]);

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.farmId) errors.farmId = 'Farm is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.product.trim()) errors.product = 'Product is required';
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      errors.quantity = 'Quantity must be a positive integer';
    }
    if (!formData.unitPrice || isNaN(formData.unitPrice) || parseFloat(formData.unitPrice) <= 0) {
      errors.unitPrice = 'Unit price must be a positive number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setActionLoading(true);
    setError(null);
    try {
      const payload = {
        farmId: formData.farmId,
        date: new Date(formData.date).toISOString(),
        product: formData.product,
        quantity: parseInt(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        revenue: parseInt(formData.quantity) * parseFloat(formData.unitPrice),
        buyerName: formData.buyerName || null,
        notes: formData.notes || null,
      };

      if (editId) {
        await axiosInstance.put(`/api/sales/${editId}`, payload);
        toast.success('Sale updated successfully');
      } else {
        await axiosInstance.post('/api/sales', payload);
        toast.success('Sale created successfully');
      }
      fetchSales();
      setFormData({
        farmId: '',
        date: '',
        product: '',
        quantity: '',
        unitPrice: '',
        buyerName: '',
        notes: '',
      });
      setEditId(null);
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save sale';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (sale) => {
    setEditId(sale.id);
    setFormData({
      farmId: sale.farmId,
      date: new Date(sale.date).toISOString().split('T')[0], // Format for date input
      product: sale.product,
      quantity: sale.quantity.toString(),
      unitPrice: sale.unitPrice.toString(),
      buyerName: sale.buyerName || '',
      notes: sale.notes || '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sale?')) return;
    setActionLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/api/sales/${id}`);
      toast.success('Sale deleted successfully');
      fetchSales();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to delete sale';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Sales Operations Tracking
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sale Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setFormData({
              farmId: '',
              date: '',
              product: '',
              quantity: '',
              unitPrice: '',
              buyerName: '',
              notes: '',
            });
            setEditId(null);
            setFormErrors({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50"
          disabled={actionLoading}
        >
          <Plus className="h-5 w-5" /> Add Sale
        </button>
      </div>

      {/* Sales Table */}
      {loading ? (
        <div className="text-center py-8">Loading sales...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : sales.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No sales found. Create one to get started!</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale, index) => (
                <tr key={sale.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {farmMap[sale.farmId] || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.unitPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.buyerName || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.revenue.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.notes || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(sale)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        disabled={actionLoading}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sale.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        disabled={actionLoading}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Create/Edit Sale */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-full max-w-4xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              {editId ? 'Edit Sale' : 'Create New Sale'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="farmId">
                    Farm
                  </label>
                  <select
                    name="farmId"
                    value={formData.farmId}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.farmId ? 'border-red-500' : 'border-gray-300'}`}
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
                    <p className="text-red-500 text-sm mt-1">{formErrors.farmId}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.date ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {formErrors.date && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="product">
                    Product
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.product ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter product name"
                    required
                  />
                  {formErrors.product && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.product}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter quantity"
                    min="1"
                    required
                  />
                  {formErrors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="unitPrice">
                    Unit Price ($)
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.unitPrice ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter unit price"
                    step="0.01"
                    min="0.01"
                    required
                  />
                  {formErrors.unitPrice && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.unitPrice}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold" htmlFor="buyerName">
                    Buyer Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter buyer name"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="notes">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter notes"
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
                  {actionLoading ? 'Saving...' : editId ? 'Update Sale' : 'Create Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

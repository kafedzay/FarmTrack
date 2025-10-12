import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Financials() {
  const { axiosInstance, user } = useContext(AuthContext);

  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const [sales, setSales] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Fetch farms
  const fetchFarms = async () => {
    try {
      const res = await axiosInstance.get("/api/farms");
      const activeFarms = res.data.farms?.filter((f) => f.isActive) || [];
      setFarms(activeFarms);
      if (activeFarms.length > 0 && !selectedFarmId)
        setSelectedFarmId(activeFarms[0].id);
    } catch (err) {
      console.error("Failed to fetch farms:", err);
      toast.error(err.response?.data?.error || "Failed to fetch farms");
    }
  };

  const fetchData = async (farmId) => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    try {
      const [salesRes, recordsRes] = await Promise.all([
        axiosInstance.get(`/api/farms/${farmId}/sales`),
        axiosInstance.get(`/api/farms/${farmId}/records`),
      ]);
      const salesData = Array.isArray(salesRes.data?.data)
        ? salesRes.data.data
        : Array.isArray(salesRes.data?.sales)
        ? salesRes.data.sales
        : Array.isArray(salesRes.data)
        ? salesRes.data
        : [];
      const recordsData = Array.isArray(recordsRes.data?.records)
        ? recordsRes.data.records
        : Array.isArray(recordsRes.data?.data)
        ? recordsRes.data.data
        : Array.isArray(recordsRes.data)
        ? recordsRes.data
        : [];
      setSales(salesData);
      setRecords(recordsData);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to fetch financial data";
      setError(msg);
      toast.error(msg);
      setSales([]);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchFarms();
  }, [user]);

  useEffect(() => {
    if (selectedFarmId) fetchData(selectedFarmId);
  }, [selectedFarmId]);

  // Filtering helpers
  const withinRange = (d) => {
    const dt = new Date(d);
    if (dateFrom) {
      const from = new Date(dateFrom);
      if (dt < from) return false;
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      if (dt > to) return false;
    }
    return true;
  };

  // Filtered datasets
  const filteredSales = useMemo(
    () => sales.filter((s) => s?.date && withinRange(s.date)),
    [sales, dateFrom, dateTo]
  );
  const filteredRecords = useMemo(
    () => records.filter((r) => r?.date && withinRange(r.date)),
    [records, dateFrom, dateTo]
  );

  // KPIs
  const income = filteredSales.reduce(
    (sum, s) => sum + Number(s.revenue ?? s.quantity * s.unitPrice ?? 0),
    0
  );
  const expenses = filteredRecords.reduce(
    (sum, r) => sum + Number(r.expenses ?? 0),
    0
  );
  const netProfit = income - expenses;
  const profitMarginPct = income > 0 ? (netProfit / income) * 100 : 0;

  // Monthly P&L (based on filtered data)
  const monthKey = (d) => {
    const dt = new Date(d);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
  };
  const monthLabel = (key) => {
    const [y, m] = key.split("-");
    const dt = new Date(Number(y), Number(m) - 1, 1);
    return dt.toLocaleString(undefined, { month: "short", year: "numeric" });
  };

  const monthlyMap = new Map();
  filteredSales.forEach((s) => {
    const key = monthKey(s.date);
    if (!monthlyMap.has(key)) monthlyMap.set(key, { revenue: 0, expenses: 0 });
    monthlyMap.get(key).revenue += Number(
      s.revenue ?? s.quantity * s.unitPrice ?? 0
    );
  });
  filteredRecords.forEach((r) => {
    const key = monthKey(r.date);
    if (!monthlyMap.has(key)) monthlyMap.set(key, { revenue: 0, expenses: 0 });
    monthlyMap.get(key).expenses += Number(r.expenses ?? 0);
  });
  const monthlyRows = Array.from(monthlyMap.entries())
    .map(([k, v]) => ({
      key: k,
      label: monthLabel(k),
      revenue: v.revenue,
      expenses: v.expenses,
    }))
    .sort((a, b) => (a.key > b.key ? -1 : 1));

  // Export CSV of monthly summary
  const exportMonthlyCSV = () => {
    if (!monthlyRows.length) {
      toast.info("No data to export");
      return;
    }
    const headers = ["Month", "Revenue", "Expenses", "Profit"];
    const rows = monthlyRows.map((r) => [
      r.label,
      r.revenue.toFixed(2),
      r.expenses.toFixed(2),
      (r.revenue - r.expenses).toFixed(2),
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
    link.download = `financial_summary_${selectedFarmId}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#b58900] to-[#d4a017] bg-clip-text text-transparent">
        Financial Summary
      </h1>

      {/* Farm selector */}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-1/2">
          <div>
            <label
              className="block text-gray-700 mb-2 font-semibold"
              htmlFor="from"
            >
              From
            </label>
            <input
              id="from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2 font-semibold"
              htmlFor="to"
            >
              To
            </label>
            <input
              id="to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-3 rounded-lg"
            >
              Clear
            </button>
            <button
              onClick={exportMonthlyCSV}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 rounded-lg"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Revenue</p>
          <p className="text-3xl font-bold text-gray-900">
            ${income.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Expenses</p>
          <p className="text-3xl font-bold text-gray-900">
            ${expenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Net Profit</p>
          <p className="text-3xl font-bold text-gray-900">
            ${netProfit.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Profit Margin</p>
          <p className="text-3xl font-bold text-gray-900">
            {profitMarginPct.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Summary
        </h3>
        {monthlyRows.length === 0 ? (
          <p className="text-gray-500">
            No data available for the selected range.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expenses
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyRows.map((r) => (
                <tr key={r.key} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{r.label}</td>
                  <td className="px-4 py-2 text-sm text-right text-gray-900">
                    ${r.revenue.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-right text-gray-900">
                    ${r.expenses.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-right text-gray-900">
                    ${(r.revenue - r.expenses).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

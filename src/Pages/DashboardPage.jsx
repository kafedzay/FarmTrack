import React from 'react'

export default function DashboardPage() {
  const { axiosInstance, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [farms, setFarms] = useState([]);
  const [records, setRecords] = useState([]);
  const [sales, setSales] = useState([]);
  const [metrics, setMetrics] = useState({
    totalFarms: 0,
    totalRevenue: 0,
    totalEggs: 0,
    totalFeed: 0,
    totalExpenses: 0,
    mortalityRate: 0,
    birdsSold: 0,
    activeFarms: 0,
  });

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  console.log(user);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch farms first to determine a valid farmId
      let farmsData = [];
      try {
        const farmsRes = await axiosInstance.get("/api/farms");
        farmsData = farmsRes.data.farms || farmsRes.data || [];
      } catch (e) {
        const status = e?.response?.status;
        if (status !== 404) {
          console.warn("Farms fetch failed:", e);
        }
        farmsData = [];
      }

      // Gather all farm IDs (aggregate across all farms)
      const farmIds = farmsData.map((f) => f.id || f._id).filter(Boolean);

      // Default to empty arrays if no farm is available
      let recordsData = [];
      let salesData = [];

      if (farmIds.length > 0) {
        // Fetch records and sales for ALL farms in parallel and aggregate
        const recordPromises = farmIds.map((fid) =>
          axiosInstance.get(`/api/farms/${fid}/records`)
        );
        const salesPromises = farmIds.map((fid) =>
          axiosInstance.get(`/api/farms/${fid}/sales`)
        );

        const [recordsSettled, salesSettled] = await Promise.all([
          Promise.allSettled(recordPromises),
          Promise.allSettled(salesPromises),
        ]);

        recordsData = recordsSettled.flatMap((res) => {
          if (res.status !== "fulfilled") {
            const status = res.reason?.response?.status;
            if (status !== 404)
              console.warn("Records fetch failed:", res.reason);
            return [];
          }
          const rdata = res.value.data;
          return Array.isArray(rdata?.records)
            ? rdata.records
            : Array.isArray(rdata?.data)
            ? rdata.data
            : Array.isArray(rdata)
            ? rdata
            : [];
        });

        salesData = salesSettled.flatMap((res) => {
          if (res.status !== "fulfilled") {
            const status = res.reason?.response?.status;
            if (status !== 404) console.warn("Sales fetch failed:", res.reason);
            return [];
          }
          const sdata = res.value.data;
          return Array.isArray(sdata?.data)
            ? sdata.data
            : Array.isArray(sdata?.sales)
            ? sdata.sales
            : Array.isArray(sdata)
            ? sdata
            : [];
        });
      }

      setFarms(farmsData);
      setRecords(recordsData);
      setSales(salesData);

      // Calculate metrics
      const activeFarms = farmsData.filter((farm) => farm.isActive);
      const totalRevenue = salesData.reduce(
        (sum, sale) => sum + sale.revenue,
        0
      );
      const totalEggs = recordsData.reduce(
        (sum, record) => sum + record.eggsCollected,
        0
      );
      const totalFeed = recordsData.reduce(
        (sum, record) => sum + record.feedUsedKg,
        0
      );
      const totalExpenses = recordsData.reduce(
        (sum, record) => sum + record.expenses,
        0
      );
      const birdsDied = recordsData.reduce(
        (sum, record) => sum + record.birdsDied,
        0
      );
      const birdsSold = recordsData.reduce(
        (sum, record) => sum + record.birdsSold,
        0
      );
      const mortalityRate =
        birdsDied + birdsSold > 0
          ? (birdsDied / (birdsDied + birdsSold)) * 100
          : 0;

      setMetrics({
        totalFarms: farmsData.length,
        activeFarms: activeFarms.length,
        totalRevenue,
        totalEggs,
        totalFeed,
        totalExpenses,
        mortalityRate: Math.round(mortalityRate * 100) / 100,
        birdsSold,
      });
      console.log(farmsData);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Derived insights
  const netProfit = metrics.totalRevenue - metrics.totalExpenses;
  const profitMarginPct =
    metrics.totalRevenue > 0 ? (netProfit / metrics.totalRevenue) * 100 : 0;
  const eggsPerKg =
    metrics.totalFeed > 0 ? metrics.totalEggs / metrics.totalFeed : 0;

  // Build monthly financial stats from records and sales (last 6 months)
  const monthMap = new Map();
  const addMonth = (d) => {
    const dt = new Date(d);
    const keyNum = dt.getFullYear() * 12 + dt.getMonth();
    const keyLabel = dt.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    });
    if (!monthMap.has(keyNum)) {
      monthMap.set(keyNum, {
        keyNum,
        label: keyLabel,
        revenue: 0,
        expenses: 0,
      });
    }
    return keyNum;
  };
  sales.forEach((s) => {
    if (!s?.date) return;
    const keyNum = addMonth(s.date);
    const row = monthMap.get(keyNum);
    row.revenue += Number(s.revenue ?? s.quantity * s.unitPrice ?? 0);
  });
  records.forEach((r) => {
    if (!r?.date) return;
    const keyNum = addMonth(r.date);
    const row = monthMap.get(keyNum);
    row.expenses += Number(r.expenses ?? 0);
  });
  const monthlyStats = Array.from(monthMap.values())
    .sort((a, b) => b.keyNum - a.keyNum)
    .slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstname || "Farmer"}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your farm operations
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Farms
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics.activeFarms}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${metrics.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Eggs Collected
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics.totalEggs.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Egg className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Mortality Rate
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics.mortalityRate}%
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Feed Used (kg)
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.totalFeed.toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${metrics.totalExpenses.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Birds Sold</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.birdsSold}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Bird className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts/Trends Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Overview */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Performance Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Revenue vs Expenses</span>
                  <span>
                    {metrics.totalRevenue > 0
                      ? (
                          ((metrics.totalRevenue - metrics.totalExpenses) /
                            metrics.totalRevenue) *
                          100
                        ).toFixed(1)
                      : 0}
                    % Profit
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (metrics.totalRevenue /
                          (metrics.totalRevenue + metrics.totalExpenses)) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Egg Production</span>
                  <span>{metrics.totalEggs} eggs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Mortality Rate</span>
                  <span>{metrics.mortalityRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metrics.mortalityRate < 5
                        ? "bg-green-500"
                        : metrics.mortalityRate < 10
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(metrics.mortalityRate * 2, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {records
                .slice(-5)
                .reverse()
                .map((record, index) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Record from{" "}
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {record.eggsCollected} eggs • {record.feedUsedKg}kg
                          feed
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {sales
                .slice(-3)
                .reverse()
                .map((sale, index) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-full mr-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Sale: {sale.product}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${sale.revenue.toFixed(2)} •{" "}
                          {new Date(sale.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Financial Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${netProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Profit Margin
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {profitMarginPct.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Eggs per kg Feed
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {eggsPerKg.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Financial Trend (last 6 months) */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Financial Overview
          </h3>
          {monthlyStats.length === 0 ? (
            <p className="text-gray-500">No monthly data yet.</p>
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
                {monthlyStats.map((m) => {
                  const profit = m.revenue - m.expenses;
                  return (
                    <tr key={m.keyNum} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {m.label}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900">
                        ${m.revenue.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900">
                        ${m.expenses.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900">
                        ${profit.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Package className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">
                Add New Record
              </span>
            </button>
            <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">
                Record Sale
              </span>
            </button>
            <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <MapPin className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-900">
                Manage Farms
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

// --- Mock Data ---

const MOCK_STATS = [
  {
    icon: 'A', // Placeholder for a farm icon
    label: 'Farms',
    value: '4',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    icon: '🐄', // Livestock icon
    label: 'Livestock',
    value: '1,200',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    icon: '✅', // Records icon
    label: 'Records',
    value: '25',
    color: 'text-lime-600',
    bg: 'bg-lime-100'
  },
  {
    icon: '$', // Expenses icon
    label: 'Expenses',
    value: '$8,500',
    color: 'text-gray-700',
    bg: 'bg-gray-100'
  },
];

const MOCK_FARMS = [
  { name: 'Green Pastures', location: 'Ashanti', size: 100, status: 'Active' },
  { name: 'Sunny Fields', location: 'Eastern', size: 75, status: 'Active' },
  { name: 'Fresh Meadows', location: 'Central', size: 150, status: 'Active' },
  { name: 'Golden Acres', location: 'Northern', size: 50, status: 'Inactive' },
];

const MOCK_CHART_DATA = [
  { month: 'Jan', 'Green Pastures': 25, 'Sunny Fields': 18, 'Golden Acres': 20 },
  { month: 'Feb', 'Green Pastures': 32, 'Sunny Fields': 20, 'Golden Acres': 28 },
  { month: 'Mar', 'Green Pastures': 36, 'Sunny Fields': 38, 'Golden Acres': 33 },
  { month: 'April', 'Green Pastures': 40, 'Sunny Fields': 30, 'Golden Acres': 35 },
];

const FARM_COLORS = {
  'Green Pastures': 'bg-emerald-600',
  'Sunny Fields': 'bg-green-400',
  'Golden Acres': 'bg-lime-600',
};

// Utility function to get max value for chart scaling
const getMaxProductivity = () => {
  let max = 0;
  MOCK_CHART_DATA.forEach(data => {
    const total = data['Green Pastures'] + data['Sunny Fields'] + data['Golden Acres'];
    if (total > max) max = total;
  });
  return Math.ceil(max / 10) * 10; // Round up to nearest 10 for y-axis scale
};

const MAX_Y = getMaxProductivity();

// --- Stat Card Component ---

const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between transition-shadow hover:shadow-lg w-full">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bg} ${color} text-xl font-bold`}>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
      </div>
    </div>
  </div>
);

// --- Farms Table Component ---

const FarmsTable = () => (
  // Reverting to side-by-side layout using lg:col-span-6
  <div className="bg-white p-6 rounded-2xl shadow-md col-span-12 lg:col-span-6 transition-shadow hover:shadow-lg">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Farms</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 rounded-t-xl">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">Farm Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (AC)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {MOCK_FARMS.map((farm, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farm.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farm.location}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farm.size}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${farm.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {farm.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Productivity Chart Component (CSS Bar Chart) ---

const ProductivityChart = () => {
  // Utility to calculate bar height as a percentage of MAX_Y
  const getHeight = (value) => `${(value / MAX_Y) * 100}%`;

  return (
    // Reverting to side-by-side layout using lg:col-span-6
    <div className="bg-white p-6 rounded-2xl shadow-md col-span-12 lg:col-span-6 transition-shadow hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Farm Productivity</h2>
      <div className="flex h-64 space-x-1 relative">
        
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between w-8 text-right text-xs text-gray-500 -ml-10">
          {[50, 40, 30, 20, 10, 0].map(val => (
            <div key={val} className="relative leading-none">
              <span className="absolute right-0 -top-2">{val}</span>
              <div className="border-t border-gray-200 w-full absolute top-0"></div>
            </div>
          ))}
        </div>

        {/* Chart Bars */}
        <div className="flex flex-1 justify-around items-end ml-4 pt-10">
          {MOCK_CHART_DATA.map((data, index) => (
            <div key={index} className="flex h-full w-1/4 items-end justify-center">
              <div className="flex space-x-1 items-end w-full max-w-[80%]">
                <div
                  className={`w-1/3 ${FARM_COLORS['Green Pastures']} rounded-t-lg transition-all duration-500 ease-out`}
                  style={{ height: getHeight(data['Green Pastures']) }}
                ></div>
                <div
                  className={`w-1/3 ${FARM_COLORS['Sunny Fields']} rounded-t-lg transition-all duration-500 ease-out`}
                  style={{ height: getHeight(data['Sunny Fields']) }}
                ></div>
                <div
                  className={`w-1/3 ${FARM_COLORS['Golden Acres']} rounded-t-lg transition-all duration-500 ease-out`}
                  style={{ height: getHeight(data['Golden Acres']) }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-around text-xs text-gray-600 font-medium mt-2 ml-4">
        {MOCK_CHART_DATA.map(data => (
          <div key={data.month} className="w-1/4 text-center">{data.month}</div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 mt-6 text-sm">
        {Object.keys(FARM_COLORS).map(farmName => (
          <div key={farmName} className="flex items-center space-x-1">
            <div className={`w-3 h-3 ${FARM_COLORS[farmName]} rounded-full`}></div>
            <span className="text-gray-600">{farmName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Main App Component ---

const App = () => {
  return (
    // Removed sidebar specific flex classes (lg:flex-row) and added header for context
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* Main Content */}
      <main className="p-4 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome, John Doe</h1>
        <p className="text-gray-500 mb-8">Overview of your FarmTrack operations.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {MOCK_STATS.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Data & Chart Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Restored side-by-side view for large screens */}
          <FarmsTable /> 
          <ProductivityChart />
        </div>
        
      </main>
    </div>
  );
};

export default App;

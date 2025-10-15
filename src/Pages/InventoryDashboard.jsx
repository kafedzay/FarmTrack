import React from 'react';

const FarmDashboard = () => {
  // Example data, in a real app this would come from props or API
  const chicksBeforeFirstLay = 120;
  const chicksAfterFirstLay = 1080;
  const totalEggs = 3500;
  const feedStock = 800;

  return (
    <div className="bg-[#FFF5E1] min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#b58900] mb-8 text-center">Farm Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Chicks Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Chicks Overview</h2>
            <div className="w-full flex flex-col items-center">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="80" fill="#f3f3f3" />
                <circle cx="90" cy="90" r="80" fill="none" stroke="#b58900" strokeWidth="30" strokeDasharray={`${(chicksBeforeFirstLay/(chicksBeforeFirstLay+chicksAfterFirstLay))*2*Math.PI*80} ${(chicksAfterFirstLay/(chicksBeforeFirstLay+chicksAfterFirstLay))*2*Math.PI*80}`} strokeDashoffset="0" />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="22" fill="#b58900">{chicksBeforeFirstLay + chicksAfterFirstLay}</text>
              </svg>
              <div className="flex justify-between w-full mt-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 bg-[#b58900] rounded-full"></span>
                  <span className="text-sm text-gray-600">Before First Lay: {chicksBeforeFirstLay}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 bg-[#f3f3f3] rounded-full border border-[#b58900]"></span>
                  <span className="text-sm text-gray-600">After First Lay: {chicksAfterFirstLay}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Eggs and Feed Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Production & Feed</h2>
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center mb-6">
                <span className="text-4xl font-bold text-[#b58900]">{totalEggs.toLocaleString()}</span>
                <span className="text-gray-600 text-sm">Eggs in Stock</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-[#b58900]">{feedStock} kg</span>
                <span className="text-gray-600 text-sm">Feed (Layer Mash)</span>
              </div>
            </div>
          </div>
        </div>
        {/* Add more summary cards or charts as needed */}
      </div>
    </div>
  );
};

export default FarmDashboard;

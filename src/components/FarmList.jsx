import React, { useEffect, useState, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FarmList = () => {
  const { axiosInstance, user } = useContext(AuthContext);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFarms();
    }
  }, [user]);

  const handleViewRecords = (farmId) => {
    navigate(`/AdminPage/farms/${farmId}/records`);
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading farms...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Farms</h1>
      </div>

      {farms.length === 0 ? (
        <p className="text-center text-gray-500">
          No farms found. Add one to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl border border-gray-200 transition-all duration-300"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {farm.farmName}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {farm.location || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Bird Count:</strong> {farm.size || 0} birds
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Created:</strong>{" "}
                {new Date(farm.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-center gap-3 bg-[#b58900] hover:bg-[#a57800]/80 rounded-lg">
                <button
                  onClick={() => handleViewRecords(farm.id)}
                  className="flex items-center gap-1 text-white p-1"
                  disabled={actionLoading}
                >
                  <FaEdit size={16} /> View Records
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmList;

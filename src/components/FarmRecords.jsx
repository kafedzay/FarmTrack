import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const FarmRecords = () => {
  const { farmId } = useParams();
  const { axiosInstance, user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/farms/${farmId}/records`);
      console.log(response.data.data);
      setRecords(response.data.records || []);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to fetch records";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [farmId, user]);

  const handleEdit = (record) => {
    console.log("Edit record", record);
    // navigate(`/records/edit/${record.id}`) if needed
  };

  const handleDelete = async (recordId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      setActionLoading(true);
      await axiosInstance.delete(`/api/farms/records/${recordId}`);
      setRecords((prev) => prev.filter((r) => r.id !== recordId));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading records...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Farm Records</h1>

      {records.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
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
                  Record for {new Date(record.date).toLocaleDateString()}
                </h2>
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
              {record.photos?.length > 0 && (
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
                  onClick={() => handleDelete(record.id)}
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
    </div>
  );
};

export default FarmRecords;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TourCard } from "../components/TourCard";
import { TourPackage } from "../types";
import { API_BASE_URL } from "../api";

export const HomePage = () => {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/packages`);
        console.log('the response Data',response.data);
        setTourPackages(response.data);
      } catch (err) {
        setError("Failed to load tour packages. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourPackages();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-700">Loading tours...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Discover Your Next Adventure
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
            <div
              key={tour._id}
              onClick={() => navigate(`/packages/${tour._id}`)}
              className="cursor-pointer"
            >
              <TourCard
                tour={tour}
                onBookNow={() => {
                  navigate(`/packages/${tour._id}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

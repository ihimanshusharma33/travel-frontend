import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { TourPackage, Booking } from "../types";
import axios from "axios";
import PackageList from "./PackageList";
import BookingList from "./BookingList";
import { API_BASE_URL } from "../api";
import PackageForm from "./PackageForm";

const AdminPanel = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"packages" | "bookings" | "addpackage">(
    "packages"
  );
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login"); // Redirect to login if token is missing
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const packagesResponse = await axios.get(`${API_BASE_URL}/packages`, {
          headers: {
            token,
          },
        });
        setPackages(packagesResponse.data || []);
        const bookingsResponse = await axios.get(`${API_BASE_URL}/bookings`, {
          headers: {
            token,
          },
        });
        setBookings(bookingsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("username");
    console.log("Logged out");
    navigate("/login"); // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>; // General loading state
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="mb-4">
          <button
            className={`px-6 py-2 mr-4 rounded-md ${
              activeTab === "packages" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("packages")}
          >
            Tour Packages
          </button>
          <button
            className={`px-6 mr-4 py-2 rounded-md ${
              activeTab === "bookings" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={`px-6 mr-4 py-2 rounded-md ${
              activeTab === "addpackage" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("addpackage")}
          >
            Add Package
          </button>
          <button
            className="px-6 mr-4 py-2 rounded-md bg-red-600 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Display Error */}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Render Packages or Bookings based on activeTab */}
        {activeTab === "packages" && <PackageList packages={packages} />}
        {activeTab === "addpackage" && <PackageForm />}
        {activeTab === "bookings" && <BookingList bookings={bookings} />}
      </div>
    </div>
  );
};

export default AdminPanel;

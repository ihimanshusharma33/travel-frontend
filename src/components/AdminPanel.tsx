import { useEffect, useState } from "react";
import { TourPackage } from "../types";
import { Booking } from "../types";
import axios from "axios";
import PackageForm from "./PackageForm";
import PackageList from "./PackageList";
import BookingList from "./BookingList";
import { API_BASE_URL } from "../api";

const AdminPanel = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentPackage, setCurrentPackage] = useState<TourPackage | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"packages" | "bookings">(
    "packages"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const packagesResponse = await axios.get(`${API_BASE_URL}/packages/`);
        setPackages(packagesResponse.data || []);
        const bookingsResponse = await axios.get(`${API_BASE_URL}/bookings/`);
        setBookings(bookingsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        localStorage.removeItem("jwtToken");
        delete axios.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/";
  };

  if (loading) {
    return <div>Loading...</div>; // General loading state
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-md mb-4"
        >
          Logout
        </button>

        {/* Tab Navigation */}
        <div className="mb-4">
          <button
            className={`px-6 py-2 mr-4 rounded-md ${
              activeTab === "packages"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("packages")}
          >
            Tour Packages
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              activeTab === "bookings"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
        </div>

        {/* Display Error */}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Render Packages or Bookings based on activeTab */}
        {activeTab === "packages" && (
          <div>
            <PackageForm
              formMode={formMode}
              setFormMode={setFormMode}
              currentPackage={currentPackage}
              setCurrentPackage={setCurrentPackage}
              setPackages={setPackages}
            />
            <PackageList
              packages={packages}
              setFormMode={setFormMode}
              setCurrentPackage={setCurrentPackage}
              setPackages={setPackages}
            />
          </div>
        )}

        {activeTab === "bookings" && <BookingList bookings={bookings} />}
      </div>
    </div>
  );
};

export default AdminPanel;

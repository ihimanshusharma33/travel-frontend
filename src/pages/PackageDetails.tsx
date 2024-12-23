import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageCarousel } from "../components/ImageCarousel";
import { BookingForm } from "../components/BookingForm";
import { Calendar, MapPin, Clock, Check, X } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { TourPackage } from "../types";
import { ProtectRoute } from "../components/ProtectRoute";

export const PackageDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  // Fetch tour details based on the package id
  useEffect(() => {
    const fetchTourDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/packages/${id}`);
        setTour(response.data); // Assuming API returns the package data
      } catch (err) {
        setError("Failed to fetch package details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Error state if something goes wrong
  }

  if (!tour) {
    return <div>Package not found</div>; // If no package found for the given ID
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageCarousel images={tour.images} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {tour.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>
                    Next available:{" "}
                    {new Date(tour.availableDates[0]).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check size={20} className="text-green-500 mt-1" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Itinerary
              </h2>
              <div className="space-y-4">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="border-l-4 border-indigo-500 pl-4"
                  >
                    <h3 className="font-bold">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="text-gray-600">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-indigo-600">
                  ${tour.price}
                </div>
                <div className="text-gray-600">per person</div>
              </div>

              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </button>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    What's Included
                  </h3>
                  <div className="space-y-2">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 mt-1" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    What's Not Included
                  </h3>
                  <div className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <X size={18} className="text-red-500 mt-1" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <ProtectRoute>
          <BookingForm
            tour={tour}
            onClose={() => setShowBooking(false)}
          />
        </ProtectRoute>
      )}
    </div>
  );
};

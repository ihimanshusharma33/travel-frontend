import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { TourPackage } from "../types";
import { API_BASE_URL } from "../api";

interface BookingFormProps {
  tour: TourPackage;
  onClose: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ tour, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, {
        ...formData,
        packageId: tour._id,
        packageTitle: tour.title,
        totalPrice: tour.price * formData.travelers,
      },
      {
        headers:{ 
          token: localStorage.getItem('token')
        }
      });

      if (response.status === 201) {
        setSuccess("Booking confirmed! Thank you for choosing our service.");
        setFormData({
          customerName: "",
          email: "",
          phone: "",
          travelers: 1,
          specialRequests: "",
        });
      }
    } catch (error: any) {
      setError("Failed to submit booking. Please try again later.");
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please login to book a tour");
    }
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative animate-slideIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Book {tour.title}</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Travelers
            </label>
            <input
              type="number"
              min="1"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.travelers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  travelers: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests (Optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
            />
          </div>

          <div className="pt-4">
            <p className="text-lg font-semibold mb-4">
              Total Price: ${tour.price * formData.travelers}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

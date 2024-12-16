import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { TourPackage } from "../types";

interface TourCardProps {
  tour: TourPackage;
  onBookNow: (tour: TourPackage) => void;
}

export const  TourCard: React.FC<TourCardProps> = ({ tour, onBookNow }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-64">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-indigo-600">
          ${tour.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{tour.title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={18} />
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={18} />
            <span>{tour.duration}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{tour.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-indigo-600" />
          <span className="text-sm text-gray-600">
            Next available:{" "}
            {new Date(tour.availableDates[0]).toLocaleDateString()}
          </span>
        </div>
        <button
          onClick={() => onBookNow(tour)}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

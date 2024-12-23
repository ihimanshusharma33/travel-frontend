import React, { useState } from "react";
import { TourPackage } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../api";

const PackageForm: React.FC = () => {
  const initialFormState: TourPackage = {
    title: "",
    description: "",
    price: 0,
    availableDates: [],
    images: [],
    location: "",
    duration: "",
    highlights: [],
    itinerary: [{ day: 1, title: "", description: "" }], // Initialize with one itinerary step
    included: [],
    excluded: [],
  };

  const [packageForm, setPackageForm] = useState<TourPackage>(initialFormState);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPackageForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/packages/`, packageForm,{
        headers:{
          token:localStorage.getItem('token')
        }
      });
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  const addItineraryStep = () => {
    setPackageForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: "", description: "" },
      ],
    }));
  };

  const removeItineraryStep = (index: number) => {
    setPackageForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  return (
    <form className="bg-white p-6 rounded shadow-md space-y-6" onSubmit={handleAddPackage}>
      <h2 className="text-2xl font-semibold">Add New Package</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={packageForm.title}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={packageForm.description}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={4}
          required
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={packageForm.price || ""}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={packageForm.location}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Duration
        </label>
        <input
          id="duration"
          name="duration"
          type="text"
          value={packageForm.duration}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Highlights */}
      <div>
        <label htmlFor="highlights" className="block text-sm font-medium text-gray-700">
          Highlights (comma separated)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          value={packageForm.highlights.join(",")}
          onChange={(e) =>
            setPackageForm({
              ...packageForm,
              highlights: e.target.value.split(","),
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={4}
          required
        />
      </div>

      {/* Available Dates */}
      <div>
        <label htmlFor="availableDates" className="block text-sm font-medium text-gray-700">
          Available Dates (comma separated)
        </label>
        <textarea
          id="availableDates"
          name="availableDates"
          value={packageForm.availableDates.join(",")}
          onChange={(e) =>
            setPackageForm({
              ...packageForm,
              availableDates: e.target.value.split(","),
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={2}
          required
        />
      </div>

      {/* Images */}
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Images (comma separated URLs)
        </label>
        <textarea
          id="images"
          name="images"
          value={packageForm.images.join(",")}
          onChange={(e) =>
            setPackageForm({
              ...packageForm,
              images: e.target.value.split(","),
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={3}
          required
        />
      </div>

      {/* Itinerary */}
      <div>
        <label htmlFor="itinerary" className="block text-sm font-medium text-gray-700">
          Itinerary
        </label>
        {packageForm.itinerary.map((step, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="number"
              value={step.day}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder={`Day ${index + 1}`}
              onChange={(e) => {
                const updatedItinerary = [...packageForm.itinerary];
                updatedItinerary[index].day = Number(e.target.value);
                setPackageForm({ ...packageForm, itinerary: updatedItinerary });
              }}
            />
            <input
              type="text"
              value={step.title}
              onChange={(e) => {
                const updatedItinerary = [...packageForm.itinerary];
                updatedItinerary[index].title = e.target.value;
                setPackageForm({ ...packageForm, itinerary: updatedItinerary });
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Title"
            />
            <textarea
              value={step.description}
              onChange={(e) => {
                const updatedItinerary = [...packageForm.itinerary];
                updatedItinerary[index].description = e.target.value;
                setPackageForm({ ...packageForm, itinerary: updatedItinerary });
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Description"
            />
            <button
              type="button"
              className="bg-red-600 text-white p-1 rounded"
              onClick={() => removeItineraryStep(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-blue-600"
          onClick={addItineraryStep}
        >
          Add another itinerary step
        </button>
      </div>

      {/* Included */}
      <div>
        <label htmlFor="included" className="block text-sm font-medium text-gray-700">
          Included (comma separated)
        </label>
        <textarea
          id="included"
          name="included"
          value={packageForm.included.join(",")}
          onChange={(e) =>
            setPackageForm({
              ...packageForm,
              included: e.target.value.split(","),
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={4}
          required
        />
      </div>

      {/* Excluded */}
      <div>
        <label htmlFor="excluded" className="block text-sm font-medium text-gray-700">
          Excluded (comma separated)
        </label>
        <textarea
          id="excluded"
          name="excluded"
          value={packageForm.excluded.join(",")}
          onChange={(e) =>
            setPackageForm({
              ...packageForm,
              excluded: e.target.value.split(","),
            })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={4}
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white p-2 rounded-md"
      >
        Add Package
      </button>
    </form>
  );
};

export default PackageForm;

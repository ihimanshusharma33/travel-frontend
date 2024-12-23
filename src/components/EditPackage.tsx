import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { TourPackage } from "../types";

interface EditPackageProps {
  currentPackage: TourPackage | null;
}

const EditPackage: React.FC<EditPackageProps> = ({ currentPackage }) => {
  const [editPackage, setEditPackage] = useState<TourPackage | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [success,setSuccess]=useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (currentPackage) {
      setEditPackage(currentPackage);
    }
  }, [currentPackage]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditPackage((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleItineraryChange = (index: number, field: "day" | "title" | "description", value: string | number) => {
    setEditPackage((prev) => {
      if (!prev) return prev;
      const updatedItinerary = [...prev.itinerary];
      updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
      return { ...prev, itinerary: updatedItinerary };
    });
  };

  const handleRemoveItineraryStep = (index: number) => {
    setEditPackage((prev) => {
      if (!prev) return prev;
      const updatedItinerary = prev.itinerary.filter((_, i) => i !== index);
      return { ...prev, itinerary: updatedItinerary };
    });
  };

  const handleAddItineraryStep = () => {
    setEditPackage((prev) => {
      if (!prev) return prev;
      const newStep = { day: prev.itinerary.length + 1, title: "", description: "" };
      return { ...prev, itinerary: [...prev.itinerary, newStep] };
    });
  };

  const handleUpdatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editPackage) {
        const response=await axios.put(`${API_BASE_URL}/packages/${editPackage._id}`, editPackage,{
          headers:{
            "Content-Type":"application/json",
            token:localStorage.getItem("admintoken")
          }
        });
        setLoading(false);
        if(response.status===200){
          setSuccess("Package updated successfully");
        }
        else{
          setAlert("Failed to update package");
        }
        setTimeout(()=>{
          window.location.reload();
        },2000)

      }
    } catch (error) {
      console.error("Error updating package:", error);
      setTimeout(()=>{
        window.location.reload();
      },2000)
      setLoading(false);
    }
  };

  if (!editPackage) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdatePackage} className="bg-white p-6 rounded shadow-md space-y-6">
      <h2 className="text-2xl font-semibold">Edit Package</h2>

      {loading && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-blue-500 text-white px-10 py-3">Please wait ...</p></div>}
      {alert && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-red-500 text-white px-10 py-3">{alert}</p></div>}
      {success && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-green-500 text-white px-10 py-3">{success}</p></div>}
   
      {Object.entries(editPackage).map(([key, value]) => {
        if (key === "itinerary") return null;
        return (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              id={key}
              name={key}
              type="text"
              value={value as string}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        );
      })}

      <div>
        <h3 className="text-lg font-semibold">Itinerary</h3>
        {editPackage.itinerary.map((step, index) => (
          <div key={index} className="space-y-2 border p-2 rounded">
            <div>
              <label htmlFor={`day-${index}`} className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <input
                id={`day-${index}`}
                type="number"
                value={step.day}
                onChange={(e) => handleItineraryChange(index, "day", Number(e.target.value))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id={`title-${index}`}
                type="text"
                value={step.title}
                onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id={`description-${index}`}
                value={step.description}
                onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveItineraryStep(index)}
              className="text-red-600 mt-2"
            >
              Remove Step
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItineraryStep}
          className="mt-4 bg-green-600 text-white p-2 rounded-md"
        >
          Add Step
        </button>
      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded-md">
        Update Package
      </button>
    </form>
  );
};

export default EditPackage;

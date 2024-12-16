import React from "react";
import { TourPackage } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../api";

interface PackageListProps {
  packages: TourPackage[];
  setFormMode: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  setCurrentPackage: React.Dispatch<React.SetStateAction<TourPackage | null>>;
  setPackages: React.Dispatch<React.SetStateAction<TourPackage[]>>;
}

const PackageList: React.FC<PackageListProps> = ({
  packages = [],
  setFormMode,
  setCurrentPackage,
  setPackages,
}) => {
  const handleEditPackage = (pkg: TourPackage) => {
    setFormMode("edit");
    setCurrentPackage(pkg);
  };

  const handleDeletePackage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`${API_BASE_URL}/packages/${id}`);
        setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  return (
    <div>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg._id} className="border-b py-4">
            <div className="flex justify-between items-center">
              <span>{pkg.title}</span>
              <div>
                <button
                  onClick={() => handleEditPackage(pkg)}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageList;

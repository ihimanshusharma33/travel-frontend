import React from "react";
import { TourPackage } from "../types";
import EditPackage from "./EditPackage";
import axios from "axios";
import { API_BASE_URL } from "../api";

interface PackageListProps {
  packages: TourPackage[];
}

const PackageList: React.FC<PackageListProps> = ({ packages }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [pkg, setPkg] = React.useState<TourPackage | null>(null);
  const [alert, setAlert] = React.useState<string | null>(null);

  const handleEditPackage = (selectedPackage: TourPackage) => {
    setPkg(selectedPackage); // Set the selected package
    setIsEditing(true); // Enable editing mode
  };
  const deletePackage = (pkg: TourPackage) => {
    axios.delete(`${API_BASE_URL}/packages/${pkg._id}`, {
      headers: {
        token: localStorage.getItem('admintoken')
      }
    }).then((response) => {
      if (response.status === 200) {
        setAlert('Package deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }
    }).catch((error) => {
      console.log(error);
    })

  }
  return (
    <div>

      {alert &&
        (<div className="fixed top-20 flex w-full justify-center">
          <p className="px-8 w-fit mr-20 py-4 rounded-md bg-green-400 text-white text-md">
            {alert}
          </p>
        </div>)
      }
      {/* Render the EditPackage component if editing */}
      {isEditing && pkg && (
        <EditPackage
          currentPackage={pkg}
        />
      )}

      {/* Render the package list if not editing */}
      {!isEditing && (
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
                  <button className="text-red-600 hover:underline"
                    onClick={() => deletePackage(pkg)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PackageList;

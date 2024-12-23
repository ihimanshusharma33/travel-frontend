import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../api";


interface Profile {
    name: string;
    email: string;
    phone: string;
    ismailVerified: boolean;
    history?: {
        booking: string;
        date: string;
        paymentStatus: string;
        confirmation: string;
    }[];
}
const Profile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const getProfile = useCallback(async () => {
        if (!token || !email) {
            console.log("No token found. Redirecting to login.");
            window.location.href = "/login";
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/auth/get-profile`, {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data.user);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to fetch profile.");
                window.location.href = "/login";
            }
        } catch (err) {
            setError("Unable to fetch profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [token, email]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Welcome, {profile?.name}</h1>
                <p className="text-gray-600">{profile?.email}</p>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-2">Booking History</h2>
                {profile?.history?.length ? (
                    <ul className="mt-4">
                        {profile.history.map((item, index) => (
                            <li key={index} className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
                                <p className="text-md text-gray-700"><strong>Booking:</strong> {item.booking}</p>
                                <p className="text-md text-gray-700"><strong>Date:</strong> {item.date}</p>
                                <p className="text-md text-gray-700"><strong>Payment Status:</strong>
                                    <span className={`font-semibold ${item.paymentStatus === "Paid" ? "text-green-500" : "text-yellow-500"}`}>
                                        {item.paymentStatus}
                                    </span>
                                </p>
                                <p className="text-md text-gray-700">Confirmation Status:
                                    <span className={`font-semibold ${item.confirmation === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>
                                        {item.confirmation}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-md text-gray-700">No booking history available.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;

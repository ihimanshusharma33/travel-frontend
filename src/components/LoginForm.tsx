import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api";



const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token
        localStorage.setItem('email', email); // Store the email
        console.log("Token stored:", token);
        navigate('/profile'); // Redirect to the profile page
      } else if (response.status === 404) {
        setError("Wrong email or password. Please try again.");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        if (err.response.status === 404) {
          setError("Wrong email or password. Please try again.");
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 2000)
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 2000)
        } else {
          setError(err.response.data?.message || "An unexpected error occurred.");
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 2000)
        }
      } else if (err.request) {
        // Request was made but no response was received
        setError("No response from the server. Please check your network connection.");
        setLoading(false);
      } else {
        // Something went wrong in setting up the request
        setError("An error occurred. Please try again.");
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 2000)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-fit lg:min-h-screen bg-gray-100">

      {loading && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-blue-500 text-white px-10 py-3">Please wait ...</p></div>}
      {error && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-red-500 text-white px-10 py-3">{error}</p></div>}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            <Link to="/forget-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
          <div className="my-6">
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white ${loading ? "bg-blue-400" : "bg-blue-600"} rounded ${!loading && "hover:bg-blue-700"}`}
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./components/About";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import LoginForm from "./components/LoginForm";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { PackageDetails } from "./pages/PackageDetails";
import AdminPanel from "./components/AdminPanel";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("jwtToken", token);
    setIsAdmin(true);
    setShowLogin(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Admin Panel Route */}
            {isAdmin ? (
              <>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </>
            ) : (
              <>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/packages/:id" element={<PackageDetails />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
        {/* Login Button */}
        {!isAdmin && (
          <button
            onClick={() => setShowLogin(true)}
            className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100"
          >
            Admin Login
          </button>
        )}
        {/* Login Form */}
        {showLogin && (
          <LoginForm
            onSuccess={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { PackageDetails } from "./pages/PackageDetails";
import AdminPanel from "./components/AdminPanel";
import { ProtectRoute } from "./components/ProtectRoute";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import ForgetPassword from "./components/ForgetPassword";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/packages/:id" element={<PackageDetails />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<ProtectRoute admin><AdminPanel></AdminPanel></ProtectRoute>}/>
              <Route path="/login" element={<LoginForm></LoginForm>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<ProtectRoute><Profile></Profile></ProtectRoute>}/>
              <Route path="/admin/login" element={<AdminLogin/>} />
              <Route path="/forget-password" element={<ForgetPassword/>} />
            </>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

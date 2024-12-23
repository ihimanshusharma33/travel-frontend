import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
              <Route path="/admin" element={<ProtectRoute admin><AdminPanel></AdminPanel></ProtectRoute>} />
              <Route path="/login" element={<LoginForm></LoginForm>} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectRoute><Profile></Profile></ProtectRoute>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="*" element={<section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                  <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                      <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                    <Link to="/" className="px-8 py-3 font-semibold rounded dark:bg-gray-900 dark:text-gray-50">Back to homepage</Link>
                  </div>
                </div>
              </section>} />
            </>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

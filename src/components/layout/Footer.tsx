import { Compass, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass size={32} className="text-indigo-400" />
              <span className="text-xl font-bold">Wanderlust Tours</span>
            </div>
            <p className="text-gray-400">
              Discover the world with our expertly crafted tour packages.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white">Home</Link>
              <Link to="/packages" className="block text-gray-400 hover:text-white">Tour Packages</Link>
              <Link to="/about" className="block text-gray-400 hover:text-white">About Us</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white">Contact</Link>
              <Link to="/admin" className="block text-gray-400 hover:text-white">Admin</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>123 Travel Street</p>
              <p>Adventure City, AC 12345</p>
              <p>Phone: +1 234 567 890</p>
              <p>Email: info@wanderlust.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Wanderlust Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
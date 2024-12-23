import { useState } from 'react';
import { Compass, Phone, Mail, Menu, X, UsersIcon, User2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Compass size={32} className="text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Wanderlust Tours</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Link to="/profile"><User2Icon size={22} /></Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-900 hover:text-indigo-600">Home</Link>
            <Link to="/about" className="block text-gray-900 hover:text-indigo-600">About</Link>
            <Link to="/contact" className="block text-gray-900 hover:text-indigo-600">Contact</Link>
            <div className="flex items-center gap-2 text-gray-600">
              <Link to="/profile"><User2Icon size={22} /></Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
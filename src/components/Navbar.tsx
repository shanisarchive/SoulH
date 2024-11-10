import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SoulLogo from '../assets/Screenshot_2024-03-03_120833-removebg-preview.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 w-full z-20 bg-transparent"> {/* Slightly lowered to `top-4` */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20"> {/* Adjusted for a taller header */}
          {/* Larger Logo with Removed Text */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={SoulLogo} alt="Soul Logo" className="w-28 h-28" /> {/* Increased to `w-28 h-28` for a slightly larger logo */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <AuthButtons navigate={navigate} />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-100 hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLinks mobile />
            <div className="pt-4">
              <AuthButtons mobile navigate={navigate} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

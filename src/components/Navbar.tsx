import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SoulLogo from '../assets/Screenshot_2024-03-03_120833-removebg-preview.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Updated Logo Alignment */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={SoulLogo} alt="Soul Logo" className="w-20 h-20" /> {/* Increased logo size */}
            <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 text-transparent bg-clip-text">
              Soul
            </span>
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

const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const baseStyles = mobile
    ? "block px-3 py-2 rounded-md text-white hover:bg-white/10"
    : "text-gray-100 hover:text-white transition-colors";

  return (
    <>
      {["Home", "Features", "Pricing", "About", "Contact Us"].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className={baseStyles}>
          {item}
        </a>
      ))}
    </>
  );
};

const AuthButtons = ({ mobile, navigate }: { mobile?: boolean, navigate: (path: string) => void }) => {
  const containerStyles = mobile ? "space-y-2" : "space-x-4";
  
  return (
    <div className={containerStyles}>
      <button 
        onClick={() => navigate('/auth')}
        className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
      >
        Log In
      </button>
      <button 
        onClick={() => navigate('/auth')}
        className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Navbar;

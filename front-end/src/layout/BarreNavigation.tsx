import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/OIP.webp';

const BarreNavigation = () => {
  const local = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'home', path: '/' },
    { name: 'vente', path: '/vente' },
    { name: 'stock', path: '/stock' },
    { name: 'produit', path: '/produit' },
  ];

  return (
    <nav className="bg-amber-300 shadow-amber-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="logo" className="h-12 w-auto" />
        </div>

        {/* Hamburger button for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className={`flex-1 md:flex md:items-center md:justify-center ${isOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 mt-4 md:mt-0 justify-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-2xl transform transition duration-200 py-2 tracking-tight font-[Open_Sans] hover:scale-110 ${
                  local.pathname === link.path ? '' : 'scale-105 text-amber-900'
                }`}
                onClick={() => setIsOpen(false)} // ferme le menu mobile au click
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarreNavigation;

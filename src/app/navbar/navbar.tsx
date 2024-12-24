'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-purple-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">Mi App</Link>
        
        {/* Icono del menú para móvil */}
        <button
          className="text-white lg:hidden"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menú de navegación */}
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md">Inicio</Link>
            </li>
            <li>
              <Link href="/post" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md">Publicaciones</Link>
            </li>
            <li>
              <Link href="/create" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md">Crear</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú para móvil */}
      {isOpen && (
        <div className="lg:hidden mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block text-white hover:bg-purple-500 px-3 py-2 rounded-md">Inicio</Link>
            </li>
            <li>
              <Link href="/posts" className="block text-white hover:bg-purple-500 px-3 py-2 rounded-md">Publicaciones</Link>
            </li>
            <li>
              <Link href="/create" className="block text-white hover:bg-purple-500 px-3 py-2 rounded-md">Crear</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
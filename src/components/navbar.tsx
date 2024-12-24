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
        <Link href="/" className="text-white text-2xl font-bold">Prueba JR</Link>

        <button
          className="text-white lg:hidden"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:flex">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md">Inicio</Link>
            </li>
            <li>
              <Link href="/posts" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md">Publicaciones</Link>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block text-white hover:bg-purple-500 px-3 py-2 rounded-md">Inicio</Link>
            </li>
            <li>
              <Link href="/posts" className="block text-white hover:bg-purple-500 px-3 py-2 rounded-md">Publicaciones</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

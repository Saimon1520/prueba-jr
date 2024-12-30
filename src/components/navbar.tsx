'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLoginContext } from '@/context/LoginContext';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react';

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { login, setLogin, setUserID } = useLoginContext();
  const [ loginin, setLoginin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("login") === "true";
  
      if (isLoggedIn) {
        setLoginin(true);
      }
    }
  }, [loginin]);
  

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setLogin(false);
    setUserID(undefined);
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('userId');
  };

  return (
    <Navbar isBordered aria-label="Navbar" className="bg-[var(--nextui-background)] text-[var(--nextui-foreground)]">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={toggleMenu}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--nextui-foreground)' }}>
            Prueba JR
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" className="text-base" style={{ color: 'var(--nextui-foreground)' }}>
            Inicio
          </Link>
        </NavbarItem>

        {login || loginin && (
          <>
            <NavbarItem>
              <Link href="/posts" className="text-base" style={{ color: 'var(--nextui-foreground)' }}>
                Publicaciones
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/post-form" className="text-base" style={{ color: 'var(--nextui-foreground)' }}>
                Crear Publicación
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/albums" className="text-base" style={{ color: 'var(--nextui-foreground)' }}>
                Albums
              </Link>
            </NavbarItem>
            <NavbarItem>
              <button
                className="text-base"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </NavbarItem>
          </>
        )}

        {!login || !loginin && (
          <>
            <NavbarItem>
              <Link href="/login-form" className="text-base" style={{ color: 'var(--nextui-foreground)' }}>
                Iniciar sesión
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register" className="text-base" style={{ color: 'var(--nextui-foreground)' }}>
                Registrarse
              </Link>
            </NavbarItem>
          </>
        )}

        {/* Botón para alternar entre modo claro y oscuro */}
        <NavbarItem>
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Cambiar modo"
            className="text-base"
          >
            {isDarkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Menú en móviles */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href="/" className="block" style={{ color: 'var(--nextui-foreground)' }}>
              Inicio
            </Link>
          </NavbarMenuItem>
          {login || loginin && (
            <>
              <NavbarMenuItem>
                <Link href="/posts" className="block" style={{ color: 'var(--nextui-foreground)' }}>
                  Publicaciones
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/post-form" className="block" style={{ color: 'var(--nextui-foreground)' }}>
                  Crear Publicación
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/albums" className="block" style={{ color: 'var(--nextui-foreground)' }}>
                  Albums
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <button
                  className="block"
                  style={{ color: 'var(--nextui-foreground)' }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </NavbarMenuItem>
            </>
          )}

          {!login || !loginin && (
            <>
              <NavbarMenuItem>
                <Link href="/login-form" className="block" style={{ color: 'var(--nextui-foreground)' }}>
                  Iniciar sesión
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/register" className="block" style={{ color: 'var(--nextui-foreground)' }}>
                  Registrarse
                </Link>
              </NavbarMenuItem>
            </>
          )}

          {/* Botón de cambio de tema en móvil */}
          <NavbarMenuItem>
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Cambiar modo"
              className="text-base w-full"
            >
              {isDarkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;



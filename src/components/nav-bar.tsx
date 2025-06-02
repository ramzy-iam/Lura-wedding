'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '../utils';
import { Logo } from './logo';
import { navLinks } from './sections/data';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // Initial check
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function Navbar() {
  const isDesktop = useMediaQuery('(min-width: 1071px)');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      {!isDesktop && (
        <header className="bg-navbar-background sticky top-0 z-50 flex h-[88px] items-center justify-between px-4 backdrop-blur-md">
          <Logo />
          <button
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            className="p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 5.75C2 5.33579 2.33579 5 2.75 5H18.25C18.6642 5 19 5.33579 19 5.75C19 6.16421 18.6642 6.5 18.25 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75ZM2 17.75C2 17.3358 2.33579 17 2.75 17H15.25C15.6642 17 16 17.3358 16 17.75C16 18.1642 15.6642 18.5 15.25 18.5H2.75C2.33579 18.5 2 18.1642 2 17.75ZM2.75 11C2.33579 11 2 11.3358 2 11.75C2 12.1642 2.33579 12.5 2.75 12.5H21.25C21.6642 12.5 22 12.1642 22 11.75C22 11.3358 21.6642 11 21.25 11H2.75Z"
                fill="#242424"
              />
            </svg>
          </button>
        </header>
      )}

      {/* Desktop Navbar */}
      {isDesktop && (
        <nav className="bg-navbar-background sticky top-0 z-50 flex h-[88px] w-full items-center justify-between px-8 backdrop-blur-md lg:px-32">
          <Logo />
          <ul className="font-satoshi flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary block px-4 py-2 text-[#2F3033]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            className="font-satoshi hover:text-primary px-4 py-2 text-[#2F3033]"
          >
            Contactez-nous
          </Link>
        </nav>
      )}

      {/* Mobile Sidebar Menu */}
      {!isDesktop && (
        <>
          <aside
            className={cn(
              'bg-navbar-background fixed top-0 right-0 z-50 h-full w-64 transform shadow-lg transition-transform duration-300',
              sidebarOpen ? 'translate-x-0' : 'translate-x-full',
            )}
            aria-hidden={!sidebarOpen}
          >
            <div className="flex items-center justify-between p-4">
              <button onClick={closeSidebar} aria-label="Close sidebar">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00098 5L19 18.9991"
                    stroke="#242424"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.99996 18.9991L18.999 5"
                    stroke="#242424"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col px-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className="hover:text-primary block px-4 py-2 text-[#2F3033]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  onClick={closeSidebar}
                  className="hover:text-primary block px-4 py-2 text-[#2F3033]"
                >
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </aside>

          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={closeSidebar}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </>
  );
}

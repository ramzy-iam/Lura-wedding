"use client";

import { useEffect, useState } from "react";
import { cn } from "../utils";
import { Logo } from "./logo";
import Link from "next/link";

const links = [
  { href: "#hero", label: "Jardin d'Eden" },
  { href: "#history", label: "Notre Histoire" },
  { href: "#agenda", label: "Agenda & info" },
  { href: "#gallery", label: "Gallerie" },
];

export function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleResize(media);
    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Top bar for mobile with logo and hamburger */}
      <div className="sm:hidden  flex items-center justify-between bg-navbar-background h-[88px] px-4 pt-10 pb-2">
        <Logo />
        <button
          onClick={openSidebar}
          aria-label="open sidebar"
          aria-expanded={sidebarOpen}
          aria-controls="navbar"
          className="p-2 bg-transparent border-none cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 5.75C2 5.33579 2.33579 5 2.75 5H18.25C18.6642 5 19 5.33579 19 5.75C19 6.16421 18.6642 6.5 18.25 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75ZM2 17.75C2 17.3358 2.33579 17 2.75 17H15.25C15.6642 17 16 17.3358 16 17.75C16 18.1642 15.6642 18.5 15.25 18.5H2.75C2.33579 18.5 2 18.1642 2 17.75ZM2.75 11C2.33579 11 2 11.3358 2 11.75C2 12.1642 2.33579 12.5 2.75 12.5H21.25C21.6642 12.5 22 12.1642 22 11.75C22 11.3358 21.6642 11 21.25 11H2.75Z"
              fill="#242424"
            />
          </svg>
        </button>
      </div>

      {/* Navbar links */}
      <nav
        id="navbar"
        className={cn(
          "bg-navbar-background text-primary h-full sm:h-[88px] px-1 sm:px-32 sm:relative sm:translate-x-0 sm:flex sm:flex-row sm:items-center",
          "fixed top-0 right-0  w-60 flex-col transition-transform duration-300 z-50 sm:w-full",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={isMobile && !sidebarOpen}
      >
        <ul className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full px-4">
          {/* Show logo on larger screens too */}
          <li className="hidden sm:block">
            <Logo />
          </li>
          <li className="sm:ml-auto">
            <button
              onClick={closeSidebar}
              aria-label="close sidebar"
              className="block sm:hidden p-4 bg-transparent border-none cursor-pointer"
            >
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
          </li>
          {links.map((link) => (
            <li key={link.href} className="font-sf-pro">
              <Link
                href={link.href}
                className="px-4 py-2 text-[#2F3033] block hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}

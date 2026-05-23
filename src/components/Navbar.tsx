"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/kontak', label: 'Kontak' },
  ];

  return (
    <header className="bg-brand-brown text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <Image
                  src="/ROTI.png"
                  alt="Logo Roti Bakar Bandung SD"
                  fill
                  sizes="48px"
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-logo text-base sm:text-xl tracking-wide text-white leading-none">
                  Roti Bakar Bandung SD
                </span>
                <span className="text-[10px] sm:text-xs text-brand-orange font-medium italic tracking-wide">
                  kreasi rasa yang tak terlupakan
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href ? 'text-brand-orange' : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/6281234567890?text=Halo%2C+saya+ingin+memesan+Roti+Bakar"
              target="_blank"
              rel="noreferrer"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md text-center"
            >
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-brown border-t border-white/10 px-4 pb-5 pt-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-white/10 text-brand-orange'
                  : 'text-gray-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="https://wa.me/6281234567890?text=Halo%2C+saya+ingin+memesan+Roti+Bakar"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3 rounded-full font-semibold text-sm transition-all"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

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
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/ROTI.png"
                  alt="Logo Roti Bakar Bandung SD"
                  fill
                  sizes="48px"
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-logo text-xl tracking-wide text-white leading-none">
                  Roti Bakar Bandung SD
                </span>
                <span className="text-xs text-brand-orange font-medium italic tracking-wide">
                  kreasi rasa yang tak terlupakan
                </span>
              </div>
            </Link>
          </div>
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
        </div>
      </div>
    </header>
  );
}

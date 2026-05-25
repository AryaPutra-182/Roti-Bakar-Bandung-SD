'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-brand-brown text-white pt-12 pb-6 border-t-[0.5px] border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center md:items-start justify-center">
          <Link href="/" className="flex items-center gap-3 group mb-3">
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
                Kreasi Rasa Yang Tak Terlupakan
              </span>
            </div>
          </Link>
        </div>

        {/* Pesan via WA */}
        <div className="col-span-1 flex flex-col justify-center">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left">
            Pesan Sekarang
          </h3>

          <p className="text-sm text-gray-300 mb-4 text-center md:text-left leading-relaxed">
            Hubungi kami langsung via WhatsApp untuk pemesanan cepat dan mudah!
          </p>

          {/* FIX CENTER BUTTON */}
          <div className="flex justify-center md:justify-start">
            <a
              href="https://wa.me/6281908618783?text=Halo%2C+saya+ingin+memesan+Roti+Bakar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg w-fit"
            >
              <FaWhatsapp className="text-xl" />
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Order Online */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left">
            Pesan Lewat Aplikasi
          </h3>

          <ul className="space-y-2 text-sm text-gray-300 text-center md:text-left">
            <li>
              <a
                href="https://r.grab.com/g/6-20260524_221308_4f218e747642411180ed8ff1e64b4786_MEXMPS-6-C7XUMFUCJXVELE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-orange transition-colors"
              >
                GrabFood
              </a>
            </li>

            <li>
              <a
                href="https://gofood.link/a/Stduwtb"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-orange transition-colors"
              >
                GoFood
              </a>
            </li>
          </ul>
        </div>

        {/* Lokasi Kami */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left">
            Lokasi Kami
          </h3>

          <div className="rounded-xl overflow-hidden shadow-lg h-32 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.350479730301!2d112.63685079999999!3d-7.962684899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629001f9cb3b9%3A0xe0ebe582568c476f!2sRoti%20bakar%20bandung%20sd!5e0!3m2!1sid!2sid!4v1779544725349!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
        Copyright &copy; 2026 Roti Bakar Bandung SD. All rights reserved.
      </div>
    </footer>
  );
}
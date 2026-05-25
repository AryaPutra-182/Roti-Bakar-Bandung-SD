import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaUtensils, FaMapMarkerAlt, FaClock, FaMotorcycle } from 'react-icons/fa';

export default function Kontak() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* Hero Banner */}
      <section className="relative bg-brand-brown py-35 overflow-hidden">

        {/* Decorative logos */}
        <div className="absolute -top-6 -left-10 w-52 h-52 opacity-10">
          <Image src="/ROTI.png" alt="" fill sizes="208px" className="object-contain" />
        </div>

        <div className="absolute -bottom-6 -right-10 w-64 h-64 opacity-10">
          <Image src="/ROTI.png" alt="" fill sizes="256px" className="object-contain" />
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 opacity-15">
          <Image src="/ROTI.png" alt="" fill sizes="80px" className="object-contain" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">
            Hubungi Kami
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-logo">
            Kontak
          </h1>

          <p className="text-gray-300 max-w-xl mx-auto text-base leading-relaxed">
            Ada pertanyaan atau ingin memesan? Kami siap melayani Anda dengan sepenuh hati.
          </p>

          <div className="mt-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-brand-orange font-medium">Kontak</span>
          </div>
        </div>
      </section>

      {/* Info Cards Row */}
      <section className="py-10 bg-background mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-12">

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/+6281908618783?text=Halo%2C+saya+ingin+memesan+Roti+Bakar"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 text-2xl group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                <FaWhatsapp />
              </div>

              <p className="font-bold text-brand-brown">WhatsApp</p>
              <p className="text-gray-500 text-sm">+62 819 0861 8783</p>

              <span className="text-xs text-green-500 font-semibold group-hover:underline">
                Chat Sekarang →
              </span>
            </a>

            {/* GrabFood Card */}
            <a
              href="https://r.grab.com/g/6-20260524_221308_4f218e747642411180ed8ff1e64b4786_MEXMPS-6-C7XUMFUCJXVELE"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center overflow-hidden group-hover:bg-green-100 transition-all duration-300">
                <Image
                  src="/grabfood-logo.svg"
                  alt="GrabFood"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>

              <p className="font-bold text-brand-brown">GrabFood</p>
              <p className="text-gray-500 text-sm">Roti bakar bandung sd - Rampal Celaket</p>

              <span className="text-xs text-green-600 font-semibold group-hover:underline">
                Order Sekarang →
              </span>
            </a>

            {/* GoFood Card */}
            <a
              href="https://gofood.link/a/Stduwtb"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 text-2xl group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <FaUtensils />
              </div>

              <p className="font-bold text-brand-brown">GoFood</p>
              <p className="text-gray-500 text-sm">Roti Bakar Bandung SD, RAMPAL CELAKET</p>

              <span className="text-xs text-red-500 font-semibold group-hover:underline">
                Order Sekarang →
              </span>
            </a>

            {/* Jam Buka Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 text-2xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <FaClock />
              </div>

              <p className="font-bold text-brand-brown">Jam Buka</p>
              <p className="text-gray-500 text-sm">
                Senin – Rabu & Jumat – Minggu
              </p>
              <p className="text-brand-orange font-bold text-sm">
                16:00 – 22:00
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA + Map Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* CTA Panel */}
            <div className="lg:col-span-2 bg-brand-brown rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden">

              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5"></div>
              <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/5"></div>

              <div className="relative z-10">

                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-green-400 text-3xl mb-6">
                  <FaWhatsapp />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-logo leading-snug">
                  Pesan Langsung via WhatsApp
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  Pemesanan lebih mudah dan cepat! Chat kami sekarang dan roti bakar hangat siap disiapkan untuk Anda.
                </p>

                <div className="space-y-3 mb-10">
                  {["Respon cepat", "Rasa fresh setiap hari", "Dibuat dari bahan pilihan"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                        ✓
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/+6281908618783?text=Halo%2C+saya+ingin+memesan+Roti+Bakar"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaWhatsapp className="text-xl" />
                Chat WhatsApp Sekarang
              </a>

            </div>

            {/* Map */}
            <div className="lg:col-span-3">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-brand-brown">
                  Lokasi Kami
                </h2>

                <a
                  href="https://maps.google.com/?q=Roti+bakar+bandung+sd"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-orange hover:underline font-semibold flex items-center gap-1"
                >
                  <FaMapMarkerAlt className="text-xs" />
                  Buka di Google Maps
                </a>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-2xl h-[280px] sm:h-[440px] relative border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.350479730301!2d112.63685079999999!3d-7.962684899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629001f9cb3b9%3A0xe0ebe582568c476f!2sRoti%20bakar%20bandung%20sd!5e0!3m2!1sid!2sid!4v1779544725349!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" />
                Jl. Batanghari No.9, Rampal Celaket, Kec. Klojen, Kota Malang, Jawa Timur 65111
              </p>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
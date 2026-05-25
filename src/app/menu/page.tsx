"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Menu() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("menu")
        .select("*")
        .order("id", { ascending: false });

      if (!error) {
        setMenuItems(data || []);
      } else {
        console.error("Gagal memuat menu:", error);
      }

      setIsLoading(false);
    };

    fetchMenu();
  }, []);

  const filteredMenu =
    filter === "Semua"
      ? menuItems
      : menuItems.filter((item) => item.kategori === filter);

  const getButtonClass = (btnFilter: string) => {
    if (filter === btnFilter) {
      return "bg-brand-orange text-white px-8 py-3 rounded-full font-semibold shadow-md transition-colors";
    }

    return "bg-white/50 backdrop-blur-sm border border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-brand-brown">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/roti bakar bandung.jpg"
            alt="Menu Banner"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Menu
          </h1>

          <p className="text-gray-300 text-sm">
            <Link href="/" className="hover:text-brand-orange">
              Home
            </Link>{" "}
            &gt; <span className="text-brand-orange">Menu</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter("Semua")}
              className={getButtonClass("Semua")}
            >
              Semua
            </button>

            <button
              onClick={() => setFilter("Roti Bakar")}
              className={getButtonClass("Roti Bakar")}
            >
              Roti Bakar
            </button>

            <button
              onClick={() => setFilter("Minuman")}
              className={getButtonClass("Minuman")}
            >
              Minuman
            </button>

            <button
              onClick={() => setFilter("Lainnya")}
              className={getButtonClass("Lainnya")}
            >
              Lainnya
            </button>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>

              <p className="text-gray-500 font-medium">
                Memuat Menu...
              </p>
            </div>
          ) : filteredMenu.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="font-medium text-lg mb-2">
                Belum ada menu di kategori ini.
              </p>

              <p className="text-sm">
                Silakan cek kategori lain atau tunggu update terbaru kami!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 group hover:shadow-xl hover:-translate-y-2 hover:scale-101 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100 shrink-0">
                    {item.gambar ? (
                      <Image
                        src={item.gambar}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-[11px] text-brand-orange mb-1 uppercase tracking-wider">
                      {item.kategori}
                    </h3>

                    <h4 className="font-bold text-lg text-brand-brown mb-2">
                      {item.nama}
                    </h4>

                    {item.deskripsi && (
                      <p className="text-gray-500 text-xs mb-3 flex-1 line-clamp-2">
                        {item.deskripsi}
                      </p>
                    )}

                    <p className="text-gray-700 mb-4 font-semibold text-base mt-auto">
                      Rp. {Number(item.harga).toLocaleString("id-ID")}
                    </p>

                    <a
                      href={`https://wa.me/+6281908618783?text=Halo%2C+saya+ingin+memesan+roti+bakar+${encodeURIComponent(
                        item.nama
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-block text-center bg-brand-orange hover:bg-brand-orange-hover text-white py-2 rounded-lg text-sm font-semibold transition-colors mt-auto"
                    >
                      Pesan Sekarang
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
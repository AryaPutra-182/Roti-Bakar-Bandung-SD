import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export const revalidate = 0;

export default async function Home() {
  // Ambil 3 menu terbaru untuk Menu Favorit
  const { data: menuFavorit } = await supabase.from('menu').select('*').order('id', { ascending: false }).limit(3);
  const favoritItems = menuFavorit || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center bg-brand-brown">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/roti%20bakar%20bandung.jpg"
            alt="Roti Bakar Bandung SD"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/90 via-brand-brown/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-5 mb-4">
              <div className="relative w-24 h-24 flex-shrink-0 drop-shadow-2xl">
                <Image
                  src="/ROTI.png"
                  alt="Logo Roti Bakar Bandung SD"
                  fill
                  sizes="96px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="font-logo text-4xl md:text-5xl text-white mb-1 text-shadow-sm leading-tight">
                  Roti Bakar Bandung SD
                </h1>
                <p className="text-brand-orange font-semibold text-base md:text-lg italic">
                  kreasi rasa yang tak terlupakan
                </p>
              </div>
            </div>
            <p className="text-gray-200 mb-8 text-sm md:text-base leading-relaxed max-w-lg">
              Roti bakar spesial yang dibuat dengan bahan premium, disajikan hangat dengan berbagai pilihan topping lezat yang siap memanjakan lidah Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg"
              >
                Lihat Menu
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%2C+saya+ingin+memesan+Roti+Bakar"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg text-center"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Favorit Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-brown mb-12">
            Menu Favorit Kami
          </h2>
          
          {favoritItems.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada menu favorit yang ditambahkan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {favoritItems.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-gray-100 shrink-0">
                    {item.gambar ? (
                      <Image
                        src={item.gambar}
                        alt={item.nama}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl text-brand-brown mb-2">{item.nama}</h3>
                    {item.deskripsi && (
                      <p className="text-gray-500 text-sm mb-4 flex-1">{item.deskripsi}</p>
                    )}
                    <p className="text-gray-600 mb-6 font-semibold text-lg mt-auto">
                      Rp. {Number(item.harga).toLocaleString("id-ID")}
                    </p>
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%2C+saya+ingin+memesan+${encodeURIComponent(item.nama)}+dengan+harga+Rp+${Number(item.harga).toLocaleString("id-ID")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-block text-center bg-brand-orange hover:bg-brand-orange-hover text-white py-3 rounded-xl font-semibold transition-colors mt-auto"
                    >
                      Pesan Sekarang
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-block bg-brand-orange hover:bg-brand-orange-hover text-white px-10 py-4 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg"
            >
              Lihat Menu Selengkapnya
            </Link>
          </div>
        </div>
      </section>

      {/* Kenapa Memilih Kami Section */}
      <section className="py-20 bg-brand-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Kenapa Memilih Kami ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/20 rounded-2xl p-8 text-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-brand-orange">Bahan Premium</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Kami hanya menggunakan roti pilihan dan topping berkualitas tinggi untuk menjamin cita rasa terbaik.
              </p>
            </div>
            <div className="border border-white/20 rounded-2xl p-8 text-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-brand-orange">Higienis &amp; Bersih</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Proses pemanggangan dilakukan dengan standar kebersihan tinggi untuk kepuasan Anda.
              </p>
            </div>
            <div className="border border-white/20 rounded-2xl p-8 text-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-brand-orange">Layanan Cepat</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Pesanan Anda akan disiapkan dengan cepat tanpa mengurangi kualitas rasa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

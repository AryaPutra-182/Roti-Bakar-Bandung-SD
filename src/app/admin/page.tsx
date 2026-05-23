"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaUtensils, FaChartLine, FaTimes } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import toast, { Toaster } from "react-hot-toast";

type MenuItem = {
  id: number | null;
  nama: string;
  kategori: string;
  harga: number | string;
  gambar?: string;
  deskripsi?: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MenuItem>({
    id: null,
    nama: "",
    kategori: "Roti Bakar",
    harga: "",
    gambar: "",
    deskripsi: ""
  });

  // Fetch from Supabase
  const fetchMenu = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('menu').select('*').order('id', { ascending: false });
    
    if (error) {
      console.error(error);
      // Fallback ke data statis jika belum ada tabel di Supabase
      if (menuItems.length === 0) {
         setMenuItems([
          { id: 1, nama: "Roti Bakar Coklat Keju", kategori: "Roti Bakar", harga: 20000, gambar: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=800&q=80", deskripsi: "Roti bakar spesial" },
          { id: 2, nama: "Es Teh Manis", kategori: "Minuman", harga: 5000, gambar: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=500&q=80", deskripsi: "Es teh segar" }
        ]);
      }
    } else {
      setMenuItems(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const openAddModal = () => {
    setFormData({ id: null, nama: "", kategori: "Roti Bakar", harga: "", gambar: "", deskripsi: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setImageFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalImageUrl = formData.gambar || "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=800&q=80";

    try {
      // 1. Upload Gambar jika ada file yang dipilih
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('menu-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(`Gagal upload gambar: ${uploadError.message}`);
        }

        // Dapatkan URL publik gambar
        const { data: { publicUrl } } = supabase.storage
          .from('menu-images')
          .getPublicUrl(filePath);
          
        finalImageUrl = publicUrl;
      }

      const payload = {
        nama: formData.nama,
        kategori: formData.kategori,
        harga: parseInt(formData.harga.toString()),
        gambar: finalImageUrl,
        deskripsi: formData.deskripsi
      };

      // 2. Simpan ke database
      if (formData.id) {
        // Update
        const { error } = await supabase.from('menu').update(payload).eq('id', formData.id);
        if (error) throw error;
        toast.success("Menu berhasil diperbarui!");
      } else {
        // Insert
        const { error } = await supabase.from('menu').insert([payload]);
        if (error) throw error;
        toast.success("Menu baru berhasil ditambahkan!");
      }
      
      closeModal();
      fetchMenu();
    } catch (error: any) {
      toast.error(`Error: ${error.message || 'Pastikan tabel menu dan bucket menu-images sudah dibuat di Supabase'}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        const { error } = await supabase.from('menu').delete().eq('id', id);
        if (error) throw error;
        toast.success("Menu berhasil dihapus!");
        fetchMenu();
      } catch (error: any) {
        toast.error(`Gagal menghapus: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-brand-brown text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-logo text-3xl">
            Roti Bakar
          </Link>
          <p className="text-xs text-brand-orange mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === "dashboard" ? "bg-white/10 text-brand-orange" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <FaChartLine />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab("menu")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === "menu" ? "bg-white/10 text-brand-orange" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <FaUtensils />
            <span className="font-medium">Kelola Menu</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <FaSignOutAlt />
            <span className="font-medium">Kembali ke Web</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab === "menu" ? "Kelola Menu" : "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Superadmin</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          
          {activeTab === "menu" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800 text-lg">Daftar Menu</h3>
                <button 
                  onClick={openAddModal}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
                >
                  <FaPlus />
                  Tambah Menu
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-semibold text-gray-600 text-sm">ID</th>
                      <th className="p-4 font-semibold text-gray-600 text-sm">Nama Menu</th>
                      <th className="p-4 font-semibold text-gray-600 text-sm">Kategori</th>
                      <th className="p-4 font-semibold text-gray-600 text-sm">Harga</th>
                      <th className="p-4 font-semibold text-gray-600 text-sm text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8 text-gray-500">Memuat data...</td>
                      </tr>
                    ) : menuItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8 text-gray-500">Belum ada menu yang ditambahkan.</td>
                      </tr>
                    ) : (
                      menuItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-gray-600 text-sm">#{item.id}</td>
                          <td className="p-4 font-medium text-gray-800 flex items-center gap-3">
                            {item.gambar && (
                              <img src={item.gambar} alt={item.nama} className="w-10 h-10 rounded-lg object-cover" />
                            )}
                            <div>
                              <p>{item.nama}</p>
                              {item.deskripsi && <p className="text-xs text-gray-500 font-normal truncate max-w-[150px]">{item.deskripsi}</p>}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                              {item.kategori}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 font-medium text-sm">
                            Rp. {Number(item.harga).toLocaleString("id-ID")}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => openEditModal(item)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id as number)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-brand-orange">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Menu</p>
                <p className="text-3xl font-bold text-gray-800">{menuItems.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
                <p className="text-sm font-medium text-gray-500 mb-1">Pesanan Hari Ini</p>
                <p className="text-3xl font-bold text-gray-800">12</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Pendapatan</p>
                <p className="text-3xl font-bold text-gray-800">Rp. 450.000</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="font-bold text-xl text-gray-800">
                {formData.id ? "Edit Menu" : "Tambah Menu Baru"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  placeholder="Contoh: Roti Bakar Nanas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange bg-white"
                >
                  <option value="Roti Bakar">Roti Bakar</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  placeholder="Contoh: 15000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  placeholder="Contoh: Roti bakar dengan selai nanas premium"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Menu</label>
                <div className="flex items-center gap-4">
                  {(imageFile || formData.gambar) && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex-shrink-0">
                      <img 
                        src={imageFile ? URL.createObjectURL(imageFile) : formData.gambar} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-500
                        file:mr-4 file:py-2.5 file:px-4
                        file:rounded-xl file:border-0
                        file:text-sm file:font-semibold
                        file:bg-brand-orange/10 file:text-brand-orange
                        hover:file:bg-brand-orange/20 cursor-pointer transition-colors"
                    />
                    <p className="text-xs text-gray-400 mt-1">Pilih file gambar dari perangkat Anda.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

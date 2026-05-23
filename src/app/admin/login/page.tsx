"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "../../../lib/supabase";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email atau password salah. Silakan coba lagi.");
      setIsLoading(false);
    } else {
      // Gunakan window.location agar cookie Supabase tersimpan sebelum pindah halaman
      window.location.href = '/admin';
    }
  };

  return (
    <div className="min-h-screen bg-brand-brown flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative logos */}
      <div className="absolute -top-10 -left-10 w-52 h-52 opacity-10">
        <Image src="/ROTI.png" alt="" fill sizes="208px" className="object-contain" />
      </div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10">
        <Image src="/ROTI.png" alt="" fill sizes="256px" className="object-contain" />
      </div>

      {/* Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-brand-brown px-8 py-8 text-center">
          <div className="flex justify-center mb-3">
            <div className="relative w-16 h-16">
              <Image src="/ROTI.png" alt="Logo" fill sizes="64px" className="object-contain drop-shadow-lg" />
            </div>
          </div>
          <h1 className="font-logo text-2xl text-white">Roti Bakar Bandung SD</h1>
          <p className="text-brand-orange text-xs mt-1 font-medium italic">Admin Panel</p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Masuk ke Dashboard</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@rotibakar.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3.5 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Hanya untuk pengelola Roti Bakar Bandung SD
          </p>
        </div>
      </div>
    </div>
  );
}

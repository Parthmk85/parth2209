"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#282C33] flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C778DD] opacity-5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#98C379] opacity-5 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#C778DD] bg-opacity-10 border border-[#C778DD] border-opacity-30 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-[#C778DD]/10">
            <Lock className="text-[#C778DD]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Access</h1>
          <p className="text-[#ABB2BF] mt-2">Enter your credentials to manage your portfolio</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C778DD] to-[#98C379] opacity-50"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-shake">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#ABB2BF] ml-1">Admin ID</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ABB2BF] group-focus-within:text-[#C778DD] transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter ID"
                  required
                  className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-[#ABB2BF]/50 focus:border-[#C778DD] focus:ring-1 focus:ring-[#C778DD]/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#ABB2BF] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ABB2BF] group-focus-within:text-[#C778DD] transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-[#ABB2BF]/50 focus:border-[#C778DD] focus:ring-1 focus:ring-[#C778DD]/30 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#C778DD] hover:bg-opacity-90 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#C778DD]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-[#ABB2BF] hover:text-[#C778DD] text-sm transition-colors flex items-center justify-center gap-2">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

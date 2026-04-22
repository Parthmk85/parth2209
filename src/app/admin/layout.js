"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, LogOut, Settings } from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] text-white flex font-sans selection:bg-[#C778DD]/30">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1A1C20] border-r border-[#ABB2BF] border-opacity-5 flex flex-col sticky top-0 h-screen z-50 shadow-2xl">
        <div className="p-8 flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#C778DD] to-[#61AFEF] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
               <span className="font-black text-white text-xl">P</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#98C379] border-2 border-[#1A1C20] rounded-full"></div>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight block">Portfolio</span>
            <span className="text-[10px] text-[#ABB2BF] uppercase tracking-widest font-black opacity-50">V2.0 Admin</span>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#ABB2BF]/10 to-transparent"></div>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-1.5">
          <p className="text-[10px] font-black text-[#ABB2BF] uppercase tracking-widest mb-4 opacity-50 ml-2">Core Dashboard</p>
          <Link href="/admin" className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 group ${
            pathname === "/admin" ? "bg-[#C778DD] text-white shadow-xl shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:bg-white/5 hover:text-white"
          }`}>
            <LayoutDashboard size={20} className={pathname === "/admin" ? "" : "group-hover:rotate-12 transition-transform"} />
            <span className="font-bold text-sm">Analytics</span>
          </Link>
          
          <p className="text-[10px] font-black text-[#ABB2BF] uppercase tracking-widest mt-8 mb-4 opacity-50 ml-2">Content Manager</p>
          <Link href="/admin/projects" className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 group ${
            pathname === "/admin/projects" ? "bg-[#C778DD] text-white shadow-xl shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:bg-white/5 hover:text-white"
          }`}>
            <FolderKanban size={20} className={pathname === "/admin/projects" ? "" : "group-hover:rotate-12 transition-transform"} />
            <span className="font-bold text-sm">Projects</span>
          </Link>
          <Link href="/admin/content" className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 group ${
            pathname === "/admin/content" ? "bg-[#C778DD] text-white shadow-xl shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:bg-white/5 hover:text-white"
          }`}>
            <FileText size={20} className={pathname === "/admin/content" ? "" : "group-hover:rotate-12 transition-transform"} />
            <span className="font-bold text-sm">Global Data</span>
          </Link>
        </nav>

        <div className="p-6">
          <div className="bg-[#282C33] rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#E06C75] opacity-5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#ABB2BF]/20 to-[#ABB2BF]/5 border border-white/10 flex items-center justify-center font-bold text-white shadow-inner">
                 P
               </div>
               <div>
                  <p className="text-xs font-black text-white">Parth Patel</p>
                  <p className="text-[10px] text-[#ABB2BF] font-medium">Owner / Dev</p>
               </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2.5 p-2.5 w-full rounded-xl bg-[#E06C75]/10 hover:bg-[#E06C75] text-[#E06C75] hover:text-white transition-all duration-300 text-xs font-black uppercase tracking-widest"
            >
              <LogOut size={14} />
              Logout Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-[#0D0F12]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-10 justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <div className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black text-[#ABB2BF] uppercase tracking-widest border border-white/5">
                Dashboard &gt; {pathname.split("/").pop() || "Analytics"}
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-xs font-bold text-[#ABB2BF]">
                <span className="w-2 h-2 bg-[#98C379] rounded-full animate-pulse"></span>
                System Live
             </div>
             <div className="w-px h-6 bg-white/10"></div>
             <div className="w-10 h-10 rounded-full bg-[#1A1C20] border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
                <Settings size={18} className="text-[#ABB2BF]" />
             </div>
          </div>
        </header>

        <main className="flex-1 p-10 overflow-y-auto bg-[#0D0F12]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

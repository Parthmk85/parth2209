"use client";

import React, { useState, useEffect } from "react";
import { 
  FolderKanban, 
  FileText, 
  User, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  Layout
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Mon", views: 400, inquiries: 24 },
  { name: "Tue", views: 300, inquiries: 13 },
  { name: "Wed", views: 900, inquiries: 98 },
  { name: "Thu", views: 1480, inquiries: 39 },
  { name: "Fri", views: 1890, inquiries: 48 },
  { name: "Sat", views: 2390, inquiries: 38 },
  { name: "Sun", views: 3490, inquiries: 43 },
];

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjectCount(data.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Projects", value: loading ? "..." : projectCount.toString(), icon: FolderKanban, color: "#C778DD", change: projectCount > 0 ? `+${projectCount}` : "0" },
    { label: "Monthly Views", value: "12.4k", icon: User, color: "#98C379", change: "+18%" },
    { label: "New Inquiries", value: "24", icon: MessageSquare, color: "#E06C75", change: "+5" },
    { label: "Site Health", value: "98%", icon: TrendingUp, color: "#61AFEF", change: "Stable" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white tracking-tight">Portfolio Analytics</h1>
          <p className="text-[#ABB2BF] flex items-center gap-2">
            <Clock size={16} />
            Last updated: Just now
          </p>
        </div>
        <div className="flex gap-3">
           <button className="bg-[#282C33] border border-[#ABB2BF] border-opacity-20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-80 transition-all flex items-center gap-2">
             Download Report
           </button>
           <button className="bg-[#C778DD] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[#C778DD]/20">
             Live View
             <ArrowUpRight size={16} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-20 p-6 rounded-2xl hover:border-[#C778DD] hover:border-opacity-40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C778DD] opacity-[0.02] rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center justify-between mb-4">
              <div 
                className="p-3 rounded-xl bg-opacity-10 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: stat.color, color: stat.color }}
              >
                <stat.icon size={24} />
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${stat.change.startsWith("+") ? "text-[#98C379] bg-[#98C379]/10" : "text-[#ABB2BF] bg-[#ABB2BF]/10"}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-white tabular-nums">{stat.value}</h3>
            <p className="text-[#ABB2BF] text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1A1C20] border border-[#ABB2BF] border-opacity-20 p-6 rounded-2xl shadow-xl">
           <div className="flex justify-between items-center mb-8">
             <div>
               <h3 className="text-xl font-bold text-white">Engagement Overview</h3>
               <p className="text-[#ABB2BF] text-sm">Website traffic and interaction over time</p>
             </div>
             <select className="bg-[#282C33] border border-[#ABB2BF] border-opacity-20 text-white rounded-lg px-3 py-1 text-sm outline-none">
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
             </select>
           </div>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data}>
                 <defs>
                   <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#C778DD" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#C778DD" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ABB2BF" opacity={0.1} vertical={false} />
                 <XAxis 
                    dataKey="name" 
                    stroke="#ABB2BF" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                 <YAxis 
                    stroke="#ABB2BF" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val}`}
                  />
                 <Tooltip 
                   contentStyle={{ backgroundColor: "#1A1C20", border: "1px solid rgba(171, 178, 191, 0.2)", borderRadius: "12px" }}
                   itemStyle={{ color: "#C778DD" }}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#C778DD" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                  />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Layout size={20} className="text-[#C778DD]" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-4">
               <button className="p-4 bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-xl hover:border-[#C778DD] hover:bg-[#C778DD]/5 transition-all flex items-center gap-4 group">
                  <div className="p-3 bg-[#C778DD] bg-opacity-10 rounded-xl text-[#C778DD] group-hover:scale-110 transition-transform">
                    <FolderKanban size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold block text-white">New Project</span>
                    <span className="text-xs text-[#ABB2BF]">Add to portfolio</span>
                  </div>
               </button>
               <button className="p-4 bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-xl hover:border-[#98C379] hover:bg-[#98C379]/5 transition-all flex items-center gap-4 group">
                  <div className="p-3 bg-[#98C379] bg-opacity-10 rounded-xl text-[#98C379] group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold block text-white">Edit Content</span>
                    <span className="text-xs text-[#ABB2BF]">Update site text</span>
                  </div>
               </button>
            </div>
          </div>

          <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-20 p-6 rounded-2xl">
             <h3 className="text-xl font-bold mb-6 text-white">System Logs</h3>
             <div className="space-y-4">
                {[
                  { user: "Parth", action: "Updated Hero Text", time: "2m ago", color: "#C778DD" },
                  { user: "System", action: "Backup Completed", time: "1h ago", color: "#98C379" },
                  { user: "Parth", action: "Deleted ChertNodes", time: "3h ago", color: "#E06C75" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ backgroundColor: `${log.color}20`, color: log.color }}>
                      {log.user[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{log.action}</p>
                      <p className="text-[10px] text-[#ABB2BF]">{log.time}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

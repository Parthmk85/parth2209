"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon, 
  Loader2, 
  Search, 
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  FolderKanban
} from "lucide-react";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tech: "",
    link: "",
    order: 0,
    showOnHome: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (error) {
      showNotification("Failed to fetch projects", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
    const method = editingProject ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({ title: "", description: "", image: "", tech: "", link: "", order: 0, showOnHome: false });
        fetchProjects();
        showNotification(editingProject ? "Project updated!" : "Project created!");
      }
    } catch (error) {
      showNotification("Operation failed", "error");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech,
      link: project.link,
      order: project.order || 0,
      showOnHome: project.showOnHome || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    // Removed blocking native confirm() to ensure smooth operation
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
        showNotification("Project deleted", "success");
      }
    } catch (error) {
      showNotification("Failed to delete project", "error");
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Notifications */}
      {notification && (
        <div className={`fixed top-8 right-8 z-[100] p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 ${
          notification.type === "success" ? "bg-[#98C379] text-white" : "bg-[#E06C75] text-white"
        }`}>
          {notification.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{notification.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Project Management</h1>
          <p className="text-[#ABB2BF]">Curate and organize your best work for the world to see.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProject(null);
            setFormData({ title: "", description: "", image: "", tech: "", link: "", order: 0, showOnHome: false });
            setIsModalOpen(true);
          }}
          className="bg-[#C778DD] hover:bg-opacity-90 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#C778DD]/20 font-bold"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ABB2BF]" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or tech..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-xl py-2 pl-12 pr-4 text-white focus:border-[#C778DD] outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-[#282C33] border border-[#ABB2BF] border-opacity-10 text-[#ABB2BF] px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:text-white transition-all">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <div className="text-[#ABB2BF] text-sm flex items-center px-4 bg-[#282C33] rounded-xl border border-[#ABB2BF] border-opacity-10">
            {filteredProjects.length} Projects
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#C778DD] border-opacity-20 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-[#C778DD] border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <span className="text-[#ABB2BF] font-medium animate-pulse">Syncing with database...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-[#1A1C20] border border-dashed border-[#ABB2BF] border-opacity-20 rounded-3xl py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 bg-[#282C33] rounded-full flex items-center justify-center mb-6 text-[#ABB2BF]">
             <FolderKanban size={40} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
          <p className="text-[#ABB2BF] max-w-xs mx-auto mb-8">Try adjusting your search or add a new project to get started.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[#C778DD] font-bold hover:underline"
          >
            Create your first project →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-3xl overflow-hidden group hover:border-[#C778DD] hover:border-opacity-40 transition-all duration-300 flex flex-col shadow-xl">
              <div className="h-56 bg-[#282C33] relative overflow-hidden">
                <img 
                  src={project.image || null} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/282c33/abb2bf?text=Image+Not+Found"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 gap-3">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-white text-black py-2 rounded-xl font-bold text-sm hover:bg-[#C778DD] hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="p-2.5 bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                   {project.showOnHome && (
                     <div className="bg-[#C778DD] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        Home
                     </div>
                   )}
                   <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest">
                     Order: {project.order}
                   </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-[#C778DD] transition-colors line-clamp-1">{project.title}</h3>
                  <p className="text-[#ABB2BF] text-sm line-clamp-2 mt-2 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(",").map(t => (
                    <span key={t} className="text-[10px] font-bold bg-[#C778DD]/10 text-[#C778DD] px-2.5 py-1 rounded-lg border border-[#C778DD]/20">
                      {t.trim()}
                    </span>
                  ))}
                </div>

                <div className="pt-4 mt-auto flex items-center justify-between border-t border-[#ABB2BF] border-opacity-10">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="text-xs font-bold text-[#ABB2BF] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={14} />
                    View Live Site
                  </a>
                  <span className="text-[10px] text-[#ABB2BF] opacity-50 uppercase tracking-tighter">
                    Last updated {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-20 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-[#ABB2BF] border-opacity-10 bg-[#282C33] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C778DD] bg-opacity-10 rounded-lg text-[#C778DD]">
                  {editingProject ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {editingProject ? "Refine Project" : "New Portfolio Project"}
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-[#ABB2BF] hover:text-white p-2 hover:bg-white/5 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] ml-1">Project Title</label>
                    <input 
                      name="title" value={formData.title} onChange={handleInputChange} required
                      className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] focus:ring-1 focus:ring-[#C778DD]/20 outline-none transition-all placeholder:text-[#ABB2BF]/30"
                      placeholder="e.g. Minimalist Dashboard"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] ml-1">Tech Stack (CSV)</label>
                    <input 
                      name="tech" value={formData.tech} onChange={handleInputChange} required
                      className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] focus:ring-1 focus:ring-[#C778DD]/20 outline-none transition-all placeholder:text-[#ABB2BF]/30"
                      placeholder="Next.js, Tailwind, Prisma"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] ml-1">Display Order</label>
                    <input 
                      name="order" type="number" value={formData.order} onChange={handleInputChange}
                      className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] ml-1">Live URL</label>
                    <input 
                      name="link" value={formData.link} onChange={handleInputChange} required
                      className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all placeholder:text-[#ABB2BF]/30"
                      placeholder="https://your-project.com"
                    />
                  </div>
                </div>
              </div>

              {/* Show on Home Page Toggle */}
              <div className="bg-[#282C33] p-6 rounded-2xl border border-[#ABB2BF] border-opacity-10 flex items-center justify-between group hover:border-[#C778DD] transition-all">
                <div className="space-y-1">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    Show on Home Page
                    <span className="bg-[#C778DD]/10 text-[#C778DD] text-[10px] px-2 py-0.5 rounded-full uppercase">Featured</span>
                  </h4>
                  <p className="text-[#ABB2BF] text-xs">If enabled, this project will appear in the "featured projects" section on the home page.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="showOnHome"
                    checked={formData.showOnHome} 
                    onChange={handleInputChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-[#1A1C20] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#ABB2BF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C778DD] peer-checked:after:bg-white"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] ml-1">Thumbnail Image</label>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ABB2BF] opacity-50" size={18} />
                      <input 
                        name="image" value={formData.image} onChange={handleInputChange} required
                        className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#C778DD] outline-none transition-all placeholder:text-[#ABB2BF]/30"
                        placeholder="Image URL or upload..."
                      />
                    </div>
                    <label className="bg-[#282C33] border border-[#ABB2BF] border-opacity-10 hover:border-[#C778DD] text-white px-6 py-4 rounded-2xl cursor-pointer transition-all flex items-center gap-2 group">
                      <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                      <span className="text-sm font-bold">Upload</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const formDataUpload = new FormData();
                            formDataUpload.append("file", file);
                            showNotification("Uploading...", "info");
                            try {
                              const res = await fetch("/api/upload", {
                                method: "POST",
                                body: formDataUpload
                              });
                              const data = await res.json();
                              if (data.url) {
                                setFormData(prev => ({ ...prev, image: data.url }));
                                showNotification("Upload complete!");
                              }
                            } catch (err) {
                              showNotification("Upload failed", "error");
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="w-full h-48 bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl overflow-hidden relative group/preview">
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
                    )}
                    {!formData.image && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ABB2BF] opacity-50">
                        <ImageIcon size={40} className="mb-2" />
                        <span className="text-xs uppercase tracking-widest font-bold">No Image Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] ml-1">Detailed Description</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleInputChange} required
                  className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all h-32 resize-none placeholder:text-[#ABB2BF]/30 leading-relaxed"
                  placeholder="Tell the story of this project, the challenges you solved, and the results achieved..."
                />
              </div>

              <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-[#C778DD] hover:bg-opacity-90 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#C778DD]/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  {editingProject ? "Confirm Changes" : "Publish Project"}
                </button>
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white/5 border border-[#ABB2BF] border-opacity-10 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

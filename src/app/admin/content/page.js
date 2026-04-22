"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  Loader2, 
  Info, 
  Layout, 
  User as UserIcon, 
  Smartphone, 
  CheckCircle2,
  Eye,
  Star,
  Quote,
  Settings
} from "lucide-react";

export default function ContentAdmin() {
  const [content, setContent] = useState({
    hero: { heading: "", subtext: "", image: "" },
    about: { text1: "", text2: "", text3: "", image: "" },
    skills: [],
    socials: { whatsapp: "", instagram: "", email: "parth@domain.com" },
    reviews: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      const formatted = {
        hero: { heading: "", subtext: "", image: "" },
        about: { text1: "", text2: "", text3: "", image: "" },
        skills: [],
        socials: { whatsapp: "", instagram: "", email: "" },
        reviews: []
      };
      
      data.forEach(item => {
        formatted[item.section] = item.data;
      });
      
      setContent(formatted);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...content.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setContent(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkillCategory = () => {
    setContent(prev => ({
      ...prev,
      skills: [...(prev.skills || []), { title: "", skills: "" }]
    }));
  };

  const removeSkillCategory = (index) => {
    const newSkills = content.skills.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, skills: newSkills }));
  };

  const handleReviewChange = (index, field, value) => {
    const newReviews = [...(content.reviews || [])];
    newReviews[index] = { ...newReviews[index], [field]: value };
    setContent(prev => ({ ...prev, reviews: newReviews }));
  };

  const addReview = () => {
    setContent(prev => ({
      ...prev,
      reviews: [...(prev.reviews || []), { name: "", feedback: "", productLink: "", stars: 5 }]
    }));
  };

  const removeReview = (index) => {
    const newReviews = (content.reviews || []).filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, reviews: newReviews }));
  };

  const handleSave = async (section) => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          data: content[section]
        }),
      });
      if (res.ok) {
        showNotification(`${section.toUpperCase()} updated successfully!`);
      }
    } catch (error) {
      console.error("Failed to save content:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
      <div className="w-12 h-12 border-4 border-[#C778DD] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-[#ABB2BF] font-medium">Loading content models...</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 font-mono">
      {/* Notifications */}
      {notification && (
        <div className="fixed top-8 right-8 z-[100] bg-[#98C379] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <CheckCircle2 size={20} />
          <span className="font-bold">{notification}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Global Content</h1>
          <p className="text-[#ABB2BF] mt-2">Manage all the static text and media across your portfolio.</p>
        </div>
        <div className="flex bg-[#1A1C20] p-1.5 rounded-2xl border border-[#ABB2BF] border-opacity-10 shadow-lg">
          <button 
            onClick={() => setActiveTab("hero")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "hero" ? "bg-[#C778DD] text-white shadow-lg shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:text-white"
            }`}
          >
            <Smartphone size={18} />
            Hero
          </button>
          <button 
            onClick={() => setActiveTab("about")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "about" ? "bg-[#C778DD] text-white shadow-lg shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:text-white"
            }`}
          >
            <UserIcon size={18} />
            About
          </button>
          <button 
            onClick={() => setActiveTab("skills")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "skills" ? "bg-[#C778DD] text-white shadow-lg shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:text-white"
            }`}
          >
            <Layout size={18} />
            Skills
          </button>
          <button 
            onClick={() => setActiveTab("socials")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "socials" ? "bg-[#C778DD] text-white shadow-lg shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:text-white"
            }`}
          >
            <Settings size={18} />
            Socials
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "reviews" ? "bg-[#C778DD] text-white shadow-lg shadow-[#C778DD]/20" : "text-[#ABB2BF] hover:text-white"
            }`}
          >
            <Star size={18} />
            Reviews
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Editor Side */}
        <div className="xl:col-span-2 space-y-8">
          {activeTab === "hero" ? (
            <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#ABB2BF] border-opacity-10 bg-[#282C33]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C778DD]/10 rounded-xl text-[#C778DD]">
                    <Smartphone size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Hero Configuration</h3>
                </div>
                <button 
                  onClick={() => handleSave("hero")}
                  disabled={saving}
                  className="bg-[#C778DD] hover:bg-opacity-90 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-[#C778DD]/20"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF] flex items-center gap-2">
                    Main Headline
                    <Info size={14} className="opacity-50" />
                  </label>
                  <input 
                    value={content.hero.heading} 
                    onChange={(e) => handleChange("hero", "heading", e.target.value)}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all text-lg font-medium"
                    placeholder="Enter your hero headline..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Hero Subtext</label>
                  <textarea 
                    value={content.hero.subtext} 
                    onChange={(e) => handleChange("hero", "subtext", e.target.value)}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all h-32 resize-none leading-relaxed"
                    placeholder="Write a brief, engaging subheadline..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Hero Image</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <input 
                        value={content.hero.image} 
                        onChange={(e) => handleChange("hero", "image", e.target.value)}
                        className="flex-1 bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all"
                        placeholder="Image URL or upload..."
                      />
                      <label className="bg-[#282C33] border border-[#ABB2BF] border-opacity-10 hover:border-[#C778DD] text-white px-6 py-4 rounded-2xl cursor-pointer transition-all flex items-center gap-2 group">
                        <Save size={18} className="group-hover:scale-110 transition-transform" />
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
                              showNotification("Uploading hero image...");
                              try {
                                const res = await fetch("/api/upload", {
                                  method: "POST",
                                  body: formDataUpload
                                });
                                const data = await res.json();
                                if (data.url) {
                                  handleChange("hero", "image", data.url);
                                  showNotification("Hero image uploaded!");
                                }
                              } catch (err) {
                                showNotification("Upload failed");
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="w-full h-64 bg-[#282C33] rounded-3xl overflow-hidden border border-[#ABB2BF] border-opacity-10 relative">
                      <img src={content.hero.image} alt="Hero Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
                      {!content.hero.image && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ABB2BF] opacity-50">
                          <Layout size={40} className="mb-2" />
                          <span className="text-xs uppercase tracking-widest font-bold">No Hero Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "about" ? (
            <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#ABB2BF] border-opacity-10 bg-[#282C33]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#98C379]/10 rounded-xl text-[#98C379]">
                    <UserIcon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Biography Details</h3>
                </div>
                <button 
                  onClick={() => handleSave("about")}
                  disabled={saving}
                  className="bg-[#98C379] hover:bg-opacity-90 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-[#98C379]/20"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save About
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Paragraph 1 (The Hook)</label>
                  <textarea 
                    value={content.about.text1} 
                    onChange={(e) => handleChange("about", "text1", e.target.value)}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#98C379] outline-none transition-all h-24 resize-none leading-relaxed"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Paragraph 2 (The Journey)</label>
                  <textarea 
                    value={content.about.text2} 
                    onChange={(e) => handleChange("about", "text2", e.target.value)}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#98C379] outline-none transition-all h-32 resize-none leading-relaxed"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Biography Image</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <input 
                        value={content.about.image} 
                        onChange={(e) => handleChange("about", "image", e.target.value)}
                        className="flex-1 bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#98C379] outline-none transition-all"
                        placeholder="Image URL or upload..."
                      />
                      <label className="bg-[#282C33] border border-[#ABB2BF] border-opacity-10 hover:border-[#98C379] text-white px-6 py-4 rounded-2xl cursor-pointer transition-all flex items-center gap-2 group">
                        <Save size={18} className="group-hover:scale-110 transition-transform" />
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
                              showNotification("Uploading biography image...");
                              try {
                                const res = await fetch("/api/upload", {
                                  method: "POST",
                                  body: formDataUpload
                                });
                                const data = await res.json();
                                if (data.url) {
                                  handleChange("about", "image", data.url);
                                  showNotification("Biography image uploaded!");
                                }
                              } catch (err) {
                                showNotification("Upload failed");
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "socials" ? (
            <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#ABB2BF] border-opacity-10 bg-[#282C33]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C778DD]/10 rounded-xl text-[#C778DD]">
                    <Settings size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Social Media & Contacts</h3>
                </div>
                <button 
                  onClick={() => handleSave("socials")}
                  disabled={saving}
                  className="bg-[#C778DD] hover:bg-opacity-90 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-[#C778DD]/20"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Socials
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">WhatsApp Number</label>
                  <input 
                    value={content.socials.whatsapp} 
                    onChange={(e) => setContent(prev => ({ ...prev, socials: { ...prev.socials, whatsapp: e.target.value }}))}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all"
                    placeholder="e.g. 919876543210 (include country code without +)"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Instagram Username</label>
                  <input 
                    value={content.socials.instagram} 
                    onChange={(e) => setContent(prev => ({ ...prev, socials: { ...prev.socials, instagram: e.target.value }}))}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all"
                    placeholder="e.g. parth_dev"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#ABB2BF]">Public Email</label>
                  <input 
                    value={content.socials.email} 
                    onChange={(e) => setContent(prev => ({ ...prev, socials: { ...prev.socials, email: e.target.value }}))}
                    className="w-full bg-[#282C33] border border-[#ABB2BF] border-opacity-10 rounded-2xl p-4 text-white focus:border-[#C778DD] outline-none transition-all"
                    placeholder="e.g. contact@parth.com"
                  />
                </div>
              </div>
            </div>
          ) : activeTab === "reviews" ? (
            <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#ABB2BF] border-opacity-10 bg-[#282C33]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C778DD]/10 rounded-xl text-[#C778DD]">
                    <Quote size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Client Reviews</h3>
                </div>
                <button 
                  onClick={() => handleSave("reviews")}
                  disabled={saving}
                  className="bg-[#C778DD] hover:bg-opacity-90 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-[#C778DD]/20"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Reviews
                </button>
              </div>
              <div className="p-8 space-y-6">
                {(content.reviews || []).map((review, index) => (
                  <div key={index} className="bg-[#282C33] p-6 rounded-2xl border border-[#ABB2BF] border-opacity-10 space-y-4 relative group">
                    <button 
                      onClick={() => removeReview(index)}
                      className="absolute top-4 right-4 text-[#ABB2BF] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Remove
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF]">Client Name</label>
                        <input 
                          value={review.name}
                          onChange={(e) => handleReviewChange(index, "name", e.target.value)}
                          className="w-full bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-xl p-3 text-white focus:border-[#C778DD] outline-none"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF]">Product Link</label>
                        <input 
                          value={review.productLink}
                          onChange={(e) => handleReviewChange(index, "productLink", e.target.value)}
                          className="w-full bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-xl p-3 text-white focus:border-[#C778DD] outline-none"
                          placeholder="e.g. /projects/1 or https://..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF]">Client Feedback</label>
                      <textarea 
                        value={review.feedback}
                        onChange={(e) => handleReviewChange(index, "feedback", e.target.value)}
                        className="w-full bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-xl p-3 text-white focus:border-[#C778DD] outline-none h-24 resize-none"
                        placeholder="What did the client say?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF]">Review Video (Optional)</label>
                      <div className="flex gap-4">
                        <input 
                          value={review.video || ""} 
                          onChange={(e) => handleReviewChange(index, "video", e.target.value)}
                          className="flex-1 bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-xl p-3 text-white focus:border-[#C778DD] outline-none"
                          placeholder="Video URL or upload..."
                        />
                        <label className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 hover:border-[#C778DD] text-white px-6 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-2 group">
                          <Loader2 size={16} className="group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold">Upload Video</span>
                          <input 
                            type="file" 
                            accept="video/*" 
                            className="hidden" 
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const formDataUpload = new FormData();
                                formDataUpload.append("file", file);
                                showNotification("Uploading video review...");
                                try {
                                  const res = await fetch("/api/upload", {
                                    method: "POST",
                                    body: formDataUpload
                                  });
                                  const data = await res.json();
                                  if (data.url) {
                                    handleReviewChange(index, "video", data.url);
                                    showNotification("Video review uploaded!");
                                  }
                                } catch (err) {
                                  showNotification("Upload failed");
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                      {review.video && (
                        <div className="mt-2 text-[10px] text-green-500 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Video linked successfully
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF] mr-2">Rating:</label>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star}
                          onClick={() => handleReviewChange(index, "stars", star)}
                          className={`transition-colors ${review.stars >= star ? "text-yellow-500" : "text-[#ABB2BF] opacity-30"}`}
                        >
                          <Star size={16} fill={review.stars >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addReview}
                  className="w-full border-2 border-dashed border-[#ABB2BF] border-opacity-20 py-4 rounded-2xl text-[#ABB2BF] hover:border-[#C778DD] hover:text-[#C778DD] transition-all font-bold text-sm"
                >
                  + Add Client Review
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#ABB2BF] border-opacity-10 bg-[#282C33]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C778DD]/10 rounded-xl text-[#C778DD]">
                    <Layout size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Skills & Tech Stack</h3>
                </div>
                <button 
                  onClick={() => handleSave("skills")}
                  disabled={saving}
                  className="bg-[#C778DD] hover:bg-opacity-90 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-[#C778DD]/20"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Skills
                </button>
              </div>
              <div className="p-8 space-y-6">
                {(content.skills || []).map((skill, index) => (
                  <div key={index} className="bg-[#282C33] p-6 rounded-2xl border border-[#ABB2BF] border-opacity-10 space-y-4 relative group">
                    <button 
                      onClick={() => removeSkillCategory(index)}
                      className="absolute top-4 right-4 text-[#ABB2BF] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Remove
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF]">Category Title</label>
                        <input 
                          value={skill.title}
                          onChange={(e) => handleSkillChange(index, "title", e.target.value)}
                          className="w-full bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-xl p-3 text-white focus:border-[#C778DD] outline-none"
                          placeholder="e.g. Languages"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-tighter text-[#ABB2BF]">Skills (Comma Separated)</label>
                        <input 
                          value={skill.skills}
                          onChange={(e) => handleSkillChange(index, "skills", e.target.value)}
                          className="w-full bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 rounded-xl p-3 text-white focus:border-[#C778DD] outline-none"
                          placeholder="e.g. Python, JS, C++"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addSkillCategory}
                  className="w-full border-2 border-dashed border-[#ABB2BF] border-opacity-20 py-4 rounded-2xl text-[#ABB2BF] hover:border-[#C778DD] hover:text-[#C778DD] transition-all font-bold text-sm"
                >
                  + Add Skill Category
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Side */}
        <div className="space-y-6">
           <div className="bg-[#282C33] border border-[#ABB2BF] border-opacity-10 p-6 rounded-3xl space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <Eye size={18} className="text-[#C778DD]" />
                Live Preview
              </h4>
              <div className="bg-[#1A1C20] rounded-2xl border border-white/5 overflow-hidden">
                <div className="h-4 bg-[#282C33] flex items-center px-3 gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-6 space-y-4">
                  {activeTab === "hero" ? (
                    <>
                      <div className="h-6 bg-[#C778DD]/20 rounded-lg w-full"></div>
                      <div className="h-6 bg-[#C778DD]/20 rounded-lg w-2/3"></div>
                      <div className="space-y-2 pt-4">
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-full"></div>
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-full"></div>
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-1/2"></div>
                      </div>
                      <div className="w-24 h-8 border border-[#C778DD] rounded mt-4"></div>
                    </>
                  ) : (
                    <>
                      <div className="h-4 bg-[#98C379]/20 rounded-lg w-1/3 mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-full"></div>
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-full"></div>
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-3/4"></div>
                      </div>
                      <div className="space-y-3 pt-4">
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-full"></div>
                        <div className="h-2 bg-[#ABB2BF]/10 rounded-full w-1/2"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
           </div>

           <div className="bg-[#1A1C20] border border-[#ABB2BF] border-opacity-10 p-6 rounded-3xl">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#ABB2BF] mb-4 flex items-center gap-2">
                <Settings size={18} />
                Information
              </h4>
              <p className="text-xs text-[#ABB2BF] leading-relaxed">
                Updating content here will reflect across all devices instantly. 
                <br/><br/>
                <strong>Tip:</strong> Use short, impactful sentences for better readability on mobile devices.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

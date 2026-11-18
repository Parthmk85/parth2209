"use client";

import { useRef, useState } from "react";

const field = "w-full bg-transparent border border-[#ABB2BF] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#C778DD]";
const lbl = "block text-xs font-bold uppercase tracking-widest text-[#ABB2BF] mb-3";

export default function Job() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ state: "idle" });
  const input = useRef(null);

  async function submit(e) {
    e.preventDefault();
    if (!file) return setStatus({ state: "error", error: "Please attach your resume." });
    if (file.size > 5 * 1024 * 1024) return setStatus({ state: "error", error: "Resume must be under 5 MB." });

    setStatus({ state: "sending" });
    const body = new FormData();
    body.append("name", name);
    body.append("resume", file);
    try {
      const res = await fetch("/api/job", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus({ state: "done" });
    } catch (err) {
      setStatus({ state: "error", error: err.message });
    }
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-24 py-8 max-w-xl">
        <header className="flex items-center gap-2 font-bold text-lg mb-12">
          <img src="/ezcods-mark-light.png" alt="" className="h-6 w-auto" />
          <span>EZcods IT Solutions</span>
        </header>

        <h1 className="text-3xl font-semibold mb-2">
          <span className="text-[#C778DD]">#</span>join-us
        </h1>
        <p className="text-[#ABB2BF] mb-10">Send us your resume. If there&apos;s a fit, we&apos;ll get in touch.</p>

        {status.state === "done" ? (
          <div className="border border-[#C778DD] p-6" role="status">
            <p className="text-lg font-medium mb-2">Thanks, {name.split(" ")[0]}!</p>
            <p className="text-[#ABB2BF]">We&apos;ve received your resume and will reach out if there&apos;s a match.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <div>
              <label htmlFor="name" className={lbl}>Your name</label>
              <input id="name" required minLength={2} maxLength={80} value={name} onChange={(e) => setName(e.target.value)}
                className={field} autoComplete="name" />
            </div>

            <div>
              <label htmlFor="resume" className={lbl}>Resume <span className="normal-case font-normal">(PDF or Word, max 5 MB)</span></label>
              <input ref={input} id="resume" type="file" accept=".pdf,.doc,.docx" className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              <button type="button" onClick={() => input.current?.click()}
                className={`w-full border border-dashed px-4 py-8 text-sm transition-colors ${
                  file ? "border-[#C778DD] bg-[#C778DD]/10 text-white" : "border-[#ABB2BF]/60 text-[#ABB2BF] hover:border-[#C778DD] hover:text-white"}`}>
                {file ? <>📄 {file.name} <span className="block text-xs text-[#ABB2BF] mt-1">Tap to change</span></> : "⬆ Tap to upload your resume"}
              </button>
            </div>

            {status.state === "error" && <p className="text-red-400 text-sm" role="alert">{status.error}</p>}

            <button type="submit" disabled={status.state === "sending"}
              className="w-full bg-[#C778DD] text-white py-3 px-8 font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
              {status.state === "sending" ? "Uploading…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

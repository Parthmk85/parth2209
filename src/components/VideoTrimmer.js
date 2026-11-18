"use client";

import { useEffect, useRef, useState } from "react";
import { Scissors, Play, Pause } from "lucide-react";

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}.${String(Math.floor((s % 1) * 10))}`;

/**
 * Trim handles for an uploaded clip.
 *
 * The two handles are plain range inputs stacked on one track — keyboard and
 * touch support come free, which a hand-rolled drag handle would have to earn.
 * Scrubbing only seeks the preview; nothing is re-encoded until Apply, so the
 * admin can move the handles as much as they like for free.
 */
export default function VideoTrimmer({ src, onTrimmed }) {
  const video = useRef(null);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // A fresh file resets the window; otherwise the old handles would linger over
  // a clip of a different length.
  useEffect(() => {
    setDuration(0);
    setStart(0);
    setEnd(0);
    setError("");
  }, [src]);

  function onMeta() {
    const d = video.current?.duration;
    if (Number.isFinite(d) && d > 0) {
      setDuration(d);
      setStart(0);
      setEnd(d);
    }
  }

  // Keep playback inside the window so the handles show what will be kept.
  function onTime() {
    const v = video.current;
    if (!v) return;
    if (v.currentTime >= end) {
      v.currentTime = start;
      if (!playing) v.pause();
    }
  }

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      if (v.currentTime < start || v.currentTime >= end) v.currentTime = start;
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function seek(to) {
    const v = video.current;
    if (v) v.currentTime = to;
  }

  async function apply() {
    if (busy || duration <= 0) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/trim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: src, start, end }),
      });
      const d = await res.json();
      if (!res.ok || !d.url) {
        setError(d.error ?? "Could not trim that video.");
        return;
      }
      onTrimmed(d.url, d.seconds);
    } catch {
      setError("Network problem. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const pct = (v) => (duration ? (v / duration) * 100 : 0);
  const changed = duration > 0 && (start > 0.05 || end < duration - 0.05);

  return (
    <div className="mt-3 rounded-2xl border border-[#ABB2BF] border-opacity-10 bg-black/30 p-3">
      <video
        ref={video}
        src={src}
        onLoadedMetadata={onMeta}
        onTimeUpdate={onTime}
        onEnded={() => setPlaying(false)}
        className="w-full max-h-56 object-contain rounded-xl bg-black"
        muted
        playsInline
      />

      {duration > 0 && (
        <>
          <div className="relative h-9 mt-3">
            {/* Track, with the kept window highlighted. */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/10" />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-[#C778DD]"
              style={{ left: `${pct(start)}%`, width: `${pct(end - start)}%` }}
            />
            <input
              type="range" min={0} max={duration} step={0.05} value={start}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), end - 0.3);
                setStart(v);
                seek(v);
              }}
              aria-label="Trim start"
              className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-auto trim-range"
            />
            <input
              type="range" min={0} max={duration} step={0.05} value={end}
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), start + 0.3);
                setEnd(v);
                seek(Math.max(start, v - 0.15));
              }}
              aria-label="Trim end"
              className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-auto trim-range"
            />
          </div>

          <div className="flex items-center justify-between gap-3 mt-1">
            <button type="button" onClick={toggle} className="flex items-center gap-2 text-xs text-[#ABB2BF] hover:text-white transition-colors">
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? "Pause" : "Preview"}
            </button>
            <span className="text-xs text-[#ABB2BF] tabular-nums">
              {fmt(start)} &rarr; {fmt(end)} &nbsp;·&nbsp;
              <span className="text-white">{(end - start).toFixed(1)}s</span>
              <span className="text-[#ABB2BF]/50"> of {duration.toFixed(1)}s</span>
            </span>
          </div>

          {error && <p className="text-xs text-[#ff8080] mt-2">{error}</p>}

          <button
            type="button"
            onClick={apply}
            disabled={!changed || busy}
            className={`mt-3 w-full rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              changed && !busy
                ? "bg-[#C778DD] text-white hover:bg-opacity-90"
                : "bg-white/5 text-[#ABB2BF]/50 cursor-not-allowed"
            }`}
          >
            <Scissors size={16} />
            {busy ? "Trimming…" : changed ? `Cut to ${(end - start).toFixed(1)}s` : "Move a handle to trim"}
          </button>
        </>
      )}
    </div>
  );
}

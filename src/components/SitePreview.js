"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * The card preview, in priority order:
 *
 *   1. an uploaded video   — plays in place, behind a play button
 *   2. an uploaded image
 *   3. the live site in an iframe, when it allows being framed
 *   4. a server-rendered screenshot
 *
 * The admin never has to supply anything: 3 and 4 need only the URL. Uploading
 * is the override for when neither looks right.
 */
export default function SitePreview({ url, framable, media, mediaType, title }) {
  const holder = useRef(null);
  const video = useRef(null);
  const loaded = useRef(false);
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [scale, setScale] = useState(0);

  // Load on approach: a page of these would otherwise pull several whole
  // websites, or launch several screenshots, at once.
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /**
   * The frame renders at a fixed desktop width and is then scaled to whatever
   * the card actually is. Measuring instead of hard-coding the factor is the
   * whole fix for the zoomed-in previews: one fixed scale is only ever correct
   * at one card width, and the cards are fluid.
   */
  const measure = useCallback(() => {
    const el = holder.current;
    if (el) setScale(el.clientWidth / 1280);
  }, []);

  useEffect(() => {
    if (!show) return;
    measure();
    const ro = new ResizeObserver(measure);
    if (holder.current) ro.observe(holder.current);
    return () => ro.disconnect();
  }, [show, measure]);

  // A site that claims to be framable but isn't leaves the frame blank with no
  // catchable error, so treat "never loaded" as failure.
  useEffect(() => {
    if (!show || !framable || failed || media) return;
    const t = setTimeout(() => setFailed(!loaded.current), 6000);
    return () => clearTimeout(t);
  }, [show, framable, failed, media]);

  const isVideo = media && mediaType === "video";
  const shot = url ? `/api/preview?url=${encodeURIComponent(url)}` : null;

  return (
    <div ref={holder} className="w-full h-full overflow-hidden bg-[#1e2126] relative">
      {isVideo ? (
        <>
          <video
            ref={video}
            src={media}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          {!playing && (
            <button
              type="button"
              aria-label={`Play preview of ${title}`}
              onClick={(e) => {
                // The card is a link; playing must not navigate away.
                e.preventDefault();
                e.stopPropagation();
                video.current?.play();
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/20 transition-colors"
            >
              <span className="w-12 h-12 rounded-full bg-[#C778DD] text-white flex items-center justify-center shadow-lg">
                <Play size={20} fill="currentColor" />
              </span>
            </button>
          )}
        </>
      ) : media ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={media} alt={title} loading="lazy" className="w-full h-full object-cover object-top" />
      ) : (
        <>
          {show && framable && !failed && scale > 0 && (
            <iframe
              src={url}
              title={title}
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
              aria-hidden="true"
              onLoad={() => {
                loaded.current = true;
              }}
              style={{
                width: "1280px",
                height: `${Math.ceil(1280 * 0.625)}px`,
                border: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
              sandbox="allow-scripts allow-same-origin"
            />
          )}
          {show && (!framable || failed) && shot && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={shot}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

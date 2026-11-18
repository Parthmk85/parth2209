// parthdev.in only: 3D floating envelope that opens to reveal the
// "Message us here" letter (WhatsApp / Instagram / Email links). Rendered by
// src/app/page.js in place of the plain contact card; ezcods.com keeps the card.
//
// Pure CSS, no JS: it opens on hover, keyboard focus (any link inside, or the
// toggle) or a tap/click, which checks a visually hidden checkbox so it stays
// open on touch devices. Deliberately not scroll-triggered. Everything is
// sized in cqw so it scales with its column. The links stay in the DOM (and
// in tab order) the whole time; focusing one opens the envelope.

const CSS = `
.pd-ce { container-type: inline-size; position: relative; width: 100%; aspect-ratio: 1 / 1.19; perspective: 900px; }
.pd-ce * { box-sizing: border-box; }
.pd-ce-toggle { position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none; }
.pd-ce-glow { position: absolute; left: 4%; right: 4%; bottom: 6%; height: 70%; border-radius: 50%;
  background: radial-gradient(closest-side, rgb(242 140 170 / .38), transparent 75%); filter: blur(3cqw); }
.pd-ce-shadow { position: absolute; left: 14%; right: 14%; bottom: 0; height: 7cqw; border-radius: 50%;
  background: radial-gradient(closest-side, rgb(107 30 51 / .32), transparent); animation: pd-ce-shadow 6s ease-in-out infinite; }

/* the floating envelope (everything below moves together) */
.pd-ce-float { position: absolute; left: 0; right: 0; bottom: 7cqw; height: 64cqw; transform-style: preserve-3d;
  animation: pd-ce-float 6s ease-in-out infinite; }
/* Inside the 3D (preserve-3d) envelope, paint order and hit testing follow
   depth, not z-index, so each layer gets an explicit translateZ:
   back 0 < letter 1px < front pocket 2px < closed flap 3px; once open the
   flap folds flat (180deg) to -2px, behind the rising letter. */
.pd-ce-back { position: absolute; inset: 0; border-radius: 3cqw; transform: translateZ(0);
  background: linear-gradient(180deg, #e3a1b4 0%, #eeb8c7 55%, #f3c7d3 100%);
  box-shadow: 0 3cqw 7cqw -2cqw rgb(107 30 51 / .4), 0 0 5cqw rgb(242 140 170 / .35); }

/* the letter: the real contact links */
.pd-ce-letter { position: absolute; left: 6cqw; right: 6cqw; top: 3.5cqw; height: 58cqw; z-index: 2;
  padding: 5cqw 5.5cqw 4cqw; border-radius: 2.2cqw;
  background: linear-gradient(180deg, #fffdfd, #fff4f7); box-shadow: 0 1cqw 3cqw rgb(107 30 51 / .18);
  transform: translateY(0) translateZ(1px); pointer-events: none;
  transition: transform .9s cubic-bezier(.22, 1, .36, 1) .25s; }
.pd-ce-letter h4 { margin: 0 0 3.6cqw; font: 600 5.6cqw/1.2 "Playfair Display", Georgia, serif; color: #3a1a22; }
.pd-ce-links { display: flex; flex-direction: column; gap: 2.6cqw; }
.pd-ce-links a { display: flex; align-items: center; gap: 3cqw; min-width: 0; font: 500 4.7cqw/1.2 Inter, system-ui, sans-serif; color: #6b1e33;
  text-decoration: none; transition: color .25s ease; }
.pd-ce-links a:hover, .pd-ce-links a:focus-visible { color: #c4556a; outline: none; }
.pd-ce-links a:focus-visible .pd-ce-ico { box-shadow: 0 0 0 2px #c4556a; }
.pd-ce-ico { flex: none; display: grid; place-items: center; width: 9.6cqw; height: 9.6cqw; border: 1px solid #e8c9d0; border-radius: 1.6cqw; background: #fff; transition: border-color .25s ease; }
.pd-ce-links a:hover .pd-ce-ico { border-color: #c4556a; }
.pd-ce-ico svg { width: 5cqw; height: 5cqw; }
.pd-ce-links span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pd-ce-links .pd-ce-mail { font-size: 3.9cqw; }

/* front pocket (V-shaped top edge) with fold seams */
.pd-ce-front { position: absolute; inset: 0; z-index: 3; border-radius: 3cqw; pointer-events: none; transform: translateZ(2px);
  clip-path: polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%);
  background:
    linear-gradient(to top right, transparent calc(50% - .5px), rgb(255 255 255 / .55) 50%, transparent calc(50% + .5px)) left bottom / 50% 42% no-repeat,
    linear-gradient(to top left, transparent calc(50% - .5px), rgb(255 255 255 / .55) 50%, transparent calc(50% + .5px)) right bottom / 50% 42% no-repeat,
    linear-gradient(170deg, #fbe3ea 0%, #f6cfda 60%, #efbccb 100%);
  box-shadow: inset 0 -1.5cqw 3cqw rgb(196 85 106 / .15); }

/* flap with a wax seal; folds open toward the back */
.pd-ce-flap { position: absolute; left: -1px; right: -1px; top: -1px; height: 61%; z-index: 4; /* overlaps the front's edge: no seam */ transform-origin: top center;
  transform: translateZ(3px) rotateX(0deg); transform-style: preserve-3d; pointer-events: none;
  transition: transform .7s cubic-bezier(.6, 0, .3, 1), z-index 0s linear .35s; }
.pd-ce-flap::before { content: ""; position: absolute; inset: 0; clip-path: polygon(0 0, 100% 0, 50% 100%); border-radius: 3cqw 3cqw 0 0;
  background: linear-gradient(180deg, #f7d3dd, #ecaec0); filter: drop-shadow(0 1cqw 1cqw rgb(107 30 51 / .25)); }
.pd-ce-flap::after { content: ""; position: absolute; left: 50%; top: 100%; width: 10cqw; height: 10cqw; translate: -50% -78%; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #e46b8c, #b8405f 70%); box-shadow: 0 0 0 .8cqw rgb(255 255 255 / .35), 0 0 3cqw rgb(228 107 140 / .7);
  transition: opacity .3s ease; }

/* tap/click target over the closed envelope + hint */
.pd-ce-hit { position: absolute; left: 0; right: 0; bottom: 7cqw; height: 64cqw; z-index: 5; cursor: pointer; border-radius: 3cqw; }
.pd-ce-hint { position: absolute; left: 0; right: 0; bottom: -1cqw; text-align: center; font: 500 3.6cqw/1 Inter, system-ui, sans-serif;
  letter-spacing: .04em; color: #9c5a6a; transition: opacity .4s ease; }
.pd-ce-hint::before { content: "Hover to open"; }
@media (hover: none) { .pd-ce-hint::before { content: "Tap to open"; } }

/* open: flap folds back, letter rises out with a gentle paper sway */
.pd-ce:is(:hover, :focus-within, :has(.pd-ce-toggle:checked)) .pd-ce-flap { transform: translateZ(-2px) rotateX(180deg); z-index: 1; transition: transform .7s cubic-bezier(.6, 0, .3, 1), z-index 0s linear .2s; }
.pd-ce:is(:hover, :focus-within, :has(.pd-ce-toggle:checked)) .pd-ce-flap::after { opacity: 0; }
.pd-ce:is(:hover, :focus-within, :has(.pd-ce-toggle:checked)) .pd-ce-letter { transform: translateY(-44cqw) translateZ(1px); pointer-events: auto; }
.pd-ce:is(:hover, :focus-within, :has(.pd-ce-toggle:checked)) .pd-ce-letter .pd-ce-paper { animation: pd-ce-sway 5s ease-in-out 1.1s infinite; }
/* while open, the click/tap target shrinks to the front pocket (below the
   letter's links): clicking the envelope body pins it open / closes it again */
.pd-ce:is(:hover, :focus-within, :has(.pd-ce-toggle:checked)) .pd-ce-hit { height: 36cqw; }
/* Once opened it stays open (parthdev-sections-fx.js latches the checkbox
   until the page is reloaded), so the pocket no longer toggles it shut. */
.pd-ce:has(.pd-ce-toggle:checked) .pd-ce-hit { pointer-events: none; }
.pd-ce-instant, .pd-ce-instant * { transition: none !important; }
.pd-ce:is(:hover, :focus-within, :has(.pd-ce-toggle:checked)) .pd-ce-hint { opacity: 0; }
.pd-ce-paper { transform-origin: 50% 100%; }
.pd-ce-toggle:focus-visible ~ .pd-ce-hit { outline: 2px solid #c4556a; outline-offset: 4px; }

@keyframes pd-ce-float { 0%, 100% { transform: translateY(0) rotateX(6deg) rotateZ(-1.2deg) } 50% { transform: translateY(-2.4cqw) rotateX(9deg) rotateZ(.8deg) } }
@keyframes pd-ce-shadow { 0%, 100% { transform: scaleX(1); opacity: .9 } 50% { transform: scaleX(.86); opacity: .6 } }
@keyframes pd-ce-sway { 0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-1.4deg) translateY(-.6cqw) } }
@media (prefers-reduced-motion: reduce) {
  .pd-ce-float, .pd-ce-shadow, .pd-ce-paper { animation: none !important; }
  .pd-ce-flap, .pd-ce-letter { transition: none !important; }
}
`;

const ICON = {
  wa: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  ig: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  em: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
};

export default function ContactEnvelope({ socials = {} }) {
  const links = [
    socials.whatsapp && { k: "wa", href: `https://wa.me/${socials.whatsapp}`, label: "WhatsApp", ext: true },
    socials.instagram && { k: "ig", href: `https://instagram.com/${socials.instagram}`, label: "Instagram", ext: true },
    socials.email && { k: "em", href: `mailto:${socials.email}`, label: socials.email, mail: true },
  ].filter(Boolean);

  return (
    <div className="w-full max-w-[22rem] mx-auto lg:mr-0">
      <style>{CSS}</style>
      <div className="pd-ce">
        <input id="pd-ce-open" type="checkbox" className="pd-ce-toggle" aria-label="Open the contact envelope" autoComplete="off" />
        <div className="pd-ce-glow" aria-hidden="true" />
        <div className="pd-ce-shadow" aria-hidden="true" />
        <div className="pd-ce-float">
          <div className="pd-ce-back" aria-hidden="true" />
          <div className="pd-ce-letter">
            <div className="pd-ce-paper">
              <h4>Message us here</h4>
              <div className="pd-ce-links">
                {links.map((l) => (
                  <a key={l.k} href={l.href} {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <span className="pd-ce-ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[l.k]}</svg>
                    </span>
                    <span className={l.mail ? "pd-ce-mail" : undefined}>{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pd-ce-front" aria-hidden="true" />
          <div className="pd-ce-flap" aria-hidden="true" />
        </div>
        <label htmlFor="pd-ce-open" className="pd-ce-hit" aria-hidden="true" />
        <div className="pd-ce-hint" aria-hidden="true" />
      </div>
    </div>
  );
}

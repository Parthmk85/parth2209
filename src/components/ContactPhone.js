// parthdev.in only: floating 3D smartphone in the centre of the Contact
// section (rendered by src/app/page.js between the text and the message box;
// ezcods.com keeps its two-column layout). CSS 3D, sized in cqw so it scales
// with its column. The phone, rings and podium are decorative (aria-hidden);
// the three glass icons are real links to the same WhatsApp / Instagram /
// email targets as the message box. Mouse parallax + off-screen pausing come
// from public/parthdev-sections-fx.js (sets --mx/--my, toggles .pd-cp-off).

const CSS = `
.pd-cp { container-type: inline-size; position: relative; width: 100%; aspect-ratio: 1 / 1.06; perspective: 1100px; --mx: 0; --my: 0; }
.pd-cp * { box-sizing: border-box; }
.pd-cp-stage { position: absolute; inset: 0; transform-style: preserve-3d;
  transform: rotateY(calc(var(--mx) * 8deg)) rotateX(calc(var(--my) * -6deg)); }
.pd-cp-layer { position: absolute; transform-style: preserve-3d;
  transform: translate3d(calc(var(--mx) * var(--d) * 2.4cqw), calc(var(--my) * var(--d) * 1.8cqw), calc(var(--d) * 4cqw)); }

/* ambient glow + podium */
.pd-cp-aura { position: absolute; left: 12%; right: 12%; top: 10%; height: 72%; border-radius: 50%;
  background: radial-gradient(closest-side, rgb(242 140 170 / .45), transparent 75%); filter: blur(3cqw); }
.pd-cp-podium { left: 22%; bottom: 3%; width: 56cqw; height: 15cqw; --d: .3; }
.pd-cp-podium i { position: absolute; inset: 0; border-radius: 50%; }
.pd-cp-podium i:nth-child(1) { background: radial-gradient(closest-side, #f6d3dd, #e7a9b9 70%, #c97f93); box-shadow: 0 2.4cqw 5cqw -1cqw rgb(107 30 51 / .45); }
.pd-cp-podium i:nth-child(2) { inset: 10% 8%; border: .5cqw solid rgb(255 255 255 / .9); box-shadow: 0 0 2.4cqw #f28caa, inset 0 0 2cqw #f28caa; animation: pd-cp-pulse 3.2s ease-in-out infinite; }
.pd-cp-podium i:nth-child(3) { inset: 26% 22%; border: .35cqw solid rgb(255 255 255 / .75); box-shadow: 0 0 1.6cqw #f28caa; animation: pd-cp-pulse 3.2s 1.6s ease-in-out infinite; }

/* orbital rings with travelling light dots */
.pd-cp-ring { position: absolute; left: 50%; top: 52%; border-radius: 50%; translate: -50% -50%;
  border: .35cqw solid rgb(255 255 255 / .75); box-shadow: 0 0 1.4cqw rgb(242 140 170 / .9), inset 0 0 1.4cqw rgb(242 140 170 / .6); }
.pd-cp-ring.r1 { width: 94cqw; height: 34cqw; rotate: -16deg; }
.pd-cp-ring.r2 { width: 74cqw; height: 24cqw; rotate: 12deg; opacity: .6; }
.pd-cp-ring b { position: absolute; width: 2.2cqw; height: 2.2cqw; border-radius: 50%; background: #fff; box-shadow: 0 0 1.6cqw 0.5cqw #f28caa;
  offset-path: ellipse(50% 50% at 50% 50%); offset-rotate: 0deg; animation: pd-cp-orbit 9s linear infinite; }
.pd-cp-ring b:nth-child(2) { animation-delay: -4.5s; }
.pd-cp-ring.r2 b { animation-duration: 12s; animation-direction: reverse; }

/* phone */
.pd-cp-phone { left: 30%; top: 5%; width: 40cqw; --d: 1; }
.pd-cp-float { animation: pd-cp-float 7s ease-in-out infinite; }
.pd-cp-tilt { transform-style: preserve-3d; animation: pd-cp-turn 9s ease-in-out infinite alternate; }
.pd-cp-body { position: relative; aspect-ratio: 9 / 18.6; border-radius: 6.4cqw; padding: 1.5cqw;
  background: linear-gradient(135deg, #f7c9d6 0%, #d98aa0 35%, #f3bccb 55%, #b8667f 100%);
  box-shadow: 0 0 0 .3cqw rgb(255 255 255 / .55), 0 0 4cqw rgb(242 140 170 / .55), 2cqw 5cqw 7cqw -2cqw rgb(74 19 34 / .55); }
.pd-cp-screen { position: relative; height: 100%; border-radius: 5cqw; overflow: hidden; padding: 3.4cqw 2.6cqw 2.6cqw;
  background: linear-gradient(170deg, #8e2f4d 0%, #6b1e33 45%, #4a1322 100%);
  font-family: Inter, system-ui, sans-serif; color: #fff; display: flex; flex-direction: column; }
.pd-cp-screen::before { content: ""; position: absolute; top: 1.4cqw; left: 50%; translate: -50% 0; width: 13cqw; height: 3cqw; border-radius: 2cqw; background: #2a0b15; }
.pd-cp-screen::after { content: ""; position: absolute; inset: -30% -60%; pointer-events: none;
  background: linear-gradient(105deg, transparent 42%, rgb(255 255 255 / .16) 50%, transparent 58%); animation: pd-cp-gloss 7s ease-in-out infinite; }
.pd-cp-status { display: flex; justify-content: space-between; font-size: 2.1cqw; font-weight: 600; opacity: .9; padding: 0 1.2cqw; }
.pd-cp-title { margin: 4.2cqw 0 1.2cqw; text-align: center; font-size: 3.7cqw; font-weight: 700; font-style: italic; }
.pd-cp-rule { width: 6cqw; height: .4cqw; margin: 0 auto 3cqw; border-radius: 1cqw; background: rgb(255 255 255 / .35); }
.pd-cp-msgs { flex: 1; display: flex; flex-direction: column; gap: 2.2cqw; }
.pd-cp-msg { max-width: 82%; padding: 1.7cqw 2.2cqw; border-radius: 2.4cqw; font-size: 2.45cqw; font-weight: 600; font-style: italic; line-height: 1.25;
  opacity: 0; transform-origin: right bottom; animation: pd-cp-msg 10s cubic-bezier(.3, 1.4, .5, 1) infinite; }
.pd-cp-msg.in { align-self: flex-end; background: #fbe8ee; color: #3a1a22; border-bottom-right-radius: .6cqw; }
.pd-cp-msg.out { align-self: flex-end; background: linear-gradient(135deg, #e0457a, #c42f62); color: #fff; border-bottom-right-radius: .6cqw; box-shadow: 0 0 2cqw rgb(224 69 122 / .55); }
.pd-cp-msg:nth-child(1) { animation-delay: .4s; } .pd-cp-msg:nth-child(2) { animation-delay: 1.9s; } .pd-cp-msg:nth-child(3) { animation-delay: 3.4s; }
.pd-cp-typing { align-self: flex-start; display: flex; gap: .8cqw; padding: 1.6cqw 2cqw; border-radius: 2.4cqw; background: rgb(255 255 255 / .14); }
.pd-cp-typing i { width: 1.2cqw; height: 1.2cqw; border-radius: 50%; background: #fbe8ee; animation: pd-cp-dot 1.2s ease-in-out infinite; }
.pd-cp-typing i:nth-child(2) { animation-delay: .15s; } .pd-cp-typing i:nth-child(3) { animation-delay: .3s; }
.pd-cp-input { display: flex; align-items: center; justify-content: space-between; margin-top: 2cqw; padding: 1.6cqw 2.4cqw; border-radius: 3cqw;
  background: #fbe8ee; color: #8a5a66; font-size: 2.2cqw; font-style: italic; }
.pd-cp-input svg { width: 3cqw; height: 3cqw; color: #6b1e33; }

/* glass icons (real links) */
.pd-cp-icon { --d: 1.8; }
.pd-cp-icon a { display: grid; place-items: center; width: 17cqw; aspect-ratio: 1; border-radius: 4.4cqw; color: #fff;
  background: linear-gradient(145deg, rgb(255 255 255 / .55), rgb(232 137 159 / .55) 45%, rgb(196 85 106 / .7));
  border: .3cqw solid rgb(255 255 255 / .7);
  box-shadow: inset 0 .6cqw 1.2cqw rgb(255 255 255 / .6), 0 0 3cqw rgb(242 140 170 / .55), 0 3cqw 5cqw -2cqw rgb(107 30 51 / .5);
  transition: transform .3s ease, box-shadow .3s ease; }
.pd-cp-icon a:hover, .pd-cp-icon a:focus-visible { transform: scale(1.08); box-shadow: inset 0 .6cqw 1.2cqw rgb(255 255 255 / .7), 0 0 4.5cqw rgb(242 140 170 / .85), 0 3cqw 5cqw -2cqw rgb(107 30 51 / .5); outline: none; }
.pd-cp-icon svg { width: 9cqw; height: 9cqw; filter: drop-shadow(0 .3cqw .6cqw rgb(107 30 51 / .4)); }
.pd-cp-wa { left: 4%; top: 22%; } .pd-cp-wa a { rotate: -10deg; }
.pd-cp-ig { right: 3%; top: 12%; --d: 2.2; } .pd-cp-ig a { rotate: 9deg; }
.pd-cp-em { right: 7%; top: 56%; --d: 2; } .pd-cp-em a { rotate: -7deg; }
.pd-cp-wa .pd-cp-float { animation-duration: 8s; animation-delay: -2s; }
.pd-cp-ig .pd-cp-float { animation-duration: 9s; animation-delay: -4s; }
.pd-cp-em .pd-cp-float { animation-duration: 7.5s; animation-delay: -1s; }

@keyframes pd-cp-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-2.4cqw) } }
@keyframes pd-cp-turn { 0% { transform: rotateY(-20deg) rotateX(7deg) rotateZ(-5deg) } 100% { transform: rotateY(-6deg) rotateX(4deg) rotateZ(-2deg) } }
@keyframes pd-cp-gloss { 0%, 55% { transform: translateX(-40%) } 100% { transform: translateX(40%) } }
@keyframes pd-cp-msg { 0% { opacity: 0; transform: scale(.6) translateY(1.5cqw) } 5%, 84% { opacity: 1; transform: none } 92%, 100% { opacity: 0; transform: scale(.9) } }
@keyframes pd-cp-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .5 } 30% { transform: translateY(-.8cqw); opacity: 1 } }
@keyframes pd-cp-orbit { to { offset-distance: 100% } }
@keyframes pd-cp-pulse { 0%, 100% { opacity: .75 } 50% { opacity: 1 } }

.pd-cp-off * { animation-play-state: paused !important; }
@media (prefers-reduced-motion: reduce) {
  .pd-cp *, .pd-cp-stage { animation: none !important; }
  .pd-cp-msg { opacity: 1; }
}
`;

const I = {
  wa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 20.5l1.3-3.9A8.5 8.5 0 1 1 8 19.6z" />
      <path d="M9.2 8.6c.3-.6.6-.7 1-.6l.6 1.5c.1.3 0 .5-.2.7l-.5.5c.5 1 1.3 1.8 2.3 2.3l.5-.5c.2-.2.4-.3.7-.2l1.5.6c.1.4 0 .7-.6 1-.8.4-1.8.3-3-.4a7 7 0 0 1-2.6-2.6c-.7-1.2-.8-2.2-.4-3z" fill="currentColor" stroke="none" />
    </svg>
  ),
  ig: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  em: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </svg>
  ),
};

export default function ContactPhone({ socials = {} }) {
  const links = [
    socials.whatsapp && { k: "wa", href: `https://wa.me/${socials.whatsapp}`, label: "WhatsApp", ext: true },
    socials.instagram && { k: "ig", href: `https://instagram.com/${socials.instagram}`, label: "Instagram", ext: true },
    socials.email && { k: "em", href: `mailto:${socials.email}`, label: "Email" },
  ].filter(Boolean);

  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:w-[40%] lg:max-w-none">
      <style>{CSS}</style>
      <div className="pd-cp">
        <div className="pd-cp-aura" aria-hidden="true" />
        <div className="pd-cp-stage">
          <div className="pd-cp-layer pd-cp-podium" aria-hidden="true"><i /><i /><i /></div>
          <div aria-hidden="true">
            <div className="pd-cp-ring r1"><b /><b /></div>
            <div className="pd-cp-ring r2"><b /></div>
          </div>

          <div className="pd-cp-layer pd-cp-phone" aria-hidden="true">
            <div className="pd-cp-float">
              <div className="pd-cp-tilt">
                <div className="pd-cp-body">
                  <div className="pd-cp-screen">
                    <div className="pd-cp-status"><span>12:30</span><span>●●● ▮</span></div>
                    <div className="pd-cp-title">Let&apos;s Connect 👋</div>
                    <div className="pd-cp-rule" />
                    <div className="pd-cp-msgs">
                      <div className="pd-cp-msg in">Have a project idea? 💡</div>
                      <div className="pd-cp-msg in">Need a website or app?</div>
                      <div className="pd-cp-msg out">Let&apos;s discuss! 🚀</div>
                      <div className="pd-cp-typing"><i /><i /><i /></div>
                    </div>
                    <div className="pd-cp-input">
                      Type a message…
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {links.map((l) => (
            <div key={l.k} className={`pd-cp-layer pd-cp-icon pd-cp-${l.k}`}>
              <div className="pd-cp-float">
                <a href={l.href} aria-label={l.label} {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {I[l.k]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

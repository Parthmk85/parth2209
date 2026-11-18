// parthdev.in only: 3D developer workspace beside the Tech Stack cards.
// Rendered by src/app/page.js in place of the decorative column (ezcods.com
// keeps that column). Pure server-rendered HTML + CSS 3D; the mouse parallax
// and off-screen pausing live in public/parthdev-sections-fx.js, which sets
// --mx / --my (-1..1) on .pd-ws and toggles .pd-ws-off. Decorative only.
//
// Everything is sized in cqw (container width), so the whole scene scales
// with its column on every screen. Only transform / opacity / clip-path
// animate, and all loops pause while the section is off screen.

const CODE = [
  [["k", "import"], ["t", " { build } "], ["k", "from"], ["s", ' "ezcods"'], ["t", ";"]],
  [],
  [["k", "const"], ["v", " app"], ["t", " = "], ["f", "build"], ["t", "({"]],
  [["p", "  stack"], ["t", ": ["], ["s", '"Next.js"'], ["t", ", "], ["s", '"Node"'], ["t", "],"]],
  [["p", "  design"], ["t", ": "], ["s", '"pink & burgundy"'], ["t", ","]],
  [["p", "  ship"], ["t", ": "], ["k", "true"], ["t", ","]],
  [["t", "});"]],
  [],
  [["v", "app"], ["t", "."], ["f", "launch"], ["t", "(); "], ["c", "// ✓ live"]],
];

const CSS = `
.pd-ws { container-type: inline-size; position: relative; width: 100%; aspect-ratio: 5 / 6; perspective: 1000px; --mx: 0; --my: 0; }
.pd-ws * { box-sizing: border-box; }
.pd-ws-stage { position: absolute; inset: 0; transform-style: preserve-3d;
  transform: rotateY(calc(var(--mx) * 7deg)) rotateX(calc(var(--my) * -5deg)); }
.pd-ws-layer { position: absolute; transform-style: preserve-3d;
  transform: translate3d(calc(var(--mx) * var(--d) * 2.2cqw), calc(var(--my) * var(--d) * 1.6cqw), calc(var(--d) * 4cqw)); }

/* ambient light + floor glow */
.pd-ws-glow { position: absolute; left: 10%; right: 10%; top: 12%; height: 60%; border-radius: 50%;
  background: radial-gradient(closest-side, rgb(242 140 170 / .32), transparent 75%); filter: blur(2cqw); }
.pd-ws-floor { position: absolute; left: 8%; right: 8%; bottom: 3%; height: 14%; border-radius: 50%;
  background: radial-gradient(closest-side, rgb(242 140 170 / .25), transparent 70%); }

/* monitor */
.pd-ws-monitor { left: 9%; top: 14%; width: 82cqw; --d: 1; }
.pd-ws-float { animation: pd-ws-float 7s ease-in-out infinite; }
.pd-ws-screen { position: relative; aspect-ratio: 16 / 10.4; border-radius: 2.4cqw; padding: 1.6cqw;
  background: linear-gradient(160deg, #2a0f19, #170710); border: 1px solid rgb(242 184 197 / .38);
  box-shadow: 0 0 0 .5cqw rgb(20 4 10 / .9), 0 0 3cqw rgb(242 140 170 / .35), 0 4cqw 7cqw -2cqw rgb(10 2 6 / .8);
  transform: rotateY(-9deg) rotateX(4deg); }
.pd-ws-screen::after { content: ""; position: absolute; left: 12%; right: 12%; bottom: -.4cqw; height: .35cqw; border-radius: 1cqw;
  background: linear-gradient(90deg, transparent, #f2b8c5, transparent); box-shadow: 0 0 1.6cqw #f28caa; }
.pd-ws-bar { display: flex; gap: .9cqw; margin-bottom: 1.6cqw; }
.pd-ws-bar i { width: 1.3cqw; height: 1.3cqw; border-radius: 50%; background: rgb(242 184 197 / .35); }
.pd-ws-bar i:first-child { background: #e8899f; }
.pd-ws-code { font: 500 2.55cqw/1.65 ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; color: #e9c6ce; white-space: pre; }
.pd-ws-line { display: block; min-height: 1.65em; clip-path: inset(0 100% 0 0);
  animation: pd-ws-type 11s steps(18) infinite; animation-delay: calc(var(--i) * .55s); }
.pd-ws-k { color: #ff9fbf; } .pd-ws-s { color: #ffd2b8; } .pd-ws-f { color: #f6c7d3; font-weight: 700; }
.pd-ws-p { color: #d7a2ae; } .pd-ws-v { color: #fbe3ea; } .pd-ws-c { color: #b9868f; font-style: italic; }
.pd-ws-caret { display: inline-block; width: 1.1cqw; height: 2.6cqw; margin-left: .3cqw; vertical-align: -.5cqw; background: #f2b8c5;
  box-shadow: 0 0 1cqw #f28caa; animation: pd-ws-blink 1s steps(1) infinite; }
.pd-ws-neck { width: 7cqw; height: 6cqw; margin: -.2cqw auto 0; background: linear-gradient(90deg, #2a0f19, #4a1a2a, #2a0f19); transform: rotateY(-9deg); }
.pd-ws-base { width: 30cqw; height: 2.2cqw; margin: 0 auto; border-radius: 1.2cqw; background: linear-gradient(180deg, #4a1a2a, #22090f);
  box-shadow: 0 0 1.6cqw rgb(242 140 170 / .25); transform: rotateY(-9deg); }

/* keyboard */
.pd-ws-kbd { left: 14%; bottom: 9%; width: 72cqw; --d: .55; }
.pd-ws-keys { display: grid; grid-template-columns: repeat(12, 1fr); gap: .7cqw; padding: 1.6cqw; border-radius: 2cqw;
  background: linear-gradient(160deg, #2c1018, #1a070e); border: 1px solid rgb(242 184 197 / .28);
  box-shadow: 0 2.4cqw 4cqw -1cqw rgb(10 2 6 / .8), 0 0 2.2cqw rgb(242 140 170 / .18);
  transform: rotateX(58deg) rotateZ(-3deg); }
.pd-ws-keys i { aspect-ratio: 1; border-radius: .6cqw; background: linear-gradient(160deg, #4a1a2a, #2d0f19); box-shadow: inset 0 -.3cqw 0 rgb(0 0 0 / .35); }
.pd-ws-keys i.w { grid-column: span 5; aspect-ratio: auto; }
.pd-ws-keys i.hot { animation: pd-ws-key 2.6s ease-in-out infinite; }

/* holographic windows */
.pd-ws-holo { position: relative; border-radius: 1.8cqw; padding: 1.6cqw 1.8cqw;
  background: linear-gradient(135deg, rgb(242 184 197 / .17), rgb(196 85 106 / .08));
  border: 1px solid rgb(242 184 197 / .5); box-shadow: 0 0 2.4cqw rgb(242 140 170 / .35), inset 0 0 2cqw rgb(242 184 197 / .08);
  font: 500 2.2cqw/1.6 ui-monospace, Menlo, Consolas, monospace; color: #fbe3ea; }
.pd-ws-holo b { display: block; font-weight: 600; color: #f6c7d3; margin-bottom: .6cqw; letter-spacing: .02em; }
.pd-ws-holo .ok { color: #ffb3c8; }
.pd-ws-holo .dim { color: #c9939f; }
.pd-ws-term { left: -3%; top: 2%; width: 44cqw; --d: 1.7; }
.pd-ws-term .pd-ws-holo { transform: rotateY(20deg) rotateX(6deg); }
.pd-ws-api { right: -4%; top: 47%; width: 38cqw; --d: 2.1; }
.pd-ws-api .pd-ws-holo { transform: rotateY(-22deg) rotateX(4deg); }
.pd-ws-bars i { display: block; height: 1cqw; margin: .9cqw 0; border-radius: 1cqw; background: rgb(242 184 197 / .35); }
.pd-ws-term .pd-ws-float { animation-duration: 8.5s; animation-delay: -2s; }
.pd-ws-api .pd-ws-float { animation-duration: 9.5s; animation-delay: -5s; }
.pd-ws-kbd .pd-ws-float { animation-duration: 10s; animation-delay: -3s; }

/* shadows that tighten as things rise */
.pd-ws-shadow { margin: 2.4cqw auto 0; width: 70%; height: 3cqw; border-radius: 50%;
  background: radial-gradient(closest-side, rgb(8 1 4 / .6), transparent); animation: pd-ws-shadow 7s ease-in-out infinite; }

@keyframes pd-ws-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-2.2cqw) } }
@keyframes pd-ws-shadow { 0%, 100% { transform: scaleX(1); opacity: .9 } 50% { transform: scaleX(.82); opacity: .55 } }
@keyframes pd-ws-type { 0% { clip-path: inset(0 100% 0 0) } 9%, 78% { clip-path: inset(0 0 0 0) } 86%, 100% { clip-path: inset(0 100% 0 0) } }
@keyframes pd-ws-blink { 50% { opacity: 0 } }
@keyframes pd-ws-key { 0%, 70%, 100% { background: linear-gradient(160deg, #4a1a2a, #2d0f19); box-shadow: inset 0 -.3cqw 0 rgb(0 0 0 / .35) }
  80% { background: #e8899f; box-shadow: 0 0 1.4cqw #f28caa } }

.pd-ws-off .pd-ws-float, .pd-ws-off .pd-ws-line, .pd-ws-off .pd-ws-caret, .pd-ws-off .pd-ws-keys i, .pd-ws-off .pd-ws-shadow { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .pd-ws *, .pd-ws-stage { animation: none !important; transition: none !important; }
  .pd-ws-line { clip-path: none; }
}
`;

// Keys that light up as if being typed (indices into the 41-key grid).
const HOT = { 3: 0, 9: 0.4, 14: 0.9, 20: 1.3, 26: 1.8, 31: 2.2 };

export default function TechWorkspace() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] self-center md:w-1/3 md:max-w-none">
      <style>{CSS}</style>
      <div className="pd-ws" aria-hidden="true">
        <div className="pd-ws-glow" />
        <div className="pd-ws-floor" />
        <div className="pd-ws-stage">
          <div className="pd-ws-layer pd-ws-kbd">
            <div className="pd-ws-float">
              <div className="pd-ws-keys">
                {Array.from({ length: 41 }, (_, i) => (
                  <i key={i} className={i === 40 ? "w" : i in HOT ? "hot" : undefined} style={i in HOT ? { animationDelay: `${HOT[i]}s` } : undefined} />
                ))}
              </div>
            </div>
          </div>

          <div className="pd-ws-layer pd-ws-monitor">
            <div className="pd-ws-float">
              <div className="pd-ws-screen">
                <div className="pd-ws-bar"><i /><i /><i /></div>
                <div className="pd-ws-code">
                  {CODE.map((line, i) => (
                    <span key={i} className="pd-ws-line" style={{ "--i": i }}>
                      {line.map(([cls, txt], j) => (
                        <span key={j} className={`pd-ws-${cls}`}>{txt}</span>
                      ))}
                      {i === CODE.length - 1 && <span className="pd-ws-caret" />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pd-ws-neck" />
              <div className="pd-ws-base" />
            </div>
            <div className="pd-ws-shadow" />
          </div>

          <div className="pd-ws-layer pd-ws-term">
            <div className="pd-ws-float">
              <div className="pd-ws-holo">
                <b>terminal</b>
                <span className="dim">$</span> npm run build<br />
                <span className="ok">✓</span> compiled in 2.1s<br />
                <span className="ok">✓</span> deployed
              </div>
            </div>
          </div>

          <div className="pd-ws-layer pd-ws-api">
            <div className="pd-ws-float">
              <div className="pd-ws-holo">
                <b>api.status</b>
                <span className="dim">{"{"}</span> ok: <span className="ok">200</span> <span className="dim">{"}"}</span>
                <div className="pd-ws-bars"><i style={{ width: "86%" }} /><i style={{ width: "62%" }} /><i style={{ width: "74%" }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

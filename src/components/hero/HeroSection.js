import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

// parthdev.in homepage hero (rendered by src/app/page.js for that host only;
// ezcods.com keeps its CMS hero). Server component: no client JS.
// The previous 3D hero (HeroScene/DeveloperScene) is no longer used here.

const STATS = [
  ["50+", "Clients Served"],
  ["5+", "Team Members"],
  ["4+ Years", "HR & Operations Experience"],
];

const C = {
  bg: "#fcf0f4",
  ink: "#541228", // headings, stats
  accent: "#6b1532", // buttons
  rose: "#c93d63", // "at EZcods." (large text only)
  text: "#553c47",
  badge: "#f8d9e4",
  badgeText: "#831638",
};

// Opening sequence (< 1.8s), pure CSS so it starts on first paint with no JS:
//   0.15s  burgundy curtain splits open
//   0.55s  pink blob blooms, 0.75s portrait slides in
//   0.85s  header, then badge / heading / text / buttons / stats stagger in
// Scoped to this component (parthdev.in only); globals.css stays untouched.
// Plays on every full page load / reload. This inline script only runs on a
// real load (React doesn't execute it on client-side renders); once the intro
// has finished it marks <html>, so client-side navigations back home within
// the same page view skip it instead of replaying mid-session.
const INTRO_SEEN = `setTimeout(function(){document.documentElement.dataset.pdIntro="seen"},1900)`;

const EASE = "cubic-bezier(.22,.8,.24,1)";
const CSS = `
@keyframes pd-curtain-l { to { transform: translateX(-101%); visibility: hidden } }
@keyframes pd-curtain-r { to { transform: translateX(101%); visibility: hidden } }
@keyframes pd-seam { 0% { opacity: 0; transform: scaleY(0) } 40% { opacity: 1; transform: scaleY(1) } 100% { opacity: 0; transform: scaleY(1) } }
@keyframes pd-bloom { from { opacity: 0; transform: scale(.45) rotate(-8deg); filter: blur(14px) } }
@keyframes pd-slide { from { opacity: 0; transform: translateX(56px) } }
@keyframes pd-rise { from { opacity: 0; transform: translateY(18px) } }
@keyframes pd-rise-h1 { from { transform: translateY(18px) } }
@keyframes pd-breathe {
  0%, 100% { scale: 1;     border-radius: 58% 42% 38% 62% / 48% 38% 62% 52% }
  33%      { scale: 1.035; border-radius: 52% 48% 44% 56% / 55% 42% 58% 45% }
  66%      { scale: .985;  border-radius: 63% 37% 34% 66% / 44% 47% 53% 56% }
}

.pd-curtain { position: fixed; top: 0; bottom: 0; width: 50.5vw; z-index: 10000; pointer-events: none;
  background: linear-gradient(180deg, #5e1a2c 0%, #4a1322 100%); animation: .75s .15s cubic-bezier(.76,0,.24,1) both }
.pd-curtain-l { left: 0; animation-name: pd-curtain-l; box-shadow: inset -40px 0 60px -40px rgba(0,0,0,.35) }
.pd-curtain-r { right: 0; animation-name: pd-curtain-r; box-shadow: inset 40px 0 60px -40px rgba(0,0,0,.35) }
.pd-seam { position: fixed; top: 0; bottom: 0; left: 50%; width: 2px; margin-left: -1px; z-index: 10001; pointer-events: none;
  background: linear-gradient(180deg, transparent, #f2b8c5 50%, transparent); transform-origin: center;
  animation: pd-seam .5s ease-out both }

.pd-bloom { transform-origin: 60% 55%; animation: pd-bloom .8s .55s ${EASE} both }
/* Continuous breathing + morphing of the pink shape (inner layer, so the intro
   bloom on the outer layer and this loop never fight over a property). */
.pd-breathe { animation: pd-breathe 7s ease-in-out infinite; will-change: scale }

/* Liquid glass: inner rim light + depth shading, a drifting gloss reflection
   (::before) and a slow spotlight sweep (::after). All clipped to the shape's
   morphing outline; only transforms animate, so it stays on the compositor. */
@keyframes pd-gloss { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(6%, 4%) } }
@keyframes pd-sweep { 0% { transform: translateX(-60%) rotate(18deg) } 55%, 100% { transform: translateX(60%) rotate(18deg) } }
.pd-breathe {
  position: relative; overflow: hidden;
  box-shadow:
    inset 0 2px 1px rgba(255,255,255,.7),
    inset 22px 28px 46px -10px rgba(255,255,255,.42),
    inset -26px -34px 60px -12px rgba(176,72,104,.22);
}
.pd-breathe::before, .pd-breathe::after { content: ""; position: absolute; pointer-events: none }
.pd-breathe::before {
  inset: -10%;
  background:
    radial-gradient(ellipse 34% 22% at 32% 22%, rgba(255,255,255,.6), transparent 70%),
    radial-gradient(ellipse 22% 14% at 74% 80%, rgba(255,255,255,.28), transparent 70%);
  animation: pd-gloss 9s ease-in-out infinite;
}
.pd-breathe::after {
  top: -40%; bottom: -40%; left: 0; width: 100%;
  background: linear-gradient(90deg, transparent 34%, rgba(255,255,255,.12) 42%, rgba(255,255,255,.34) 50%, rgba(255,255,255,.12) 58%, transparent 66%);
  animation: pd-sweep 8s 1.6s cubic-bezier(.45,.05,.55,.95) infinite both;
}
.pd-portrait { animation: pd-slide .7s .75s ${EASE} both }
div:has(> .pd-hero) > header { animation: pd-rise .55s .85s ${EASE} both }
/* parthdev.in hides the shared brand header entirely; the hero then fills
   the first screen on its own (see min-height on .pd-hero). */
div:has(> .pd-hero) > header { display: none }
.hero-in > * { animation: pd-rise .55s ${EASE} both }
.hero-in > h1 { animation-name: pd-rise-h1 }
.hero-in > :nth-child(1) { animation-delay: .9s }  .hero-in > :nth-child(2) { animation-delay: .98s }
.hero-in > :nth-child(3) { animation-delay: 1.06s } .hero-in > :nth-child(4) { animation-delay: 1.14s }
.hero-in > :nth-child(5) { animation-delay: 1.22s }

html[data-pd-intro="seen"] .pd-curtain, html[data-pd-intro="seen"] .pd-seam { display: none }
html[data-pd-intro="seen"] :is(.pd-bloom, .pd-portrait, .hero-in > *, div:has(> .pd-hero) > header) { animation: none }
@media (prefers-reduced-motion: reduce) {
  .pd-curtain, .pd-seam, .pd-breathe::after { display: none }
  .pd-breathe::before,
  .pd-bloom, .pd-breathe, .pd-portrait, .hero-in > *, div:has(> .pd-hero) > header { animation: none }
}
`;

const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };

export default function HeroSection() {
  return (
    <section className="pd-hero relative mb-32 grid min-h-[calc(100svh-2rem)] min-[1600px]:mx-[calc((100%_-_min(100vw_-_12rem,110rem))/2)] content-center items-center gap-[clamp(2rem,5svh,3rem)] py-[clamp(1.5rem,6svh,4rem)] lg:grid-cols-[55fr_45fr] lg:gap-4 lg:py-[clamp(1rem,4svh,3rem)]">
      <style>{CSS}</style>
      <script dangerouslySetInnerHTML={{ __html: INTRO_SEEN }} />
      <div aria-hidden className="pd-curtain pd-curtain-l" />
      <div aria-hidden className="pd-curtain pd-curtain-r" />
      <div aria-hidden className="pd-seam" />
      {/* Full-bleed pink backdrop, reaching up behind the brand header. */}
      <div aria-hidden className="pointer-events-none absolute -top-44 -bottom-24 left-1/2 -z-10 w-screen -translate-x-1/2" style={{ background: C.bg }} />

      <div className="hero-in relative z-10 min-w-0">
        <span
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-medium sm:text-base lg:text-[clamp(0.9rem,min(1.15vw,1.9svh),1.25rem)]"
          style={{ background: C.badge, color: C.badgeText }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: C.badgeText }} />
          CTO @ EZcods
        </span>

        <h1
          className="mt-[clamp(1rem,3svh,1.75rem)] text-[clamp(2.4rem,7.2vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] lg:text-[clamp(2.6rem,min(4.5vw,6.6svh),5.4rem)]"
          style={{ ...serif, color: "#292329" }}
        >
          {/* nbsp keeps "I create" together so a lone "I" never ends a line */}
          I don&apos;t make mistakes, I&nbsp;create{" "}
          <em className="font-semibold" style={{ color: "#C4556A" }}>
            unexpected innovations.
          </em>
        </h1>

        <p className="mt-[clamp(1rem,2.6svh,1.75rem)] max-w-xl text-lg leading-relaxed sm:text-xl lg:max-w-[34em] lg:text-[clamp(1.05rem,min(1.35vw,2.2svh),1.6rem)]" style={{ color: C.text }}>
          I&apos;m Parth Patel, a CTO focused on people, processes, and a thriving workplace culture.
        </p>

        <div className="mt-[clamp(1.5rem,4svh,2.5rem)] flex flex-wrap gap-4">
          <Link
            href="/about-me"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold lg:px-[1.6em] lg:py-[0.85em] lg:text-[clamp(0.95rem,min(1.1vw,1.8svh),1.25rem)] shadow-[0_10px_24px_rgba(107,21,50,.22)] transition hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: C.accent, color: "#fff" }}
          >
            About Me <ArrowUpRight size={18} aria-hidden />
          </Link>
          <Link
            href="/connect"
            className="inline-flex items-center gap-2.5 rounded-xl border-[1.5px] bg-white/40 px-7 py-3.5 text-base font-semibold lg:px-[1.6em] lg:py-[0.85em] lg:text-[clamp(0.95rem,min(1.1vw,1.8svh),1.25rem)] transition hover:-translate-y-0.5 hover:bg-white/80"
            style={{ borderColor: C.accent, color: C.ink }}
          >
            <Mail size={20} aria-hidden /> Get in Touch
          </Link>
        </div>

        <dl className="mt-[clamp(1.75rem,5svh,3.25rem)] flex">
          {STATS.map(([n, label], i) => (
            <div
              key={label}
              className={`flex min-w-0 flex-col-reverse justify-end ${i ? "border-l pl-3 sm:pl-8 lg:pl-5 xl:pl-8" : ""} ${i < STATS.length - 1 ? "shrink-0 pr-3 sm:pr-8 lg:pr-5 xl:pr-8" : ""}`}
              style={{ borderColor: "#e3b8c6" }}
            >
              <dt className="max-w-[10.5rem] text-xs leading-snug sm:text-base lg:max-w-[11em] lg:text-[clamp(0.85rem,min(1.05vw,1.75svh),1.2rem)]" style={{ color: C.text }}>
                {label}
              </dt>
              <dd className="whitespace-nowrap text-xl font-bold sm:text-4xl lg:text-[clamp(1.6rem,min(2.5vw,4svh),3rem)]" style={{ color: C.ink }}>
                {n}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Portrait on a soft pink blob; the photo is cut off by a rounded base. */}
      <div className="relative mx-auto w-full max-w-[min(560px,calc(62svh*1.107))] lg:-mr-10 lg:ml-auto lg:w-[calc(100%+4rem)] lg:max-w-[calc(80svh*1.107)] xl:-mr-20 xl:w-[calc(100%+7rem)]">
        <div
          aria-hidden
          className="pd-bloom absolute bottom-0 right-0 top-[10%] w-[90%]"
        >
          <div
            className="pd-breathe h-full w-full rounded-[58%_42%_38%_62%/48%_38%_62%_52%]"
            style={{ background: "linear-gradient(160deg, #f6d6e1 0%, #efbccd 100%)" }}
          />
        </div>
        <div className="pd-portrait relative overflow-hidden rounded-b-[2.5rem]">
          <img
            src="/hero/parth-portrait.webp"
            alt="Parth Patel, CTO at EZcods"
            width={830}
            height={750}
            fetchPriority="high"
            className="relative block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

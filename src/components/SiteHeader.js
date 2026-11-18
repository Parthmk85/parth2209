import Link from "next/link";

// Header for inner pages; the homepage keeps its brand-only header.
// `brand={false}` drops the logo + name (parthdev.in About page); the button stays right-aligned.
export default function SiteHeader({ brand = true }) {
  return (
    <header className={`flex items-center ${brand ? "justify-between" : "justify-end"} gap-4 mb-16`}>
      {brand && (
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/ezcods-mark-light.png" alt="EZcods IT Solutions" className="h-6 w-auto" />
          <span>EZcods IT Solutions</span>
        </Link>
      )}
      <Link href="/connect" className="bg-[#C778DD] text-white py-2 px-4 hover:opacity-90 transition-opacity font-medium text-sm shrink-0">
        Book a free call
      </Link>
    </header>
  );
}

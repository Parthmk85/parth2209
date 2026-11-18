import Link from "next/link";
import { headers } from "next/headers";
import { SERVICES } from "@/lib/services";

export default async function Footer() {
  // parthdev.in serves this same app; its footer carries Parth's name.
  // Every page using Footer is force-dynamic, so reading the host is free.
  const host = (await headers()).get("host") ?? "";
  const parthdev = /^(www\.)?parthdev\.in(:\d+)?$/.test(host);
  const brand = parthdev ? "Parth Patel" : "EZcods IT Solutions";
  // parthdev.in shows a fixed year and no admin link.
  const year = parthdev ? 2006 : new Date().getFullYear();

  return (
    <footer className="border-t border-[#ABB2BF] pt-8 pb-8 mt-32">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-4">
            <img src="/ezcods-mark-light.png" alt="" className="h-5 w-auto" />
            <span>{brand}</span>
          </div>
          <p className="text-[#ABB2BF] mb-2">Websites, e-commerce, mobile apps and custom CRM/ERP software.</p>
          <a href="mailto:parthmk85@gmail.com" className="text-[#ABB2BF] text-sm hover:text-white">parthmk85@gmail.com</a>
        </div>
        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-[#ABB2BF]">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="hover:text-white">{s.name}</Link>
          ))}
          <Link href="/work" className="hover:text-white">Our work</Link>
          <Link href="/about-me" className="hover:text-white">About us</Link>
          <Link href="/connect" className="hover:text-white">Book a call</Link>
        </nav>
      </div>

      <div className="text-center text-[#ABB2BF] text-sm flex flex-col items-center gap-2">
        <span>&copy; {year} {brand}</span>
        {!parthdev && (
          <Link href="/admin" className="hover:text-[#C778DD] transition-colors underline decoration-[#C778DD] decoration-opacity-30">
            Admin Panel
          </Link>
        )}
      </div>
    </footer>
  );
}

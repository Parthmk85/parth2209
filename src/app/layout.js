import { Fira_Code } from "next/font/google";
import "./globals.css";
import { brandTitle } from "@/lib/site";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const firaCode = Fira_Code({ subsets: ["latin"] });

// parthdev.in serves this same app; every page canonicalises to ezcods.com so
// the two domains don't split ranking as duplicates.
const METADATA = {
  metadataBase: new URL("https://ezcods.com"),
  title: "EZcods IT Solutions — Website, E-commerce, App & CRM Development in India",
  description: "EZcods IT Solutions builds business websites, e-commerce stores, mobile apps and custom CRM/ERP software for businesses in India.",
  alternates: { canonical: "./" },
  openGraph: { siteName: "EZcods IT Solutions", type: "website", locale: "en_IN" },
  // Bing Webmaster Tools; must stay for the site to remain verified.
  verification: { other: { "msvalidate.01": "985287380750E9EA9AA54603133B3088" } },
  icons: {
    icon: "/ezcods-mark-dark.png",
  },
};

export async function generateMetadata() {
  return {
    ...METADATA,
    title: await brandTitle(METADATA.title),
    openGraph: { ...METADATA.openGraph, siteName: await brandTitle(METADATA.openGraph.siteName) },
  };
}

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EZcods IT Solutions",
  url: "https://ezcods.com",
  logo: "https://ezcods.com/ezcods-mark-dark.png",
  email: "parthmk85@gmail.com",
  founder: {
    "@type": "Person",
    name: "Parth Badreshiya",
    jobTitle: "Founder & CEO",
    worksFor: { "@type": "Organization", name: "EZcods IT Solutions", url: "https://ezcods.com" },
    url: "https://ezcods.com/about-me",
    // Same photo as the homepage hero (CMS); keep the two in sync.
    image: "https://res.cloudinary.com/dpet9memo/image/upload/v1776838685/portfolio/xrvfrhaixxuhunap8oav.jpg",
  },
  areaServed: "IN",
  knowsAbout: ["Website development", "E-commerce development", "Mobile app development", "Custom CRM development", "Custom ERP development"],
  sameAs: ["https://instagram.com/techly_the_freelancer"],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", url: "https://wa.me/9725942209", availableLanguage: ["en", "hi", "gu"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

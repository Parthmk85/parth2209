"use client";

import dynamic from "next/dynamic";

// three.js only loads in the browser, in its own chunk, after the HTML hero paints.
const ScenePlaceholder = () => (
  <div aria-hidden className="h-full w-full animate-pulse bg-[radial-gradient(circle_at_55%_45%,rgba(180,154,120,.25),transparent_60%)]" />
);

export default dynamic(() => import("./DeveloperScene"), { ssr: false, loading: ScenePlaceholder });

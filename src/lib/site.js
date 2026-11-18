import { headers } from "next/headers";

// parthdev.in serves this same app. On that host, page titles say
// "Parth Patel" instead of "EZcods IT Solutions"; ezcods.com is unchanged.
const EZCODS = "EZcods IT Solutions";
const PARTH = "Parth Patel";

export async function isParthdev() {
  return /^(www\.)?parthdev\.in(:\d+)?$/.test((await headers()).get("host") ?? "");
}

/** Swap the brand in a title (or any metadata string) when served on parthdev.in. */
export async function brandTitle(text) {
  return (await isParthdev()) ? text.replaceAll(EZCODS, PARTH) : text;
}

import { NextResponse } from "next/server";
import { stat } from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { randomBytes } from "node:crypto";

export const dynamic = "force-dynamic";

const run = promisify(execFile);
const DIR = path.join(process.cwd(), "public/uploads");
const FFMPEG = process.env.FFMPEG_BIN ?? "/usr/bin/ffmpeg";

/**
 * Cuts an uploaded clip down to [start, end].
 *
 * The file is genuinely re-encoded rather than the range being stored and
 * applied at playback: the card autoplays for every visitor, so shipping eight
 * seconds to show four is bandwidth spent on frames nobody sees.
 *
 * The original is left on disk and a new file is written, so a trim is always
 * recoverable by pointing the project back at the previous URL.
 */
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const src = String(body.url ?? "");
  const start = Math.max(0, Number(body.start) || 0);
  const end = Number(body.end);

  if (!Number.isFinite(end) || end - start < 0.3) {
    return NextResponse.json({ error: "Pick at least 0.3s of video." }, { status: 400 });
  }

  // Only files we wrote, and only by their basename — `url` comes from the
  // browser, so anything path-like in it must never reach the filesystem.
  const base = path.basename(src);
  if (!src.startsWith("/uploads/") || base !== src.slice("/uploads/".length)) {
    return NextResponse.json({ error: "Not an uploaded file." }, { status: 400 });
  }
  const input = path.join(DIR, base);
  try {
    await stat(input);
  } catch {
    return NextResponse.json({ error: "That file is gone." }, { status: 404 });
  }

  const out = `${Date.now()}-${randomBytes(6).toString("hex")}.mp4`;
  try {
    await run(
      FFMPEG,
      [
        "-y",
        // -ss before -i seeks fast; -to after -i is then relative to the cut,
        // so the pair gives an exact window without decoding from zero.
        "-ss", String(start),
        "-i", input,
        "-t", String(end - start),
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "24",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "96k",
        // Puts the index at the front so the browser can start playing before
        // the whole file has arrived.
        "-movflags", "+faststart",
        path.join(DIR, out),
      ],
      { timeout: 120_000, maxBuffer: 1 << 22 },
    );
  } catch (err) {
    console.error("[trim]", err.message?.slice(0, 300));
    return NextResponse.json({ error: "Could not trim that video." }, { status: 500 });
  }

  const { size } = await stat(path.join(DIR, out));
  return NextResponse.json({ url: `/uploads/${out}`, seconds: +(end - start).toFixed(2), size });
}

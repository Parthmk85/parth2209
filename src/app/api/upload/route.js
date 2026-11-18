import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "node:crypto";

export const dynamic = "force-dynamic";

/**
 * Stores an image or a short video for a project card / site content.
 *
 * Written to public/uploads and served straight off disk by nginx, rather than
 * to Cloudinary: the CLOUDINARY_* credentials were never filled in, so that
 * path always 500'd, and a preview clip does not need a CDN.
 *
 * The directory survives rebuilds because the app runs `next start` from the
 * repo root — the same reason the CMS json lives where it does.
 */

const DIR = path.join(process.cwd(), "public/uploads");
const MAX_BYTES = Number(process.env.UPLOAD_MAX_MB ?? 90) * 1024 * 1024;

// Extension is taken from this table, never from the uploaded filename: a name
// is attacker-controlled and is how you end up writing ".php" into a public dir.
const TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mp4",
};

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const ext = TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Only PNG, JPG, WebP, GIF, AVIF images or MP4/WebM video." },
        { status: 415 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `That file is ${(file.size / 1048576).toFixed(1)}MB. Limit is ${MAX_BYTES / 1048576}MB.` },
        { status: 413 },
      );
    }

    await mkdir(DIR, { recursive: true });
    const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
    await writeFile(path.join(DIR, name), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({
      url: `/uploads/${name}`,
      type: file.type.startsWith("video/") ? "video" : "image",
    });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}

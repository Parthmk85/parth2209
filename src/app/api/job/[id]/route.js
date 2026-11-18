import { readFile } from "fs/promises";
import path from "path";
import { RESUME_DIR, RESUME_TYPES as TYPES } from "@/lib/resume";

export const dynamic = "force-dynamic";

/** Serves one resume by its random id (the link sent to the owner on WhatsApp). */
export async function GET(req, { params }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response("Not found", { status: 404 });

  const db = JSON.parse(await readFile(path.join(process.cwd(), "data/db_fallback.json"), "utf8"));
  const app = (db.applications ?? []).find((a) => a._id === id);
  if (!app) return new Response("Not found", { status: 404 });

  const ext = app.file.split(".").pop();
  const body = await readFile(path.join(RESUME_DIR, app.file));
  const safeName = `${app.name.replace(/[^\w .-]/g, "")} - resume.${ext}`;
  return new Response(body, {
    headers: {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${safeName}"`,
      "X-Robots-Tag": "noindex",
      "Cache-Control": "private, no-store",
    },
  });
}

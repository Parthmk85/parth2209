import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { notifyOwner } from "@/lib/wa";
import { RESUME_DIR, RESUME_TYPES as TYPES } from "@/lib/resume";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "data/db_fallback.json");
const MAX_BYTES = 5 * 1024 * 1024;

// ponytail: in-memory per-IP limit, resets on restart; fine for one server.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 3;
}

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many uploads. Try again in a minute." }, { status: 429 });

  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  const file = form.get("resume");
  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!file || typeof file === "string" || !file.size) return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Resume must be under 5 MB." }, { status: 400 });

  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!TYPES[ext]) return NextResponse.json({ error: "Please upload a PDF or Word file." }, { status: 400 });

  // The id is the only thing guarding the download link, so it must be unguessable.
  const id = randomUUID();
  await mkdir(RESUME_DIR, { recursive: true });
  await writeFile(path.join(RESUME_DIR, `${id}.${ext}`), Buffer.from(await file.arrayBuffer()));

  // Applications sit beside CMS content; resilient-db rewrites the whole object, so this key survives.
  const db = JSON.parse(await readFile(FILE, "utf8"));
  if (!Array.isArray(db.applications)) db.applications = [];
  db.applications.push({ _id: id, name, file: `${id}.${ext}`, originalName: file.name.slice(0, 120), ip, createdAt: new Date().toISOString() });
  await writeFile(FILE, JSON.stringify(db, null, 2));

  const link = `https://job.ezcods.com/api/job/${id}`;
  await notifyOwner(
    ["New job application", name, "see resume", "not applicable", `Resume: ${link}`],
    `New job application (job.ezcods.com)\n\nName: ${name}\nResume: ${link}`,
  );

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/resilient-db";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const project = await createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

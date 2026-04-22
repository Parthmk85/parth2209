import { NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/resilient-db";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const project = await updateProject(id, data);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteProject(id);
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

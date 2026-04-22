import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/resilient-db";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { section, data } = await request.json();
    const content = await updateContent(section, data);
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

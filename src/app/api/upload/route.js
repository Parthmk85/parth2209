import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64 for Cloudinary
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: "portfolio",
      resource_type: "auto",
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}

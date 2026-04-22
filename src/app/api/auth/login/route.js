import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    const { id, password } = await request.json();

    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASS) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({ id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      const response = NextResponse.json({ message: "Login successful" });
      
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

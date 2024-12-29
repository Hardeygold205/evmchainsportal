import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { inputPasskey } = await request.json();

    if (!inputPasskey) {
      return NextResponse.json(
        { message: "Input Passkey is required" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Check if the input already exists
    const existing = await sql`
      SELECT * FROM passkey_data WHERE input_passkey = ${inputPasskey} LIMIT 1;
    `;

    if (existing.length > 0) {
      return NextResponse.json({ exists: true });
    }

    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Error checking input:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

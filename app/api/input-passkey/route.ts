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
    const timestamp = new Date();

    await sql`
      CREATE TABLE IF NOT EXISTS passkey_data (
        id SERIAL PRIMARY KEY,
        input_passkey TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL
      );
    `;

    await sql`
      INSERT INTO passkey_data (input_passkey, timestamp) VALUES (${inputPasskey}, ${timestamp});
    `;

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

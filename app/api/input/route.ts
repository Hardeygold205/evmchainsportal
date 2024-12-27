import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { inputValue } = await request.json();

    if (!inputValue) {
      return NextResponse.json(
        { message: "Input value is required" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);
    const timestamp = new Date();

    await sql`
      CREATE TABLE IF NOT EXISTS data (
        id SERIAL PRIMARY KEY,
        input_value TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL
      );
    `;

    await sql`
      INSERT INTO data (input_value, timestamp) VALUES (${inputValue}, ${timestamp});
    `;

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

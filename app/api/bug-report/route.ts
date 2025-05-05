import { withRateLimit } from "next-limitr";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export const POST = withRateLimit({
  // Maximum 1 report every 60 seconds
  limit: 1,
  windowMs: 60_000,
  handler: () =>
    new NextResponse("Too many requests; maximum is 1 every 60 seconds", {
      status: 429,
    }),
})(async (request: Request) => {
  try {
    const { summary, details } = (await request.json()) as {
      summary: string;
      details: string;
    };

    await sql`
        INSERT INTO bug_reports (summary, details, created_at)
        VALUES (${summary}, ${details}, now())
      `;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Bug-report error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
});

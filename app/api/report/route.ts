import { withRateLimit } from "next-limitr";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export const POST = withRateLimit({
    // Maximum 1 report every 30 seconds
    limit: 1,
    windowMs: 30_000,
    handler: () =>
        new NextResponse("Too many requests; maximum is 1 per 30 seconds", { status: 429 }),
})(async (request: Request) => {
    try {
        const {
            beatmap_id,
            suggestions,
            comment,
            alternative_maps,
        } = (await request.json()) as {
            beatmap_id: string;
            suggestions: number[];
            comment: string;
            alternative_maps: string;
        };

        await sql`
        INSERT INTO reports (beatmap_id, suggestions, alternative_maps, comment, created_at)
        VALUES (
          ${beatmap_id},
          ${JSON.stringify(suggestions)}::jsonb,
          ${alternative_maps},
          ${comment},
          now()
        )
      `;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Report error:", err);
        return NextResponse.json(
            { error: err.message || "Unknown error" },
            { status: 500 }
        );
    }
});
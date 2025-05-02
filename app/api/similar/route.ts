import { withRateLimit } from "next-limitr";
import { NextResponse } from "next/server";

export const GET = withRateLimit({
    // Maximum 10 requests per minute
    limit: 10,
    windowMs: 60_000,
    handler: () =>
        new NextResponse("Too many requests; maximum is 10 per minute", { status: 429 }),
})(async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const beatmapId = searchParams.get("beatmap_id");
    if (!beatmapId) {
        return NextResponse.json({ error: "Missing beatmap_id" }, { status: 400 });
    }

    const flaskRes = await fetch(
        `https://osu-suggester-api.onrender.com/api/similar?beatmap_id=${beatmapId}`
    );
    const data = await flaskRes.json();
    return NextResponse.json(data, { status: flaskRes.status });
});

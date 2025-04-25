import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
}

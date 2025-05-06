import { withRateLimit } from "next-limitr";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export const GET = withRateLimit({
  // Maximum 2 requests every 10 seconds
  limit: 2,
  windowMs: 10_000,
  handler: () =>
    new NextResponse("Too many requests; maximum is 2 every 10 seconds", {
      status: 429,
    }),
})(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const beatmapId = searchParams.get("beatmap_id");
  if (!beatmapId) {
    return NextResponse.json({ error: "Missing beatmap_id" }, { status: 400 });
  }

  const mods = searchParams.get("mods");
  if (!mods) {
    return NextResponse.json({ error: "Missing mods" }, { status: 400 });
  }

  const excludeMods = searchParams.get("exclude");

  const flaskRes = await fetch(
    `${process.env.API_URL}/api/similar?beatmap_id=${beatmapId}&mods=${mods}&exclude=${excludeMods}`
  );
  const data = await flaskRes.json();
  return NextResponse.json(data, { status: flaskRes.status });
});

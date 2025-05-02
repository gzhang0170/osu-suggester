"use client";
import { useState } from "react";

type Beatmap = {
  beatmap_id: number;
  user_id: number;
  filename: string;
  version: string;
  total_length: number;
  hit_length: number;
  diff_drain: number;
  diff_size: number;
  diff_overall: number;
  diff_approach: number;
  last_update: string;
  difficultyrating: number;
  playcount: number;
  bpm: number;
  distance: number;
};

function formatLength(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Beatmap[] | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setResults(null);
    const m = input.match(/(\d+)(?!.*\d)/);
    const id = m ? m[1] : input.trim();
    if (!id) return setError("Enter a beatmap ID or link");

    try {
      const res = await fetch(`/api/similar?beatmap_id=${id}`);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setResults(json.similar);
    } catch (e: any) {
      setError(e.message || "Failed to fetch");
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">osu!suggester</h1>
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-1 w-72 text-black"
          placeholder="beatmap ID or link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {results && (
        <table className="mt-4 text-sm border-collapse text-center">
          <thead className="font-semibold">
            <tr>
              <th className="px-2 py-1">ID</th>
              <th className="px-2 py-1">Difficulty</th>
              <th className="px-2 py-1">Length (Drain)</th>
              <th className="px-4 py-1">CS</th>
              <th className="px-4 py-1">HP</th>
              <th className="px-4 py-1">OD</th>
              <th className="px-4 py-1">AR</th>
              <th className="px-4 py-1">Stars</th>
              <th className="px-2 py-1">BPM</th>
              <th className="px-4 py-1">Plays</th>
              <th className="px-2 py-1">Last Updated</th>
              <th className="px-2 py-1">Distance</th>
            </tr>
          </thead>
          <tbody>
            {results.map(bm => (
              <tr key={bm.beatmap_id} className="border-t">
                <td>
                  <a
                    href={`https://osu.ppy.sh/b/${bm.beatmap_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {bm.beatmap_id}
                  </a>
                </td>
                <td>{bm.version}</td>
                <td>{formatLength(bm.total_length)} ({formatLength(bm.hit_length)})</td>
                <td>{bm.diff_size.toFixed(1)}</td>
                <td>{bm.diff_drain.toFixed(1)}</td>
                <td>{bm.diff_overall.toFixed(1)}</td>
                <td>{bm.diff_approach.toFixed(1)}</td>
                <td>{bm.difficultyrating.toFixed(2)}</td>
                <td>{bm.bpm.toFixed(0)}</td>
                <td>{bm.playcount.toLocaleString()}</td>
                <td className="px-2 py-1">{new Date(bm.last_update).toLocaleDateString()}</td>
                <td>{bm.distance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

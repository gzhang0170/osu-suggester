"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<number[] | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setResults(null);
    const m = input.match(/(\d+)(?!.*\d)/);
    const id = m ? m[1] : input.trim();
    if (!id) return setError("Enter a beatmap ID or link");

    try {
      const res = await fetch(`/api/similar?beatmap_id=${encodeURIComponent(id)}`);
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
        <ul className="mt-4 space-y-1">
          {results.map((mapId) => (
            <li key={mapId} className="text-lg font-mono">
              {mapId}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

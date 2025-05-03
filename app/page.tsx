"use client";
import { useState } from "react";
import { FaHeart, FaCheck } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

type Beatmap = {
  id: number;
  url: string;
  card: string;
  artist: string;
  title: string;
  version: string;
  creator: string;
  difficulty_rating: number;
  total_length: number;
  hit_length: number;
  cs: number;
  drain: number;
  accuracy: number;
  ar: number;
  bpm: number;
  playcount: number;
  status: string;
  ranked_date: string;
  distance: number;
};

function formatLength(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type StatusIconProps = {
  status: string;
  sizeClass?: string;
};

function StatusIcon({ status, sizeClass = "text-2xl" }: StatusIconProps) {
  const classes = `${sizeClass} inline-block`;
  switch (status) {
    case "LOVED":
      return <FaHeart className={`${classes} text-pink-500`} title="Loved" />;
    case "RANKED":
      return (
        <HiOutlineChevronDoubleUp
          className={`${classes} text-cyan-300`}
          title="Ranked"
        />
      );
    case "QUALIFIED":
    case "APPROVED":
      return <FaCheck className={`${classes} text-green-500`} title={status} />;
    default:
      return null;
  }
}

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Beatmap[] | null>(null);
  const [error, setError] = useState("");

  const [showReport, setShowReport] = useState(false);
  const [alternativeMaps, setAlternativeMaps] = useState("");
  const [reportText, setReportText] = useState("");

  const handleSearch = async () => {
    setError("");
    setResults(null);
    setShowReport(false);
    setReportText("");

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

  const submitReport = async () => {
    if (!results) return;
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beatmap_id: input.match(/(\d+)(?!.*\d)/)?.[1] ?? input.trim(),
          suggestions: results,
          comment: reportText,
          alternative_maps: alternativeMaps,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Report submitted—thank you!");
      setShowReport(false);
      setReportText("");
      setAlternativeMaps("");
    } catch (e: any) {
      alert("Error submitting report: " + e.message);
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 p-6 pb-16">
      <h1 className="text-2xl font-bold">osu!suggester</h1>
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-1 w-72 text-black"
          placeholder="beatmap ID or link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        {results && (
          <button
            className="bg-gray-600 text-white px-4 rounded"
            onClick={() => setShowReport((v) => !v)}
          >
            {showReport ? "Cancel" : "Report"}
          </button>
        )}
      </div>

      {showReport && (
        <div className="w-full max-w-md mt-2">
          <textarea
            className="w-full border rounded px-3 py-2 text-black"
            rows={4}
            placeholder="What's wrong with these suggestions? (too much aim, speed, streams, etc.)"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-black"
            placeholder="Example of better map(s) (ID or URL)"
            value={alternativeMaps}
            onChange={(e) => setAlternativeMaps(e.target.value)}
          />
          <button
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
            onClick={submitReport}
            disabled={!reportText.trim()}
          >
            Submit Report
          </button>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {results && (
        <table className="mt-4 text-sm border-collapse text-center">
          <thead className="font-semibold">
            <tr>
              <th className="px-2 py-1">Map</th>
              <th className="px-2 py-1">Song</th>
              <th className="px-2 py-1">Difficulty</th>
              <th className="px-2 py-1">Mapper</th>
              <th className="px-2 py-1">Length (Drain)</th>
              <th className="px-4 py-1">CS</th>
              <th className="px-4 py-1">HP</th>
              <th className="px-4 py-1">OD</th>
              <th className="px-4 py-1">AR</th>
              <th className="px-4 py-1">Stars</th>
              <th className="px-2 py-1">BPM</th>
              <th className="px-4 py-1">Plays</th>
              <th className="px-2 py-1">Ranked Date</th>
              <th className="px-2 py-1">Similarity</th>
              <th className="px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((bm) => (
              <tr key={bm.id} className="border-t">
                {/* <td>
                  <a
                    href={bm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {bm.id}
                  </a>
                </td> */}
                <td className="px-2 py-1">
                  <a
                    href={bm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-16 h-10 overflow-hidden rounded-md"
                  >
                    <img
                      src={bm.card}
                      alt={`${bm.artist} — ${bm.title}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </td>
                <td>
                  {bm.artist} - {bm.title}
                </td>
                <td>{bm.version}</td>
                <td>{bm.creator}</td>
                <td>
                  {formatLength(bm.total_length)} ({formatLength(bm.hit_length)}
                  )
                </td>
                <td>{bm.cs.toFixed(1)}</td>
                <td>{bm.drain.toFixed(1)}</td>
                <td>{bm.accuracy.toFixed(1)}</td>
                <td>{bm.ar.toFixed(1)}</td>
                <td>{bm.difficulty_rating.toFixed(2)}</td>
                <td>{bm.bpm.toFixed(0)}</td>
                <td>{bm.playcount.toLocaleString()}</td>
                <td className="px-2 py-1">
                  {new Date(bm.ranked_date).toLocaleDateString()}
                </td>
                <td>{bm.distance.toFixed(2)}</td>
                <td className="px-2 py-1">
                  <StatusIcon status={bm.status} sizeClass="text-xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

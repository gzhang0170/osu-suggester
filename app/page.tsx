"use client";
import { useState } from "react";
import { FaHeart, FaCheck } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import type { IconBaseProps } from "react-icons/lib";

const HeartIcon = FaHeart as unknown as React.FC<IconBaseProps>;
const CheckIcon = FaCheck as unknown as React.FC<IconBaseProps>;
const ChevronIcon =
  HiOutlineChevronDoubleUp as unknown as React.FC<IconBaseProps>;

type Beatmap = {
  id: number;
  url: string;
  card: string;
  artist: string;
  title: string;
  version: string;
  creator: string;
  mods: string;
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

function getModColor(mods: string) {
  const hasDT = mods.includes("DT");
  const hasHT = mods.includes("HT");
  const hasHR = mods.includes("HR");
  const hasEZ = mods.includes("EZ");

  const group1 = hasDT || hasHT;
  const group2 = hasHR || hasEZ;

  if (group1 && group2) {
    return "text-amber-400";
  }
  if (group1) {
    return hasDT ? "text-orange-400" : "text-blue-400";
  }
  if (group2) {
    return hasHR ? "text-red-400" : "text-green-400";
  }

  return "text-white";
}

type StatusIconProps = {
  status: string;
  sizeClass?: string;
};

function StatusIcon({ status, sizeClass = "text-2xl" }: StatusIconProps) {
  const classes = `${sizeClass} inline-block`;
  switch (status) {
    case "LOVED":
      return <HeartIcon className={`${classes} text-pink-500`} title="Loved" />;
    case "RANKED":
      return (
        <ChevronIcon className={`${classes} text-cyan-300`} title="Ranked" />
      );
    case "QUALIFIED":
    case "APPROVED":
      return (
        <CheckIcon className={`${classes} text-green-500`} title={status} />
      );
    default:
      return null;
  }
}

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Beatmap[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showReport, setShowReport] = useState(false);
  const [alternativeMaps, setAlternativeMaps] = useState("");
  const [reportText, setReportText] = useState("");

  const [dtHtMode, setDtHtMode] = useState<0 | 1 | 2>(0);
  const [hrEzMode, setHrEzMode] = useState<0 | 1 | 2>(0);

  const handleSearch = async () => {
    setError("");
    setResults(null);
    setShowReport(false);
    setReportText("");
    setLoading(true);

    const m = input.match(/(\d+)(?!.*\d)/);
    const id = m ? m[1] : input.trim();
    if (!id) return setError("Enter a beatmap ID or link");

    const dtHtMap = { 0: 0, 1: 64, 2: 256 };
    const hrEzMap = { 0: 0, 1: 16, 2: 2 };
    const modValue = dtHtMap[dtHtMode] + hrEzMap[hrEzMode];

    const query = `/api/similar?beatmap_id=${id}&mods=${modValue}`;

    try {
      const res = await fetch(query);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setResults(json.similar);
    } catch (e: any) {
      setError(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
        <button
          className={`px-4 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching…" : "Search"}
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

      <div className="flex gap-2">
        <button
          onClick={() => setDtHtMode((m) => ((m + 1) % 3) as 0 | 1 | 2)}
          className={`
            px-3 py-1 rounded border-2
            transition-colors duration-200
            ${
              dtHtMode === 1
                ? "bg-orange-500/30 border-orange-700 hover:bg-orange-500/50"
                : dtHtMode === 2
                ? "bg-blue-500/30 border-blue-700 hover:bg-blue-500/50"
                : "bg-gray-700/20 border-gray-700 hover:bg-gray-700/40"
            }
            text-white
          `}
        >
          {dtHtMode === 1 ? "DT" : dtHtMode === 2 ? "HT" : "DT"}
        </button>

        <button
          onClick={() => setHrEzMode((m) => ((m + 1) % 3) as 0 | 1 | 2)}
          className={`
            px-3 py-1 rounded border-2
            transition-colors duration-200
            ${
              hrEzMode === 1
                ? "bg-red-500/30 border-red-700 hover:bg-red-500/50"
                : hrEzMode === 2
                ? "bg-green-500/30 border-green-700 hover:bg-green-500/50"
                : "bg-gray-700/20 border-gray-700 hover:bg-gray-700/40"
            }
            text-white
          `}
        >
          {hrEzMode === 1 ? "HR" : hrEzMode === 2 ? "EZ" : "HR"}
        </button>
      </div>

      {loading && (
        <div className="mt-4">
          <div
            className="
              mx-auto
              w-8 h-8
              border-4 border-blue-600
              border-t-transparent
              rounded-full
              animate-spin
            "
            aria-label="Loading"
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {results && (
        <table className="text-sm border-collapse text-center">
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
              {/* <th className="px-4 py-1">Plays</th>
              <th className="px-2 py-1">Ranked Date</th> */}
              <th className="px-2 py-1">Similarity</th>
              <th className="px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((bm) => {
              const color = getModColor(bm.mods);
              const isGroup2 = bm.mods.includes("HR") || bm.mods.includes("EZ");
              return (
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
                  <td>
                    <span>{bm.version}</span>
                    <span className={`ml-2 font-mono ${color}`}>
                      {bm.mods || ""}
                    </span>
                  </td>
                  <td>{bm.creator}</td>
                  <td className={`px-2 py-1 ${color}`}>
                    {formatLength(bm.total_length)} (
                    {formatLength(bm.hit_length)})
                  </td>
                  <td className={`px-2 py-1 ${isGroup2 ? color : ""}`}>
                    {bm.cs.toFixed(1)}
                  </td>
                  <td className={`px-2 py-1 ${isGroup2 ? color : ""}`}>
                    {bm.drain.toFixed(1)}
                  </td>
                  <td className={`px-2 py-1 ${color}`}>
                    {bm.accuracy.toFixed(1)}
                  </td>
                  <td className={`px-2 py-1 ${color}`}>{bm.ar.toFixed(1)}</td>
                  <td className={`px-2 py-1 ${color}`}>
                    {bm.difficulty_rating.toFixed(2)}
                  </td>
                  <td className={`px-2 py-1 ${color}`}>{bm.bpm.toFixed(0)}</td>
                  {/* <td>{bm.playcount.toLocaleString()}</td>
                  <td className="px-2 py-1">
                    {new Date(bm.ranked_date).toLocaleDateString()}
                  </td> */}
                  <td>{bm.distance.toFixed(2)}</td>
                  <td className="px-2 py-1">
                    <StatusIcon status={bm.status} sizeClass="text-xl" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}

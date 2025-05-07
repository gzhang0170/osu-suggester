"use client";

import ResultsTable from "./ResultsTable";
import { Beatmap } from "./BeatmapRow";
import { useState } from "react";
import SuggestionReport from "./SuggestionReport";
import Popup from "./Popup";
import ExcludeFilter from "./ExcludeFilter";

export default function HomeClient() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Beatmap[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showReport, setShowReport] = useState(false);
  const [alternativeMaps, setAlternativeMaps] = useState("");
  const [reportText, setReportText] = useState("");

  const [dtHtMode, setDtHtMode] = useState<0 | 1 | 2>(0);
  const [hrEzMode, setHrEzMode] = useState<0 | 1 | 2>(0);
  const [excludeBits, setExcludeBits] = useState<number[]>([]);

  const handleSearch = async () => {
    setError("");
    setResults(null);
    setShowReport(false);
    setReportText("");

    const m = input.match(/(\d+)(?!.*\d)/);
    const id = m ? m[1] : input.trim();
    if (!id) return setError("Enter a beatmap ID or link");

    setLoading(true);

    const dtHtMap = { 0: 0, 1: 64, 2: 256 };
    const hrEzMap = { 0: 0, 1: 16, 2: 2 };
    const modValue = dtHtMap[dtHtMode] + hrEzMap[hrEzMode];
    const excludeMods = excludeBits.join(",")

    const query = `/api/similar?beatmap_id=${id}&mods=${modValue}&exclude=${excludeMods}`;

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

  const beatmapId = input.match(/(\d+)(?!.*\d)/)?.[1] ?? input.trim();

  return (
    <>
      <Popup title="⚠️ Warning! ⚠️">
        <p>
          This app is still in its <strong>development stage</strong>. Some
          features may be incomplete or change without notice.
        </p>
        <p>
          <strong>Important:</strong> The map searched must have a leaderboard
          before <strong>May 1, 2025, </strong>
          and it will only return maps that have a leaderboard before{" "}
          <strong>May 1, 2025.</strong>
        </p>
        <p>
          Please note that these suggestions <strong>DO NOT</strong> consider pp
          or "farmability" in its calculations at all! It's only supposed to
          recommend maps that it thinks is similar, which may or may not be the
          same level of farm as the searched map.
        </p>
        <p>
          Please use the <strong>report button</strong> after searching the beatmap
          if you think the recommendations are wrong, so I can see and try to fix it!
          Also, if there are any bugs with the website, use the report button in the
          top left to report it.
        </p>
        <p>
          Note that searches may take up to a few seconds to load. Hover
          over the info box in the bottom left or click on the changelog for
          more information.
        </p>
      </Popup>
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

        <SuggestionReport
          isOpen={showReport}
          onClose={() => setShowReport(false)}
          beatmapId={beatmapId}
          suggestions={results || []}
        />

        <div className="flex gap-2">
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
        </div>
        
        <ExcludeFilter onChange={setExcludeBits} />

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
        {results && <ResultsTable results={results} />}
      </main>
    </>
  );
}

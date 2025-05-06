"use client";

import { motion, AnimatePresence } from "framer-motion";
import BeatmapRow, { Beatmap } from "./BeatmapRow";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

interface ResultsTableProps {
  results: Beatmap[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  return (
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
      <AnimatePresence>
        <motion.tbody initial="hidden" animate="visible" exit="hidden">
          {results.map((bm, i) => (
            <BeatmapRow
              key={`${bm.id}-${bm.mods}`}
              bm={bm}
              index={i}
              rowVariants={rowVariants}
            />
          ))}
        </motion.tbody>
      </AnimatePresence>
    </table>
  );
}

"use client";

import { motion } from "framer-motion";
import StatusIcon, { Status } from "./StatusIcon";
import ModLabels from "./ModLabels";
import { getColumnColor } from "../utils/columnColors";
import { formatLength } from "../utils/formatLength";

export interface Beatmap {
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
  status: Status;
  ranked_date: string;
  distance: number;
}

interface BeatmapRowProps {
  bm: Beatmap;
  index: number;
  rowVariants: any;
}

export default function BeatmapRow({
  bm,
  index,
  rowVariants,
}: BeatmapRowProps) {
  const modsList = bm.mods ? bm.mods.split(",") : [];

  return (
    <motion.tr
      key={`${bm.id}-${bm.mods}`}
      custom={index}
      variants={rowVariants}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
      className="border-b border-gray-700 last:border-b-0"
    >
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

      <td className="px-2 py-1">
        <span>{bm.version}</span>
        <ModLabels mods={bm.mods} />
      </td>

      <td>{bm.creator}</td>
      <td className={`px-2 py-1 ${getColumnColor("length", modsList)}`}>
        {formatLength(bm.total_length)} ({formatLength(bm.hit_length)})
      </td>
      <td className={`px-2 py-1 ${getColumnColor("cs", modsList)}`}>
        {bm.cs.toFixed(1)}
      </td>
      <td className={`px-2 py-1 ${getColumnColor("hp", modsList)}`}>
        {bm.drain.toFixed(1)}
      </td>
      <td className={`px-2 py-1 ${getColumnColor("accuracy", modsList)}`}>
        {bm.accuracy.toFixed(1)}
      </td>
      <td className={`px-2 py-1 ${getColumnColor("ar", modsList)}`}>
        {bm.ar.toFixed(1)}
      </td>
      <td className={`px-2 py-1 ${getColumnColor("stars", modsList)}`}>
        {bm.difficulty_rating.toFixed(2)}
      </td>
      <td className={`px-2 py-1 ${getColumnColor("bpm", modsList)}`}>
        {bm.bpm.toFixed(0)}
      </td>
      {/* <td>{bm.playcount.toLocaleString()}</td>
                          <td className="px-2 py-1">
                            {new Date(bm.ranked_date).toLocaleDateString()}
                          </td> */}
      <td>{bm.distance.toFixed(2)}</td>
      <td className="px-2 py-1">
        <StatusIcon status={bm.status} sizeClass="text-xl" />
      </td>
    </motion.tr>
  );
}

"use client";

const modColorMap: Record<string, string> = {
  DT: "text-orange-500",
  HT: "text-blue-500",
  HR: "text-red-500",
  EZ: "text-green-500",
};

interface ModLabelsProps {
  mods: string;
}

export default function ModLabels({ mods }: ModLabelsProps) {
  if (!mods) return;
  const list = mods.split(",").filter((m) => m);
  return (
    <>
      {list.map((m) => (
        <span key={m} className={`ml-2 font-mono ${modColorMap[m] ?? ""}`}>
          {m}
        </span>
      ))}
    </>
  );
}

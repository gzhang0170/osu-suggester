// app/components/ExcludeFilter.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Combo =
  | "NM"
  | "HR"
  | "EZ"
  | "DT"
  | "HT"
  | "HRDT"
  | "EZDT"
  | "HRHT"
  | "EZHT";

const comboToBits: Record<Combo, number> = {
  NM: 0, DT: 64, HT: 256, HR: 16, EZ: 2,
  HRDT: 64 + 16, EZDT: 64 + 2, HRHT: 256 + 16, EZHT: 256 + 2,
};

const comboStyles: Record<Combo, { bg: string; border: string }> = {
  NM:   { bg: "bg-gray-400/50",    border: "border-gray-600"    },
  HR:   { bg: "bg-red-500/30",     border: "border-red-700"     },
  EZ:   { bg: "bg-green-500/50",   border: "border-green-700"   },
  DT:   { bg: "bg-orange-500/50",  border: "border-orange-700"  },
  HT:   { bg: "bg-blue-500/50",    border: "border-blue-700"    },
  HRDT: { bg: "bg-red-700/50",     border: "border-red-900"     },
  EZDT: { bg: "bg-amber-500/50",   border: "border-amber-700"   },
  HRHT: { bg: "bg-purple-500/50",  border: "border-purple-700"  },
  EZHT: { bg: "bg-sky-500/50",     border: "border-sky-700"     },
};

interface ExcludeFilterProps {
  onChange: (excludeBits: number[]) => void;
}

export default function ExcludeFilter({ onChange }: ExcludeFilterProps) {
  const [open, setOpen] = useState(false);
  const [exclude, setExclude] = useState<Combo[]>([]);

  const toggle = (c: Combo) => {
    const next = exclude.includes(c)
      ? exclude.filter((x) => x !== c)
      : [...exclude, c];
    setExclude(next);
    onChange(next.map((m) => comboToBits[m]));
  };

  const combos: Combo[] = [
    "NM","HR","EZ","DT","HT","HRDT","EZDT","HRHT","EZHT",
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-2 px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white transition-colors"
      >
        Exclude
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-2"
          >
            <div className="flex flex-wrap gap-2">
              {combos.map((c) => {
                const active = exclude.includes(c);
                const { bg, border } = comboStyles[c];
                return (
                  <button
                    key={c}
                    onClick={() => toggle(c)}
                    className={`px-3 py-1 rounded-full text-sm text-white border-2 transition-all duration-150
                      ${active
                        ? `${bg} ${border} hover:bg-opacity-90 hover:border-opacity-90`
                        : `bg-gray-700/20 border-gray-700 hover:bg-gray-700/30 hover:border-gray-600`
                      }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

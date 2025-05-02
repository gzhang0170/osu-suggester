"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoBoxProps {
  infoText: string;
}

export default function InfoBox({ infoText }: InfoBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-4 left-4 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-xl w-96 whitespace-pre-wrap"
          >
            {infoText}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-label="Site info"
        className="bg-blue-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-xl cursor-default"
      >
        i
      </div>
    </div>
  );
}
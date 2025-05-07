"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
  title?: string;
  children: React.ReactNode;
}

export default function Popup({ title = "Popup", children }: PopupProps) {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-xl mx-4 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              {children}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

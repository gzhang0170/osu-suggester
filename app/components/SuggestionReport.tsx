"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Beatmap } from "./BeatmapRow";

interface SuggestionReportProps {
  isOpen: boolean;
  onClose: () => void;
  beatmapId: string;
  suggestions: Beatmap[];
}

export default function SuggestionReport({
  isOpen,
  onClose,
  beatmapId,
  suggestions,
}: SuggestionReportProps) {
  const [comment, setComment] = useState("");
  const [alternativeMaps, setAlternativeMaps] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    if (!comment.trim() || !alternativeMaps.trim()) {
      setError("Please fill out both fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/beatmap-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beatmap_id: beatmapId,
          suggestions,
          comment,
          alternative_maps: alternativeMaps,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-w-3xl mx-4 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Report Suggestions
            </h2>

            {success ? (
              <>
                <div className="flex justify-center mb-4">
                  <img
                    src="/kitan.gif"
                    alt="✨ キターン〜 ✨"
                    className="w-100 h-100 object-contain"
                  />
                </div>
                <p className="text-green-500">
                  Thanks! Your suggestion report was submitted.
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      onClose();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    What's wrong with these suggestions?
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-black dark:text-white bg-gray-100 dark:bg-gray-700"
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    Examples of better map(s) (ID or URL)
                  </label>
                  <input
                    type="text"
                    value={alternativeMaps}
                    onChange={(e) => setAlternativeMaps(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-black dark:text-white bg-gray-100 dark:bg-gray-700"
                    disabled={loading}
                  />
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onClose()}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

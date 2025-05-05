"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BugReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BugReport({ isOpen, onClose }: BugReportProps) {
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!summary.trim() || !details.trim()) {
      setError("Please fill out both fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, details }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Submission failed");
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
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Report a Bug
            </h2>

            {success ? (
              <>
                <p className="text-green-500 mb-4">
                  Thanks! Your bug report was submitted.
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSummary("");
                      setDetails("");
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
                    Summary
                  </label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    Details
                  </label>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    disabled={loading}
                  />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Submitting…" : "Submit Bug"}
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

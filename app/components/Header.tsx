"use client";

import { useState } from "react";
import Link from "next/link";
import BugReport from "./BugReport";

export default function Header() {
  const [bugOpen, setBugOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white z-40">
        <nav className="grid grid-cols-[auto_1fr_auto] items-center h-12 px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-lg">
              osu!suggester
            </Link>
            <Link
              href="/changelog"
              className="ml-4 inline-block px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-full text-sm text-white transition-colors duration-200"
            >
              Changelog
            </Link>
            <button
              onClick={() => setBugOpen(true)}
              className="ml-4 inline-block px-3 py-1 bg-red-600 hover:bg-red-500 rounded-full text-sm transition-colors duration-200 text-white"
            >
              Report Bug
            </button>
          </div>

          <div className="text-center text-sm font-medium text-red-400">
            {/* Any text in the center of the header for warnings go here */}
          </div>

          <div className="ml-auto text-xs text-gray-300">
            Maps last updated: May 1, 2025
          </div>
        </nav>
      </header>

      <BugReport isOpen={bugOpen} onClose={() => setBugOpen(false)} />
    </>
  );
}

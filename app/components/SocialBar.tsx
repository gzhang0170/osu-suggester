"use client";

import { useState } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { SiOsu } from "react-icons/si";
import type { IconBaseProps } from "react-icons/lib";

const DiscordIcon = FaDiscord as unknown as React.FC<IconBaseProps>;
const TwitterIcon = FaTwitter as unknown as React.FC<IconBaseProps>;
const OsuIcon = SiOsu as unknown as React.FC<IconBaseProps>;

export default function SocialBar() {
  const [copied, setCopied] = useState(false);
  const discordName = "atomicknighto";

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(discordName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  return (
    <div className="fixed bottom-0 w-full flex justify-center mb-4 pointer-events-auto">
      <div className="flex gap-6 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <button
          onClick={copyDiscord}
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          <DiscordIcon size={24} />
          {copied ? "Copied!" : discordName}
        </button>
        <a
          href="https://twitter.com/atomicknighto"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          <TwitterIcon size={24} />
          @atomicknighto
        </a>
        <a
          href="https://osu.ppy.sh/users/10937890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          <OsuIcon size={24} />
          yukinasimp
        </a>
      </div>
    </div>
  );
}

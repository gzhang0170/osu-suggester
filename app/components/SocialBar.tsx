"use client";

import { useState } from "react";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { SiOsu } from "react-icons/si";
import type { IconBaseProps } from "react-icons/lib";

const DiscordIcon = FaDiscord as unknown as React.FC<IconBaseProps>;
const TwitterIcon = FaTwitter as unknown as React.FC<IconBaseProps>;
const GithubIcon = FaGithub as unknown as React.FC<IconBaseProps>;
const OsuIcon = SiOsu as unknown as React.FC<IconBaseProps>;

export default function SocialBar() {
  const discordHandle = "atomicknighto";
  const twitterUrl = "https://x.com/atomicknighto";
  const twitterHandle = "@atomicknighto";
  const osuUrl = "https://osu.ppy.sh/users/10937890";
  const osuUsername = "yukinasimp";
  const githubUrl = "";
  const githubHandle = "coming soon!";

  const [copied, setCopied] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText(discordHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      Icon: DiscordIcon,
      onClick: copyDiscord,
      tooltip: copied ? "Copied!" : discordHandle,
    },
    { Icon: TwitterIcon, url: twitterUrl, tooltip: twitterHandle },
    { Icon: OsuIcon, url: osuUrl, tooltip: osuUsername },
    { Icon: GithubIcon, url: githubUrl, tooltip: githubHandle },
  ];

  return (
    <div
      className="
            fixed bottom-4 left-1/2 transform -translate-x-1/2
            bg-gray-700 bg-opacity-50 backdrop-blur-sm
            rounded-full px-4 h-10 flex items-center space-x-3
            z-50
          "
    >
      {socials.map(({ Icon, url, onClick, tooltip }) => (
        <div key={tooltip} className="relative group">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-6 h-6 text-white hover:text-gray-200"
            >
              <Icon className="w-full h-full" />
            </a>
          ) : (
            <button
              onClick={onClick}
              className="flex items-center justify-center w-6 h-6 text-white hover:text-gray-200"
            >
              <Icon className="w-full h-full" />
            </button>
          )}
          
          <div
            className="
                  pointer-events-none
                  absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1
                  whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white
                  opacity-0 group-hover:opacity-100 transition-opacity
                "
          >
            {tooltip}
          </div>
        </div>
      ))}
    </div>
  );
}

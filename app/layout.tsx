import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import InfoBox from "./components/InfoBox";
import SocialBar from "./components/SocialBar";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoMono.className}>
      <head>
        <title>osu!suggester</title>
        <meta name="description" content="Find similar osu! beatmaps" />
        <link rel="icon" href="/icon.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content="gDtpYQsYd-uhtmbduFBTgX9YnueVghPEsHXKnt2KUXU"
        />
      </head>
      <body className="relative">
        <Header />
        <Analytics />
        <SpeedInsights />

        <main className="pt-12">{children}</main>

        <InfoBox>
          {`Similarity is determined based on each map's BPM, attributes, aim and speed stats, and its objects (hitcircles and sliders).
Please note beatmap length is not considered.

The scale is about as follows:
• 95-100: Extremely similar
• 90-95: Very similar
• 80-90: Relatively similar
• 70-80: Somewhat similar
• 60-70: Slightly similar
• Below 60: Not similar

Search requirements:
• The map must have a leaderboard before May 1, 2025
• Only returns maps with leaderboards

Known inaccuracies:
• Rhythmly complex maps (polyrhythm)
• Gimmickier maps (low AR, precision)
• Aim angle differences (sharp vs wide)
• Stream-type differences (same-spacing vs accel-decel)
• Maps below 3.0 stars or above 7.5 stars
• Non-standard primary BPMs (maps that aren't 1/2, 1/4, etc.; ex. 1/3, such as `}
          <a
            href="https://osu.ppy.sh/beatmapsets/1016347#osu/2127114"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300 hover:text-blue-100"
          >
            Protoflicker
          </a>
          {`)  
          
Check back for updates, and feel free to submit reports of inaccuracies
with the report button after searching, or reach out via Discord,
Twitter, or osu!`}
        </InfoBox>

        <SocialBar />
      </body>
    </html>
  );
}

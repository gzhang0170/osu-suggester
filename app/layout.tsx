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
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className="relative">
        <Header />
        <Analytics />
        <SpeedInsights />

        <main className="pt-12">
          {children}
        </main>

        <InfoBox
          infoText={
            "Similarity is determined based on each map's BPM, attributes, " +
            "aim and speed stats, and its objects (hitcircles and sliders). " +
            "The scale is about as follows:\n" +
            "• 95-100: Extremely similar\n" +
            "• 90-95: Very similar\n" +
            "• 80-90: Relatively similar\n" +
            "• 70-80: Somewhat similar\n" +
            "• 60-70: Slightly similar\n" +
            "• Below 60: Not similar\n\n" +
            "Search requirements:\n" +
            "• The map must have a leaderboard (ranked, loved, or approved) before May 1, 2025\n" +
            "• Only returns maps with leaderboards\n\n" +
            "Known inaccuracies:\n" +
            "• Rhythmly complex maps (ex. polyrhythm)\n" +
            "• Gimmickier maps (ex. low AR, precision)\n" +
            "• Differentiating comfortable aim (sharp angles) from uncomfortable aim (wide angles)\n" +
            "• Similarly, between same-spacing streams and accel-decel streams\n" +
            "• Maps below 3.0 stars and above 7.5 stars\n" +
            "• Maps with primary BPMs that aren't 1/2, 1/4, etc. (ex. 1/3, 1/6)\n\n" +
            "Check back for updates! I'm currently working on a better UI, this is currently just a skeleton layout " +
            "that I've deployed to get some playtesting with.\n\n" +
            "Feel free to submit reports of inaccuracies with the report button after searching, " +
            "or reach out to me via Discord, Twitter, or osu!"
          }
        />

        <SocialBar />
      </body>
    </html>
  );
}

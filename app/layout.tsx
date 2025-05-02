import './globals.css'
import { Roboto_Mono } from "next/font/google";
import InfoBox from "./components/InfoBox";
import SocialBar from "./components/SocialBar";

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'osu!suggester',
  description: 'Find similar osu! beatmaps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body className="relative">
        {children}

        <InfoBox
          infoText={
            "Requirements:\n" +
            "• The map must have a leaderboard (ranked, loved, or approved) before May 1, 2025\n"+
            "• Only returns maps with leaderboards\n\n" +
            "Known inaccuracies:\n" +
            "• Rhythmly complex maps (ex. polyrhythm)\n" +
            "• Gimmickier maps (ex. low AR, precision)\n" +
            "• Differentiating comfortable aim (sharp angles) from uncomfortable aim (wide angles)\n" +
            "• Maps below 4.0 stars and above 7.5 stars\n" +
            "• Maps with primary BPMs that aren't 1/2, 1/4, etc. (ex. 1/3, 1/6)\n\n" +
            "Check back for updates! I'm currently working on a better UI, this is currently just a skeleton layout " +
            "that I've deployed to get some playtesting with."
          }
        />

        <SocialBar />
      </body>
    </html>
  )
}

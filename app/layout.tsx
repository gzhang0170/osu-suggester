import './globals.css'
import { Roboto_Mono } from "next/font/google";

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
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  )
}

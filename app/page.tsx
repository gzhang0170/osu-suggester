import HomeClient from "./components/HomeClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "osu!suggester",
  description: "Find similar osu! beatmaps",
};

export default function Page() {
  return <HomeClient />;
}
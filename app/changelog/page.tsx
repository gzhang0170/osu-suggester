export const metadata = {
  title: "Changelog",
};

const entries = [
  {
    date: "May 3, 2025",
    changes: [
      "Implemented search protection and loading when searching a map",
      "Added DT/HT and HR/EZ mod toggles to search bar",
      "Added a maintenance page for when the API is down or needs reworking",
      "Added changelog page to record changes to the website and API",
      "Implemented solo mod searching and suggestions",
      "Moved API from render.com to DigitalOcean to fix memory issues"
    ],
  },
  {
    date: "May 2, 2025",
    changes: [
      "Upgraded to Next 15 and React 19",
      "Added artist and song metadata",
      "Added report button with feedback for alternative maps",
      "Added beatmap card and status",
      "Implemented rate limiter (10 requests per minute for similarity search, 1 report per 30 seconds)",
      "Replaced database implementation with osu!api calls using ossapi (allowed for more metadata options)",
      "Increased the weight of AR and slightly changed weights of other parameters in the similarity algorithm"
    ],
  },
  {
    date: "May 1, 2025",
    changes: [
      "Added various attributes and statistics to each map (BPM, CS, AR, OD, HP, etc.)",
      "Expanded search to 20 beatmaps",
      "Added info box for updates and clarifications",
      "Added social bar with Discord, Twitter, and osu! links",
      "Added database helper for retrieving some metadata",
      "Changed the similarity scoring system to a power-based scale, where 100 is the maximum",
      "Updated database from January 2025 to May 2025 osu! dump",
      "Increased the weight of BPM and CS in the similarity algorithm"
    ],
  },
  {
    date: "April 24, 2025",
    changes: [
      "Moved backend API from Flask to render.com",
      "Added clickable links for each beatmap ID",
      "Increased weight of speed/object ratio for more accurate stream vs burst map distinction"
    ],
  },
  {
    date: "April 22, 2025",
    changes: [
      "First deployment of website to Vercel",
      "Added title and search bar",
      "Returns 10 beatmap IDs in plaintext",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white pb-16">
      <h1 className="text-3xl font-bold mb-4">Changelog</h1>

      {entries.map((entry) => (
        <section key={entry.date} className="mt-8">
          <h2 className="text-xl font-semibold text-gray-200">{entry.date}</h2>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
            {entry.changes.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

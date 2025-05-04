export const metadata = {
    title: "Maintenance",
  };
  
  export default function MaintenancePage() {
    return (
      <main className="flex h-screen items-center justify-center text-white">
        <div className="max-w-md text-center p-6">
          <h1 className="text-4xl font-bold mb-4">osu!suggester is currently down for upgrades.</h1>
          <p className="text-lg mb-6">
            Please check back soon!
          </p>
          <p className="text-sm text-gray-400">
            Currently adding: HR maps
          </p>
        </div>
      </main>
    );
  }
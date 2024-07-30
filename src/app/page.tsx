import WatchListExplorer from "@/components/WatchListExplorer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-[600px]">
        <div className="space-y-1.5 mb-12">
          <h1 className={`uppercase font-mono text-sm`}>My Movie List</h1>
          <h2 className="text-4xl font-black max-w-sm md:text-5xl md:max-w-lg">
            Organize your movie watching journey
          </h2>
          <p className="text-lg">
            {"Keep track of films you've seen and ones you want to watch."}
          </p>
        </div>

        <WatchListExplorer />
      </div>
    </main>
  );
}

import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col flex-1 items-center justify-center bg-[#050d24] font-sans">
      <main className="w-full">
        <Hero />
      </main>
    </div>
  );
}

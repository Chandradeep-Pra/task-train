export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f5f0e6] relative overflow-hidden">
      {/* Faint grid background like Da Vinci sketch paper */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-0" />

      {/* Decorative border */}
      <div className="absolute inset-5 border-2 border-[#a58c65] rounded-xl opacity-40 z-0" />

      <h1 className="z-10 text-center text-5xl md:text-6xl font-serif italic text-[#4b3e2e] tracking-wider drop-shadow-sm">
        Hi, Abhinav
      </h1>
    </div>
  );
}

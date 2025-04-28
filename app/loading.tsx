export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-70 animate-ping-fast"></div>
          <div className="absolute inset-0 rounded-full border-4 border-purple-500 opacity-50 animate-ping-medium"></div>
          <div className="absolute inset-0 rounded-full border-4 border-pink-500 opacity-40 animate-ping-slow"></div>
          <div className="absolute inset-0 rounded-full border-4 border-black"></div>
        </div>
      </div>
    );
  }
  
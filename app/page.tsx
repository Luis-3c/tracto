import Searcher from "./components/Searcher";

export default function Home() {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-sky-310">
      {/* --- BACKGROUND LAYER (Replaces sky-bg.png) --- */}
      {/* This creates a dynamic, high-quality sky effect using only CSS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to from-sky-300 via-sky-100 to-white"></div>
        {/* Abstract Clouds/Orbs for depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-transparent opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-green-300 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-10 pb-32 px-4">
        
        {/* Main Text Content */}
        <div className="max-w-4xl w-full text-center space-y-6 mb-12">

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight tracking-tight drop-shadow-sm">
            Track any flight, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-cyan-400 dark:from-blue-400 dark:to-cyan-300">
              anywhere in the world.
            </span>
          </h1>
          
          {/*<p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Real-time updates, detailed route maps, and arrival forecasts. 
          </p>*/}
        </div>

        {/* --- SEARCHER CONTAINER --- */}
        {/* This is the wrapper for your <Searcher /> component */}
        <div className="w-full max-w-4xl relative group">
            
            {/* Decorative background blur behind searcher */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            {/* The Main Card */}
            <div className="relative bg-white/70 dark:bg-white/35 backdrop-blur-xl border border-white/60 p-3 rounded-2xl shadow-2xl ring-1 ring-black/5">
                
                {/* --- YOUR SEARCHER LOGIC GOES HERE --- */}
                <Searcher />
                 {/* --- END SEARCHER LOGIC --- */}

            </div>
            
            {/* Quick Status Cards (Decorations) */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/40 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center hover:bg-white/60 transition cursor-default">
                   <div className="text-2xl font-bold text-slate-800">12k+</div>
                   <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Active Flights</div>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center hover:bg-white/60 transition cursor-default">
                   <div className="text-2xl font-bold text-slate-800">4,200</div>
                   <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Airports</div>
                </div>
                 <div className="bg-white/40 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center hover:bg-white/60 transition cursor-default hidden md:block">
                   <div className="text-2xl font-bold text-slate-800">99.9%</div>
                   <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Uptime</div>
                </div>
                 <div className="bg-white/40 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-center hover:bg-white/60 transition cursor-default hidden md:block">
                   <div className="text-2xl font-bold text-slate-800">24/7</div>
                   <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Tracking</div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

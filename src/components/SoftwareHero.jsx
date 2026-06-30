import { useNavigate } from 'react-router-dom';

export default function SoftwareHero() {
  const navigate = useNavigate();

  return (
    <section
      id="software-home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="orb w-[500px] h-[500px] bg-blue-600/20 -top-40 -left-20 animate-spin-slow opacity-30" />
        <div className="orb w-[600px] h-[600px] bg-violet-700/20 bottom-0 -right-20 opacity-20" style={{animation:'orbFloat 12s ease-in-out infinite reverse'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-glow" />
              ZOHO IT Software Division
            </div>

            <h1 className="animate-fade-up delay-100 text-5xl xl:text-6xl font-black leading-[1.1] text-white mb-6">
              Transform Your Ideas into{' '}
              <span className="text-gradient">Powerful Digital Solutions</span>
            </h1>

            <p className="animate-fade-up delay-200 text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              We build modern websites, scalable web applications, mobile applications, enterprise software, cloud solutions, and AI-powered systems tailored to your business needs.
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/software-development/contact')}
                className="flex items-center gap-2 px-8 py-4 grad-primary text-white font-bold rounded-full shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 text-base"
              >
                🚀 Get Free Consultation
              </button>
              <button
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-full shadow-lg border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-base"
              >
                📁 View Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT ANIMATED ILLUSTRATION */}
          <div className="animate-fade-in delay-200 relative perspective-1000">
            {/* Animated Code Editor Window */}
            <div className="relative w-full max-w-lg mx-auto bg-slate-950/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
              {/* Window Header */}
              <div className="flex items-center px-4 py-3 bg-slate-900/80 border-b border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-slate-500">app.js — ZohoDev</div>
              </div>
              {/* Window Body (Animated Code Lines) */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden h-64">
                <div className="flex flex-col gap-2">
                  <div className="w-3/4 h-4 bg-blue-500/20 rounded-md animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1/2 h-4 bg-violet-500/20 rounded-md animate-pulse" style={{ animationDelay: '200ms' }} />
                  <div className="w-full h-4 bg-slate-700/30 rounded-md animate-pulse" style={{ animationDelay: '400ms' }} />
                  <div className="w-5/6 h-4 bg-slate-700/30 rounded-md animate-pulse" style={{ animationDelay: '600ms' }} />
                  <div className="w-2/3 h-4 bg-blue-500/20 rounded-md animate-pulse" style={{ animationDelay: '800ms' }} />
                  
                  {/* Faux Code text */}
                  <div className="mt-4 text-emerald-400 opacity-80">
                    <span className="text-pink-500">import</span> {'{ Build }'} <span className="text-pink-500">from</span> <span className="text-yellow-300">'@zoho/ideas'</span>;
                  </div>
                  <div className="text-slate-300 opacity-80">
                    <span className="text-blue-400">const</span> solution = <span className="text-pink-500">await</span> <span className="text-blue-300">Build</span>({'{'}
                  </div>
                  <div className="pl-4 text-slate-300 opacity-80">
                    type: <span className="text-yellow-300">'Enterprise Software'</span>,
                  </div>
                  <div className="pl-4 text-slate-300 opacity-80">
                    scalable: <span className="text-orange-400">true</span>,
                  </div>
                  <div className="text-slate-300 opacity-80">
                    {'}'});
                  </div>
                </div>
              </div>
              
              {/* Floating elements around the editor */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-blue-500/10 rounded-2xl border border-blue-500/20 animate-float backdrop-blur-md flex items-center justify-center text-3xl">🚀</div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-violet-500/10 rounded-full border border-violet-500/20 animate-float backdrop-blur-md flex items-center justify-center text-2xl" style={{ animationDelay: '1s' }}>⚙️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

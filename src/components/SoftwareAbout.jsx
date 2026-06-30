export default function SoftwareAbout() {
  return (
    <section id="about" className="relative py-24 bg-slate-950 overflow-hidden border-y border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Image / Collage */}
          <div className="relative animate-fade-up">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Decorative backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-violet-600/20 rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 glass rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center transform -rotate-3 transition-transform duration-500 hover:rotate-0">
                {/* We can use a nice tech-focused image or an icon pattern */}
                <div className="w-full h-full bg-slate-900/50 flex flex-wrap items-center justify-center p-8 gap-4 opacity-80">
                  <div className="text-5xl animate-bounce" style={{animationDuration: '3s'}}>💻</div>
                  <div className="text-5xl animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>🌐</div>
                  <div className="text-5xl animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>📱</div>
                  <div className="text-5xl animate-bounce" style={{animationDuration: '4.5s', animationDelay: '0.2s'}}>☁️</div>
                  <div className="text-5xl animate-bounce" style={{animationDuration: '3.2s', animationDelay: '0.8s'}}>🔒</div>
                  <div className="text-5xl animate-bounce" style={{animationDuration: '3.8s', animationDelay: '1.2s'}}>🤖</div>
                </div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 animate-float">
                <div className="w-12 h-12 rounded-full grad-primary flex items-center justify-center text-white font-bold text-xl">
                  5+
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Years of</div>
                  <div className="text-xs text-slate-400">Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="animate-fade-up delay-200">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
              About Software Development
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              Empowering Businesses with <span className="text-gradient">Next-Gen Tech</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              At ZOHO IT Solutions, our Software Development division is dedicated to crafting innovative, secure, and highly scalable digital products. We don't just write code; we solve complex business challenges with intelligent technology.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Whether you are a startup looking to launch your first MVP or an enterprise needing a full-scale digital transformation, our expert team of developers, designers, and cloud architects is here to turn your vision into reality.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Agile Development Process',
                'Experienced Tech Stack Experts',
                'Focus on Security & Scalability',
                'Transparent Communication',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

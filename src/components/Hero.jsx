export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const cards = [
    { icon: '💻', title: 'Software Dev', sub: 'Custom Solutions' },
    { icon: '📱', title: 'Mobile Apps', sub: 'iOS & Android' },
    { icon: '🤖', title: 'AI & ML', sub: 'Smart Systems' },
    { icon: '☁️', title: 'Cloud Services', sub: 'Scalable Infra' },
    { icon: '🎓', title: 'IT Training', sub: '50+ Courses' },
    { icon: '🚀', title: '100% Placement', sub: 'Job Guarantee' },
  ];

  const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '98%',   label: 'Placement Rate' },
    { number: '200+',  label: 'Hiring Partners' },
    { number: '10+',   label: 'Years Experience' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glows */}
        <div className="orb w-[600px] h-[600px] bg-blue-600/20 -top-40 -right-40 animate-spin-slow opacity-20" />
        <div className="orb w-[500px] h-[500px] bg-violet-700/20 bottom-0 -left-40 opacity-15" style={{animation:'orbFloat 14s ease-in-out infinite reverse'}} />
        <div className="orb w-[300px] h-[300px] bg-blue-400/10 top-1/2 left-1/3 opacity-10" style={{animation:'orbFloat 10s ease-in-out infinite'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-glow" />
              India's #1 IT Training & Placement Hub
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-100 text-5xl xl:text-6xl font-black leading-[1.08] text-white mb-6">
              Transform Your Career with{' '}
              <span className="text-gradient">Industry-Focused</span>{' '}
              IT Training &amp; Placement
            </h1>

            {/* Sub-heading */}
            <p className="animate-fade-up delay-200 text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              Empowering Students and Professionals with Advanced Technology Skills
              and <span className="text-white font-semibold">100% Placement Support.</span>
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-12">
              <button
                id="hero-enroll-btn"
                onClick={() => scrollTo('courses')}
                className="flex items-center gap-2 px-8 py-4 grad-primary text-white font-bold rounded-full shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 text-base"
              >
                🚀 Enroll Now
              </button>
              <button
                id="hero-contact-btn"
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-8 py-4 text-white font-bold rounded-full border border-white/20 backdrop-blur-sm hover:border-white/50 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 text-base"
              >
                📞 Contact Us
              </button>
            </div>

            {/* Stats */}
            <div className="animate-fade-up delay-400 flex flex-wrap gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-gradient leading-none">{s.number}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – floating service cards */}
          <div className="animate-fade-in delay-200 relative">
            {/* Floating placement badge */}
            <div className="absolute -top-6 -right-4 z-20 animate-float grad-primary text-white px-5 py-3 rounded-2xl text-center shadow-2xl shadow-blue-600/40">
              <span className="block text-3xl font-black leading-none">100%</span>
              <span className="text-xs font-semibold opacity-90">Placement</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className={`glass glass-hover rounded-2xl p-6 text-center cursor-default transition-all duration-300 group ${
                    i % 2 === 0 ? '' : 'mt-6'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </span>
                  <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Decorative ring */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-blue-500/20 animate-spin-slow pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full border border-violet-500/20 pointer-events-none" style={{animation:'spinSlow 14s linear infinite reverse'}} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-xs text-slate-500 font-medium">Scroll Down</span>
        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

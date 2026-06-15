const stats = [
  { n: '5000+', label: 'Students Trained',   icon: '🎓' },
  { n: '10+',   label: 'Years of Experience', icon: '📅' },
  { n: '200+',  label: 'Industry Experts',    icon: '👨‍💼' },
  { n: '98%',   label: 'Placement Rate',      icon: '🏆' },
];

const features = [
  { icon: '✅', text: 'ISO Certified Training Institute' },
  { icon: '✅', text: 'Industry-Aligned Curriculum' },
  { icon: '✅', text: 'Hands-On Live Project Experience' },
  { icon: '✅', text: 'Expert Trainers from Top MNCs' },
  { icon: '✅', text: '100% Placement Assistance Guarantee' },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-slate-900 overflow-hidden">
      {/* Orbs */}
      <div className="orb w-96 h-96 bg-blue-600/10 -top-20 -left-20 pointer-events-none" />
      <div className="orb w-80 h-80 bg-violet-700/10 bottom-0 right-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            🏢 About Us
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-center text-gradient-white mb-4">
          Empowering the Next Generation<br />of IT Professionals
        </h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          ZOHO IT Solutions has been at the forefront of technology education and digital transformation,
          bridging the gap between academia and industry since 2014.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT – Stats grid */}
          <div>
            <div className="grid grid-cols-2 gap-5 mb-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="glass glass-hover rounded-2xl p-6 text-center transition-all duration-300 group cursor-default"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div className="text-3xl font-black text-gradient leading-none mb-1">{s.n}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mission / Vision */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5 border-l-2 border-blue-500">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-bold text-white mb-1 text-sm">Our Mission</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To provide world-class IT education and empower every student with skills that drive real career growth.
                </p>
              </div>
              <div className="glass rounded-2xl p-5 border-l-2 border-violet-500">
                <div className="text-2xl mb-2">🔭</div>
                <h4 className="font-bold text-white mb-1 text-sm">Our Vision</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To become the most trusted IT training and placement partner across India and globally.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT – Content */}
          <div>
            <h3 className="text-2xl font-black text-white mb-4">
              Your Trusted Technology &amp;{' '}
              <span className="text-gradient">Career Partner</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Founded in 2014, ZOHO IT Solutions has grown into one of India's premier IT training institutes.
              We combine theoretical knowledge with hands-on project experience, ensuring every student is
              job-ready from day one. Our expert faculty, cutting-edge curriculum, and strong industry
              connections make us the preferred choice for aspiring IT professionals.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200"
                >
                  <span className="text-base">{f.icon}</span>
                  <span className="text-sm font-medium text-slate-300">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl glass border-l-2 border-emerald-400/60">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0">
                🏆
              </div>
              <div>
                <p className="text-sm font-bold text-white">Award-Winning Institute</p>
                <p className="text-xs text-slate-400">Best IT Training Institute – TechEdu Awards 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

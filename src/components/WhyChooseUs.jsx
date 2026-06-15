const reasons = [
  {
    icon: '👨‍🏫',
    title: 'Expert Trainers',
    desc: 'Learn from industry professionals with 10+ years of real-world experience at top MNCs and startups.',
    color: 'border-blue-500/30 hover:border-blue-500/60',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: '🏗️',
    title: 'Live Projects',
    desc: 'Work on 5+ real client projects during the course to build a portfolio that impresses interviewers.',
    color: 'border-violet-500/30 hover:border-violet-500/60',
    iconBg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: '🎓',
    title: 'Industry Certification',
    desc: 'Earn globally recognized certifications accepted by Fortune 500 companies across all sectors.',
    color: 'border-cyan-500/30 hover:border-cyan-500/60',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: '🤝',
    title: '100% Placement Support',
    desc: 'Dedicated placement cell with direct connections to 200+ companies and guaranteed interview calls.',
    color: 'border-emerald-500/30 hover:border-emerald-500/60',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: '🕐',
    title: 'Flexible Learning',
    desc: 'Choose weekday, weekend, or online-only batches. Study at your own pace with lifetime LMS access.',
    color: 'border-orange-500/30 hover:border-orange-500/60',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: '🏆',
    title: 'Award-Winning Institute',
    desc: "Recognized as India's Best IT Training Institute 2024 with a 98% student satisfaction score.",
    color: 'border-amber-500/30 hover:border-amber-500/60',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}>

      <div className="orb w-96 h-96 bg-blue-600/8 top-0 right-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-violet-700/8 bottom-0 left-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            💡 Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
            The ZOHO IT Advantage
          </h2>
          <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We go beyond teaching — we build careers. Here's why 5000+ students trust us
            to transform their professional journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              id={`why-card-${i}`}
              className={`relative rounded-3xl p-8 glass border transition-all duration-300 cursor-default group hover:-translate-y-2 hover:shadow-2xl text-center overflow-hidden ${r.color}`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-full grad-primary-soft rounded-full transition-all duration-500" />

              <div className={`w-16 h-16 rounded-full border ${r.iconBg} flex items-center justify-center text-3xl mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {r.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{r.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-16 rounded-3xl overflow-hidden relative">
          <div className="grad-blue-purple p-10 text-center">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-3">Ready to Transform Your Career?</h3>
              <p className="text-blue-100 mb-7 max-w-xl mx-auto">
                Join 5000+ successful graduates and take the first step toward your dream IT career today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  id="why-enroll-btn"
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-blue-700 font-black rounded-full hover:bg-blue-50 hover:-translate-y-1 transition-all duration-200 shadow-xl shadow-black/20"
                >
                  🚀 Start Enrolling
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/30 hover:bg-white/20 hover:-translate-y-1 transition-all duration-200"
                >
                  📞 Talk to an Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

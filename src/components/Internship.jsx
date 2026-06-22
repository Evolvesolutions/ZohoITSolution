import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: '🏗️',
    title: 'Live Projects',
    desc: 'Work on real-world client projects from day one. Build a portfolio that stands out.',
  },
  {
    icon: '🏭',
    title: 'Industry Experience',
    desc: 'Immerse yourself in a professional environment with real deadlines and team collaboration.',
  },
  {
    icon: '📜',
    title: 'Dual Certification',
    desc: 'Earn both an internship certificate and a course completion certificate recognized by top firms.',
  },
  {
    icon: '🧑‍🏫',
    title: 'Expert Mentorship',
    desc: 'One-on-one sessions with industry veterans who guide your technical and professional growth.',
  },
];

const skills = [
  { label: 'Project Completion Rate',  pct: 97 },
  { label: 'Student Satisfaction',      pct: 98 },
  { label: 'Industry Relevance Score',  pct: 95 },
  { label: 'Post-Internship Placement', pct: 92 },
];

function ProgressBar({ label, pct }) {
  const ref  = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-6 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-200">{label}</span>
        <span className="text-sm font-bold text-blue-400">{pct}%</span>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full grad-primary-soft transition-all ease-out"
          style={{
            width: go ? `${pct}%` : '0%',
            transitionDuration: '1.5s',
            transitionDelay: '0.2s',
          }}
        />
      </div>
    </div>
  );
}

export default function Internship() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', college: '', domain: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/applications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setShowForm(false);
          setFormData({ name: '', email: '', phone: '', college: '', domain: '' });
        }, 3000);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting the application.");
    }
  };

  return (
    <section id="internship" className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' }}>

      <div className="orb w-96 h-96 bg-blue-600/10 top-10 right-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            🎓 Internship Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
            Real-World Experience, <span className="text-gradient">Real Results</span>
          </h2>
          <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Our internship programs bridge the gap between learning and doing — giving you the
            hands-on experience top companies demand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT – Features */}
          <div>
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  id={`intern-feature-${i}`}
                  className="glass rounded-2xl p-5 border border-white/[0.07] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group cursor-default"
                >
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                  <h4 className="font-bold text-white text-sm mb-2">{f.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <button
                id="intern-apply-btn"
                onClick={() => setShowForm(true)}
                className="px-7 py-3.5 grad-primary text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                🚀 Apply for Internship
              </button>
              <button
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 text-blue-400 font-semibold rounded-full border border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 text-sm"
              >
                View Courses →
              </button>
            </div>
          </div>

          {/* RIGHT – Progress bars */}
          <div>
            <div className="glass rounded-3xl p-8 border border-white/[0.07]">
              <h3 className="text-xl font-bold text-white mb-2">Our Track Record</h3>
              <p className="text-sm text-slate-400 mb-8">Consistent excellence across all performance metrics</p>

              {skills.map((s, i) => (
                <ProgressBar key={i} label={s.label} pct={s.pct} />
              ))}

              <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                {[
                  { n: '3000+', label: 'Interns Placed' },
                  { n: '100+', label: 'Partner Companies' },
                  { n: '45+', label: 'Live Projects' },
                  { n: '₹4.5L', label: 'Avg. Starting CTC' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-xl font-black text-gradient">{s.n}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Application Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass w-full max-w-lg rounded-3xl p-8 border border-white/[0.1] relative animate-fade-up">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">Internship Application</h3>
            <p className="text-sm text-slate-400 mb-6">Fill in your details to apply for our internship program.</p>
            
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold text-center">
                ✅ Application submitted successfully! We will contact you soon.
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Full Name *</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-white/[0.1] text-white text-sm focus:border-blue-500/50 focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Email *</label>
                    <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-white/[0.1] text-white text-sm focus:border-blue-500/50 focus:outline-none transition-colors" placeholder="john@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Phone *</label>
                    <input required type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-white/[0.1] text-white text-sm focus:border-blue-500/50 focus:outline-none transition-colors" placeholder="+91 90000 00000" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">College / University *</label>
                  <input required type="text" value={formData.college} onChange={e=>setFormData({...formData, college: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-white/[0.1] text-white text-sm focus:border-blue-500/50 focus:outline-none transition-colors" placeholder="Your College Name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Internship Domain *</label>
                  <select required value={formData.domain} onChange={e=>setFormData({...formData, domain: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/[0.1] text-slate-300 text-sm focus:border-blue-500/50 focus:outline-none transition-colors">
                    <option value="">Select Domain</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-3 mt-4 grad-primary text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 transition-all duration-300">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

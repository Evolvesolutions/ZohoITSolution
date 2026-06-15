import { useState } from 'react';
import EnrollmentModal from './EnrollmentModal';

const services = [
  {
    icon: '📄',
    title: 'Resume Building',
    desc: 'ATS-optimized, professionally crafted resumes that grab recruiter attention in seconds.',
    color: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: '🎤',
    title: 'Mock Interviews',
    desc: 'Practice with real-world interview simulations conducted by industry professionals.',
    color: 'bg-violet-500/10 border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: '💻',
    title: 'Technical Training',
    desc: 'Targeted coding practice, DSA, system design, and live problem-solving sessions.',
    color: 'bg-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: '🧠',
    title: 'Aptitude Training',
    desc: 'Quantitative reasoning, logical thinking, and verbal ability prep for top companies.',
    color: 'bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: '🤝',
    title: 'Job Referrals',
    desc: 'Direct referrals to our 200+ hiring partners across IT, product, and service companies.',
    color: 'bg-orange-500/10 border-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: '📊',
    title: 'Career Guidance',
    desc: 'Personalized career roadmaps, salary negotiation tips, and LinkedIn profile optimization.',
    color: 'bg-pink-500/10 border-pink-500/20',
    iconColor: 'text-pink-400',
  },
];

const dashboardStats = [
  { n: '5000+', label: 'Students Placed',   icon: '🎯', sub: 'and counting' },
  { n: '200+',  label: 'Hiring Partners',   icon: '🏢', sub: 'across India' },
  { n: '₹12L',  label: 'Highest CTC',       icon: '💰', sub: 'package offered' },
  { n: '98%',   label: 'Placement Rate',    icon: '📈', sub: 'in 6 months' },
];

const companies = [
  'TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant',
  'Accenture', 'Tech Mahindra', 'Capgemini', 'IBM', 'Microsoft',
  'Amazon', 'Flipkart',
];

export default function Placement() {
  const [modal, setModal] = useState({ open: false, name: '' });

  const openEnroll = (name = '') => setModal({ open: true, name });
  const closeModal = () => setModal({ open: false, name: '' });

  return (
    <>
      <EnrollmentModal
        isOpen={modal.open}
        onClose={closeModal}
        initialType="placement"
        initialName={modal.name}
      />

      <section id="placement" className="relative py-28 bg-slate-900 overflow-hidden">
        <div className="orb w-96 h-96 bg-blue-600/8 -top-20 left-0 pointer-events-none" />
        <div className="orb w-80 h-80 bg-violet-600/8 bottom-0 right-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              🏆 Placement Assistance
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
              Your Dream Job is Our Mission
            </h2>
            <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              End-to-end placement support that transforms students into confident professionals,
              ready to excel at top companies.
            </p>

            {/* Top-level enroll CTA */}
            <button
              id="placement-main-enroll-btn"
              onClick={() => openEnroll('Complete Placement Assistance Bundle')}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 grad-primary text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              🚀 Apply for Placement Assistance
            </button>
          </div>

          {/* Service Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {services.map((s, i) => (
              <div
                key={i}
                id={`placement-card-${i}`}
                className={`rounded-2xl p-6 border ${s.color} transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl flex flex-col`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className={`text-base font-bold ${s.iconColor} mb-2`}>{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{s.desc}</p>

                <button
                  id={`placement-service-btn-${i}`}
                  onClick={() => openEnroll(s.title)}
                  className="mt-5 w-full py-2 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/5 hover:text-white hover:border-blue-500/30 transition-all duration-200"
                >
                  Enroll for This →
                </button>
              </div>
            ))}
          </div>

          {/* Dashboard */}
          <div className="glass rounded-3xl p-8 border border-white/[0.07] mb-10">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              📊 Placement Statistics Dashboard
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dashboardStats.map((s, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group cursor-default"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div className="text-3xl font-black text-gradient leading-none mb-1">{s.n}</div>
                  <div className="text-sm font-semibold text-slate-300">{s.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Companies */}
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
              Our Students Work At
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {companies.map((c, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 rounded-xl glass border border-white/[0.08] text-sm font-bold text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 cursor-default"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom CTA banner */}
          <div className="glass rounded-3xl p-10 border border-blue-500/20 text-center bg-gradient-to-br from-blue-600/10 to-violet-600/10">
            <h3 className="text-2xl font-black text-white mb-3">Ready to Land Your Dream Job?</h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm">
              Join 5000+ students who accelerated their careers with our end-to-end placement program.
            </p>
            <button
              id="placement-bottom-cta-btn"
              onClick={() => openEnroll('Complete Placement Assistance Bundle')}
              className="px-8 py-3.5 grad-primary text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              🎯 Start My Placement Journey
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

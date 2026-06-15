import { useState } from 'react';
import EnrollmentModal from './EnrollmentModal';

const courses = [
  {
    icon: '⚛️',
    banner: 'from-blue-600/40 to-cyan-600/40',
    title: 'Full Stack Web Development',
    rating: 4.9, reviews: '2.3k',
    duration: '6 Months', mode: 'Online + Offline',
    level: 'Beginner',
    desc: 'Master HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB to become a job-ready full-stack developer.',
    price: '₹25,000',
    originalPrice: '₹45,000',
    badge: '🔥 Bestseller',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    icon: '🤖',
    banner: 'from-violet-600/40 to-purple-600/40',
    title: 'AI & Machine Learning',
    rating: 4.8, reviews: '1.8k',
    duration: '6 Months', mode: 'Online + Offline',
    level: 'Intermediate',
    desc: 'Deep dive into AI, neural networks, NLP, computer vision, and real-world ML project deployment.',
    price: '₹35,000',
    originalPrice: '₹60,000',
    badge: '🚀 Hot',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
    tags: ['Python', 'TensorFlow', 'NLP'],
  },
  {
    icon: '☁️',
    banner: 'from-sky-600/40 to-blue-600/40',
    title: 'Cloud Computing & DevOps',
    rating: 4.7, reviews: '1.2k',
    duration: '4 Months', mode: 'Online',
    level: 'Intermediate',
    desc: 'Master AWS, Azure, Docker, Kubernetes, CI/CD pipelines, and infrastructure-as-code.',
    price: '₹28,000',
    originalPrice: '₹50,000',
    badge: '💰 High Pay',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
    tags: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    icon: '📊',
    banner: 'from-emerald-600/40 to-teal-600/40',
    title: 'Data Science & Analytics',
    rating: 4.8, reviews: '1.5k',
    duration: '5 Months', mode: 'Online + Offline',
    level: 'Beginner',
    desc: 'Learn Python, Pandas, NumPy, SQL, Power BI, and machine learning for data-driven decision making.',
    price: '₹22,000',
    originalPrice: '₹40,000',
    badge: '📈 Trending',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    tags: ['Python', 'SQL', 'Power BI'],
  },
  {
    icon: '📱',
    banner: 'from-cyan-600/40 to-indigo-600/40',
    title: 'Mobile App Development',
    rating: 4.7, reviews: '900',
    duration: '4 Months', mode: 'Online',
    level: 'Intermediate',
    desc: 'Build production-ready iOS and Android apps using React Native with real-world project experience.',
    price: '₹20,000',
    originalPrice: '₹38,000',
    badge: '🎯 In Demand',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    tags: ['React Native', 'Expo', 'Firebase'],
  },
  {
    icon: '🌐',
    banner: 'from-pink-600/40 to-rose-600/40',
    title: 'Digital Marketing Pro',
    rating: 4.6, reviews: '1.1k',
    duration: '3 Months', mode: 'Online',
    level: 'Beginner',
    desc: 'Master SEO, Google Ads, social media marketing, content strategy, and analytics for business growth.',
    price: '₹15,000',
    originalPrice: '₹28,000',
    badge: '⚡ Quick Start',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
    tags: ['SEO', 'Google Ads', 'Analytics'],
  },
];

export default function Courses() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState({ open: false, name: '' });

  const filters = ['All', 'Beginner', 'Intermediate'];
  const filtered = filter === 'All' ? courses : courses.filter(c => c.level === filter);

  const openEnroll = (name = '') => setModal({ open: true, name });
  const closeModal = () => setModal({ open: false, name: '' });

  return (
    <>
      <EnrollmentModal
        isOpen={modal.open}
        onClose={closeModal}
        initialType="course"
        initialName={modal.name}
      />

      <section id="courses" className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' }}>

        <div className="orb w-96 h-96 bg-violet-700/8 top-0 left-0 pointer-events-none" />
        <div className="orb w-80 h-80 bg-blue-600/8 bottom-0 right-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
              🎯 Featured Courses
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
              Start Your Learning Journey Today
            </h2>
            <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
              Industry-aligned courses with live projects, expert mentors, and placement guarantee.
            </p>

            {/* Filter tabs */}
            <div className="flex justify-center gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filter === f
                      ? 'grad-primary text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 border border-white/10 hover:text-white hover:border-white/25'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <div
                key={i}
                id={`course-card-${i}`}
                className="glass rounded-3xl overflow-hidden border border-white/[0.07] hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
              >
                {/* Banner */}
                <div className={`h-28 bg-gradient-to-br ${c.banner} flex items-center justify-between px-6 relative overflow-hidden`}>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                  {/* shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 60%, transparent 70%)' }} />
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-bold text-white leading-tight flex-1 mr-3">{c.title}</h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold whitespace-nowrap">
                      ⭐ {c.rating}
                      <span className="text-slate-500 font-normal">({c.reviews})</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-3 text-xs text-slate-500">
                    <span>⏱ {c.duration}</span>
                    <span>🖥 {c.mode}</span>
                    <span>📈 {c.level}</span>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{c.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {c.tags.map((t, j) => (
                      <span key={j} className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div>
                      <div className="text-xl font-black text-gradient">{c.price}</div>
                      <div className="text-xs text-slate-500 line-through">{c.originalPrice}</div>
                    </div>
                    <button
                      id={`enroll-btn-${i}`}
                      onClick={() => openEnroll(c.title)}
                      className="px-5 py-2.5 grad-primary text-white text-sm font-bold rounded-full shadow-md shadow-blue-600/25 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Looking for corporate or customised training?</p>
            <button
              onClick={() => openEnroll('Corporate Training')}
              className="px-8 py-3.5 text-blue-400 font-semibold rounded-full border border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 text-sm"
            >
              Get Custom Training Plan →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

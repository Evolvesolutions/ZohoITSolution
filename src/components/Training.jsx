import { useState } from 'react';
import EnrollmentModal from './EnrollmentModal';

const programs = [
  {
    icon: '⚛️', title: 'Full Stack Development',
    duration: '6 Months', level: 'Beginner → Advanced',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    desc: 'Master the complete web development stack from front-end to back-end.',
    color: 'border-blue-500/30 hover:border-blue-500/60',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    icon: '🟢', title: 'MERN Stack',
    duration: '4 Months', level: 'Intermediate',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    desc: 'Build scalable web applications using the industry-standard MERN stack.',
    color: 'border-emerald-500/30 hover:border-emerald-500/60',
    badge: 'In Demand',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    icon: '📱', title: 'React Native',
    duration: '3 Months', level: 'Intermediate',
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
    desc: 'Create cross-platform mobile apps with a single JavaScript codebase.',
    color: 'border-cyan-500/30 hover:border-cyan-500/60',
    badge: 'Trending',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    icon: '🐍', title: 'Python Development',
    duration: '3 Months', level: 'Beginner → Advanced',
    tags: ['Python', 'Django', 'Flask', 'FastAPI'],
    desc: 'Learn Python from basics to professional web and automation development.',
    color: 'border-yellow-500/30 hover:border-yellow-500/60',
    badge: 'Evergreen',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
  {
    icon: '📊', title: 'Data Science',
    duration: '5 Months', level: 'Intermediate',
    tags: ['Python', 'Pandas', 'NumPy', 'Visualization'],
    desc: 'Transform raw data into powerful insights with statistical analysis and ML.',
    color: 'border-orange-500/30 hover:border-orange-500/60',
    badge: 'High Salary',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  },
  {
    icon: '🤖', title: 'AI & Machine Learning',
    duration: '6 Months', level: 'Advanced',
    tags: ['TensorFlow', 'PyTorch', 'NLP', 'Deep Learning'],
    desc: 'Deep dive into AI, neural networks, and machine learning algorithms.',
    color: 'border-violet-500/30 hover:border-violet-500/60',
    badge: 'Future Tech',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
  {
    icon: '☕', title: 'Java Full Stack',
    duration: '6 Months', level: 'Intermediate',
    tags: ['Java', 'Spring Boot', 'Hibernate', 'MySQL'],
    desc: 'Enterprise-grade Java development from core concepts to Spring Boot.',
    color: 'border-red-500/30 hover:border-red-500/60',
    badge: 'Enterprise',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  {
    icon: '⚡', title: 'DevOps',
    duration: '3 Months', level: 'Advanced',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    desc: 'Master containerization, automation, and cloud deployment pipelines.',
    color: 'border-sky-500/30 hover:border-sky-500/60',
    badge: '6-Figure Jobs',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  },
  {
    icon: '🧪', title: 'Software Testing',
    duration: '3 Months', level: 'Beginner → Advanced',
    tags: ['Selenium', 'Jest', 'Cypress', 'Postman'],
    desc: 'Ensure software quality with manual and automated testing strategies.',
    color: 'border-pink-500/30 hover:border-pink-500/60',
    badge: 'Quick Job',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  },
];

export default function Training() {
  const [modal, setModal] = useState({ open: false, name: '' });

  const openEnroll = (name = '') => setModal({ open: true, name });
  const closeModal = () => setModal({ open: false, name: '' });

  return (
    <>
      <EnrollmentModal
        isOpen={modal.open}
        onClose={closeModal}
        initialType="training"
        initialName={modal.name}
      />

      <section id="training" className="relative py-28 bg-slate-900 overflow-hidden">
        <div className="orb w-96 h-96 bg-blue-600/8 top-0 right-0 pointer-events-none" />
        <div className="orb w-80 h-80 bg-violet-700/8 bottom-0 left-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              📚 Training Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
              Industry-Leading Training Courses
            </h2>
            <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Hands-on programs designed by industry experts to make you job-ready from day one.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p, i) => (
              <div
                key={i}
                id={`training-card-${i}`}
                className={`glass rounded-2xl p-6 border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl flex flex-col ${p.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300 block">{p.icon}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{p.desc}</p>

                <div className="flex gap-3 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">⏱ {p.duration}</span>
                  <span className="flex items-center gap-1">📈 {p.level}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((t, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  id={`training-enroll-btn-${i}`}
                  onClick={() => openEnroll(p.title)}
                  className="w-full py-2.5 grad-primary text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200 mt-auto"
                >
                  🚀 Enroll Now
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Looking for customised corporate training?</p>
            <button
              onClick={() => openEnroll('Corporate Training')}
              className="px-8 py-3.5 text-blue-400 font-semibold rounded-full border border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 text-sm"
            >
              Get Custom Corporate Training Plan →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

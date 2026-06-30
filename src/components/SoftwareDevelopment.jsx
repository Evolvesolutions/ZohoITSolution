import { Link } from 'react-router-dom';
import SoftwareHero from './SoftwareHero';

const roadmapSteps = [
  {
    step: '01',
    title: 'Discovery & Requirement Gathering',
    desc: 'We dive deep into understanding your business goals, target audience, and project requirements through detailed consultations.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-400',
    dotColor: 'bg-blue-500',
    items: ['Stakeholder Interviews', 'Market & Competitor Analysis', 'Functional Requirements Document'],
  },
  {
    step: '02',
    title: 'UI/UX Design & Prototyping',
    desc: 'Our design team creates intuitive wireframes and high-fidelity prototypes that bring your vision to life before writing a single line of code.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    color: 'from-pink-500 to-rose-400',
    dotColor: 'bg-pink-500',
    items: ['Wireframing & User Flows', 'High-Fidelity Mockups', 'Interactive Prototype Review'],
  },
  {
    step: '03',
    title: 'Agile Development',
    desc: 'Our engineers build your product in iterative sprints with regular demos, ensuring transparency and flexibility throughout.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-400',
    dotColor: 'bg-violet-500',
    items: ['Sprint Planning & Execution', 'Code Reviews & CI/CD', 'Weekly Progress Demos'],
  },
  {
    step: '04',
    title: 'Testing & Quality Assurance',
    desc: 'Rigorous manual and automated testing ensures your product is bug-free, secure, and performs flawlessly under load.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'from-emerald-500 to-green-400',
    dotColor: 'bg-emerald-500',
    items: ['Unit & Integration Testing', 'Performance & Security Audits', 'User Acceptance Testing'],
  },
  {
    step: '05',
    title: 'Deployment & Launch',
    desc: 'We deploy your application to production with zero-downtime strategies and monitor the launch for a smooth go-live.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-400',
    dotColor: 'bg-amber-500',
    items: ['Cloud Deployment Setup', 'Domain & SSL Configuration', 'Go-Live Monitoring'],
  },
  {
    step: '06',
    title: 'Support & Maintenance',
    desc: 'Post-launch, we provide ongoing support, feature enhancements, and proactive maintenance to keep your product thriving.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a1.5 1.5 0 010-2.12l.88-.88a1.5 1.5 0 012.12 0l2.1 2.1 5.1-5.1a1.5 1.5 0 012.12 0l.88.88a1.5 1.5 0 010 2.12l-7.98 7.98a1.5 1.5 0 01-2.12 0z" />
      </svg>
    ),
    color: 'from-sky-500 to-blue-400',
    dotColor: 'bg-sky-500',
    items: ['24/7 Technical Support', 'Performance Monitoring', 'Feature Updates & Scaling'],
  },
];

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Python', icon: '🐍' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Flutter', icon: '💙' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Firebase', icon: '🔥' },
];

const stats = [
  { number: '50+', label: 'Projects Delivered', icon: '🚀' },
  { number: '30+', label: 'Happy Clients', icon: '😊' },
  { number: '5+', label: 'Years of Experience', icon: '📅' },
  { number: '99%', label: 'Client Satisfaction', icon: '⭐' },
];

export default function SoftwareDevelopment() {
  return (
    <>
      <SoftwareHero />

      {/* Stats Counter Section */}
      <section className="relative py-16 bg-slate-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-gradient leading-none mb-2">{s.number}</div>
                <div className="text-sm text-slate-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirement Roadmap Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="orb w-96 h-96 bg-blue-600/8 top-20 -right-20 pointer-events-none" />
        <div className="orb w-80 h-80 bg-violet-700/8 bottom-20 -left-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
              🗺️ Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Requirement <span className="text-gradient">Roadmap</span>
            </h2>
            <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              From idea to deployment — our structured 6-step process ensures your project is delivered on time, on budget, and beyond expectations.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-violet-500/30 to-emerald-500/30" />

            <div className="space-y-12 md:space-y-0">
              {roadmapSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className="relative md:flex md:items-center md:mb-16">
                    {/* Timeline dot (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-12 h-12 rounded-full ${step.dotColor} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                        {step.step}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                      <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group hover:-translate-y-1 hover:shadow-xl">
                        {/* Mobile step number */}
                        <div className="md:hidden flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full ${step.dotColor} flex items-center justify-center text-white font-black text-sm`}>
                            {step.step}
                          </div>
                          <div className={`h-px flex-1 bg-gradient-to-r ${step.color} opacity-30`} />
                        </div>

                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">{step.desc}</p>
                        <ul className="space-y-2">
                          {step.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-20 bg-slate-950 border-y border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              ⚡ Technology Stack
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Built With <span className="text-gradient">Modern Tech</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              We leverage the latest and most reliable technologies to build products that scale.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-blue-500/30 text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{tech.icon}</div>
                <p className="text-sm font-semibold text-slate-300">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="orb w-80 h-80 bg-emerald-600/8 top-10 left-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              ✨ Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              What Sets Us <span className="text-gradient">Apart</span>
            </h2>
            <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', title: 'NDA & IP Protection', desc: 'Your idea is safe with us. We sign NDAs and ensure complete intellectual property protection from day one.' },
              { icon: '⚡', title: 'Agile Methodology', desc: 'We work in short sprints with regular demos, so you always stay in control of your project.' },
              { icon: '💬', title: 'Transparent Communication', desc: 'Dedicated project manager, daily standups, and real-time progress tracking via shared dashboards.' },
              { icon: '💰', title: 'Competitive Pricing', desc: 'Premium quality at fair pricing. No hidden costs. Flexible payment models that suit your budget.' },
              { icon: '🎯', title: 'On-Time Delivery', desc: 'We commit to deadlines and deliver. 95% of our projects are delivered on or ahead of schedule.' },
              { icon: '🔧', title: 'Post-Launch Support', desc: 'Free 3-month post-launch support included. Bug fixes, performance tuning, and minor feature updates.' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-7 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-blue-600/5" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Let's Build Your Next <span className="text-gradient">Big Idea</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Whether it's a startup MVP, an enterprise platform, or a digital transformation project — we're ready to make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/software-development/contact"
              className="px-8 py-4 grad-primary text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 text-base"
            >
              🚀 Get Free Consultation
            </Link>
            <Link
              to="/software-development/services"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-base"
            >
              View Our Services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

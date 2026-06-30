import { Link } from 'react-router-dom';

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Business Websites',
    desc: 'Professional, conversion-focused websites that establish your brand authority and drive real business results.',
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20 hover:border-blue-500/50',
    iconBg: 'bg-blue-500/15 text-blue-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Portfolio Websites',
    desc: 'Stunning, creative portfolios that showcase your work beautifully and leave lasting impressions on visitors.',
    gradient: 'from-pink-500 to-rose-400',
    bgGlow: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20 hover:border-pink-500/50',
    iconBg: 'bg-pink-500/15 text-pink-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    title: 'E-commerce Websites',
    desc: 'Full-featured online stores with secure payments, inventory management, and seamless shopping experiences.',
    gradient: 'from-emerald-500 to-green-400',
    bgGlow: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'ERP Systems',
    desc: 'Enterprise resource planning solutions that unify finance, HR, supply chain, and operations into one platform.',
    gradient: 'from-violet-500 to-purple-400',
    bgGlow: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20 hover:border-violet-500/50',
    iconBg: 'bg-violet-500/15 text-violet-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'CRM Systems',
    desc: 'Customer relationship management tools that streamline sales pipelines, track leads, and boost retention.',
    gradient: 'from-amber-500 to-orange-400',
    bgGlow: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20 hover:border-amber-500/50',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
    title: 'Admin Dashboards',
    desc: 'Real-time analytics dashboards with interactive charts, role-based access, and actionable business insights.',
    gradient: 'from-sky-500 to-blue-400',
    bgGlow: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20 hover:border-sky-500/50',
    iconBg: 'bg-sky-500/15 text-sky-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: 'SaaS Platforms',
    desc: 'Scalable cloud-based software-as-a-service platforms with multi-tenancy, subscriptions, and API-first design.',
    gradient: 'from-teal-500 to-cyan-400',
    bgGlow: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20 hover:border-teal-500/50',
    iconBg: 'bg-teal-500/15 text-teal-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Custom Web Applications',
    desc: 'Tailor-made web applications built from scratch to solve your unique business challenges with cutting-edge tech.',
    gradient: 'from-rose-500 to-red-400',
    bgGlow: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20 hover:border-rose-500/50',
    iconBg: 'bg-rose-500/15 text-rose-400',
  },
];

export default function SoftwareServices() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      <div className="orb w-96 h-96 bg-blue-600/8 top-0 right-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-violet-700/8 bottom-0 left-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            💎 Web Development
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From stunning websites to enterprise-grade platforms — we deliver digital solutions that power your growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              id={`service-card-${i}`}
              className={`group relative glass rounded-2xl p-6 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${s.borderColor}`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 ${s.bgGlow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">{s.desc}</p>

                {/* Bottom gradient line */}
                <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${s.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass p-10 rounded-3xl border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-blue-600/5" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-4">Ready to build something amazing?</h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                Let's collaborate to create software that drives growth, streamlines operations, and engages your users like never before.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/software-development/contact"
                  className="px-8 py-4 grad-primary text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300 text-base"
                >
                  🚀 Get a Free Consultation
                </Link>
                <a
                  href={`https://wa.me/919360198417?text=${encodeURIComponent('Hi, I am interested in your software development services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500/10 border border-green-500/30 text-green-400 font-bold rounded-full hover:bg-green-500/20 hover:-translate-y-1 transition-all duration-300 text-base"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

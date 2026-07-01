import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'Sai Care Laboratories',
    category: 'Healthcare Software',
    desc: 'A comprehensive digital solution developed for Sai Care Laboratories to manage patient records, test results, and streamline laboratory operations efficiently.',
    tech: ['React', 'Tailwind CSS', 'Python', 'MongoDB Atlas'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500 to-cyan-400',
    link: '#',
  },
  {
    title: 'Jobbora',
    category: 'Mobile App / Job Portal',
    desc: 'An intuitive and powerful mobile application designed to connect job seekers with top employers, featuring advanced matching algorithms and seamless communication.',
    tech: ['React Native', 'Expo', 'Spring Boot', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    color: 'from-violet-500 to-purple-400',
    link: '#',
  }
];

export default function SoftwareProjects() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 pb-24">
      {/* Hero Section for Projects */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-violet-600/10" />
        <div className="orb w-96 h-96 bg-blue-600/20 top-0 -left-20 pointer-events-none blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-6 shadow-lg shadow-blue-500/5">
            💼 Our Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover how we've helped businesses transform their ideas into reality with cutting-edge software solutions and mobile applications.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-12">
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              {/* Dynamic Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none`} />
              
              {/* Image Container */}
              <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-800">
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 mix-blend-overlay z-10`} />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Container */}
              <div className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${project.color} text-transparent bg-clip-text`}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, index) => (
                    <span key={index} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full shadow-inner">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={project.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition-colors"
                >
                  View Details
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mt-32 text-center">
        <div className="glass rounded-3xl p-12 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-blue-600/10" />
          <h2 className="relative text-3xl md:text-4xl font-black text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="relative text-slate-400 mb-8 max-w-xl mx-auto">
            Let's discuss how we can help you build your next software solution or mobile application.
          </p>
          <Link
            to="/software-development/contact"
            className="relative inline-flex px-8 py-4 grad-primary text-white font-bold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}

const testimonials = [
  {
    text: "ZOHO IT Solutions completely changed my career trajectory. The Full Stack program was incredibly hands-on, and within 3 months of completing it, I landed a job at TCS with a 6 LPA package. The placement support was exceptional!",
    name: 'Arjun Sharma',
    role: 'Full Stack Developer',
    company: 'TCS',
    ctc: '6 LPA',
    avatar: 'AS',
    rating: 5,
    color: 'from-blue-600/20 to-blue-700/10',
  },
  {
    text: "I switched from a non-IT background to becoming an ML Engineer, all thanks to ZOHO IT Solutions. The AI & ML program is fantastic. The mentors are industry professionals who genuinely care about your growth.",
    name: 'Priya Nair',
    role: 'ML Engineer',
    company: 'Infosys',
    ctc: '8 LPA',
    avatar: 'PN',
    rating: 5,
    color: 'from-violet-600/20 to-violet-700/10',
  },
  {
    text: "The mock interviews and resume building sessions at ZOHO IT Solutions are top-notch. I cleared 4 interview rounds at Wipro on my first attempt. I highly recommend this institute to every fresher!",
    name: 'Rahul Verma',
    role: 'Software Engineer',
    company: 'Wipro',
    ctc: '5.5 LPA',
    avatar: 'RV',
    rating: 5,
    color: 'from-cyan-600/20 to-cyan-700/10',
  },
  {
    text: "The DevOps course here is industry-standard. From Docker to Kubernetes to AWS deployment pipelines — everything is covered with real projects. Got placed at HCL with a 7.5 LPA package.",
    name: 'Sneha Patel',
    role: 'DevOps Engineer',
    company: 'HCL Technologies',
    ctc: '7.5 LPA',
    avatar: 'SP',
    rating: 5,
    color: 'from-emerald-600/20 to-emerald-700/10',
  },
  {
    text: "ZOHO IT Solutions doesn't just teach you — they prepare you for the real world. The aptitude training and soft skills sessions gave me the confidence to clear even the toughest interview panels.",
    name: 'Vikram Reddy',
    role: 'Data Analyst',
    company: 'Capgemini',
    ctc: '5 LPA',
    avatar: 'VR',
    rating: 5,
    color: 'from-orange-600/20 to-orange-700/10',
  },
  {
    text: "Best investment I ever made! The MERN Stack program is exhaustive and perfectly balanced between theory and practice. The faculties are always available and the peer community is incredibly supportive.",
    name: 'Ananya Singh',
    role: 'React Developer',
    company: 'Cognizant',
    ctc: '6.5 LPA',
    avatar: 'AS',
    rating: 5,
    color: 'from-pink-600/20 to-pink-700/10',
  },
];

const companies = [
  'TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Accenture',
  'Tech Mahindra', 'Capgemini', 'IBM', 'Amazon', 'Microsoft', 'Flipkart',
];

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="text-amber-400 text-xs">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 bg-slate-900 overflow-hidden">
      <div className="orb w-96 h-96 bg-blue-600/8 top-0 right-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-violet-700/8 bottom-0 left-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            ⭐ Student Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
            Real Stories, Real Success
          </h2>
          <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Thousands of students have transformed their careers through our programs.
            Here's what some of them have to say.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-3xl p-6 bg-gradient-to-br ${t.color} border border-white/[0.07] hover:border-blue-500/25 transition-all duration-300 group hover:-translate-y-1 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <Stars n={t.rating} />
                <span className="text-2xl opacity-30 text-blue-300 font-serif font-black leading-none">"</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed italic flex-1 mb-6">"{t.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full grad-primary flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-blue-400">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    ✅ {t.ctc}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Companies */}
        <div className="text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
            Our Alumni Work at India's Top Companies
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {companies.map((c, i) => (
              <div
                key={i}
                className="px-6 py-3 rounded-xl glass border border-white/[0.08] text-sm font-bold text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 cursor-default"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

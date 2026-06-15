import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Training', path: '/training' },
  { label: 'Internship', path: '/internship' },
  { label: 'Placement', path: '/placement' },
  { label: 'Courses', path: '/courses' },
  { label: 'Contact', path: '/contact' },
];

const courses = [
  'Full Stack Development',
  'AI & Machine Learning',
  'Cloud & DevOps',
  'Data Science',
  'Mobile App Dev',
  'Digital Marketing',
  'Software Testing',
  'Java Full Stack',
];



export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 grad-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/30">
                Z
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-white text-base">ZOHO IT</div>
                <div className="text-[10px] text-blue-400 tracking-widest uppercase font-medium">Solutions</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              India's premier IT training and placement institute. Empowering students and
              professionals since 2014 with industry-leading courses and 100% placement support.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {['📘','🐦','📸','💼','▶️'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass border border-white/[0.08] flex items-center justify-center text-sm hover:border-blue-500/40 hover:bg-blue-500/10 hover:-translate-y-1 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Our Courses</h4>
            <ul className="space-y-2.5">
              {courses.map((c) => (
                <li key={c}>
                  <Link
                    to="/courses"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 text-left hover:translate-x-1 transform inline-block"
                  >
                    → {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Contact Info</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0">📍</span>
                <span>ZOHO IT Solutions Campus, Hyderabad, Telangana – 500001</span>
              </div>
              <div className="flex items-center gap-3">
                <span>📞</span>
                <a href="tel:+919876543210" className="hover:text-blue-400 transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <span>📞</span>
                <a href="tel:+919876543211" className="hover:text-blue-400 transition-colors">+91 98765 43211</a>
              </div>
              <div className="flex items-center gap-3">
                <span>📧</span>
                <a href="mailto:info@zohoitsolutions.com" className="hover:text-blue-400 transition-colors break-all">
                  info@zohoitsolutions.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span>🕐</span>
                <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-400 mb-2">Subscribe for updates</p>
              <div className="flex gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <button className="px-3 py-2 grad-primary text-white text-xs font-bold rounded-xl hover:-translate-y-0.5 transition-all">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {year} ZOHO IT Solutions. All rights reserved. | Designed with ❤️ in India
          </p>
          <ul className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((link) => (
              <li key={link}>
                <a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const navItems = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Training',   path: '/training' },
  { label: 'Internship', path: '/internship' },
  { label: 'Placement',  path: '/placement' },
  { label: 'Courses',    path: '/courses' },
  { label: 'Contact',    path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  const isAdmin = token && role === 'admin';
  const isLoggedIn = !!token;

  const handleAuthClick = () => {
    if (isAdmin) navigate('/admin');
    else if (isLoggedIn) navigate('/account');
    else navigate('/login');
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="w-10 h-10 grad-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all duration-300">
            Z
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-slate-100 text-base tracking-tight">ZOHO IT</span>
            <span className="text-[10px] text-blue-600 tracking-widest uppercase font-medium">Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 block ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2.5 text-sm font-semibold text-slate-300 border border-white/15 rounded-full hover:border-white/40 hover:text-white backdrop-blur-sm transition-all duration-200"
          >
            Contact Us
          </Link>
          <button
            onClick={handleAuthClick}
            className="px-5 py-2.5 text-sm font-semibold text-slate-300 border border-white/15 rounded-full hover:border-white/40 hover:text-white backdrop-blur-sm transition-all duration-200"
          >
            {isAdmin ? '⚙️ Dashboard' : isLoggedIn ? '👤 Account' : '🔐 Login'}
          </button>
          <Link
            to="/courses"
            className="px-5 py-2.5 text-sm font-semibold text-white grad-primary rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Enroll Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          id="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2.5 rounded-xl bg-white/5 border border-white/10"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-slate-200 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-200 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-200 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mx-4 mt-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 block ${
                      isActive
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 border-t border-white/8 mt-2 flex flex-col gap-2">
              <button
                onClick={() => { setMenuOpen(false); handleAuthClick(); }}
                className="w-full py-3 text-sm font-semibold text-slate-300 border border-white/15 rounded-xl text-center hover:bg-white/5 transition-all"
              >
                {isAdmin ? '⚙️ Dashboard' : isLoggedIn ? '👤 Account' : '🔐 Login'}
              </button>
              <Link
                to="/courses"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-sm font-bold text-white grad-primary rounded-xl text-center block"
              >
                🚀 Enroll Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

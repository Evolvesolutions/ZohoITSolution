import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { label: '← Main Site', path: '/' },
  { label: 'Home',       path: '/software-development' },
  { label: 'About Us',   path: '/software-development/about' },
  { label: 'Services',   path: '/software-development/services' },
  { label: 'Contact',    path: '/software-development/contact' },
];

export default function SoftwareNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

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
          to="/software-development"
          className="flex items-center gap-3 group"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/logo.png" alt="ZOHO IT Solutions Logo" className="w-13 h-13 object-contain bg-white rounded-xl" />
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-slate-100 text-base tracking-tight">ZOHO IT</span>
            <span className="text-[10px] text-violet-500 tracking-widest uppercase font-bold">Software Dev</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 block whitespace-nowrap ${
                  item.label === '← Main Site'
                    ? 'text-slate-400 hover:text-white border border-white/10'
                    : isActive(item.path)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/software-development/contact"
            className="px-6 py-2.5 text-sm font-semibold text-white grad-primary rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Get a Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button
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
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 block ${
                    isActive(item.path)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-white/8 mt-2">
              <Link
                to="/software-development/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-sm font-bold text-white grad-primary rounded-xl text-center block"
              >
                🚀 Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

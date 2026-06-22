import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';

import WhyChooseUs from './components/WhyChooseUs';
import Training from './components/Training';
import Internship from './components/Internship';
import Placement from './components/Placement';
import Courses from './components/Courses';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Auth from './components/Auth';
import Account from './components/Account';

// Scroll Restoration component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Floating button to scroll back to top of the page
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 grad-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/40 hover:shadow-blue-600/60 hover:-translate-y-1 transition-all duration-300 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

// Home page layout containing key promotional sections
function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}

// Layout wrapper for subroutes to add consistent padding-top to avoid fixed Navbar overlaps
function SubpageWrapper({ children }) {
  return (
    <div className="pt-16 md:pt-20">
      {children}
    </div>
  );
}

// Floating WhatsApp Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919360198417"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:-translate-y-1 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.55 4.195 1.594 6.015L.03 24l6.115-1.604A11.972 11.972 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.019c-1.838 0-3.64-.495-5.215-1.43l-.373-.221-3.876 1.016 1.034-3.78-.243-.386C2.42 15.545 1.884 13.805 1.884 12.031 1.884 6.425 6.425 1.884 12.031 1.884s10.147 4.541 10.147 10.147-4.541 10.147-10.147 10.147zm5.556-7.585c-.304-.152-1.802-.89-2.08-.99-.279-.102-.482-.152-.685.152-.203.304-.787.99-.964 1.193-.178.203-.355.228-.66.076-.304-.152-1.285-.474-2.45-1.517-.905-.811-1.516-1.812-1.694-2.116-.178-.305-.019-.469.133-.62.137-.137.304-.356.456-.534.152-.178.203-.305.304-.508.102-.203.051-.381-.025-.533-.076-.152-.685-1.653-.939-2.264-.247-.595-.497-.514-.685-.523-.178-.009-.381-.009-.584-.009-.203 0-.533.076-.812.381-.279.305-1.065 1.041-1.065 2.539s1.091 2.946 1.243 3.149c.152.203 2.148 3.278 5.203 4.595.725.313 1.291.501 1.733.64.729.231 1.393.198 1.916.12.585-.088 1.802-.736 2.055-1.447.254-.711.254-1.32.178-1.447-.076-.127-.279-.203-.584-.356z" />
      </svg>
    </a>
  );
}

// Layout that includes Navbar, Footer, floating buttons
function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Standalone pages — no Navbar/Footer */}
        <Route path="/login" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />

        {/* Public pages — with Navbar and Footer via MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<SubpageWrapper><About /></SubpageWrapper>} />
          <Route path="/training" element={<SubpageWrapper><Training /></SubpageWrapper>} />
          <Route path="/internship" element={<SubpageWrapper><Internship /></SubpageWrapper>} />
          <Route path="/placement" element={<SubpageWrapper><Placement /></SubpageWrapper>} />
          <Route path="/courses" element={<SubpageWrapper><Courses /></SubpageWrapper>} />
          <Route path="/contact" element={<SubpageWrapper><Contact /></SubpageWrapper>} />
          <Route path="/account" element={<SubpageWrapper><Account /></SubpageWrapper>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
        <div>
          <Navbar />
          <main>
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<HomePage />} />
              
              {/* Individual subpage routes wrapped with subpage padding */}
              <Route path="/about" element={<SubpageWrapper><About /></SubpageWrapper>} />

              <Route path="/training" element={<SubpageWrapper><Training /></SubpageWrapper>} />
              <Route path="/internship" element={<SubpageWrapper><Internship /></SubpageWrapper>} />
              <Route path="/placement" element={<SubpageWrapper><Placement /></SubpageWrapper>} />
              <Route path="/courses" element={<SubpageWrapper><Courses /></SubpageWrapper>} />
              <Route path="/contact" element={<SubpageWrapper><Contact /></SubpageWrapper>} />
            </Routes>
          </main>
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;

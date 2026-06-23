import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function EnrollmentModal({ isOpen, onClose, initialType = 'course', initialName = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'course', // 'course' | 'training' | 'placement'
    selection: '',
    batch: '10:00 AM - 12:00 PM',
    mode: 'Online',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: '',
        email: '',
        phone: '',
        type: initialType,
        selection: initialName,
        batch: '10:00 AM - 12:00 PM',
        mode: 'Online',
        message: ''
      });
      setSubmitted(false);
      setLoading(false);
      setError('');
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialType, initialName]);

  if (!isOpen) return null;

  const typeOptions = {
    course: [
      'Full Stack Web Development',
      'AI & Machine Learning',
      'Cloud Computing & DevOps',
      'Data Science & Analytics',
      'Mobile App Development',
      'Digital Marketing Pro'
    ],
    training: [
      'Full Stack Development',
      'MERN Stack',
      'React Native',
      'Python Development',
      'Data Science',
      'AI & Machine Learning',
      'Java Full Stack',
      'DevOps',
      'Software Testing'
    ],
    placement: [
      'Complete Placement Assistance Bundle',
      'Resume Building & LinkedIn Optimization',
      'Mock Interview & Soft Skills Boot Camp',
      'Technical & Coding DSA Prep',
      'Aptitude & Logical Reasoning Prep',
      '1-on-1 Career Mentorship & Referrals'
    ]
  };

  const batches = [
    '10:00 AM – 12:00 PM',
    '12:00 PM – 1:30 PM',
    '2:00 PM – 4:00 PM',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform scale-100 flex flex-col max-h-[90vh]">
        {/* Decorative Top Accent */}
        <div className="h-1.5 w-full grad-primary" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              🚀 Quick Enrollment
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Lock in your scholarship & join our next active batch.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-5xl mx-auto animate-bounce">
                🎉
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Enrollment Registered!</h4>
                <p className="text-slate-400 max-w-sm mx-auto text-sm">
                  Congratulations, <strong className="text-white">{form.name}</strong>! Your application for <strong>{form.selection || 'our program'}</strong> has been received.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] inline-block text-xs text-slate-400">
                📅 Our admissions coordinator will call you within <span className="text-blue-400 font-bold">2 hours</span> to confirm your onboarding schedule.
              </div>
              <div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 grad-primary text-white font-bold rounded-xl text-sm transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Category Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'course', label: '🎓 Course' },
                    { key: 'training', label: '💻 Training' },
                    { key: 'placement', label: '🏆 Placement' }
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setForm({ 
                        ...form, 
                        type: t.key, 
                        selection: typeOptions[t.key][0] 
                      })}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                        form.type === t.key
                          ? 'grad-primary text-white border-transparent shadow-md shadow-blue-600/20'
                          : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selection Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Select Specific Program *
                </label>
                <select
                  required
                  value={form.selection}
                  onChange={e => setForm({ ...form, selection: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/[0.1] text-slate-200 text-sm focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                >
                  {typeOptions[form.type].map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200"
                />
              </div>

              {/* Contact Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Preferences Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Preferred Batch
                  </label>
                  <select
                    value={form.batch}
                    onChange={e => setForm({ ...form, batch: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/[0.1] text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                  >
                    {batches.map((b, idx) => (
                      <option key={idx} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Training Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {['Online', 'Offline'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setForm({ ...form, mode: m })}
                        className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                          form.mode === m
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m === 'Online' ? '🌐 ' + m : '🏫 ' + m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any background details or questions..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200 resize-none"
                />
              </div>

               {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  ⚠️ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 grad-primary text-white font-bold rounded-xl text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Submitting...' : '🚀 Confirm & Register Enrollment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

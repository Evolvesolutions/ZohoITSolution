import { useState, useEffect } from 'react';
import { API_URL } from '../config';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/zoho-it-solution/' },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', course: '', message: '',
  });
  const [sent, setSent] = useState(false);

  const [settings, setSettings] = useState({
    addresses: [
      'Awfis Spero Primus, 1-2 Floor, Primus Building, Door No. SP – 7A, Guindy Industrial Estate, SIDCO Industrial Estate, Chennai, Tamil Nadu 600032',
      'Olympia Cyberspace, No. 21/22, Alandur Road, Arulayiammanpet 2nd Street, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu - 600032'
    ],
    phone: '+91 93601 98417',
    email: 'info@zohoitsolutions.com',
    workingHours: 'Mon-Sat: 9:30 AM-6:30 PM'
  });

  useEffect(() => {
    fetch(`${API_URL}/api/settings/company`)
      .then(res => res.json())
      .then(data => {
        if (data && data._id) setSettings(data);
      })
      .catch(err => console.error('Failed to load settings', err));
  }, []);

  const contactDetails = [
    {
      icon: '📞',
      label: 'Phone',
      value: settings.phone,
      sub: settings.workingHours,
      color: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: '📧',
      label: 'Email',
      value: settings.email,
      sub: 'We reply within 2 hours',
      color: 'bg-violet-500/10 border-violet-500/20',
    }
  ];

  if (settings.addresses && settings.addresses.length > 0) {
    settings.addresses.forEach((addr, idx) => {
      contactDetails.push({
        icon: idx === 0 ? '📍' : '🏢',
        label: idx === 0 ? 'Primary Location' : `Location ${idx + 1}`,
        value: addr,
        sub: idx === 0 ? 'Main Branch' : 'Branch Office',
        color: idx === 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20',
      });
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 5000);
        setForm({ name: '', email: '', phone: '', course: '', message: '' });
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message.');
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-slate-900 overflow-hidden">
      <div className="orb w-96 h-96 bg-blue-600/8 top-0 right-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-violet-700/8 bottom-0 left-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            📬 Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-white mb-4">
            Get in Touch With Us
          </h2>
          <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Have questions about our programs? Our admissions team is ready to help you find
            the perfect course for your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* LEFT INFO */}
          <div className="lg:col-span-2 space-y-6">
            {contactDetails.map((d, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 rounded-2xl border ${d.color} transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {d.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{d.label}</p>
                  <p className="text-sm font-bold text-white">{d.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{d.sub}</p>
                </div>
              </div>
            ))}

            {/* Social - Instagram only */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="https://www.instagram.com/zoho-it-solution/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-pink-500/50 hover:bg-pink-500/10 hover:-translate-y-1 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad-contact)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="ig-grad-contact" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433"/>
                        <stop offset="25%" stopColor="#e6683c"/>
                        <stop offset="50%" stopColor="#dc2743"/>
                        <stop offset="75%" stopColor="#cc2366"/>
                        <stop offset="100%" stopColor="#bc1888"/>
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad-contact)" stroke="none"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
              <iframe
                title="ZOHO IT Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.155543960965!2d80.21040827507765!3d13.005867887307086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da0e8a4e0f%3A0x82e20f3e98cdfdb7!2sGuidny%20Industrial%20Estate%2C%20Chennai%2C%20Tamil%20Nadu%20600032!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-8 border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-6">
                📝 Send Us a Message
              </h3>

              {sent && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
                  ✅ Message sent successfully! We'll reach out within 2 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                      Course Interest
                    </label>
                    <select
                      id="contact-course"
                      value={form.course}
                      onChange={e => setForm({ ...form, course: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/[0.1] text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                    >
                      <option value="">Select a course</option>
                      <option>Full Stack Development</option>
                      <option>AI & Machine Learning</option>
                      <option>Cloud Computing & DevOps</option>
                      <option>Data Science & Analytics</option>
                      <option>Mobile App Development</option>
                      <option>Digital Marketing</option>
                      <option>Software Testing</option>
                      <option>Java Full Stack</option>
                      <option>Corporate Training</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us about your goals, questions, or preferred batch timings..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-4 grad-primary text-white font-bold rounded-xl text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  🚀 Send Message — We'll Reply in 2 Hours
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

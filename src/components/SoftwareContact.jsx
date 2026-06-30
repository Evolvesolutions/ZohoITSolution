import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function SoftwareContact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', projectType: '', budget: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [settings, setSettings] = useState({
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
      label: 'Sales & Inquiries',
      value: settings.phone,
      sub: settings.workingHours,
      color: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: '📧',
      label: 'Email Us',
      value: settings.email,
      sub: 'We reply within 24 hours',
      color: 'bg-violet-500/10 border-violet-500/20',
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming backend accepts generic messages or we can format it
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: `Software Project: ${form.projectType} (Budget: ${form.budget})`, // Reusing course field for project type
        message: `Company: ${form.company}\n\nMessage: ${form.message}`,
      };

      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 5000);
        setForm({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', message: '' });
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message.');
    }
  };

  return (
    <section id="software-contact" className="relative py-28 bg-slate-900 overflow-hidden min-h-screen flex items-center">
      <div className="orb w-96 h-96 bg-blue-600/8 top-0 right-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-violet-700/8 bottom-0 left-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
            🚀 Let's Build Something
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Discuss Your <span className="text-gradient">Project</span>
          </h2>
          <div className="w-16 h-1 grad-primary-soft rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Ready to transform your ideas into reality? Fill out the form below and our technical experts will get back to you.
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
            
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-white font-bold mb-2">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">✓ Free Technical Consultation</li>
                <li className="flex items-center gap-2">✓ NDA Protection</li>
                <li className="flex items-center gap-2">✓ Agile Methodology</li>
                <li className="flex items-center gap-2">✓ Transparent Pricing</li>
              </ul>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-3">
            <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl relative">
              {sent && (
                <div className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center p-8 animate-fade-in border border-green-500/30">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-slate-400">
                    Thank you for reaching out. Our tech team will contact you shortly to discuss your project.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 ml-1">Full Name *</label>
                    <input
                      required type="text"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 ml-1">Email Address *</label>
                    <input
                      required type="email"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 ml-1">Company Name</label>
                    <input
                      type="text"
                      value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="Your Company Inc."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 ml-1">Project Type *</label>
                    <select
                      required
                      value={form.projectType} onChange={e => setForm({...form, projectType: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                    >
                      <option value="" className="text-slate-900">Select Project Type</option>
                      <option value="Web Development" className="text-slate-900">Web Development</option>
                      <option value="Mobile App" className="text-slate-900">Mobile App Development</option>
                      <option value="UI/UX Design" className="text-slate-900">UI/UX Design</option>
                      <option value="Custom Software" className="text-slate-900">Custom Software</option>
                      <option value="Cloud/DevOps" className="text-slate-900">Cloud & DevOps</option>
                      <option value="Other" className="text-slate-900">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 ml-1">Estimated Budget</label>
                    <select
                      value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                    >
                      <option value="" className="text-slate-900">Select Budget Range</option>
                      <option value="Under $5k" className="text-slate-900">Under $5k</option>
                      <option value="$5k - $10k" className="text-slate-900">$5k - $10k</option>
                      <option value="$10k - $25k" className="text-slate-900">$10k - $25k</option>
                      <option value="$25k+" className="text-slate-900">$25k+</option>
                      <option value="Not Sure" className="text-slate-900">Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 ml-1">Project Details *</label>
                  <textarea
                    required rows="4"
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder="Tell us about your project requirements, goals, and timeline..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 grad-primary text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300"
                >
                  Submit Request 🚀
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

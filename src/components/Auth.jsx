import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.name);

      // Role-based redirect
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)' }}>

      {/* Background orbs */}
      <div className="absolute w-96 h-96 rounded-full top-[-5rem] left-[-5rem] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
      <div className="absolute w-80 h-80 rounded-full bottom-[-3rem] right-[-3rem] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />

      {/* Back to Home Link */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-slate-400 text-sm font-semibold hover:bg-white/[0.06] hover:text-white transition-all z-10"
      >
        ← Back to Home
      </button>

      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              Z
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-white tracking-tight leading-tight">
                ZOHO IT{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  SOLUTION
                </span>
              </div>
              <div className="text-xs text-slate-400 tracking-widest uppercase">Admin & User Portal</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/[0.08] shadow-2xl shadow-black/40">
          {/* Tab Toggle */}
          <div className="flex bg-slate-800/50 rounded-xl p-1 mb-7 border border-white/[0.06]">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                isLogin ? 'grad-primary text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                !isLogin ? 'grad-primary text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/[0.08] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all duration-200"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/[0.08] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/[0.08] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all duration-200"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 grad-primary text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Info note */}
          <p className="text-center text-slate-500 text-xs mt-6">
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              {isLogin ? 'Register here' : 'Sign in'}
            </button>
          </p>

          {isLogin && (
            <p className="text-center text-slate-600 text-xs mt-3">
              🔒 Admin accounts are assigned by the system administrator.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Dashboard Stats
  const [stats, setStats] = useState({ users: 0, interns: 0, courses: 0, pendingInterns: 0, acceptedInterns: 0 });
  
  // Forms
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '' });
  const [settings, setSettings] = useState({ companyName: '', address: '', phone: '', email: '', workingHours: '' });

  // Guard: redirect if not logged in as admin
  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/login');
    }
  }, [token, role, navigate]);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesRes, appsRes, statsRes, settingsRes] = await Promise.all([
        fetch('http://localhost:5000/api/courses'),
        fetch('http://localhost:5000/api/applications', { headers: authHeaders }),
        fetch('http://localhost:5000/api/admin/stats', { headers: authHeaders }),
        fetch('http://localhost:5000/api/settings/company')
      ]);
      const [coursesData, appsData, statsData, settingsData] = await Promise.all([
        coursesRes.json(), appsRes.json(), statsRes.json(), settingsRes.json()
      ]);
      
      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setApplications(Array.isArray(appsData) ? appsData : []);
      setStats(statsData);
      if (settingsData) setSettings(settingsData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && role === 'admin') fetchData();
  }, [token, role]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        setNewCourse({ title: '', description: '', price: '' });
        fetchData();
      } else {
        const d = await res.json();
        alert(d.message);
      }
    } catch (error) {
      alert('Failed to add course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return;
    try {
      await fetch(`http://localhost:5000/api/courses/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    } catch { alert('Failed to delete'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/applications/${id}/status`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch { alert('Failed to update status'); }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/settings/company', {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert('Settings saved successfully!');
        fetchData();
      } else {
        alert('Failed to save settings');
      }
    } catch { alert('Failed to save settings'); }
  };

  const statusColor = (s) => ({
    Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Reviewed: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    Accepted: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Rejected: 'text-red-400 bg-red-500/10 border-red-500/30',
  }[s] || 'text-slate-400');

  if (!token || role !== 'admin') return null;

  return (
    <div className="min-h-screen flex bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-white/[0.05] flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 grad-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">Z</div>
            <div>
              <div className="font-extrabold text-base tracking-tight">ZOHO IT</div>
              <div className="text-[10px] text-blue-400 tracking-widest uppercase font-medium">Admin Panel</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-white hover:bg-white/[0.04] mb-4 border border-white/[0.02]"
          >
            <span className="text-lg">🏠</span> Back to Website
          </button>
          
          <div className="h-px bg-white/[0.05] w-full mb-4"></div>

          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'applications', label: 'Intern Applications', icon: '📋' },
            { id: 'settings', label: 'Company Info', icon: '⚙️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-lg">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/[0.05]">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/[0.05] mb-3">
            <p className="text-xs text-slate-400 mb-1">Logged in as:</p>
            <p className="text-sm font-bold text-white truncate">{userName}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8 min-h-screen" style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' }}>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
          <p className="text-slate-400 text-sm mt-2">Manage your institution's data and settings.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-6xl">
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass p-6 rounded-2xl border border-white/[0.08] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                      <span className="text-8xl">👥</span>
                    </div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Users</p>
                    <h3 className="text-4xl font-black text-white">{stats.users}</h3>
                  </div>
                  
                  <div className="glass p-6 rounded-2xl border border-blue-500/20 relative overflow-hidden group bg-blue-500/5">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                      <span className="text-8xl">📋</span>
                    </div>
                    <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-2">Intern Apps</p>
                    <h3 className="text-4xl font-black text-white">{stats.interns}</h3>
                    <div className="mt-4 flex gap-4 text-sm">
                      <span className="text-emerald-400 font-semibold">{stats.acceptedInterns} Accepted</span>
                      <span className="text-amber-400 font-semibold">{stats.pendingInterns} Pending</span>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-2xl border border-white/[0.08] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                      <span className="text-8xl">📚</span>
                    </div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Active Courses</p>
                    <h3 className="text-4xl font-black text-white">{stats.courses}</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-10">
                {/* Add Course Form (Full Width) */}
                <div className="glass p-8 rounded-3xl border border-white/[0.08]">
                  <h3 className="text-xl font-bold text-white mb-6">➕ Add New Course</h3>
                  <form onSubmit={handleAddCourse} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Course Title</label>
                        <input required type="text" value={newCourse.title}
                          onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white text-sm focus:outline-none focus:border-blue-500/50"
                          placeholder="e.g. Advanced Full Stack Development" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Price (₹)</label>
                        <input required type="number" value={newCourse.price}
                          onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white text-sm focus:outline-none focus:border-blue-500/50"
                          placeholder="e.g. 25000" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Course Description</label>
                      <textarea required value={newCourse.description}
                        onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white text-sm focus:outline-none focus:border-blue-500/50 h-32 resize-none"
                        placeholder="Detailed description of what the course covers..." />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button type="submit" className="px-10 py-3 grad-primary text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-500/20">
                        Publish Course
                      </button>
                    </div>
                  </form>
                </div>

                {/* Course List */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">📚 Manage Existing Courses</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.length === 0 ? (
                      <div className="md:col-span-2 text-center text-slate-500 py-16 glass rounded-2xl border border-white/[0.06]">No courses yet. Add one above!</div>
                    ) : courses.map(course => (
                    <div key={course._id} className="glass p-5 rounded-2xl border border-white/[0.07] hover:border-blue-500/30 transition-all group flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg mb-1">{course.title}</h4>
                        <p className="text-slate-400 text-sm line-clamp-2">{course.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          ₹{Number(course.price).toLocaleString('en-IN')}
                        </span>
                        <button onClick={() => handleDeleteCourse(course._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center text-slate-500 py-16 glass rounded-2xl border border-white/[0.06]">No applications yet.</div>
                ) : applications.map(app => (
                  <div key={app._id} className="glass p-6 rounded-2xl border border-white/[0.07] hover:border-blue-500/20 transition-all grid md:grid-cols-4 gap-6 items-center">
                    <div className="md:col-span-1">
                      <h4 className="font-bold text-white text-lg">{app.name}</h4>
                      <p className="text-sm text-slate-400 mt-1">{app.email}</p>
                      <p className="text-sm text-slate-500">{app.phone}</p>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-sm text-white font-medium">{app.college || '—'}</p>
                      <p className="text-xs text-blue-400 mt-1 uppercase tracking-wider font-bold">{app.domain || '—'}</p>
                    </div>
                    <div className="md:col-span-1">
                      <span className={`px-4 py-1.5 rounded-full border text-xs font-bold ${statusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="md:col-span-1 flex justify-end">
                      <select
                        value={app.status}
                        onChange={e => handleStatusChange(app._id, e.target.value)}
                        className="px-4 py-2.5 bg-slate-900/80 rounded-xl text-sm border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50 cursor-pointer font-medium"
                      >
                        {['Pending', 'Reviewed', 'Accepted', 'Rejected'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="max-w-3xl glass p-8 rounded-3xl border border-white/[0.08]">
                <h3 className="text-xl font-bold text-white mb-6">Company Information</h3>
                <p className="text-slate-400 text-sm mb-8">Update the contact details that appear on the website footer and contact page.</p>
                
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Company Name</label>
                      <input type="text" value={settings.companyName}
                        onChange={e => setSettings({ ...settings, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                      <input type="email" value={settings.email}
                        onChange={e => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                      <input type="text" value={settings.phone}
                        onChange={e => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Working Hours</label>
                      <input type="text" value={settings.workingHours}
                        onChange={e => setSettings({ ...settings, workingHours: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Address</label>
                    <textarea value={settings.address}
                      onChange={e => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50 h-24 resize-none" />
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/[0.05]">
                    <button type="submit" className="px-8 py-3 grad-primary text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-500/20">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

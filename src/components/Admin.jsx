import { useState, useEffect } from 'react';
import { API_URL } from '../config';
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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dashboard Stats
  const [stats, setStats] = useState({ users: 0, interns: 0, courses: 0, pendingInterns: 0, acceptedInterns: 0, messages: 0, unreadMessages: 0 });

  // Forms
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', originalPrice: '' });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [settings, setSettings] = useState({ companyName: '', addresses: [], phone: '', email: '', workingHours: '' });

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
      const [coursesRes, appsRes, statsRes, settingsRes, msgsRes] = await Promise.all([
        fetch(`${API_URL}/api/courses`),
        fetch(`${API_URL}/api/applications`, { headers: authHeaders }),
        fetch(`${API_URL}/api/admin/stats`, { headers: authHeaders }),
        fetch(`${API_URL}/api/settings/company`),
        fetch(`${API_URL}/api/messages`, { headers: authHeaders })
      ]);
      const [coursesData, appsData, statsData, settingsData, msgsData] = await Promise.all([
        coursesRes.json(), appsRes.json(), statsRes.json(), settingsRes.json(), msgsRes.json()
      ]);

      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setApplications(Array.isArray(appsData) ? appsData : []);
      setMessages(Array.isArray(msgsData) ? msgsData : []);
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
      const url = editingCourseId 
        ? `${API_URL}/api/courses/${editingCourseId}`
        : `${API_URL}/api/courses`;
        
      const method = editingCourseId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(newCourse),
      });

      if (res.ok) {
        setNewCourse({ title: '', description: '', price: '', originalPrice: '' });
        setEditingCourseId(null);
        fetchData();
        alert(editingCourseId ? 'Course updated successfully!' : 'Course added successfully!');
      } else {
        const d = await res.json();
        alert(d.message);
      }
    } catch (error) {
      alert('Failed to save course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return;
    try {
      await fetch(`${API_URL}/api/courses/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    } catch { alert('Failed to delete'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/applications/${id}/status`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch { alert('Failed to update status'); }
  };

  const handleMessageStatusChange = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/messages/${id}/status`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch { alert('Failed to update message status'); }
  };

  const handleDeleteApplication = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      await fetch(`${API_URL}/api/applications/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    } catch { alert('Failed to delete application'); }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`${API_URL}/api/messages/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    } catch { alert('Failed to delete message'); }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      // Ensure addresses is an array and filter out empty strings
      const payload = {
        ...settings,
        addresses: settings.addresses.filter(a => a.trim() !== '')
      };
      
      const res = await fetch(`${API_URL}/api/settings/company`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(payload),
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
    <div className="min-h-screen flex bg-slate-900 text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 fixed">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="orb w-[600px] h-[600px] bg-blue-600/20 -top-40 -right-40 animate-spin-slow opacity-20" />
        <div className="orb w-[500px] h-[500px] bg-violet-700/20 bottom-0 -left-40 opacity-15" style={{animation:'orbFloat 14s ease-in-out infinite reverse'}} />
        <div className="orb w-[300px] h-[300px] bg-blue-400/10 top-1/2 left-1/3 opacity-10" style={{animation:'orbFloat 10s ease-in-out infinite'}} />
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-slate-900/40 backdrop-blur-2xl border-r border-white/[0.05] flex flex-col fixed h-full z-20">
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
            { id: 'course-applications', label: 'Course Applications', icon: '🎓' },
            { id: 'training-applications', label: 'Training Applications', icon: '💻' },
            { id: 'internship-applications', label: 'Internship Applications', icon: '💼' },
            { id: 'placement-applications', label: 'Placement Applications', icon: '🏆' },
            { id: 'messages', label: 'Messages', icon: '📨' },
            { id: 'settings', label: 'Company Info', icon: '⚙️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
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
      <div className="flex-1 ml-64 p-8 min-h-screen relative z-10">
        
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
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

                  <div className="glass p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden group bg-emerald-500/5">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                      <span className="text-8xl">📨</span>
                    </div>
                    <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Messages</p>
                    <h3 className="text-4xl font-black text-white">{stats.messages || 0}</h3>
                    <div className="mt-4 flex gap-4 text-sm">
                      <span className="text-amber-400 font-semibold">{stats.unreadMessages || 0} Unread</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-10">
                {/* Add Course Form (Full Width) */}
                <div className="glass p-8 rounded-3xl border border-white/[0.08]">
                  <h3 className="text-xl font-bold text-white mb-6">
                    {editingCourseId ? '✏️ Edit Course' : '➕ Add New Course'}
                  </h3>
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
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Offer Price (₹) <span className="text-blue-400 normal-case tracking-normal font-normal">(Real selling price)</span></label>
                        <input required type="number" value={newCourse.price}
                          onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white text-sm focus:outline-none focus:border-blue-500/50"
                          placeholder="e.g. 25000" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Original Price (₹) <span className="text-slate-500 normal-case tracking-normal font-normal">(Strikethrough price)</span></label>
                        <input type="number" value={newCourse.originalPrice}
                          onChange={e => setNewCourse({ ...newCourse, originalPrice: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white text-sm focus:outline-none focus:border-blue-500/50"
                          placeholder="e.g. 45000 (optional)" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Course Description</label>
                      <textarea required value={newCourse.description}
                        onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white text-sm focus:outline-none focus:border-blue-500/50 h-32 resize-none"
                        placeholder="Detailed description of what the course covers..." />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      {editingCourseId && (
                        <button type="button" 
                          onClick={() => {
                            setEditingCourseId(null);
                            setNewCourse({ title: '', description: '', price: '', originalPrice: '' });
                          }}
                          className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all">
                          Cancel
                        </button>
                      )}
                      <button type="submit" className="px-10 py-3 grad-primary text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-500/20">
                        {editingCourseId ? 'Update Course' : 'Publish Course'}
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
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                            ₹{Number(course.price).toLocaleString('en-IN')}
                          </span>
                          <div className="flex gap-2">
                            <button onClick={() => {
                                setEditingCourseId(course._id);
                                setNewCourse({ 
                                  title: course.title, 
                                  description: course.description, 
                                  price: course.price, 
                                  originalPrice: course.originalPrice || '' 
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-colors opacity-0 group-hover:opacity-100">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteCourse(course._id)}
                              className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Course Applications Tab */}
            {activeTab === 'course-applications' && (
              <ApplicationsPanel
                title="🎓 Course Applications"
                subtitle="Students who enrolled for courses"
                applications={applications.filter(a => a.type === 'course')}
                handleStatusChange={handleStatusChange}
                handleDeleteApplication={handleDeleteApplication}
                accentColor="blue"
              />
            )}

            {/* Training Applications Tab */}
            {activeTab === 'training-applications' && (
              <ApplicationsPanel
                title="💻 Training Applications"
                subtitle="Students who applied for training programs"
                applications={applications.filter(a => a.type === 'training')}
                handleStatusChange={handleStatusChange}
                handleDeleteApplication={handleDeleteApplication}
                accentColor="violet"
              />
            )}

            {/* Internship Applications Tab */}
            {activeTab === 'internship-applications' && (
              <ApplicationsPanel
                title="💼 Internship Applications"
                subtitle="Students who applied for internship programs"
                applications={applications.filter(a => a.type === 'internship' || (!a.type && a.domain))}
                handleStatusChange={handleStatusChange}
                handleDeleteApplication={handleDeleteApplication}
                accentColor="rose"
              />
            )}

            {/* Placement Applications Tab */}
            {activeTab === 'placement-applications' && (
              <ApplicationsPanel
                title="🏆 Placement Applications"
                subtitle="Students who applied for placement support"
                applications={applications.filter(a => a.type === 'placement')}
                handleStatusChange={handleStatusChange}
                handleDeleteApplication={handleDeleteApplication}
                accentColor="emerald"
              />
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-slate-500 py-16 glass rounded-2xl border border-white/[0.06]">No messages yet.</div>
                ) : messages.map(msg => (
                  <div key={msg._id} className={`glass p-6 rounded-2xl border transition-all ${msg.status === 'Unread' ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/[0.07] hover:border-blue-500/20'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-white text-lg">{msg.name}</h4>
                        <div className="flex gap-3 text-sm text-slate-400 mt-1">
                          <span>📧 {msg.email}</span>
                          {msg.phone && <span>📞 {msg.phone}</span>}
                          {msg.course && <span className="text-blue-400">📚 {msg.course}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={msg.status}
                            onChange={e => handleMessageStatusChange(msg._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${msg.status === 'Unread'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              }`}
                          >
                            <option value="Unread">Unread</option>
                            <option value="Read">Read</option>
                          </select>
                          <button onClick={() => handleDeleteMessage(msg._id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs"
                            title="Delete Message"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/20 text-slate-300 text-sm whitespace-pre-wrap border border-white/[0.05]">
                      {msg.message}
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-slate-400 uppercase tracking-wider block">Office Locations</label>
                      <button 
                        type="button" 
                        onClick={() => setSettings({ ...settings, addresses: [...(settings.addresses || []), ''] })}
                        className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg"
                      >
                        + Add Location
                      </button>
                    </div>
                    
                    {(!settings.addresses || settings.addresses.length === 0) ? (
                      <div className="text-center py-6 border border-dashed border-white/[0.1] rounded-xl text-slate-500 text-sm">
                        No locations added yet. Click "+ Add Location" to add one.
                      </div>
                    ) : (
                      settings.addresses.map((addr, index) => (
                        <div key={index} className="flex gap-3 items-start relative group">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-xs text-slate-400 mt-2 font-bold">
                            {index + 1}
                          </div>
                          <textarea 
                            value={addr}
                            onChange={e => {
                              const newAddresses = [...settings.addresses];
                              newAddresses[index] = e.target.value;
                              setSettings({ ...settings, addresses: newAddresses });
                            }}
                            placeholder={`Enter address ${index + 1}...`}
                            className="w-full px-4 py-3 bg-slate-900/80 rounded-xl border border-white/[0.1] text-white focus:outline-none focus:border-blue-500/50 h-24 resize-none" 
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const newAddresses = [...settings.addresses];
                              newAddresses.splice(index, 1);
                              setSettings({ ...settings, addresses: newAddresses });
                            }}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors mt-2 opacity-0 group-hover:opacity-100 absolute right-2"
                            title="Remove Location"
                          >
                            🗑️
                          </button>
                        </div>
                      ))
                    )}
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

function ApplicationsPanel({ title, subtitle, applications, handleStatusChange, handleDeleteApplication, accentColor }) {
  const statusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
      case 'Rejected': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'Reviewed': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      default: return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center text-slate-500 py-16 glass rounded-2xl border border-white/[0.06]">No applications yet.</div>
      ) : applications.map(app => (
        <div key={app._id} className={`glass p-6 rounded-2xl border border-white/[0.07] hover:border-${accentColor}-500/30 transition-all`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-white text-lg flex items-center gap-2">
                {app.name}
                <span className={`px-3 py-1 rounded-full border text-[10px] font-bold ${statusColor(app.status)}`}>
                  {app.status}
                </span>
              </h4>
              <div className="flex gap-4 text-sm text-slate-400 mt-2">
                <span>📧 {app.email}</span>
                <span>📞 {app.phone}</span>
                {app.batch && <span className="text-amber-400">🕒 {app.batch}</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={app.status}
                onChange={e => handleStatusChange(app._id, e.target.value)}
                className={`px-4 py-2.5 bg-slate-900/80 rounded-xl text-sm border border-white/[0.1] text-white focus:outline-none focus:border-${accentColor}-500/50 cursor-pointer font-medium`}
              >
                {['Pending', 'Reviewed', 'Accepted', 'Rejected'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={() => handleDeleteApplication(app._id)}
                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                title="Delete Application"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Selected Program / Domain</p>
              <p className={`text-sm font-bold text-${accentColor}-400`}>{app.selection || app.domain || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{app.college ? 'College / University' : 'Preferred Mode'}</p>
              <p className="text-sm font-bold text-white">{app.college || app.mode || '—'}</p>
            </div>
            {app.message && (
              <div className="md:col-span-2 mt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Additional Notes</p>
                <p className="text-sm text-slate-300 bg-black/20 p-3 rounded-lg border border-white/5">{app.message}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

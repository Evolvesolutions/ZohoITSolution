import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  
  // A small trick to pass email from Auth if needed, or decode JWT.
  // But for now, we just rely on the backend token to get the user's applications.
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If not logged in, or is an admin, redirect
    if (!token) {
      navigate('/login');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  }, [token, role, navigate]);

  const fetchMyApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/applications/my-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && role !== 'admin') {
      fetchMyApplications();
    }
  }, [token, role]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const statusColor = (s) => ({
    Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Reviewed: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    Accepted: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Rejected: 'text-red-400 bg-red-500/10 border-red-500/30',
  }[s] || 'text-slate-400');

  if (!token || role === 'admin') return null;

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* User Profile Header */}
        <div className="glass rounded-3xl p-8 border border-white/[0.08] mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full grad-primary flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/30">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{userName}</h1>
              <p className="text-slate-400 font-medium">Student / Intern Account</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500/20 transition-all"
          >
            Logout
          </button>
        </div>

        {/* My Applications Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">My Applications</h2>
          
          {loading ? (
            <div className="text-center text-slate-500 py-10">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="glass rounded-2xl p-10 border border-white/[0.06] text-center">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-white mb-2">No Applications Yet</h3>
              <p className="text-slate-400 mb-6">You haven't applied for any internships yet.</p>
              <button 
                onClick={() => navigate('/internship')}
                className="px-6 py-2.5 grad-primary text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all"
              >
                Apply Now
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map(app => (
                <div key={app._id} className="glass rounded-2xl p-6 border border-white/[0.08] hover:border-blue-500/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Internship Application</h4>
                    <p className="text-sm text-slate-400">Applied on: {new Date(app.submittedAt).toLocaleDateString()}</p>
                    <div className="mt-3 flex gap-4 text-sm text-slate-300">
                      <span><span className="text-slate-500">Domain:</span> {app.domain}</span>
                      <span><span className="text-slate-500">College:</span> {app.college}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full border text-sm font-bold ${statusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

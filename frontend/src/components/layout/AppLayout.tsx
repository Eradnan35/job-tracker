import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Briefcase, PlusCircle, LogOut } from 'lucide-react';

export const AppLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-text-primary">
      {/* Navigation Dock */}
      <nav className="w-full md:w-64 flex-shrink-0 p-6 md:h-screen md:sticky md:top-0 flex flex-col border-r border-white/5 bg-surface/50">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-accent-cyan to-accent-purple-start bg-clip-text text-transparent">Job Tracker OS</h1>
          <p className="text-sm text-text-muted mt-1">Welcome, {user?.name}</p>
        </div>
        <div className="space-y-2 flex-grow">
          <NavLink to="/" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-panel transition-all ${isActive ? 'bg-surface text-accent-cyan shadow-level-1' : 'text-text-muted hover:text-text-primary hover:bg-surface/50'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/jobs" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-panel transition-all ${isActive ? 'bg-surface text-accent-cyan shadow-level-1' : 'text-text-muted hover:text-text-primary hover:bg-surface/50'}`}>
            <Briefcase size={20} /> Jobs
          </NavLink>
          <NavLink to="/jobs/new" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-panel transition-all ${isActive ? 'bg-surface text-accent-cyan shadow-level-1' : 'text-text-muted hover:text-text-primary hover:bg-surface/50'}`}>
            <PlusCircle size={20} /> Add Job
          </NavLink>
        </div>
        <div className="mt-auto pt-6">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 rounded-panel text-text-muted hover:text-danger hover:bg-surface/50 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

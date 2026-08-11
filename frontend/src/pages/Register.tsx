import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth';
import { motion } from 'framer-motion';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { access_token } = await authApi.register({ name, email, password });
      await login(access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md p-8 rounded-app bg-surface shadow-level-2 border border-white/5">
        <h2 className="text-3xl font-semibold mb-2 text-text-primary">Initialize OS</h2>
        <p className="text-text-muted mb-8">Create your account to start tracking</p>
        {error && <div className="p-4 mb-6 rounded-panel bg-danger/10 text-danger border border-danger/20">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-text-muted mb-2">Full Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-2">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-2">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={8} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-text-primary text-background font-medium py-3 rounded-control hover:bg-white transition-colors disabled:opacity-50">
            {loading ? 'Initializing...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-6 text-center text-text-muted text-sm">
          Already have an account? <Link to="/login" className="text-accent-cyan hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { jobsApi } from '../api/jobs';
import { JobStatus } from '../types';
import type { Job } from '../types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobsApi.getAll().then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  const stats = {
    total: jobs.length,
    saved: jobs.filter(j => j.status === JobStatus.SAVED).length,
    applied: jobs.filter(j => j.status === JobStatus.APPLIED).length,
    screening: jobs.filter(j => j.status === 'screening' as JobStatus).length, // using what's available
    interview: jobs.filter(j => j.status === JobStatus.INTERVIEW).length,
    offer: jobs.filter(j => j.status === JobStatus.OFFER).length,
    rejected: jobs.filter(j => j.status === JobStatus.REJECTED).length,
  };

  const recentJobs = jobs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  if (loading) return <div className="text-text-muted">Loading data...</div>;

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold">Overview</h1>
          <p className="text-text-muted mt-2 text-lg">Your application pipeline</p>
        </div>
        <Link to="/jobs/new" className="flex items-center gap-2 bg-text-primary text-background px-6 py-3 rounded-control font-medium hover:bg-white transition-all">
          <PlusCircle size={20} /> Add Job
        </Link>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, val], i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} key={key} className="p-6 rounded-panel bg-surface border border-white/5 shadow-level-1">
            <div className="text-text-muted uppercase text-xs tracking-wider mb-2">{key}</div>
            <div className="text-4xl font-semibold text-text-primary">{val}</div>
          </motion.div>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b border-white/5 pb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentJobs.map((job, i) => (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={job.id} className="p-5 rounded-panel bg-surface border border-white/5 flex justify-between items-center hover:border-white/10 transition-colors">
              <div>
                <h3 className="font-medium text-lg text-text-primary">{job.title}</h3>
                <p className="text-text-muted">{job.company}</p>
              </div>
              <div className="px-4 py-1.5 rounded-chip text-sm uppercase tracking-wider border border-white/10 bg-background/50">
                {job.status}
              </div>
            </motion.div>
          ))}
          {recentJobs.length === 0 && <p className="text-text-muted">No jobs added yet.</p>}
        </div>
      </section>
    </div>
  );
};

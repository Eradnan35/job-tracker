import { useEffect, useState } from 'react';
import { jobsApi } from '../api/jobs';
import type { Job } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Edit2, Trash2, Eye } from 'lucide-react';

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    jobsApi.getAll().then(data => {
      setJobs(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await jobsApi.delete(id);
      fetchJobs();
    }
  };

  if (loading) return <div className="text-text-muted">Loading jobs...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Jobs</h1>
        <Link to="/jobs/new" className="flex items-center gap-2 bg-surface border border-white/10 px-5 py-2.5 rounded-control font-medium hover:bg-white/5 transition-all">
          <PlusCircle size={18} /> New Entry
        </Link>
      </header>
      <div className="space-y-4">
        {jobs.map((job) => (
          <motion.div key={job.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-panel bg-surface shadow-level-1 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/10 transition-colors">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-text-primary">{job.title}</h3>
              <p className="text-text-muted mt-1">{job.company} {job.location && `• ${job.location}`}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="px-4 py-1.5 rounded-chip text-xs uppercase tracking-wider border border-white/10 bg-background/50">
                {job.status}
              </span>
              <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={`/jobs/${job.id}`} className="p-2 text-text-muted hover:text-accent-cyan transition-colors bg-background rounded-control border border-white/5"><Eye size={16} /></Link>
                <Link to={`/jobs/${job.id}/edit`} className="p-2 text-text-muted hover:text-accent-cyan transition-colors bg-background rounded-control border border-white/5"><Edit2 size={16} /></Link>
                <button onClick={() => handleDelete(job.id)} className="p-2 text-text-muted hover:text-danger transition-colors bg-background rounded-control border border-white/5"><Trash2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-20 bg-surface rounded-panel border border-white/5">
            <p className="text-text-muted mb-4">No jobs in your pipeline.</p>
            <Link to="/jobs/new" className="inline-flex items-center gap-2 bg-text-primary text-background px-6 py-3 rounded-control font-medium hover:bg-white transition-all">
              Add Your First Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

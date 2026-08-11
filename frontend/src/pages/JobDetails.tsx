import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobsApi } from '../api/jobs';
import type { Job } from '../types';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      jobsApi.getOne(id).then(setJob);
    }
  }, [id]);

  const handleDelete = async () => {
    if (id && confirm('Delete this job forever?')) {
      await jobsApi.delete(id);
      navigate('/jobs');
    }
  };

  if (!job) return <div className="text-text-muted">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
        <ArrowLeft size={20} /> Back to Jobs
      </Link>
      
      <div className="bg-surface p-8 md:p-12 rounded-app shadow-level-2 border border-white/5">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-text-primary">{job.title}</h1>
            <p className="text-xl text-text-muted">{job.company}</p>
          </div>
          <span className="px-4 py-2 rounded-chip text-sm uppercase tracking-wider border border-white/10 bg-background/50 text-accent-cyan">
            {job.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
          <div>
            <div className="text-sm text-text-muted uppercase tracking-wider mb-2">Location</div>
            <div className="text-lg text-text-primary">{job.location || 'Remote / Unspecified'}</div>
          </div>
          <div>
            <div className="text-sm text-text-muted uppercase tracking-wider mb-2">Created</div>
            <div className="text-lg text-text-primary">{new Date(job.created_at).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="pt-8 flex gap-4">
          <Link to={`/jobs/${job.id}/edit`} className="flex items-center gap-2 px-6 py-3 rounded-control bg-background border border-white/10 hover:bg-white/5 transition-colors">
            <Edit2 size={18} /> Edit Details
          </Link>
          <button onClick={handleDelete} className="flex items-center gap-2 px-6 py-3 rounded-control text-danger hover:bg-danger/10 transition-colors bg-background border border-danger/20">
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobsApi } from '../api/jobs';
import { JobStatus } from '../types';
import type { JobCreate } from '../types';

export const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<JobCreate>({
    title: '',
    company: '',
    location: '',
    status: JobStatus.SAVED
  });

  useEffect(() => {
    if (isEdit) {
      jobsApi.getOne(id).then(data => {
        setFormData({
          title: data.title,
          company: data.company,
          location: data.location || '',
          status: data.status
        });
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await jobsApi.update(id, formData);
      } else {
        await jobsApi.create(formData);
      }
      navigate('/jobs');
    } catch (err) {
      alert('Error saving job');
      setSaving(false);
    }
  };

  if (loading) return <div className="text-text-muted">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-4xl font-semibold">{isEdit ? 'Edit Job' : 'Add New Job'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 rounded-panel border border-white/5 shadow-level-1">
        <div>
          <label className="block text-sm text-text-muted mb-2">Job Title</label>
          <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Company</label>
          <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Location (Optional)</label>
          <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Status</label>
          <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as JobStatus})} className="w-full bg-background border border-white/10 rounded-control px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors">
            {Object.values(JobStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="pt-4 flex gap-4">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 rounded-control border border-white/10 text-text-primary hover:bg-white/5 transition-colors">Cancel</button>
          <button type="submit" disabled={saving} className="flex-1 py-3 rounded-control bg-text-primary text-background font-medium hover:bg-white transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Job'}</button>
        </div>
      </form>
    </div>
  );
};

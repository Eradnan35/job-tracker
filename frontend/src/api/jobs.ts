import api from './client';

export const jobsApi = {
  getAll: async () => {
    const { data } = await api.get('/jobs/');
    return data;
  },
  getOne: async (id: string) => {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
  },
  create: async (job: any) => {
    const { data } = await api.post('/jobs/', job);
    return data;
  },
  update: async (id: string, job: any) => {
    const { data } = await api.put(`/jobs/${id}`, job);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data;
  },
};

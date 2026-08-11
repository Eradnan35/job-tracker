export interface User { id: string; name: string; email: string; created_at: string; }
export const JobStatus = { APPLIED: 'applied', INTERVIEW: 'interview', OFFER: 'offer', REJECTED: 'rejected', SAVED: 'saved' } as const;
export type JobStatus = typeof JobStatus[keyof typeof JobStatus];
export interface Job { id: string; title: string; company: string; location?: string; status: JobStatus; created_at: string; user_id: string; }
export interface JobCreate { title: string; company: string; location?: string; status?: JobStatus; }

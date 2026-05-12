import mongoose from 'mongoose';

// ─── Job Listing Model ───────────────────────────────────────────────
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['professional', 'labour'], required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Permanent', 'Contract', 'Temporary'], required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  salary: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// ─── CV / Job Application Model ──────────────────────────────────────
const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobCategory: { type: String, enum: ['professional', 'labour'], required: true },
  jobTitle: { type: String },
  cvUrl: { type: String }, // stored as filename or cloud URL
  message: { type: String },
  status: { type: String, enum: ['new', 'reviewed', 'contacted'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

// ─── Employer Enquiry Model ──────────────────────────────────────────
const EmployerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  roleNeeded: { type: String, required: true },
  numberOfStaff: { type: String, required: true },
  jobCategory: { type: String, enum: ['professional', 'labour', 'both'] },
  message: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

export const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
export const Employer = mongoose.models.Employer || mongoose.model('Employer', EmployerSchema);

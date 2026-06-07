import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['professional', 'labour'], required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Permanent', 'Contract', 'Temporary'], required: true },
  description: { type: String, required: true },
  requirements: String,
  salary: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobCategory: { type: String, enum: ['professional', 'labour'], required: true },
  jobTitle: String,
  cvUrl: String,
  message: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

const EmployerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  roleNeeded: { type: String, required: true },
  numberOfStaff: { type: String, required: true },
  jobCategory: String,
  message: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

export const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
export const Employer = mongoose.models.Employer || mongoose.model('Employer', EmployerSchema);

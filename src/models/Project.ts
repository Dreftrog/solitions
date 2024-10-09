import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  client: { type: String, required: true },
  value: { type: Number, required: true },
  status: { type: String, enum: ['En Progreso', 'Completado', 'En Pausa', 'Cancelado'], default: 'En Progreso' },
  progress: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
}, { timestamps: true });

export interface Project extends mongoose.Document {
  name: string;
  description?: string;
  client: string;
  value: number;
  status: 'En Progreso' | 'Completado' | 'En Pausa' | 'Cancelado';
  progress: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema);
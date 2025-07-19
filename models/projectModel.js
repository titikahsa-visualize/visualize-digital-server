import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // 👈 numeric ID
  name: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String },
  summary: { type: String },
  year: { type: String },
  client: { type: String },
  rating: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);


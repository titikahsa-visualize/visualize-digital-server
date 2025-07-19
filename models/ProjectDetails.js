import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // added manually-assigned numeric ID
  name: { type: String, required: true },
  category: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  heroImage: { type: String }, // image URL
  tags: [{ type: String }],
  year: { type: String },
  client: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  role: { type: String },
  duration: { type: String },
  teamSize: { type: String },
  keyFeatures: [{ type: String }],
  liveLink: { type: String },
  githubLink: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('ProjectDetails', projectSchema);
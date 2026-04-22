import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tech: { type: String, required: true },
  link: { type: String, required: true },
  order: { type: Number, default: 0 },
  showOnHome: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);

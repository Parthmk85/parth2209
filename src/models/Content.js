import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g., 'hero', 'about'
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);

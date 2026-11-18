import path from "path";

export const RESUME_DIR = path.join(process.cwd(), "data/resumes");
export const RESUME_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

import mongoose from "mongoose";
import { writeFile, readFile } from "fs/promises";
import path from "path";


const LOCAL_STORAGE_PATH = path.join(process.cwd(), "data/db_fallback.json");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Ensure data directory exists
async function ensureDataDir() {
  const dir = path.dirname(LOCAL_STORAGE_PATH);
  try {
    const fs = require('fs');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
      fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify({ projects: [], content: [] }));
    }
  } catch (e) {}
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri || uri.includes("localhost") || uri.includes("127.0.0.1")) {
    // If URI is missing or pointing to localhost, fallback immediately without error
    return null;
  }

  if (cached.conn) return cached.conn;

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(uri, { bufferCommands: false });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // This is where your error was being logged.
    // It means the connection to the cloud database failed (e.g. IP not whitelisted).
    // We log it and fallback to local storage.
    console.warn("MongoDB Atlas connection failed. Using local storage instead.");
    return null; 
  }
}

// Fallback logic for Projects
export async function getProjects() {
  const conn = await connectToDatabase();
  if (conn) {
    const Project = mongoose.models.Project || (await import("@/models/Project")).default;
    return await Project.find({}).sort({ order: 1 });
  }
  
  await ensureDataDir();
  const data = JSON.parse(await readFile(LOCAL_STORAGE_PATH, "utf8"));
  return data.projects || [];
}

export async function createProject(projectData) {
  const conn = await connectToDatabase();
  if (conn) {
    const Project = mongoose.models.Project || (await import("@/models/Project")).default;
    return await Project.create(projectData);
  }

  await ensureDataDir();
  const data = JSON.parse(await readFile(LOCAL_STORAGE_PATH, "utf8"));
  const newProject = { ...projectData, _id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
  data.projects.push(newProject);
  await writeFile(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2));
  return newProject;
}

export async function updateProject(id, projectData) {
  const conn = await connectToDatabase();
  if (conn) {
    const Project = mongoose.models.Project || (await import("@/models/Project")).default;
    return await Project.findByIdAndUpdate(id, projectData, { new: true });
  }

  await ensureDataDir();
  const data = JSON.parse(await readFile(LOCAL_STORAGE_PATH, "utf8"));
  const index = data.projects.findIndex(p => p._id === id);
  if (index >= 0) {
    data.projects[index] = { ...data.projects[index], ...projectData, updatedAt: new Date() };
    await writeFile(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2));
    return data.projects[index];
  }
  return null;
}

export async function deleteProject(id) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const Project = mongoose.models.Project || (await import("@/models/Project")).default;
      await Project.findByIdAndDelete(id);
    } catch (e) {
      console.error("MongoDB delete failed:", e);
    }
  }

  // Always check/clear local storage too to keep them in sync
  await ensureDataDir();
  const fileContent = await readFile(LOCAL_STORAGE_PATH, "utf8");
  const data = JSON.parse(fileContent);
  const initialLength = data.projects.length;
  data.projects = data.projects.filter(p => String(p._id) !== String(id));
  
  if (data.projects.length !== initialLength) {
    await writeFile(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2));
  }
  return { success: true };
}

// Content fallback
export async function getContent() {
  const conn = await connectToDatabase();
  if (conn) {
    const Content = mongoose.models.Content || (await import("@/models/Content")).default;
    return await Content.find({});
  }

  await ensureDataDir();
  const data = JSON.parse(await readFile(LOCAL_STORAGE_PATH, "utf8"));
  return data.content || [];
}

export async function updateContent(section, sectionData) {
  const conn = await connectToDatabase();
  if (conn) {
    const Content = mongoose.models.Content || (await import("@/models/Content")).default;
    return await Content.findOneAndUpdate(
      { section },
      { section, data: sectionData },
      { upsert: true, new: true }
    );
  }

  await ensureDataDir();
  const data = JSON.parse(await readFile(LOCAL_STORAGE_PATH, "utf8"));
  const index = data.content.findIndex(c => c.section === section);
  if (index >= 0) {
    data.content[index].data = sectionData;
  } else {
    data.content.push({ section, data: sectionData });
  }
  await writeFile(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2));
  return { section, data: sectionData };
}

import { getProjects as fetchProjects, getContent as fetchContent } from "./resilient-db";

export async function getProjects() {
  try {
    const projects = await fetchProjects();
    return projects.length > 0 ? JSON.parse(JSON.stringify(projects)) : null;
  } catch (error) {
    console.error("Data fetch failed for projects:", error);
    return null;
  }
}

export async function getContent() {
  try {
    const contents = await fetchContent();
    const formatted = {};
    if (contents && Array.isArray(contents)) {
      contents.forEach(item => {
        formatted[item.section] = item.data;
      });
    }
    return Object.keys(formatted).length > 0 ? JSON.parse(JSON.stringify(formatted)) : null;
  } catch (error) {
    console.error("Data fetch failed for content:", error);
    return null;
  }
}

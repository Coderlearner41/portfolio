const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://predusk-backend-production.up.railway.app"

export interface Project {
  id: number
  title: string
  description: string
  skills: string[]
  links?: { github?: string; demo?: string }
  date?: string
}

// Fetch all projects
export async function getProjects(skill?: string): Promise<Project[]> {
    console.log("fetch called")
  const url = skill ? `${BASE_URL}/projects?skill=${skill}` : `${BASE_URL}/projects`
  const res = await fetch(url)
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch projects")
  return res.json()
}

// Fetch single project
export async function getProjectById(id: number): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${id}`)
  if (!res.ok) throw new Error("Failed to fetch project")
  return res.json()
}

// Update a project
export async function updateProject(id: number, data: Partial<Project>, token?: string) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update project")
  return res.json()
}

// Create a new project
export async function createProject(data: Partial<Project>, token?: string) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create project")
  return res.json()
}

// Delete a project
export async function deleteProject(id: number, token?: string) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error("Failed to delete project")
  return res.json()
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://predusk-backend-production.up.railway.app"

export interface Experience {
  id: number
  company: string
  role: string
  duration: string
  description: string
  skills: string[]
}

// Fetch all experiences
export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${BASE_URL}/experiences`)
  if (!res.ok) throw new Error("Failed to fetch experiences")
  return res.json()
}

// Create new experience
export async function createExperience(data: Partial<Experience>, token?: string) {
  console.log("hehehehe", data)
  const res = await fetch(`${BASE_URL}/experiences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create experience")
  return res.json()
}

// Update experience
export async function updateExperience(id: number, data: Partial<Experience>, token?: string) {
  const res = await fetch(`${BASE_URL}/experiences/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update experience")
  return res.json()
}

// Delete experience
export async function deleteExperience(id: number, token?: string) {
  const res = await fetch(`${BASE_URL}/experiences/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error("Failed to delete experience")
  return res.json()
}

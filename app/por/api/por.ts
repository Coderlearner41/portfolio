const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://predusk-backend-production.up.railway.app"

export interface POR {
  id: number
  sphere: string
  position: string
  tenure: string
  description: string
  skills: string[] 
}

// Fetch all PORs
export async function getPORs(): Promise<POR[]> {
  console.log("fetch called for PORs")
  const res = await fetch(`${BASE_URL}/pors`)
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch PORs")
  return res.json()
}

// Fetch single POR
export async function getPORById(id: number): Promise<POR> {
  const res = await fetch(`${BASE_URL}/pors/${id}`)
  if (!res.ok) throw new Error("Failed to fetch POR")
  return res.json()
}

// Create a new POR
export async function createPOR(data: Partial<POR>, token?: string) {
  console.log("Creating POR:", data)
  const res = await fetch(`${BASE_URL}/pors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create POR")
  return res.json()
}

// Update an existing POR
export async function updatePOR(id: number, data: Partial<POR>, token?: string) {
  const res = await fetch(`${BASE_URL}/pors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update POR")
  return res.json()
}

// Delete a POR
export async function deletePOR(id: number, token?: string) {
  const res = await fetch(`${BASE_URL}/pors/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error("Failed to delete POR")
  return res.json()
}

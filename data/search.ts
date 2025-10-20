export interface SearchResult {
  type: "project" | "skill" | "profile" | "por" | "experience"
  title: string
  description: string
  category?: string
}

export const allSearchableData: SearchResult[] = [
  // Projects
  {
    type: "project",
    title: "AI Video Generator",
    description: "Automated commentary videos using avatars and voice synthesis.",
  },
  {
    type: "project",
    title: "Finance Tracker Dashboard",
    description: "A full-stack financial analytics tool for tracking club expenses and investments.",
  },
  {
    type: "project",
    title: "Personal API Playground",
    description: "Backend service exposing portfolio data with CRUD operations.",
  },
  // Skills
  {
    type: "skill",
    title: "React",
    description: "JavaScript library for building user interfaces",
    category: "Technical",
  },
  {
    type: "skill",
    title: "Node.js",
    description: "JavaScript runtime for server-side development",
    category: "Technical",
  },
  {
    type: "skill",
    title: "Financial Modeling",
    description: "Building financial forecasts and analysis models",
    category: "Finance & Analytics",
  },
  // POR
  {
    type: "por",
    title: "Finance Club Head",
    description: "Leading financial literacy initiatives, managing club events, and coordinating with sponsors.",
  },
  {
    type: "por",
    title: "Inter IIT WebOps Guild",
    description: "Developed and maintained event management platforms for Inter IIT participants.",
  },
  // Experience
  {
    type: "experience",
    title: "Backend Developer Intern at Finlytics",
    description: "Built REST APIs for financial data aggregation, improving data throughput by 25%.",
  },
  {
    type: "experience",
    title: "Full-Stack Intern at Webify Tech",
    description: "Worked on dynamic dashboards and automated deployment scripts.",
  },
  // Profile
  {
    type: "profile",
    title: "Dhawal Khatri",
    description: "Full-stack developer | Finance Club Head | WebOps Guild Member",
  },
]

export function searchData(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase()
  return allSearchableData.filter(
    (item) => item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery),
  )
}

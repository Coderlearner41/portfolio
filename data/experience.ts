import type { Experience } from "@/lib/types"

export const experienceData: Experience[] = [
  {
    company: "Zetta Tech LLP",
    role: "Forward Developer Intern",
    duration: "May 2026 – Jul 2026",
    kind: "Internship",
    location: "Chennai",
    description:
      "Built production features for a field-sales platform: a React Native app for sales agents and FastAPI/Celery LLM pipelines that turn recorded sales conversations into structured CRM records. The work is under NDA, so details are kept high-level.",
    highlights: ["Shipped across several Play Store / TestFlight releases", "Diagnosed and fixed a production CRM sync outage"],
    skills: ["React Native", "FastAPI", "Celery", "LLMs", "PostgreSQL"],
    order: 1,
  },
  {
    company: "TNMSS · Government of Tamil Nadu",
    role: "Flutter Developer (Freelance)",
    duration: "Dec 2024 – Apr 2025",
    kind: "Freelance",
    description:
      "Cross-platform mental-health app that connects teachers, students and psychologists, with a red-alert system for early referral and real-time dashboards for educators.",
    highlights: ["Used by 1,000+ teachers to flag students for referral"],
    skills: ["Flutter", "Dart", "Java", "Dashboards"],
    order: 2,
  },
  {
    company: "IITM Mobility",
    role: "Flutter Developer (Freelance)",
    duration: "Dec 2024 – Mar 2025",
    kind: "Freelance",
    description:
      "Campus mobility app with continuous location tracking, built with the Civil Engineering department to study trip patterns and plan transport.",
    highlights: ["10,000+ trips logged from 500+ users", "Trip data used to retime campus bus schedules"],
    skills: ["Flutter", "Location services", "Data analysis"],
    order: 3,
  },
  {
    company: "Chimertech",
    role: "Flutter Developer Intern",
    duration: "Nov 2024 – Jan 2025",
    kind: "Internship",
    description:
      "Built Flutter modules for agri-healthcare prototypes heading to field trials, with REST integrations and structured state management.",
    highlights: ["Contributed to 3+ prototypes"],
    skills: ["Flutter", "REST APIs", "State management"],
    order: 4,
  },
  {
    company: "E-Subhalekha",
    role: "Frontend Developer Intern",
    duration: "Dec 2024 – Jan 2025",
    kind: "Internship",
    description: "Turned Figma mockups into responsive, cross-browser pages and interactive PHP landing pages.",
    highlights: ["10+ responsive layouts shipped"],
    skills: ["HTML", "CSS", "JavaScript", "PHP", "Figma"],
    order: 5,
  },
  {
    company: "Kautilya Education",
    role: "Subject Matter Expert & Web Developer",
    duration: "2024",
    kind: "Internship",
    description:
      "Wrote advanced physics solutions for JEE/NEET aspirants, coordinated a small intern team and built web modules for the platform.",
    highlights: ["100+ solutions authored", "Managed 6+ interns"],
    skills: ["Next.js", "Content", "Team coordination"],
    order: 6,
  },
]

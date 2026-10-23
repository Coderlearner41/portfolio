import type { Profile, SkillGroup } from "@/lib/types"

export const profileData: Profile = {
  name: "Dhawal Khatri",
  initials: "DK",
  roles: ["AI / ML Engineer", "Full-stack Developer", "Mobile (Flutter · React Native)", "Structural + Software"],
  headline: "I build software end to end, from LLM agents and on-device ML to production apps.",
  bio: "Civil Engineering undergrad at IIT Madras who ships software. I've built a conversational agent that designs and seismically analyses RC buildings (my B.Tech project), co-authored an offline earthquake-hazard app now under review at an Elsevier journal, and shipped production React Native and FastAPI systems. Outside code, I head the Finance Club and sit on the Students' Legislative Council's Financial Accountability Committee.",
  location: "Chennai, India",
  image: "/profile.jpg",
  email: "khatridhawal97@gmail.com",
  instituteEmail: "ce23b063@smail.iitm.ac.in",
  phone: "+91 89494 62906",
  available: "Open to SDE · ML · Quant roles",
  education: {
    degree: "B.Tech, Civil Engineering",
    institute: "Indian Institute of Technology Madras",
    years: "2023 – 2027",
    cgpa: "7.91",
    school: "Cambridge Court High School, Jaipur · XII 92% · X 93.1%",
  },
  socials: {
    github: "https://github.com/Coderlearner41",
    linkedin: "https://www.linkedin.com/in/dhawal-khatri-3605bb284/",
    codeforces: "https://codeforces.com/profile/codelearner41",
  },
  stats: [
    { value: 6, prefix: "Top ", label: "AMEX Codestreet 2026", detail: "out of 11,852 teams" },
    { value: 2, label: "Inter IIT podiums", detail: "Gold (Civil) · Bronze (Tech)" },
    { value: 99.55, decimals: 2, label: "JEE Main percentile", detail: "2023" },
    { value: 7, label: "Live web apps", detail: "on Vercel and Render" },
  ],
}

export const skillsData: SkillGroup[] = [
  { category: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "C", "Java", "Dart", "SQL"] },
  {
    category: "AI / ML",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "GNNs", "Computer Vision", "ONNX / TFLite", "Whisper", "LLM agents & tool-calling"],
  },
  {
    category: "Web & Mobile",
    items: ["React", "Next.js", "Node / Express", "FastAPI", "Flask", "Flutter", "React Native / Expo", "Tailwind"],
  },
  { category: "Data & Infra", items: ["PostgreSQL", "MongoDB", "SQLite", "Prisma", "Docker", "AWS", "Vercel", "Render", "Git"] },
  {
    category: "Engineering & Finance",
    items: ["OpenSees FEM", "IS 456 / IS 1893", "PSHA", "Google Earth Engine", "DCF valuation", "Backtesting"],
  },
]

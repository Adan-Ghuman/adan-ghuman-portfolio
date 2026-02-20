export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  approach: string;
  tradeoff: string;
  tech: string[];
  link?: string;
  image?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  accentWord: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: "Internship" | "Full-time" | "Part-time" | "Contract";
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  locationType: "On-site" | "Remote" | "Hybrid";
  bullets: string[];
  skills: string[];
  logo?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

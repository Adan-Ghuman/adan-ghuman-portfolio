import type {SocialLink} from "@/types";

export const personal = {
  name: "M. Adan Ghuman",
  email: "adanghuman23@gmail.com",
  hero: {
    greeting: "Hello, I'm",
    headline: "M. Adan Ghuman",
    role: "Software Engineer",
    subline:
      "I build systems, not one-off solutions.",
  },
  about: [
    "I optimize for systems that stay understandable under pressure — growing features, real users, and imperfect requirements.",
    "I work by shipping small, validating assumptions early, and tightening architecture only when the system earns it.",
    "I enjoy problems where performance, state, and data flow start to break naive solutions.",
  ],
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/Adan-Ghuman",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/muhammad-adan-ghuman-553740232/",
  },
];

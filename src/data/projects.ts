import type {Project} from "@/types";

export const projects: Project[] = [
  {
    id: "dreamspace-admin-panel",
    title: "DreamSpace Admin Panel",
    subtitle: "Full-Stack E-Commerce Management Dashboard",
    description:
      "A full-stack e-commerce admin dashboard built for production-level operations. Covers product management, order processing, customer analytics, and role-based team access. Features cookie-based auth, rate limiting, demo mode, and real-time analytics — mirroring real enterprise admin workflows.",
    problem:
      "E-commerce businesses need enterprise-grade admin tools that handle complex operations like inventory management, order processing, customer analytics, and team access control — all while maintaining security and performance at scale.",
    approach:
      "Built a comprehensive admin dashboard with modular architecture, real-time analytics, role-based access control, and production-ready security measures. Implemented demo mode for portfolio showcase while maintaining enterprise-level functionality.",
    tradeoff:
      "Focused on comprehensive feature set and security over minimal complexity. The system is feature-rich but maintains clean architecture through careful module separation and optimized data handling.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT Auth",
      "Rate Limiting",
      "Recharts",
    ],
    link: "https://dream-space-admin-panel-peb3.vercel.app/",
    image: "/images/project_previews/dreamspace-admin-panel.png",
  },
  {
    id: "pingly",
    title: "Pingly",
    subtitle: "Full-Stack Real-Time Chat App (Monorepo)",
    description:
      "A full-stack real-time chat application built as a monorepo with three apps: a React Native (Expo) mobile client, a React (Vite) web client, and a Node.js/Express server. Features one-on-one chat, typing indicators, online presence, and optimistic updates — all unified under Clerk authentication.",
    problem:
      "Building a consistent real-time chat experience across mobile and web is hard — auth, socket state, and UI logic tend to diverge fast when maintained in separate repos with separate stacks.",
    approach:
      "Monorepo structure keeps the mobile app, web client, and server co-located. Clerk handles auth uniformly across all three apps including Google OAuth. Socket.IO drives real-time messaging, typing indicators, and online presence. TanStack Query manages server state; Zustand handles minimal client state like socket refs and UI prefs.",
    tradeoff:
      "Chose Clerk over rolling custom auth to move fast and get OAuth for free across all platforms. The tradeoff is an external auth dependency, but it removes an entire category of security risk and lets the focus stay on product features.",
    tech: [
      "React Native",
      "Expo",
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Clerk",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "shadcn/ui",
      "NativeWind",
      "Zod",
    ],
    link: "https://pingly-d3dss.sevalla.app",
    image: "/images/project_previews/pingly.png",
  },
  {
    id: "echo-mind",
    title: "EchoMind",
    subtitle: "Full-Stack AI Chat Assistant with Persistent Memory",
    description:
      "A full-stack AI-powered chat assistant built with Next.js App Router, featuring persistent cross-session memory, document-grounded RAG, and real-time streaming responses.",
    problem:
      "Most AI chatbots lose all context between sessions and can't answer questions grounded in the user's own documents — leaving users stuck re-explaining themselves and getting generic responses.",
    approach:
      "Built a LangChain-powered memory pipeline that stores vector embeddings in PostgreSQL with pgvector, enabling semantic recall across sessions. RAG lets users upload documents so the AI retrieves relevant chunks before responding. Requests route through OpenRouter so users can switch models per chat. Responses stream via SSE for immediate feedback, and an /admin/langchain panel exposes vector memory state for debugging.",
    tradeoff:
      "Chose OpenRouter over a direct provider SDK to avoid vendor lock-in and give users model flexibility — at the cost of adding one more network hop. Accepted that tradeoff because model-switching is a core differentiator, not a nice-to-have.",
    tech: [
      "Next.js",
      "TypeScript",
      "LangChain",
      "PostgreSQL",
      "pgvector",
      "OpenRouter",
      "NextAuth",
      "SSE",
      "Tailwind CSS",
    ],
    image: "/images/project_previews/preview_echo-mind.png",
    link: "https://echo-mind-wheat.vercel.app/",
  },
];

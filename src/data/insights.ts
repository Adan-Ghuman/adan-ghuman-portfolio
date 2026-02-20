import type {Insight} from "@/types";

export const insights: Insight[] = [
  {
    id: "abstraction",
    title: "Premature abstraction costs more than duplication.",
    description:
      "Abstract only after patterns prove themselves. Early abstractions hide problems instead of solving them.",
    accentWord: "abstraction",
  },
  {
    id: "state",
    title: "State should be minimized, not organized.",
    description:
      "Most complexity comes from storing what could be derived. Fewer sources of truth beat cleaner state slices.",
    accentWord: "minimized",
  },
  {
    id: "reliability",
    title: "Reliability beats cleverness every time.",
    description:
      "Readable code that fails predictably outlives smart code that only its author understands.",
    accentWord: "Reliability",
  },
];

import { projects } from "./projects";

export const categories = [
  "all",
  ...Array.from(new Set(projects.flatMap((p) => p.disciplines))),
];

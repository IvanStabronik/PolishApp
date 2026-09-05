import type { UserRole } from "@/lib/enums";

/** Demo accounts used when DEMO_MODE=true (seed + local docs). */
export const DEMO_ACCOUNTS = {
  learner: {
    email: "learner@demo.slowarium.local",
    password: "DemoLearner1!",
    name: "Demo Learner",
    roles: ["learner"] as const satisfies readonly UserRole[],
  },
  author: {
    email: "author@demo.slowarium.local",
    password: "DemoAuthor1!",
    name: "Demo Author",
    roles: ["author", "learner"] as const satisfies readonly UserRole[],
  },
  reviewer: {
    email: "reviewer@demo.slowarium.local",
    password: "DemoReviewer1!",
    name: "Demo Reviewer",
    roles: ["reviewer"] as const satisfies readonly UserRole[],
  },
} as const;

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true" || process.env.DEMO_MODE === "1";
}

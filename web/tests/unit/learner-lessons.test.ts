import { describe, expect, it } from "vitest";
import { loadAllModulesFromYaml } from "@/lib/content/load-module";

describe("M3 learner-visible lesson inventory", () => {
  it("exposes 5 modules, 15 distinct LES-* lessons, 129 exercises", () => {
    const modules = loadAllModulesFromYaml();
    expect(modules).toHaveLength(5);

    const lessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));
    expect(lessonIds).toHaveLength(15);
    expect(new Set(lessonIds).size).toBe(15);
    expect(lessonIds.every((id) => id.startsWith("LES-"))).toBe(true);
    expect(lessonIds.some((id) => id.startsWith("les-"))).toBe(false);

    for (const mod of modules) {
      expect(mod.lessons).toHaveLength(3);
      // Flat exercises are derived from lessons — not a second inventory
      const fromLessons = mod.lessons.flatMap((l) => l.exercises.map((e) => e.id));
      expect(mod.exercises.map((e) => e.id)).toEqual(fromLessons);
    }

    const exerciseCount = modules.reduce((n, m) => n + m.exercises.length, 0);
    expect(exerciseCount).toBe(129);
  });

  it("catalog lessonIds never use synthetic les-${moduleId}", () => {
    const modules = loadAllModulesFromYaml();
    for (const mod of modules) {
      const fake = `les-${mod.id}`;
      expect(mod.lessons.map((l) => l.id)).not.toContain(fake);
    }
  });
});

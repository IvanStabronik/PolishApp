/**
 * Locale-appropriate step titles when YAML only has title_ru.
 * Cheap fallback map — not a full translation dump.
 */

import type { LearnerL1 } from "@/lib/enums";

const TITLE_UK: Record<string, string> = {
  Ситуация: "Ситуація",
  Диалог: "Діалог",
  "Важные реплики": "Важливі репліки",
  Вслух: "Вголос",
  "Pan / pani": "Pan / pani",
  Грамматика: "Граматика",
  Практика: "Практика",
  "Короткая проверка": "Коротка перевірка",
  Итог: "Підсумок",
  "Итог урока": "Підсумок уроку",
};

const TITLE_BEL: Record<string, string> = {
  Ситуация: "Сітуацыя",
  Диалог: "Дыялог",
  "Важные реплики": "Важныя рэплікі",
  Вслух: "Уголас",
  "Pan / pani": "Pan / pani",
  Грамматика: "Граматыка",
  Практика: "Практыка",
  "Короткая проверка": "Кароткая праверка",
  Итог: "Вынік",
  "Итог урока": "Вынік урока",
};

/**
 * Prefer UK/BEL step chrome when L1 is ukr/bel; otherwise keep titleRu.
 * UI locale alone is not enough for BEL (often shares RU menu).
 */
export function localizeStepTitle(
  titleRu: string,
  l1?: LearnerL1,
): string {
  const key = titleRu.trim();
  if (l1 === "ukr") return TITLE_UK[key] ?? titleRu;
  if (l1 === "bel") return TITLE_BEL[key] ?? titleRu;
  return titleRu;
}

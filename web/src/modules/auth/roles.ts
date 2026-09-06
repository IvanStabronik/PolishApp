import type { UserRole } from "@/lib/enums";

const PREVIEW_ROLES: readonly UserRole[] = [
  "previewer",
  "author",
  "reviewer",
  "admin",
];

/** Role-based draft preview capability (no env checks). */
export function canPreviewDraft(roles: readonly UserRole[]): boolean {
  return roles.some((role) => PREVIEW_ROLES.includes(role));
}

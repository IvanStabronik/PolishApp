/** Client-safe Polish text normalize for speaking self-check (not scoring). */
export function normalizeAnswer(raw: string): string {
  return raw
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.…]+$/g, "")
    .replace(/[!?,:;]+$/g, "")
    .toLocaleLowerCase("pl-PL");
}

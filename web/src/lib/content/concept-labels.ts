/**
 * Human-readable labels for A1 concept IDs shown in learner progress / review.
 * Prefer curated life-outcome copy; fall back to curriculum inventory SoT;
 * never return raw GR-/FN- IDs as primary UI text.
 */

import {
  curriculumTitleFor,
  isUsableCurriculumTitle,
} from "./curriculum-labels";

const CONCEPT_LABELS_RU: Record<string, string> = {
  "GR-CAS-NOM-01": "Как вас зовут: Nazywam się…",
  "GR-CAS-ACC-01": "Заказ: Poproszę + винительный",
  "GR-TNS-PRS-01": "Короткие фразы в настоящем",
  "GR-TV-AGR-01": "Согласование с pan / pani",
  "PRAG-PAN-01": "Обращение на pan / pani",
  "PHON-CORE-01": "Произношение базовых формул",
  "GR-NUM-CARD-01": "Числительные и количество",
  "GR-NUM-MONEY-01": "Цена и деньги у стойки",
  "GR-PRO-DEM-01": "Указательные слова (ten / ta / to)",
  "GR-EXIST-01": "Есть / нет — наличие",
  "GR-MOT-BASE-01": "Куда едете: do / na",
  "GR-PREP-DO-NA-01": "Предлоги do и na в дороге",
  "GR-TIME-EXPR-01": "Время отправления",
  "GR-Q-WH-01": "Вопросы куда / откуда / когда",
  "FN-A1-IDENTIFY-01": "Назвать себя и откуда вы",
  "FN-A1-GREET-01": "Поздороваться и попрощаться",
  "FN-A1-TRANS-01": "Простой заказ у стойки",
  "FN-A1-ASK-01": "Спросить о наличии",
  "FN-A1-ADDRESS-01": "Вежливо обратиться",
  "FN-A1-QUANT-01": "Размер и количество",
  "FN-A1-THANKS-01": "Поблагодарить",
  "FN-A1-DIRECT-01": "Спросить дорогу",
  "FN-A1-TIME-01": "Уточнить время отправления",
  "FN-A1-PURPOSE-01": "Сказать цель визита в urzędzie",
  "FN-A1-DOCS-01": "Передать документы у окошка",
  "FN-A1-CONFIRM-01": "Подтвердить и закрыть разговор",
  "ORTH-CORE-01": "Базовая польская орфография",
};

const CONCEPT_LABELS_UK: Record<string, string> = {
  "GR-CAS-NOM-01": "Як вас звати: Nazywam się…",
  "GR-CAS-ACC-01": "Замовлення: Poproszę + знахідний",
  "GR-TNS-PRS-01": "Короткі фрази в теперішньому",
  "GR-TV-AGR-01": "Узгодження з pan / pani",
  "PRAG-PAN-01": "Звертання на pan / pani",
  "PHON-CORE-01": "Вимова базових формул",
  "GR-NUM-CARD-01": "Числівники і кількість",
  "GR-NUM-MONEY-01": "Ціна і гроші біля стійки",
  "GR-PRO-DEM-01": "Вказівні слова (ten / ta / to)",
  "GR-EXIST-01": "Є / немає — наявність",
  "GR-MOT-BASE-01": "Куди їдете: do / na",
  "GR-PREP-DO-NA-01": "Прийменники do і na в дорозі",
  "GR-TIME-EXPR-01": "Час відправлення",
  "GR-Q-WH-01": "Питання куди / звідки / коли",
  "FN-A1-IDENTIFY-01": "Назвати себе і звідки ви",
  "FN-A1-GREET-01": "Привітатися і попрощатися",
  "FN-A1-TRANS-01": "Просте замовлення біля стійки",
  "FN-A1-ASK-01": "Запитати про наявність",
  "FN-A1-ADDRESS-01": "Ввічливо звернутися",
  "FN-A1-QUANT-01": "Розмір і кількість",
  "FN-A1-THANKS-01": "Подякувати",
  "FN-A1-DIRECT-01": "Запитати дорогу",
  "FN-A1-TIME-01": "Уточнити час відправлення",
  "FN-A1-PURPOSE-01": "Сказати мету візиту в urzędzie",
  "FN-A1-DOCS-01": "Передати документи біля віконця",
  "FN-A1-CONFIRM-01": "Підтвердити і завершити розмову",
  "ORTH-CORE-01": "Базовий польський правопис",
};

const CONCEPT_LABELS_PL: Record<string, string> = {
  "GR-CAS-NOM-01": "Przedstawianie: Nazywam się…",
  "GR-CAS-ACC-01": "Zamówienie: Poproszę + biernik",
  "GR-TNS-PRS-01": "Krótkie formuły w czasie teraźniejszym",
  "GR-TV-AGR-01": "Zgoda z pan / pani",
  "PRAG-PAN-01": "Zwrot pan / pani",
  "PHON-CORE-01": "Wymowa podstawowych formuł",
  "GR-NUM-CARD-01": "Liczebniki i ilość",
  "GR-NUM-MONEY-01": "Cena i pieniądze przy barze",
  "GR-PRO-DEM-01": "Zaimki wskazujące (ten / ta / to)",
  "GR-EXIST-01": "Jest / nie ma",
  "GR-MOT-BASE-01": "Dokąd jedziecie: do / na",
  "GR-PREP-DO-NA-01": "Przyimki do i na w drodze",
  "GR-TIME-EXPR-01": "Czas odjazdu",
  "GR-Q-WH-01": "Pytania dokąd / skąd / kiedy",
  "FN-A1-IDENTIFY-01": "Przedstawić się i skąd jesteś",
  "FN-A1-GREET-01": "Przywitać się i pożegnać",
  "FN-A1-TRANS-01": "Proste zamówienie przy barze",
  "FN-A1-ASK-01": "Zapytać o dostępność",
  "FN-A1-ADDRESS-01": "Zwrot grzecznościowy",
  "FN-A1-QUANT-01": "Rozmiar i ilość",
  "FN-A1-THANKS-01": "Podziękować",
  "FN-A1-DIRECT-01": "Zapytać o drogę",
  "FN-A1-TIME-01": "Uściślić czas odjazdu",
  "FN-A1-PURPOSE-01": "Podać cel wizyty w urzędzie",
  "FN-A1-DOCS-01": "Przekazać dokumenty przy okienku",
  "FN-A1-CONFIRM-01": "Potwierdzić i domknąć rozmowę",
  "ORTH-CORE-01": "Podstawowa ortografia polska",
};

export type ConceptLabelLocale = "ru" | "uk" | "pl";

function tableFor(locale: ConceptLabelLocale): Record<string, string> {
  if (locale === "uk") return CONCEPT_LABELS_UK;
  if (locale === "pl") return CONCEPT_LABELS_PL;
  return CONCEPT_LABELS_RU;
}

/** Soft fallback when an ID is not in the map — never return raw ops IDs as primary. */
function softFallback(canonicalId: string, locale: ConceptLabelLocale): string {
  const fromSoT = curriculumTitleFor(canonicalId, locale);
  if (fromSoT && isUsableCurriculumTitle(fromSoT, canonicalId)) {
    return fromSoT;
  }

  if (canonicalId.startsWith("PRAG-PAN")) {
    return locale === "pl"
      ? "Zwrot pan / pani"
      : locale === "uk"
        ? "Звертання pan / pani"
        : "Обращение pan / pani";
  }
  if (canonicalId.startsWith("PHON")) {
    return locale === "pl"
      ? "Wymowa"
      : locale === "uk"
        ? "Вимова"
        : "Произношение";
  }
  if (canonicalId.startsWith("FN-A1-GREET")) {
    return locale === "pl"
      ? "Powitanie i pożegnanie"
      : locale === "uk"
        ? "Привітання і прощання"
        : "Приветствие и прощание";
  }
  if (canonicalId.startsWith("FN-A1-IDENTIFY")) {
    return locale === "pl"
      ? "Przedstawianie się"
      : locale === "uk"
        ? "Представлення себе"
        : "Представление себя";
  }
  if (canonicalId.startsWith("FN-")) {
    return locale === "pl"
      ? "Umiejętność komunikacyjna"
      : locale === "uk"
        ? "Комунікативна навичка"
        : "Коммуникативный навык";
  }
  if (canonicalId.startsWith("GR-NUM-MONEY")) {
    return locale === "pl" ? "Pieniądze" : locale === "uk" ? "Гроші" : "Деньги";
  }
  if (canonicalId.startsWith("GR-")) {
    return locale === "pl"
      ? "Temat gramatyczny"
      : locale === "uk"
        ? "Граматична тема"
        : "Грамматическая тема";
  }
  return locale === "pl"
    ? "Temat do powtórki"
    : locale === "uk"
      ? "Тема для повторення"
      : "Тема для повторения";
}

export function humanConceptLabel(
  canonicalId: string,
  locale: ConceptLabelLocale = "ru",
): string {
  return tableFor(locale)[canonicalId] ?? softFallback(canonicalId, locale);
}

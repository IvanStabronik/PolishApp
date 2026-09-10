/**
 * Human-readable labels for A1 concept IDs shown in learner progress / review.
 * Keep curriculum IDs out of primary UI copy (data-* attributes may still use them).
 */

const CONCEPT_LABELS_RU: Record<string, string> = {
  "GR-CAS-NOM-01": "Как вас зовут: Nazywam się…",
  "GR-CAS-ACC-01": "Винительный падеж в заказах и просьбах",
  "GR-TNS-PRS-01": "Настоящее время в коротких фразах",
  "GR-TV-AGR-01": "Согласование с pan / pani",
  "PRAG-PAN-01": "Обращение на pan / pani",
  "PHON-CORE-01": "Произношение базовых формул",
  "GR-NUM-CARD-01": "Числительные и количество",
  "GR-NUM-MONEY-01": "Цена и деньги",
  "GR-PRO-DEM-01": "Указательные слова (ten / ta / to)",
  "GR-EXIST-01": "Есть / нет — наличие существования",
  "GR-MOT-BASE-01": "Куда едете: do / na",
  "GR-PREP-DO-NA-01": "Предлоги do и na в дороге",
  "GR-TIME-EXPR-01": "Время отправления",
  "GR-Q-WH-01": "Вопросы куда / откуда / когда",
};

const CONCEPT_LABELS_UK: Record<string, string> = {
  "GR-CAS-NOM-01": "Як вас звати: Nazywam się…",
  "GR-CAS-ACC-01": "Знахідний відмінок у замовленнях і проханнях",
  "GR-TNS-PRS-01": "Теперішній час у коротких фразах",
  "GR-TV-AGR-01": "Узгодження з pan / pani",
  "PRAG-PAN-01": "Звертання на pan / pani",
  "PHON-CORE-01": "Вимова базових формул",
  "GR-NUM-CARD-01": "Числівники і кількість",
  "GR-NUM-MONEY-01": "Ціна і гроші",
  "GR-PRO-DEM-01": "Вказівні слова (ten / ta / to)",
  "GR-EXIST-01": "Є / немає — існування",
  "GR-MOT-BASE-01": "Куди їдете: do / na",
  "GR-PREP-DO-NA-01": "Прийменники do і na в дорозі",
  "GR-TIME-EXPR-01": "Час відправлення",
  "GR-Q-WH-01": "Питання куди / звідки / коли",
};

const CONCEPT_LABELS_PL: Record<string, string> = {
  "GR-CAS-NOM-01": "Przedstawianie: Nazywam się…",
  "GR-CAS-ACC-01": "Biernik w zamówieniach i prośbach",
  "GR-TNS-PRS-01": "Czas teraźniejszy w krótkich formułach",
  "GR-TV-AGR-01": "Zgoda z pan / pani",
  "PRAG-PAN-01": "Zwrot pan / pani",
  "PHON-CORE-01": "Wymowa podstawowych formuł",
  "GR-NUM-CARD-01": "Liczebniki i ilość",
  "GR-NUM-MONEY-01": "Cena i pieniądze",
  "GR-PRO-DEM-01": "Zaimki wskazujące (ten / ta / to)",
  "GR-EXIST-01": "Jest / nie ma",
  "GR-MOT-BASE-01": "Dokąd jedziecie: do / na",
  "GR-PREP-DO-NA-01": "Przyimki do i na w drodze",
  "GR-TIME-EXPR-01": "Czas odjazdu",
  "GR-Q-WH-01": "Pytania dokąd / skąd / kiedy",
};

export type ConceptLabelLocale = "ru" | "uk" | "pl";

function tableFor(locale: ConceptLabelLocale): Record<string, string> {
  if (locale === "uk") return CONCEPT_LABELS_UK;
  if (locale === "pl") return CONCEPT_LABELS_PL;
  return CONCEPT_LABELS_RU;
}

/** Soft fallback when an ID is not in the map — never return raw ops IDs as primary. */
function softFallback(canonicalId: string, locale: ConceptLabelLocale): string {
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
  if (canonicalId.startsWith("GR-NUM-MONEY")) {
    return locale === "pl" ? "Pieniądze" : locale === "uk" ? "Гроші" : "Деньги";
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

/**
 * Human-readable labels for A1 concept IDs shown in learner progress / review.
 * Prefer curated life-outcome copy; fall back to curriculum inventory SoT;
 * never return raw GR-/FN- IDs as primary UI text.
 *
 * Locales: UI ru/uk/pl plus `be` when learner L1 is Belarusian (menu may stay RU).
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

/** Belarusian L1 — equal peer to UKR/RUS; used when profile.l1 === bel. */
const CONCEPT_LABELS_BE: Record<string, string> = {
  "GR-CAS-NOM-01": "Як вас клічуць: Nazywam się…",
  "GR-CAS-ACC-01": "Заказ: Poproszę + вінавальны",
  "GR-TNS-PRS-01": "Кароткія фразы ў цяперашнім",
  "GR-TV-AGR-01": "Узгадненне з pan / pani",
  "PRAG-PAN-01": "Зварот на pan / pani",
  "PHON-CORE-01": "Вымаўленне базавых формул",
  "GR-NUM-CARD-01": "Лічэбнікі і колькасць",
  "GR-NUM-MONEY-01": "Цана і грошы каля стойкі",
  "GR-PRO-DEM-01": "Указальныя словы (ten / ta / to)",
  "GR-EXIST-01": "Ёсць / няма — наяўнасць",
  "GR-MOT-BASE-01": "Куды едзеце: do / na",
  "GR-PREP-DO-NA-01": "Прыназоўнікі do і na ў дарозе",
  "GR-TIME-EXPR-01": "Час адпраўлення",
  "GR-Q-WH-01": "Пытанні куды / адкуль / калі",
  "FN-A1-IDENTIFY-01": "Назваць сябе і адкуль вы",
  "FN-A1-GREET-01": "Прывітацца і папрашчацца",
  "FN-A1-TRANS-01": "Просты заказ каля стойкі",
  "FN-A1-ASK-01": "Спытаць пра наяўнасць",
  "FN-A1-ADDRESS-01": "Вучціва звярнуцца",
  "FN-A1-QUANT-01": "Памер і колькасць",
  "FN-A1-THANKS-01": "Падзякаваць",
  "FN-A1-DIRECT-01": "Спытаць дарогу",
  "FN-A1-TIME-01": "Удакладніць час адпраўлення",
  "FN-A1-PURPOSE-01": "Сказаць мэту візіту ў urzędzie",
  "FN-A1-DOCS-01": "Перадаць дакументы каля вакенца",
  "FN-A1-CONFIRM-01": "Пацвердзіць і закрыць размову",
  "ORTH-CORE-01": "Базавы польскі правапіс",
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

export type ConceptLabelLocale = "ru" | "uk" | "pl" | "be";

function tableFor(locale: ConceptLabelLocale): Record<string, string> {
  if (locale === "uk") return CONCEPT_LABELS_UK;
  if (locale === "pl") return CONCEPT_LABELS_PL;
  if (locale === "be") return CONCEPT_LABELS_BE;
  return CONCEPT_LABELS_RU;
}

/**
 * Prefer learner L1 for instructional concept copy (BEL/UKR first-class).
 * UI locale fills when L1 is rus or unset.
 */
export function resolveConceptLabelLocale(opts: {
  uiLocale?: string | null;
  l1?: string | null;
}): ConceptLabelLocale {
  const l1 = (opts.l1 ?? "").toLowerCase();
  if (l1 === "bel" || l1 === "be") return "be";
  if (l1 === "ukr" || l1 === "uk") return "uk";
  const ui = (opts.uiLocale ?? "ru").toLowerCase().split("-")[0] ?? "ru";
  if (ui === "uk") return "uk";
  if (ui === "pl") return "pl";
  return "ru";
}

/** Soft fallback when an ID is not in the map — never return raw ops IDs as primary. */
function softFallback(canonicalId: string, locale: ConceptLabelLocale): string {
  // SoT inventories are PL + RU only — skip for uk/be so we never show Russian on UK/BEL.
  if (locale === "ru" || locale === "pl") {
    const fromSoT = curriculumTitleFor(canonicalId, locale);
    if (fromSoT && isUsableCurriculumTitle(fromSoT, canonicalId)) {
      return fromSoT;
    }
  }

  if (canonicalId.startsWith("PRAG-PAN")) {
    if (locale === "pl") return "Zwrot pan / pani";
    if (locale === "uk") return "Звертання pan / pani";
    if (locale === "be") return "Зварот pan / pani";
    return "Обращение pan / pani";
  }
  if (canonicalId.startsWith("PHON")) {
    if (locale === "pl") return "Wymowa";
    if (locale === "uk") return "Вимова";
    if (locale === "be") return "Вымаўленне";
    return "Произношение";
  }
  if (canonicalId.startsWith("FN-A1-GREET")) {
    if (locale === "pl") return "Powitanie i pożegnanie";
    if (locale === "uk") return "Привітання і прощання";
    if (locale === "be") return "Прывітанне і развітанне";
    return "Приветствие и прощание";
  }
  if (canonicalId.startsWith("FN-A1-IDENTIFY")) {
    if (locale === "pl") return "Przedstawianie się";
    if (locale === "uk") return "Представлення себе";
    if (locale === "be") return "Прастаўленне сябе";
    return "Представление себя";
  }
  if (canonicalId.startsWith("FN-")) {
    if (locale === "pl") return "Umiejętność komunikacyjna";
    if (locale === "uk") return "Комунікативна навичка";
    if (locale === "be") return "Камунікатыўны навык";
    return "Коммуникативный навык";
  }
  if (canonicalId.startsWith("GR-NUM-MONEY")) {
    if (locale === "pl") return "Pieniądze";
    if (locale === "uk") return "Гроші";
    if (locale === "be") return "Грошы";
    return "Деньги";
  }
  if (canonicalId.startsWith("GR-")) {
    if (locale === "pl") return "Temat gramatyczny";
    if (locale === "uk") return "Граматична тема";
    if (locale === "be") return "Граматычная тэма";
    return "Грамматическая тема";
  }
  if (locale === "pl") return "Temat do powtórki";
  if (locale === "uk") return "Тема для повторення";
  if (locale === "be") return "Тэма для паўтарэння";
  return "Тема для повторения";
}

export function humanConceptLabel(
  canonicalId: string,
  locale: ConceptLabelLocale = "ru",
): string {
  return tableFor(locale)[canonicalId] ?? softFallback(canonicalId, locale);
}

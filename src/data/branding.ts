// ================================================================
// ENTERPRISE CAPABILITY INTELLIGENCE — BRAND & TERMINOLOGY
// ================================================================
// English brand term is architectural and fixed — never translated.
// Russian concept is a distinct business framing, not a translation.

export const BRAND_EN = "Enterprise Capability Intelligence";
export const BRAND_RU = "Интеллект стратегической реализации";

/**
 * Category positioning — deliberately broader than the product name itself.
 * The brand name (BRAND_RU) stays short and memorable for day-to-day use;
 * this line exists to set the category in the viewer's mind before they
 * see a single screen — "not HR-tech, a new class of management system."
 * Introduced gradually alongside the existing brand name rather than
 * replacing it outright.
 */
export const CATEGORY_RU = "Интеллектуальная система управления стратегическим развитием организации";
export const CATEGORY_EN = "Intelligent Strategic Execution System";

export const TAGLINE_RU = "От стратегии — к результату.";
export const TAGLINE_STEPS_RU = [
  "Находим критическую экспертизу.",
  "Объединяем экспертов.",
  "Формируем команды.",
  "Ускоряем реализацию стратегических инициатив.",
];

export const HERO_DESCRIPTION_RU =
  "Сегодня большинство крупных организаций умеют разрабатывать стратегии. " +
  "Но реализация стратегических инициатив всё чаще ограничивается нехваткой " +
  "критически важных знаний, экспертов и готовых команд. " +
  BRAND_RU +
  " помогает организации быстрее находить нужные способности и экспертизу, формировать " +
  "команды, развивать потенциал людей и использовать возможности Enterprise AI для " +
  "успешной реализации стратегических инициатив.";

/**
 * Architecture term pairs — Russian concept (small) next to
 * English architecture term (the fixed, structural name).
 */
export interface ArchTermPair {
  ru: string;
  en: string;
}

export const archTerms: Record<string, ArchTermPair> = {
  capabilityIntelligence: { ru: "Интеллект стратегической реализации", en: "Enterprise Capability Intelligence" },
  aiPlatform:             { ru: "Корпоративная ИИ-платформа",          en: "Enterprise AI Platform" },
  agentRuntime:           { ru: "Среда выполнения ИИ-агентов",         en: "Agent Runtime" },
  knowledgeGraph:         { ru: "Граф знаний",                          en: "Knowledge Graph" },
  expertGraph:            { ru: "Граф экспертов",                      en: "Expert Graph" },
  capabilityGraph:        { ru: "Граф критической экспертизы",           en: "Capability Graph" },
  teamIntelligence:       { ru: "Интеллект формирования команд",       en: "Team Intelligence" },
  knowledgeServices:      { ru: "Сервисы управления знаниями",         en: "Knowledge Services" },
  businessOutcomes:       { ru: "Бизнес-результаты",                   en: "Business Outcomes" },
  strategicInitiatives:   { ru: "Стратегические инициативы",           en: "Strategic Initiatives" },
  enterpriseSystems:      { ru: "Корпоративные системы",                en: "Enterprise Systems" },
};

/** The architecture stack, top (strategy) to bottom (systems). */
export const architectureLayers: ArchTermPair[] = [
  archTerms.strategicInitiatives,
  archTerms.capabilityIntelligence,
  { ru: "", en: "Enterprise Capability Intelligence" }, // brand layer, no RU label needed twice
  archTerms.aiPlatform,
  archTerms.agentRuntime,
  archTerms.enterpriseSystems,
];

/** The cascade explaining why strategies stall. */
export const problemCascade = [
  "Стратегическая инициатива",
  "Недостаточно специалистов",
  "Критическая экспертиза распределена по организации",
  "Эксперты неизвестны",
  "Знания находятся в разных системах",
  "Команды собираются слишком долго",
  "Проект задерживается",
  "Бизнес теряет скорость",
];

/**
 * The broader context above any single organisation — country, national
 * priorities, mission — shown once at the very top of ProblemScreen before
 * the organisation-level cascade begins. Deliberately generic (no politics,
 * no named officials): the point is that a large organisation's strategy
 * sits inside a wider system of national development, not that any
 * specific priority matters more than another.
 */
export const nationalPriorityChain = [
  "Россия",
  "Национальные стратегические приоритеты",
];
export const nationalPrioritiesDetail =
  "Цифровая трансформация · Развитие ИИ · Технологический суверенитет · Подготовка кадров · Повышение производительности · Внедрение науки";

/** Organisations the architecture applies to — no logos, no comparison. */
export const applicableOrgs = ["Сбер", "VK Tech", "Яндекс", "Росатом"];

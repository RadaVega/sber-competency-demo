export type ModeId = "sber" | "vk" | "rosatom" | "yandex" | "future2035";

export interface ModeConfig {
  id: ModeId;
  org: string;
  // Global platform name (same for all modes)
  platformName: string;
  platformNameRu: string;
  // Per-mode scenario name
  scenarioName: string;
  scenarioNameRu: string;
  mainQuestion: string;
  // The opening line of the whole scenario — a question that keeps this
  // specific VP up at night, not a description of what the platform does.
  // Deliberately personal and uncomfortable, not a feature summary.
  hookQuestion: string;
  // Short, public-strategy-aligned mission statement — "Наша миссия"
  missionRu: string;
  accentColor: string;
  badgeLetter: string;
  // Tochka Sborki integration tagline per mode
  hybridMessage: string;
}

// Kept for architectural/API contexts only — the primary name everywhere
// user-facing is BRAND_RU ("Интеллект стратегической реализации").
export const PLATFORM_NAME = "Capability Intelligence Platform";
export const PLATFORM_NAME_RU = "Интеллект стратегической реализации";
export const PLATFORM_TAGLINE = "Strategy → Capabilities → People → Teams → Results";
export const PLATFORM_TAGLINE_RU = "Стратегия → Критическая экспертиза → Люди → Команды → Результат";

export const modes: Record<ModeId, ModeConfig> = {
  sber: {
    id: "sber",
    org: "Сбер",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Workforce Intelligence Layer",
    scenarioNameRu: "Интеллектуальный слой управления персоналом",
    mainQuestion: "Хватит ли у организации критической экспертизы для масштабной AI-трансформации?",
    hookQuestion: "Совет директоров снова спросит, почему трансформация буксует. На какие цифры вы будете опираться?",
    missionRu: "Экосистема сервисов, меняющая жизнь людей и бизнеса к лучшему через технологии.",
    accentColor: "#21A038",
    badgeLetter: "С",
    hybridMessage: "Внутренние AI Champions + внешние эксперты Agentic AI → ускорение AI-трансформации",
  },
  vk: {
    id: "vk",
    org: "VK",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Team Intelligence Engine",
    scenarioNameRu: "Система интеллектуальной сборки команд",
    mainQuestion: "Как быстрее собирать команды для новых продуктов и инициатив?",
    hookQuestion: "Почему две одинаково талантливые команды делают продукты с разницей в полгода?",
    missionRu: "Объединять людей и сообщества через технологии, делая общение и жизнь в интернете лучше.",
    accentColor: "#0077FF",
    badgeLetter: "VK",
    hybridMessage: "Внутренние сотрудники VK + эксперты Точки Сборки → сокращение Time-to-Market",
  },
  rosatom: {
    id: "rosatom",
    org: "Росатом",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Critical Capability Platform",
    scenarioNameRu: "Платформа критической экспертизы",
    mainQuestion: "Хватит ли у организации критической экспертизы для реализации стратегических проектов России?",
    hookQuestion: "Через пять лет уйдут люди, которые знают то, чего никто больше не знает. Что вы будете делать сегодня?",
    missionRu: "Обеспечивать технологический суверенитет и лидерство России в атомной и смежных отраслях.",
    accentColor: "#6BC4E8",
    badgeLetter: "Р",
    hybridMessage: "Внутренние эксперты + внешний кадровый резерв → передача критической экспертизы",
  },
  yandex: {
    id: "yandex",
    org: "Яндекс",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Knowledge-to-Product Acceleration",
    scenarioNameRu: "Ускорение превращения знаний в продукты",
    mainQuestion: "Как сделать так, чтобы любая идея максимально быстро проходила путь от исследования до продукта?",
    hookQuestion: "Почему одна команда каждый раз начинает исследования заново — как будто до неё никто этого не делал?",
    missionRu: "Помогать людям решать задачи и достигать целей в жизни с помощью технологий.",
    accentColor: "#FFCC00",
    badgeLetter: "Я",
    hybridMessage: "Граф знаний + AI-оркестрация → быстрее от идеи к продукту",
  },
  future2035: {
    id: "future2035",
    org: "Организация 2035",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Universal Strategic Execution Model",
    scenarioNameRu: "Универсальная модель стратегической реализации",
    mainQuestion: "Как любая крупная организация связывает стратегию и людей — независимо от отрасли?",
    hookQuestion: "Как понять, где именно организация теряет скорость реализации стратегии — до того, как это станет кризисом на совете директоров?",
    missionRu: "Реализовывать стратегию так же естественно, как растёт живой организм — без разрыва между целями и людьми.",
    accentColor: "#C9B8FF",
    badgeLetter: "∞",
    hybridMessage: "Не кастомная демонстрация под заказчика — единая модель, применимая к любой организации",
  },
};

export const modeOrder: ModeId[] = ["sber", "vk", "rosatom", "yandex", "future2035"];

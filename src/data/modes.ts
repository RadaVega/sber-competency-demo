export type ModeId = "sber" | "vk" | "rosatom" | "yandex";

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
  accentColor: string;
  badgeLetter: string;
  // Tochka Sborki integration tagline per mode
  hybridMessage: string;
}

export const PLATFORM_NAME = "Capability Intelligence Platform";
export const PLATFORM_NAME_RU = "Платформа управления стратегическими компетенциями";
export const PLATFORM_TAGLINE = "Strategy → Capabilities → People → Teams → Results";
export const PLATFORM_TAGLINE_RU = "Стратегия → Компетенции → Люди → Команды → Результат";

export const modes: Record<ModeId, ModeConfig> = {
  sber: {
    id: "sber",
    org: "Сбер",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Workforce Intelligence Layer",
    scenarioNameRu: "Интеллектуальный слой управления персоналом",
    mainQuestion: "Есть ли у организации компетенции для масштабной AI-трансформации?",
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
    scenarioNameRu: "Платформа критических компетенций",
    mainQuestion: "Есть ли у организации компетенции для реализации стратегических проектов России?",
    accentColor: "#6BC4E8",
    badgeLetter: "Р",
    hybridMessage: "Внутренние эксперты + внешний кадровый резерв → передача критических компетенций",
  },
  yandex: {
    id: "yandex",
    org: "Яндекс",
    platformName: PLATFORM_NAME,
    platformNameRu: PLATFORM_NAME_RU,
    scenarioName: "Capability Acceleration Platform",
    scenarioNameRu: "Платформа ускоренного развития компетенций",
    mainQuestion: "Как быстрее запускать новые технологические направления?",
    accentColor: "#FFCC00",
    badgeLetter: "Я",
    hybridMessage: "Внутренняя мобильность + Точка Сборки → скорость развития компетенций",
  },
};

export const modeOrder: ModeId[] = ["sber", "vk", "rosatom", "yandex"];

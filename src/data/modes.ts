export type ModeId = "sber" | "vk" | "rosatom" | "yandex";

export interface ModeConfig {
  id: ModeId;
  org: string;
  platformName: string;
  platformNameRu: string;
  mainQuestion: string;
  accentColor: string; // brand thread color, used sparingly like Sber green
  badgeLetter: string;
}

export const modes: Record<ModeId, ModeConfig> = {
  sber: {
    id: "sber",
    org: "Сбер",
    platformName: "Workforce Intelligence Layer",
    platformNameRu: "Интеллектуальный слой управления персоналом",
    mainQuestion: "Есть ли у организации компетенции для AI-трансформации?",
    accentColor: "#21A038",
    badgeLetter: "С",
  },
  vk: {
    id: "vk",
    org: "VK",
    platformName: "Team Assembly Engine",
    platformNameRu: "Система сборки команд",
    mainQuestion: "Как быстрее запускать новые продукты и инициативы?",
    accentColor: "#0077FF",
    badgeLetter: "VK",
  },
  rosatom: {
    id: "rosatom",
    org: "Росатом",
    platformName: "Critical Capability Development Platform",
    platformNameRu: "Платформа развития критических компетенций",
    mainQuestion: "Какие компетенции необходимы для стратегических проектов страны?",
    accentColor: "#6BC4E8",
    badgeLetter: "Р",
  },
  yandex: {
    id: "yandex",
    org: "Яндекс",
    platformName: "Capability Acceleration Platform",
    platformNameRu: "Платформа ускоренного развития компетенций",
    mainQuestion: "Как быстрее создавать сильные продуктовые команды?",
    accentColor: "#FFCC00",
    badgeLetter: "Я",
  },
};

export const modeOrder: ModeId[] = ["sber", "vk", "rosatom", "yandex"];

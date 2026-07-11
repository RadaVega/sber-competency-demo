import { useState } from "react";

export const vkScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",        number: "00" },
  { id: "convergence",   label: "Two Realities",       labelRu: "Две реальности",               number: "01" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",     number: "02" },
  { id: "why",          label: "Why",          labelRu: "Почему",          number: "03" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",      number: "04" },
  { id: "team-build",   label: "Teams",        labelRu: "Сборка команд",   number: "05" },
  { id: "talent",       label: "Talent",       labelRu: "Эксперты",        number: "06" },
  { id: "simulator",    label: "Simulator",    labelRu: "Симулятор",       number: "07" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",      number: "08" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты", number: "09" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",        number: "10" },
  { id: "executive",    label: "Outcome",      labelRu: "Результат",       number: "11" },
  { id: "future",       label: "Future",       labelRu: "Будущее",         number: "12" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];
export function useVKScreenState() { return useState<VKScreenId>("problem"); }

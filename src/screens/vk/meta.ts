import { useState } from "react";

export const vkScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",        number: "00" },
  { id: "why",          label: "Why",          labelRu: "Почему",          number: "01" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",      number: "02" },
  { id: "team-build",   label: "Teams",        labelRu: "Сборка команд",   number: "03" },
  { id: "talent",       label: "Talent",       labelRu: "Эксперты",        number: "04" },
  { id: "simulator",    label: "Simulator",    labelRu: "Симулятор",       number: "05" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",      number: "06" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты", number: "07" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",        number: "08" },
  { id: "executive",    label: "Outcome",      labelRu: "Результат",       number: "09" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",     number: "10" },
  { id: "future",       label: "Future",       labelRu: "Будущее",         number: "11" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];
export function useVKScreenState() { return useState<VKScreenId>("problem"); }

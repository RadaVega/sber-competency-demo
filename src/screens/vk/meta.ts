import { useState } from "react";

export const vkScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",        number: "00" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",     number: "01" },
  { id: "why",          label: "Why",          labelRu: "Почему",          number: "02" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",      number: "03" },
  { id: "team-build",   label: "Teams",        labelRu: "Сборка команд",   number: "04" },
  { id: "talent",       label: "Talent",       labelRu: "Эксперты",        number: "05" },
  { id: "simulator",    label: "Simulator",    labelRu: "Симулятор",       number: "06" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",      number: "07" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты", number: "08" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",        number: "09" },
  { id: "executive",    label: "Outcome",      labelRu: "Результат",       number: "10" },
  { id: "future",       label: "Future",       labelRu: "Будущее",         number: "11" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];
export function useVKScreenState() { return useState<VKScreenId>("problem"); }

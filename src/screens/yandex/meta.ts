import { useState } from "react";

export const yandexScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",          number: "00" },
  { id: "convergence",   label: "Two Realities",       labelRu: "Две реальности",               number: "01" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",       number: "02" },
  { id: "why",          label: "Why",          labelRu: "Почему",            number: "03" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",        number: "04" },
  { id: "builder",      label: "Team Builder", labelRu: "Конструктор команд",number: "05" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",        number: "06" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты",   number: "07" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",          number: "08" },
  { id: "future",       label: "Future",       labelRu: "Будущее",           number: "09" },
] as const;

export type YandexScreenId = (typeof yandexScreens)[number]["id"];
export function useYandexScreenState() { return useState<YandexScreenId>("problem"); }

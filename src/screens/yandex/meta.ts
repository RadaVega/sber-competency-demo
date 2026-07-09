import { useState } from "react";

export const yandexScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",          number: "00" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",       number: "01" },
  { id: "why",          label: "Why",          labelRu: "Почему",            number: "02" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",        number: "03" },
  { id: "builder",      label: "Team Builder", labelRu: "Конструктор команд",number: "04" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",        number: "05" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты",   number: "06" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",          number: "07" },
  { id: "future",       label: "Future",       labelRu: "Будущее",           number: "08" },
] as const;

export type YandexScreenId = (typeof yandexScreens)[number]["id"];
export function useYandexScreenState() { return useState<YandexScreenId>("problem"); }

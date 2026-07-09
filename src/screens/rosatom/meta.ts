import { useState } from "react";

export const rosatomScreens = [
  { id: "problem",      label: "Problem",       labelRu: "Проблема",          number: "00" },
  { id: "architecture", label: "Architecture",  labelRu: "Архитектура",       number: "01" },
  { id: "why",          label: "Why",           labelRu: "Почему",            number: "02" },
  { id: "initiative",   label: "Initiative",    labelRu: "Инициатива",        number: "03" },
  { id: "map",          label: "Capability Map",labelRu: "Карта компетенций", number: "04" },
  { id: "experts",      label: "Expert Network",labelRu: "Сеть экспертов",    number: "05" },
  { id: "ecosystem",    label: "Ecosystem",     labelRu: "Экосистема",        number: "06" },
  { id: "external",     label: "External",      labelRu: "Внешние таланты",   number: "07" },
  { id: "pipeline",     label: "Pipeline",      labelRu: "Конвейер",          number: "08" },
  { id: "future",       label: "Future",        labelRu: "Будущее",           number: "09" },
] as const;

export type RosatomScreenId = (typeof rosatomScreens)[number]["id"];
export function useRosatomScreenState() { return useState<RosatomScreenId>("problem"); }

import { useState } from "react";

export const rosatomScreens = [
  { id: "problem",       label: "Problem",             labelRu: "Проблема",                     number: "00" },
  { id: "architecture",  label: "Architecture",        labelRu: "Архитектура",                  number: "01" },
  { id: "dashboard",     label: "Strategic Execution", labelRu: "Стратегическая реализация",    number: "02" },
  { id: "map",           label: "Capability Map",      labelRu: "Карта компетенций",            number: "03" },
  { id: "knowledgeRisk", label: "Knowledge Risk",      labelRu: "Риск потери знаний",           number: "04" },
  { id: "graph",         label: "Knowledge Graph",     labelRu: "Граф знаний",                  number: "05" },
  { id: "experts",       label: "Expert Network",      labelRu: "Сеть экспертов",               number: "06" },
  { id: "teamBuilder",   label: "Mission Team",        labelRu: "Формирование команды",         number: "07" },
  { id: "aiCenter",      label: "AI Center",           labelRu: "Центр AI-управления",          number: "08" },
  { id: "forecast",      label: "Forecast 2035",       labelRu: "Прогноз 2035",                 number: "09" },
  { id: "sovereignty",   label: "Sovereignty",         labelRu: "Технологический суверенитет",  number: "10" },
  { id: "future",        label: "Future",              labelRu: "Будущее",                      number: "11" },
] as const;

export type RosatomScreenId = (typeof rosatomScreens)[number]["id"];
export function useRosatomScreenState() { return useState<RosatomScreenId>("problem"); }

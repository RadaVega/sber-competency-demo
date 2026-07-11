import { useState } from "react";

export const sberScreens = [
  { id: "problem",       label: "Problem",      labelRu: "Проблема",         number: "00" },
  { id: "convergence",   label: "Two Realities",       labelRu: "Две реальности",               number: "01" },
  { id: "architecture",  label: "Architecture", labelRu: "Архитектура",      number: "02" },
  { id: "why",           label: "Why",          labelRu: "Почему",           number: "03" },
  { id: "initiative",    label: "Initiative",   labelRu: "Инициатива",       number: "04" },
  { id: "dashboard",     label: "Readiness",    labelRu: "Готовность",       number: "05" },
  { id: "employee",      label: "Employee",     labelRu: "Сотрудник",        number: "06" },
  { id: "mentor",        label: "Mentor",       labelRu: "Наставник",        number: "07" },
  { id: "plan",          label: "Plan",         labelRu: "План",             number: "08" },
  { id: "team",          label: "Team",         labelRu: "Команда",          number: "09" },
  { id: "ecosystem",     label: "Ecosystem",    labelRu: "Экосистема",       number: "10" },
  { id: "external",      label: "External",     labelRu: "Внешние таланты",  number: "11" },
  { id: "orchestration", label: "Orchestration",labelRu: "Оркестрация",      number: "12" },
  { id: "executive",     label: "Outcome",      labelRu: "Результат",        number: "13" },
  { id: "division",      label: "Divisions",    labelRu: "Подразделения",    number: "14" },
  { id: "future",        label: "Future",       labelRu: "Будущее",          number: "15" },
] as const;

export type SberScreenId = (typeof sberScreens)[number]["id"];
export function useSberScreenState() { return useState<SberScreenId>("problem"); }

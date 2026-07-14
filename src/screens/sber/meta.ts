import { useState } from "react";

export const sberScreens = [
  { id: "problem",       label: "Problem",      labelRu: "Проблема",         number: "00" },
  { id: "why",           label: "Why",          labelRu: "Почему",           number: "01" },
  { id: "initiative",    label: "Initiative",   labelRu: "Инициатива",       number: "02" },
  { id: "dashboard",     label: "Readiness",    labelRu: "Готовность",       number: "03" },
  { id: "employee",      label: "Employee",     labelRu: "Сотрудник",        number: "04" },
  { id: "mentor",        label: "Mentor",       labelRu: "Наставник",        number: "05" },
  { id: "plan",          label: "Plan",         labelRu: "План",             number: "06" },
  { id: "team",          label: "Team",         labelRu: "Команда",          number: "07" },
  { id: "ecosystem",     label: "Ecosystem",    labelRu: "Экосистема",       number: "08" },
  { id: "external",      label: "External",     labelRu: "Внешние таланты",  number: "09" },
  { id: "orchestration", label: "Orchestration",labelRu: "Оркестрация",      number: "10" },
  { id: "executive",     label: "Outcome",      labelRu: "Результат",        number: "11" },
  { id: "division",      label: "Divisions",    labelRu: "Подразделения",    number: "12" },
  { id: "architecture",  label: "Architecture", labelRu: "Архитектура",      number: "13" },
  { id: "future",        label: "Future",       labelRu: "Будущее",          number: "14" },
] as const;

export type SberScreenId = (typeof sberScreens)[number]["id"];
export function useSberScreenState() { return useState<SberScreenId>("problem"); }

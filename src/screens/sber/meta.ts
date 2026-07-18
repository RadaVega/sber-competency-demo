import { useState } from "react";

export const sberScreens = [
  { id: "problem",       label: "Problem",      labelRu: "Проблема",         number: "00" },
  { id: "memory",        label: "Organizational Memory", labelRu: "Организационная память", number: "01" },
  { id: "why",           label: "Why",          labelRu: "Почему",           number: "02" },
  { id: "initiative",    label: "Initiative",   labelRu: "Инициатива",       number: "03" },
  { id: "dashboard",     label: "Readiness",    labelRu: "Готовность",       number: "04" },
  { id: "employee",      label: "Employee",     labelRu: "Сотрудник",        number: "05" },
  { id: "mentor",        label: "Mentor",       labelRu: "Наставник",        number: "06" },
  { id: "plan",          label: "Plan",         labelRu: "План",             number: "07" },
  { id: "team",          label: "Team",         labelRu: "Команда",          number: "08" },
  { id: "ecosystem",     label: "Ecosystem",    labelRu: "Экосистема",       number: "09" },
  { id: "external",      label: "External",     labelRu: "Внешние таланты",  number: "10" },
  { id: "orchestration", label: "Orchestration",labelRu: "Оркестрация",      number: "11" },
  { id: "executive",     label: "Outcome",      labelRu: "Результат",        number: "12" },
  { id: "division",      label: "Divisions",    labelRu: "Подразделения",    number: "13" },
  { id: "architecture",  label: "Architecture", labelRu: "Архитектура",      number: "14" },
  { id: "future",        label: "Future",       labelRu: "Будущее",          number: "15" },
] as const;

export type SberScreenId = (typeof sberScreens)[number]["id"];
export function useSberScreenState() { return useState<SberScreenId>("problem"); }

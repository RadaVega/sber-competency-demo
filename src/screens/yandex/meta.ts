import { useState } from "react";

export const yandexScreens = [
  { id: "problem",        label: "Problem",              labelRu: "Проблема",                  number: "00" },
  { id: "architecture",   label: "Architecture",         labelRu: "Архитектура",               number: "01" },
  { id: "why",            label: "Why",                  labelRu: "Почему",                    number: "02" },
  { id: "initiative",     label: "New Opportunity",      labelRu: "Новая возможность",          number: "03" },
  { id: "knowledgeGraph", label: "Knowledge Graph",      labelRu: "Граф знаний",                number: "04" },
  { id: "opportunityMap", label: "Opportunity Map",      labelRu: "Карта возможностей",         number: "05" },
  { id: "builder",        label: "Team Formation",       labelRu: "Рождение команды",           number: "06" },
  { id: "compounding",    label: "Compounding Intelligence", labelRu: "Накопление интеллекта",  number: "07" },
  { id: "future",         label: "Future",               labelRu: "Будущее",                   number: "08" },
] as const;

export type YandexScreenId = (typeof yandexScreens)[number]["id"];
export function useYandexScreenState() { return useState<YandexScreenId>("problem"); }

import { useState } from "react";

// Deliberately the leanest of the five modes: this one exists to prove the
// concept generalizes, not to showcase bespoke screens. Every screen here
// is a shared component also used by at least one branded mode — nothing
// custom-built for "Организация 2035" specifically.
export const future2035Screens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",     number: "00" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",  number: "01" },
  { id: "why",          label: "Why",          labelRu: "Почему",       number: "02" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",   number: "03" },
  { id: "future",       label: "Future",       labelRu: "Будущее",      number: "04" },
] as const;

export type Future2035ScreenId = (typeof future2035Screens)[number]["id"];
export function useFuture2035ScreenState() { return useState<Future2035ScreenId>("problem"); }

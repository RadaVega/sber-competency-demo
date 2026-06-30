import { useState } from "react";
import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { EmployeeScreen } from "@/screens/EmployeeScreen";
import { MentorScreen } from "@/screens/MentorScreen";
import { PlanScreen } from "@/screens/PlanScreen";
import { TeamScreen } from "@/screens/TeamScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { OrchestrationScreen } from "@/screens/OrchestrationScreen";
import { ExecutiveScreen } from "@/screens/ExecutiveScreen";
import { DivisionReadinessScreen } from "@/screens/DivisionReadinessScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { modes } from "@/data/modes";

export const sberScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",         number: "00" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",      number: "01" },
  { id: "why",          label: "Why",          labelRu: "Почему",           number: "02" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",       number: "03" },
  { id: "dashboard",    label: "Readiness",    labelRu: "Готовность",       number: "04" },
  { id: "employee",     label: "Employee",     labelRu: "Сотрудник",        number: "05" },
  { id: "mentor",       label: "Mentor",       labelRu: "Наставник",        number: "06" },
  { id: "plan",         label: "Plan",         labelRu: "План",             number: "07" },
  { id: "team",         label: "Team",         labelRu: "Команда",          number: "08" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",       number: "09" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты",  number: "10" },
  { id: "orchestration",label: "Orchestration",labelRu: "Оркестрация",      number: "11" },
  { id: "executive",    label: "Outcome",      labelRu: "Результат",        number: "12" },
  { id: "division",     label: "Divisions",    labelRu: "Подразделения",    number: "13" },
  { id: "future",        label: "Future",       labelRu: "Будущее",          number: "14" },
] as const;

export type SberScreenId = (typeof sberScreens)[number]["id"];

export function SberApp({ active, onChangeScreen }: { active: SberScreenId; onChangeScreen: (id: SberScreenId) => void }) {
  const mode = modes.sber;
  const go   = onChangeScreen;
  return (
    <>
      {active === "problem"       && <ProblemScreen mode={mode} onNext={() => go("architecture")} />}
      {active === "architecture"  && <ArchitectureScreen mode={mode} onBack={() => go("problem")} onNext={() => go("why")} />}
      {active === "why"           && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
      {active === "initiative"    && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("dashboard")} />}
      {active === "dashboard"     && <DashboardScreen onAnalyze={() => go("employee")} />}
      {active === "employee"      && <EmployeeScreen onBack={() => go("dashboard")} onNext={() => go("mentor")} />}
      {active === "mentor"        && <MentorScreen onBack={() => go("employee")} onNext={() => go("plan")} />}
      {active === "plan"          && <PlanScreen onBack={() => go("mentor")} onNext={() => go("team")} />}
      {active === "team"          && <TeamScreen onBack={() => go("plan")} onNext={() => go("ecosystem")} />}
      {active === "ecosystem"     && <TalentEcosystemScreen mode={mode} onBack={() => go("team")} onNext={() => go("external")} />}
      {active === "external"      && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("orchestration")} />}
      {active === "orchestration" && <OrchestrationScreen onBack={() => go("external")} onNext={() => go("executive")} accentColor={mode.accentColor} />}
      {active === "executive"     && <ExecutiveScreen onBack={() => go("orchestration")} onNext={() => go("division")} />}
      {active === "division"      && <DivisionReadinessScreen onBack={() => go("executive")} />}
      {active === "future"         && <FutureScreen mode={mode} onBack={() => go("division")} onRestart={() => go("problem")} />}
    </>
  );
}

export function useSberScreenState() { return useState<SberScreenId>("problem"); }

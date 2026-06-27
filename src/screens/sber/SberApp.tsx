import { useState } from "react";
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
import { modes } from "@/data/modes";

export const sberScreens = [
  { id: "why",               label: "Why",          labelRu: "Почему",           number: "00" },
  { id: "initiative",        label: "Initiative",   labelRu: "Инициатива",       number: "01" },
  { id: "dashboard",         label: "Readiness",    labelRu: "Готовность",       number: "02" },
  { id: "employee",          label: "Employee",     labelRu: "Сотрудник",        number: "03" },
  { id: "mentor",            label: "Mentor",       labelRu: "Наставник",        number: "04" },
  { id: "plan",              label: "Plan",         labelRu: "План",             number: "05" },
  { id: "team",              label: "Team",         labelRu: "Команда",          number: "06" },
  { id: "ecosystem",         label: "Ecosystem",    labelRu: "Экосистема",       number: "07" },
  { id: "external",          label: "External",     labelRu: "Внешние таланты",  number: "08" },
  { id: "orchestration",     label: "Orchestration",labelRu: "Оркестрация",      number: "09" },
  { id: "executive",         label: "Outcome",      labelRu: "Результат",        number: "10" },
  { id: "division",          label: "Divisions",    labelRu: "Подразделения",    number: "11" },
] as const;

export type SberScreenId = (typeof sberScreens)[number]["id"];

export function SberApp({ active, onChangeScreen }: { active: SberScreenId; onChangeScreen: (id: SberScreenId) => void }) {
  const mode = modes.sber;
  const go   = onChangeScreen;
  return (
    <>
      {active === "why"           && <StrategicEcosystemScreen mode={mode} onBack={() => {}} onNext={() => go("initiative")} />}
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
    </>
  );
}

export function useSberScreenState() { return useState<SberScreenId>("why"); }

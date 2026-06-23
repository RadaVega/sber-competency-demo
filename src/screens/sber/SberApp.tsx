import { useState } from "react";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { EmployeeScreen } from "@/screens/EmployeeScreen";
import { MentorScreen } from "@/screens/MentorScreen";
import { PlanScreen } from "@/screens/PlanScreen";
import { TeamScreen } from "@/screens/TeamScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { OrchestrationScreen } from "@/screens/OrchestrationScreen";
import { ExecutiveScreen } from "@/screens/ExecutiveScreen";
import { DivisionReadinessScreen } from "@/screens/DivisionReadinessScreen";
import { modes } from "@/data/modes";

export const sberScreens = [
  { id: "dashboard",   label: "Readiness",    labelRu: "Готовность",       number: "01" },
  { id: "employee",    label: "Employee",     labelRu: "Сотрудник",        number: "02" },
  { id: "mentor",      label: "Mentor",       labelRu: "Наставник",        number: "03" },
  { id: "plan",        label: "Plan",         labelRu: "План",             number: "04" },
  { id: "team",        label: "Team",         labelRu: "Команда",          number: "05" },
  { id: "ecosystem",   label: "Ecosystem",    labelRu: "Экосистема",       number: "06" },
  { id: "external",    label: "External",     labelRu: "Внешние таланты",  number: "07" },
  { id: "pipeline",    label: "Pipeline",     labelRu: "Конвейер",         number: "08" },
  { id: "orchestration", label: "Orchestration", labelRu: "Оркестрация",  number: "09" },
  { id: "executive",   label: "Executive",    labelRu: "Рекомендация",     number: "10" },
  { id: "division",    label: "Divisions",    labelRu: "Подразделения",    number: "11" },
] as const;

export type SberScreenId = (typeof sberScreens)[number]["id"];

export function SberApp({
  active,
  onChangeScreen,
}: {
  active: SberScreenId;
  onChangeScreen: (id: SberScreenId) => void;
}) {
  const mode = modes.sber;
  return (
    <>
      {active === "dashboard"     && <DashboardScreen onAnalyze={() => onChangeScreen("employee")} />}
      {active === "employee"      && <EmployeeScreen onBack={() => onChangeScreen("dashboard")} onNext={() => onChangeScreen("mentor")} />}
      {active === "mentor"        && <MentorScreen onBack={() => onChangeScreen("employee")} onNext={() => onChangeScreen("plan")} />}
      {active === "plan"          && <PlanScreen onBack={() => onChangeScreen("mentor")} onNext={() => onChangeScreen("team")} />}
      {active === "team"          && <TeamScreen onBack={() => onChangeScreen("plan")} onNext={() => onChangeScreen("ecosystem")} />}
      {active === "ecosystem"     && <TalentEcosystemScreen mode={mode} onBack={() => onChangeScreen("team")} onNext={() => onChangeScreen("external")} />}
      {active === "external"      && <ExternalTalentDiscoveryScreen onBack={() => onChangeScreen("ecosystem")} onNext={() => onChangeScreen("pipeline")} />}
      {active === "pipeline"      && <TalentPipelineScreen mode={mode} onBack={() => onChangeScreen("external")} onNext={() => onChangeScreen("orchestration")} />}
      {active === "orchestration" && <OrchestrationScreen onBack={() => onChangeScreen("pipeline")} onNext={() => onChangeScreen("executive")} />}
      {active === "executive"     && <ExecutiveScreen onBack={() => onChangeScreen("orchestration")} onNext={() => onChangeScreen("division")} />}
      {active === "division"      && <DivisionReadinessScreen onBack={() => onChangeScreen("executive")} />}
    </>
  );
}

export function useSberScreenState() {
  return useState<SberScreenId>("dashboard");
}

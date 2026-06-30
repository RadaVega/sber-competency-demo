import { useState } from "react";
import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { VKInitiativeScreen } from "@/screens/vk/VKInitiativeScreen";
import { VKTalentDiscoveryScreen } from "@/screens/vk/VKTalentDiscoveryScreen";
import { VKSimulatorScreen } from "@/screens/vk/VKSimulatorScreen";
import { VKExecutiveScreen } from "@/screens/vk/VKExecutiveScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const vkScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",        number: "00" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",     number: "01" },
  { id: "why",          label: "Why",          labelRu: "Почему",          number: "02" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",      number: "03" },
  { id: "team-build",   label: "Teams",        labelRu: "Сборка команд",   number: "04" },
  { id: "talent",       label: "Talent",       labelRu: "Эксперты",        number: "05" },
  { id: "simulator",    label: "Simulator",    labelRu: "Симулятор",       number: "06" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",      number: "07" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты", number: "08" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",        number: "09" },
  { id: "executive",    label: "Outcome",      labelRu: "Результат",       number: "10" },
  { id: "future",       label: "Future",       labelRu: "Будущее",         number: "11" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];

export function VKApp({ active, onChangeScreen }: { active: VKScreenId; onChangeScreen: (id: VKScreenId) => void }) {
  const mode = modes.vk;
  const go   = onChangeScreen;
  return (
    <>
      {active === "problem"      && <ProblemScreen mode={mode} onNext={() => go("architecture")} />}
      {active === "architecture" && <ArchitectureScreen mode={mode} onBack={() => go("problem")} onNext={() => go("why")} />}
      {active === "why"          && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
      {active === "initiative"   && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("team-build")} />}
      {active === "team-build"   && <VKInitiativeScreen onNext={() => go("talent")} />}
      {active === "talent"       && <VKTalentDiscoveryScreen onBack={() => go("team-build")} onNext={() => go("simulator")} />}
      {active === "simulator"    && <VKSimulatorScreen onBack={() => go("talent")} onNext={() => go("ecosystem")} />}
      {active === "ecosystem"    && <TalentEcosystemScreen mode={mode} onBack={() => go("simulator")} onNext={() => go("external")} />}
      {active === "external"     && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("pipeline")} />}
      {active === "pipeline"     && <TalentPipelineScreen mode={mode} onBack={() => go("external")} onNext={() => go("executive")} />}
      {active === "executive"    && <VKExecutiveScreen onBack={() => go("pipeline")} />}
      {active === "future"       && <FutureScreen mode={mode} onBack={() => go("executive")} onRestart={() => go("problem")} />}
    </>
  );
}

export function useVKScreenState() { return useState<VKScreenId>("problem"); }

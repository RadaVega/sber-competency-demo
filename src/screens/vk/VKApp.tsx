import { useState } from "react";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { VKInitiativeScreen } from "@/screens/vk/VKInitiativeScreen";
import { VKTalentDiscoveryScreen } from "@/screens/vk/VKTalentDiscoveryScreen";
import { VKSimulatorScreen } from "@/screens/vk/VKSimulatorScreen";
import { VKExecutiveScreen } from "@/screens/vk/VKExecutiveScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const vkScreens = [
  { id: "ecosystem-concept", label: "Why",        labelRu: "Концепция",       number: "00" },
  { id: "initiative",        label: "Initiative", labelRu: "Инициатива",      number: "01" },
  { id: "talent",            label: "Talent",     labelRu: "Эксперты",        number: "02" },
  { id: "simulator",         label: "Simulator",  labelRu: "Симулятор",       number: "03" },
  { id: "ecosystem",         label: "Ecosystem",  labelRu: "Экосистема",      number: "04" },
  { id: "external",          label: "External",   labelRu: "Внешние таланты", number: "05" },
  { id: "pipeline",          label: "Pipeline",   labelRu: "Конвейер",        number: "06" },
  { id: "executive",         label: "Executive",  labelRu: "Рекомендация",    number: "07" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];

export function VKApp({ active, onChangeScreen }: { active: VKScreenId; onChangeScreen: (id: VKScreenId) => void }) {
  const mode = modes.vk;
  const go   = onChangeScreen;
  return (
    <>
      {active === "ecosystem-concept" && <StrategicEcosystemScreen mode={mode} onBack={() => {}} onNext={() => go("initiative")} />}
      {active === "initiative"        && <VKInitiativeScreen onNext={() => go("talent")} />}
      {active === "talent"            && <VKTalentDiscoveryScreen onBack={() => go("initiative")} onNext={() => go("simulator")} />}
      {active === "simulator"         && <VKSimulatorScreen onBack={() => go("talent")} onNext={() => go("ecosystem")} />}
      {active === "ecosystem"         && <TalentEcosystemScreen mode={mode} onBack={() => go("simulator")} onNext={() => go("external")} />}
      {active === "external"          && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("pipeline")} />}
      {active === "pipeline"          && <TalentPipelineScreen mode={mode} onBack={() => go("external")} onNext={() => go("executive")} />}
      {active === "executive"         && <VKExecutiveScreen onBack={() => go("pipeline")} />}
    </>
  );
}

export function useVKScreenState() { return useState<VKScreenId>("ecosystem-concept"); }

import { useState } from "react";
import { VKInitiativeScreen } from "@/screens/vk/VKInitiativeScreen";
import { VKTalentDiscoveryScreen } from "@/screens/vk/VKTalentDiscoveryScreen";
import { VKSimulatorScreen } from "@/screens/vk/VKSimulatorScreen";
import { VKExecutiveScreen } from "@/screens/vk/VKExecutiveScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const vkScreens = [
  { id: "initiative", label: "Initiative",  labelRu: "Инициатива",       number: "01" },
  { id: "talent",     label: "Talent",      labelRu: "Эксперты",         number: "02" },
  { id: "simulator",  label: "Simulator",   labelRu: "Симулятор",        number: "03" },
  { id: "ecosystem",  label: "Ecosystem",   labelRu: "Экосистема",       number: "04" },
  { id: "external",   label: "External",    labelRu: "Внешние таланты",  number: "05" },
  { id: "pipeline",   label: "Pipeline",    labelRu: "Конвейер",         number: "06" },
  { id: "executive",  label: "Executive",   labelRu: "Рекомендация",     number: "07" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];

export function VKApp({ active, onChangeScreen }: { active: VKScreenId; onChangeScreen: (id: VKScreenId) => void }) {
  const mode = modes.vk;
  return (
    <>
      {active === "initiative" && <VKInitiativeScreen onNext={() => onChangeScreen("talent")} />}
      {active === "talent"     && <VKTalentDiscoveryScreen onBack={() => onChangeScreen("initiative")} onNext={() => onChangeScreen("simulator")} />}
      {active === "simulator"  && <VKSimulatorScreen onBack={() => onChangeScreen("talent")} onNext={() => onChangeScreen("ecosystem")} />}
      {active === "ecosystem"  && <TalentEcosystemScreen mode={mode} onBack={() => onChangeScreen("simulator")} onNext={() => onChangeScreen("external")} />}
      {active === "external"   && <ExternalTalentDiscoveryScreen onBack={() => onChangeScreen("ecosystem")} onNext={() => onChangeScreen("pipeline")} />}
      {active === "pipeline"   && <TalentPipelineScreen mode={mode} onBack={() => onChangeScreen("external")} onNext={() => onChangeScreen("executive")} />}
      {active === "executive"  && <VKExecutiveScreen onBack={() => onChangeScreen("pipeline")} />}
    </>
  );
}

export function useVKScreenState() {
  return useState<VKScreenId>("initiative");
}

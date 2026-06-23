import { useState } from "react";
import { CapabilityMapScreen } from "@/screens/rosatom/CapabilityMapScreen";
import { ExpertNetworkScreen } from "@/screens/rosatom/ExpertNetworkScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const rosatomScreens = [
  { id: "map",       label: "Capability Map",  labelRu: "Карта компетенций",  number: "01" },
  { id: "experts",   label: "Expert Network",  labelRu: "Сеть экспертов",     number: "02" },
  { id: "ecosystem", label: "Ecosystem",       labelRu: "Экосистема",         number: "03" },
  { id: "external",  label: "External",        labelRu: "Внешние таланты",    number: "04" },
  { id: "pipeline",  label: "Pipeline",        labelRu: "Конвейер",           number: "05" },
] as const;

export type RosatomScreenId = (typeof rosatomScreens)[number]["id"];

export function RosatomApp({ active, onChangeScreen }: { active: RosatomScreenId; onChangeScreen: (id: RosatomScreenId) => void }) {
  const mode = modes.rosatom;
  return (
    <>
      {active === "map"       && <CapabilityMapScreen onNext={() => onChangeScreen("experts")} />}
      {active === "experts"   && <ExpertNetworkScreen onBack={() => onChangeScreen("map")} onNext={() => onChangeScreen("ecosystem")} />}
      {active === "ecosystem" && <TalentEcosystemScreen mode={mode} onBack={() => onChangeScreen("experts")} onNext={() => onChangeScreen("external")} />}
      {active === "external"  && <ExternalTalentDiscoveryScreen onBack={() => onChangeScreen("ecosystem")} onNext={() => onChangeScreen("pipeline")} />}
      {active === "pipeline"  && <TalentPipelineScreen mode={mode} onBack={() => onChangeScreen("external")} onNext={() => onChangeScreen("map")} />}
    </>
  );
}

export function useRosatomScreenState() {
  return useState<RosatomScreenId>("map");
}

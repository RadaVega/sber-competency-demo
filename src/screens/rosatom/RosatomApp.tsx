import { useState } from "react";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { CapabilityMapScreen } from "@/screens/rosatom/CapabilityMapScreen";
import { ExpertNetworkScreen } from "@/screens/rosatom/ExpertNetworkScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const rosatomScreens = [
  { id: "why",        label: "Why",           labelRu: "Почему",           number: "00" },
  { id: "initiative", label: "Initiative",    labelRu: "Инициатива",       number: "01" },
  { id: "map",        label: "Capability Map",labelRu: "Карта компетенций",number: "02" },
  { id: "experts",    label: "Expert Network",labelRu: "Сеть экспертов",   number: "03" },
  { id: "ecosystem",  label: "Ecosystem",     labelRu: "Экосистема",       number: "04" },
  { id: "external",   label: "External",      labelRu: "Внешние таланты",  number: "05" },
  { id: "pipeline",   label: "Pipeline",      labelRu: "Конвейер",         number: "06" },
] as const;

export type RosatomScreenId = (typeof rosatomScreens)[number]["id"];

export function RosatomApp({ active, onChangeScreen }: { active: RosatomScreenId; onChangeScreen: (id: RosatomScreenId) => void }) {
  const mode = modes.rosatom;
  const go   = onChangeScreen;
  return (
    <>
      {active === "why"        && <StrategicEcosystemScreen mode={mode} onBack={() => {}} onNext={() => go("initiative")} />}
      {active === "initiative" && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("map")} />}
      {active === "map"        && <CapabilityMapScreen onNext={() => go("experts")} />}
      {active === "experts"    && <ExpertNetworkScreen onBack={() => go("map")} onNext={() => go("ecosystem")} />}
      {active === "ecosystem"  && <TalentEcosystemScreen mode={mode} onBack={() => go("experts")} onNext={() => go("external")} />}
      {active === "external"   && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("pipeline")} />}
      {active === "pipeline"   && <TalentPipelineScreen mode={mode} onBack={() => go("external")} onNext={() => go("map")} />}
    </>
  );
}

export function useRosatomScreenState() { return useState<RosatomScreenId>("why"); }

import { useState } from "react";
import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { ProductTeamBuilderScreen } from "@/screens/yandex/ProductTeamBuilderScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const yandexScreens = [
  { id: "problem",      label: "Problem",      labelRu: "Проблема",          number: "00" },
  { id: "architecture", label: "Architecture", labelRu: "Архитектура",       number: "01" },
  { id: "why",          label: "Why",          labelRu: "Почему",            number: "02" },
  { id: "initiative",   label: "Initiative",   labelRu: "Инициатива",        number: "03" },
  { id: "builder",      label: "Team Builder", labelRu: "Конструктор команд",number: "04" },
  { id: "ecosystem",    label: "Ecosystem",    labelRu: "Экосистема",        number: "05" },
  { id: "external",     label: "External",     labelRu: "Внешние таланты",   number: "06" },
  { id: "pipeline",     label: "Pipeline",     labelRu: "Конвейер",          number: "07" },
] as const;

export type YandexScreenId = (typeof yandexScreens)[number]["id"];

export function YandexApp({ active, onChangeScreen }: { active: YandexScreenId; onChangeScreen: (id: YandexScreenId) => void }) {
  const mode = modes.yandex;
  const go   = onChangeScreen;
  return (
    <>
      {active === "problem"      && <ProblemScreen mode={mode} onNext={() => go("architecture")} />}
      {active === "architecture" && <ArchitectureScreen mode={mode} onBack={() => go("problem")} onNext={() => go("why")} />}
      {active === "why"          && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
      {active === "initiative"   && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("builder")} />}
      {active === "builder"      && <ProductTeamBuilderScreen onNext={() => go("ecosystem")} />}
      {active === "ecosystem"    && <TalentEcosystemScreen mode={mode} onBack={() => go("builder")} onNext={() => go("external")} />}
      {active === "external"     && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("pipeline")} />}
      {active === "pipeline"     && <TalentPipelineScreen mode={mode} onBack={() => go("external")} onNext={() => go("builder")} />}
    </>
  );
}

export function useYandexScreenState() { return useState<YandexScreenId>("problem"); }

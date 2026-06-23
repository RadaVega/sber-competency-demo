import { useState } from "react";
import { ProductTeamBuilderScreen } from "@/screens/yandex/ProductTeamBuilderScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { modes } from "@/data/modes";

export const yandexScreens = [
  { id: "builder",   label: "Team Builder", labelRu: "Конструктор команд", number: "01" },
  { id: "ecosystem", label: "Ecosystem",    labelRu: "Экосистема",         number: "02" },
  { id: "external",  label: "External",     labelRu: "Внешние таланты",    number: "03" },
  { id: "pipeline",  label: "Pipeline",     labelRu: "Конвейер",           number: "04" },
] as const;

export type YandexScreenId = (typeof yandexScreens)[number]["id"];

export function YandexApp({ active, onChangeScreen }: { active: YandexScreenId; onChangeScreen: (id: YandexScreenId) => void }) {
  const mode = modes.yandex;
  return (
    <>
      {active === "builder"   && <ProductTeamBuilderScreen onNext={() => onChangeScreen("ecosystem")} />}
      {active === "ecosystem" && <TalentEcosystemScreen mode={mode} onBack={() => onChangeScreen("builder")} onNext={() => onChangeScreen("external")} />}
      {active === "external"  && <ExternalTalentDiscoveryScreen onBack={() => onChangeScreen("ecosystem")} onNext={() => onChangeScreen("pipeline")} />}
      {active === "pipeline"  && <TalentPipelineScreen mode={mode} onBack={() => onChangeScreen("external")} onNext={() => onChangeScreen("builder")} />}
    </>
  );
}

export function useYandexScreenState() {
  return useState<YandexScreenId>("builder");
}

import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { RealityConvergenceScreen } from "@/screens/shared/RealityConvergenceScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { ProductTeamBuilderScreen } from "@/screens/yandex/ProductTeamBuilderScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { modes } from "@/data/modes";
import type { YandexScreenId } from "@/screens/yandex/meta";
export default function YandexApp({ active, onChangeScreen }: { active: YandexScreenId; onChangeScreen: (id: YandexScreenId) => void }) {
  const mode = modes.yandex; const go = onChangeScreen;
  return (<>
    {active === "problem"      && <ProblemScreen mode={mode} onNext={() => go("convergence")} />}
    {active === "convergence"  && <RealityConvergenceScreen mode={mode} onBack={() => go("problem")} onNext={() => go("architecture")} />}
    {active === "architecture" && <ArchitectureScreen mode={mode} onBack={() => go("convergence")} onNext={() => go("why")} />}
    {active === "why"          && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
    {active === "initiative"   && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("builder")} />}
    {active === "builder"      && <ProductTeamBuilderScreen onNext={() => go("ecosystem")} />}
    {active === "ecosystem"    && <TalentEcosystemScreen mode={mode} onBack={() => go("builder")} onNext={() => go("external")} />}
    {active === "external"     && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("pipeline")} />}
    {active === "pipeline"     && <TalentPipelineScreen mode={mode} onBack={() => go("external")} onNext={() => go("future")} />}
    {active === "future"       && <FutureScreen mode={mode} onBack={() => go("pipeline")} onRestart={() => go("problem")} />}
  </>);
}

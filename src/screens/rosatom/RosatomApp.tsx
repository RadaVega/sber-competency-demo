import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { CapabilityMapScreen } from "@/screens/rosatom/CapabilityMapScreen";
import { ExpertNetworkScreen } from "@/screens/rosatom/ExpertNetworkScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { modes } from "@/data/modes";
import type { RosatomScreenId } from "@/screens/rosatom/meta";
export default function RosatomApp({ active, onChangeScreen }: { active: RosatomScreenId; onChangeScreen: (id: RosatomScreenId) => void }) {
  const mode = modes.rosatom; const go = onChangeScreen;
  return (<>
    {active === "problem"      && <ProblemScreen mode={mode} onNext={() => go("architecture")} />}
    {active === "architecture" && <ArchitectureScreen mode={mode} onBack={() => go("problem")} onNext={() => go("why")} />}
    {active === "why"          && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
    {active === "initiative"   && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("map")} />}
    {active === "map"          && <CapabilityMapScreen onNext={() => go("experts")} />}
    {active === "experts"      && <ExpertNetworkScreen onBack={() => go("map")} onNext={() => go("ecosystem")} />}
    {active === "ecosystem"    && <TalentEcosystemScreen mode={mode} onBack={() => go("experts")} onNext={() => go("external")} />}
    {active === "external"     && <ExternalTalentDiscoveryScreen onBack={() => go("ecosystem")} onNext={() => go("pipeline")} />}
    {active === "pipeline"     && <TalentPipelineScreen mode={mode} onBack={() => go("external")} onNext={() => go("future")} />}
    {active === "future"       && <FutureScreen mode={mode} onBack={() => go("pipeline")} onRestart={() => go("problem")} />}
  </>);
}

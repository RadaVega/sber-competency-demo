import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { RealityConvergenceScreen } from "@/screens/shared/RealityConvergenceScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { VKInitiativeScreen } from "@/screens/vk/VKInitiativeScreen";
import { VKTalentDiscoveryScreen } from "@/screens/vk/VKTalentDiscoveryScreen";
import { VKSimulatorScreen } from "@/screens/vk/VKSimulatorScreen";
import { VKExecutiveScreen } from "@/screens/vk/VKExecutiveScreen";
import { TalentEcosystemScreen } from "@/screens/shared/TalentEcosystemScreen";
import { ExternalTalentDiscoveryScreen } from "@/screens/shared/ExternalTalentDiscoveryScreen";
import { TalentPipelineScreen } from "@/screens/shared/TalentPipelineScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { modes } from "@/data/modes";
import type { VKScreenId } from "@/screens/vk/meta";
export default function VKApp({ active, onChangeScreen }: { active: VKScreenId; onChangeScreen: (id: VKScreenId) => void }) {
  const mode = modes.vk; const go = onChangeScreen;
  return (<>
    {active === "problem"      && <ProblemScreen mode={mode} onNext={() => go("convergence")} />}
    {active === "convergence"  && <RealityConvergenceScreen mode={mode} onBack={() => go("problem")} onNext={() => go("architecture")} />}
    {active === "architecture" && <ArchitectureScreen mode={mode} onBack={() => go("convergence")} onNext={() => go("why")} />}
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
  </>);
}

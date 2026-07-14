import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { RosatomDashboardScreen } from "@/screens/rosatom/DashboardScreen";
import { CapabilityMapScreen } from "@/screens/rosatom/CapabilityMapScreen";
import { KnowledgeRiskScreen } from "@/screens/rosatom/KnowledgeRiskScreen";
import { KnowledgeGraphScreen } from "@/screens/rosatom/KnowledgeGraphScreen";
import { ExpertNetworkScreen } from "@/screens/rosatom/ExpertNetworkScreen";
import { TeamBuilderScreen } from "@/screens/rosatom/TeamBuilderScreen";
import { AICenterScreen } from "@/screens/rosatom/AICenterScreen";
import { ForecastScreen } from "@/screens/rosatom/ForecastScreen";
import { SovereigntyScreen } from "@/screens/rosatom/SovereigntyScreen";
import { modes } from "@/data/modes";
import type { RosatomScreenId } from "@/screens/rosatom/meta";

export default function RosatomApp({ active, onChangeScreen }: { active: RosatomScreenId; onChangeScreen: (id: RosatomScreenId) => void }) {
  const mode = modes.rosatom; const go = onChangeScreen;
  return (<>
    {active === "problem"       && <ProblemScreen mode={mode} onNext={() => go("why")} />}
    {active === "why"           && <StrategicEcosystemScreen mode={mode} onBack={() => go("problem")} onNext={() => go("dashboard")} />}
    {active === "dashboard"     && <RosatomDashboardScreen onNext={() => go("map")} />}
    {active === "map"           && <CapabilityMapScreen onBack={() => go("dashboard")} onNext={() => go("knowledgeRisk")} />}
    {active === "knowledgeRisk" && <KnowledgeRiskScreen onBack={() => go("map")} onNext={() => go("graph")} />}
    {active === "graph"         && <KnowledgeGraphScreen onBack={() => go("knowledgeRisk")} onNext={() => go("experts")} />}
    {active === "experts"       && <ExpertNetworkScreen onBack={() => go("graph")} onNext={() => go("teamBuilder")} />}
    {active === "teamBuilder"   && <TeamBuilderScreen onBack={() => go("experts")} onNext={() => go("aiCenter")} />}
    {active === "aiCenter"      && <AICenterScreen onBack={() => go("teamBuilder")} onNext={() => go("forecast")} />}
    {active === "forecast"      && <ForecastScreen onBack={() => go("aiCenter")} onNext={() => go("sovereignty")} />}
    {active === "sovereignty"   && <SovereigntyScreen onBack={() => go("forecast")} onNext={() => go("architecture")} />}
    {active === "architecture"  && <ArchitectureScreen mode={mode} onBack={() => go("sovereignty")} onNext={() => go("future")} />}
    {active === "future"        && <FutureScreen mode={mode} onBack={() => go("architecture")} onRestart={() => go("problem")} />}
  </>);
}

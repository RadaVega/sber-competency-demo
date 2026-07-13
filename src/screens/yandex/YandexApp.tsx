import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { KnowledgeGraphScreen } from "@/screens/yandex/KnowledgeGraphScreen";
import { OpportunityMapScreen } from "@/screens/yandex/OpportunityMapScreen";
import { ProductTeamBuilderScreen } from "@/screens/yandex/ProductTeamBuilderScreen";
import { CompoundingIntelligenceScreen } from "@/screens/yandex/CompoundingIntelligenceScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { modes } from "@/data/modes";
import type { YandexScreenId } from "@/screens/yandex/meta";

export default function YandexApp({ active, onChangeScreen }: { active: YandexScreenId; onChangeScreen: (id: YandexScreenId) => void }) {
  const mode = modes.yandex; const go = onChangeScreen;
  return (<>
    {active === "problem"        && <ProblemScreen mode={mode} onNext={() => go("architecture")} />}
    {active === "architecture"   && <ArchitectureScreen mode={mode} onBack={() => go("problem")} onNext={() => go("why")} />}
    {active === "why"            && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
    {active === "initiative"     && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("knowledgeGraph")} />}
    {active === "knowledgeGraph" && <KnowledgeGraphScreen onBack={() => go("initiative")} onNext={() => go("opportunityMap")} />}
    {active === "opportunityMap" && <OpportunityMapScreen onBack={() => go("knowledgeGraph")} onNext={() => go("builder")} />}
    {active === "builder"        && <ProductTeamBuilderScreen onNext={() => go("compounding")} />}
    {active === "compounding"    && <CompoundingIntelligenceScreen onBack={() => go("builder")} onNext={() => go("future")} />}
    {active === "future"         && <FutureScreen mode={mode} onBack={() => go("compounding")} onRestart={() => go("problem")} />}
  </>);
}

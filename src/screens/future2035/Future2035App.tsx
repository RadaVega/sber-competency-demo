import { ProblemScreen } from "@/screens/shared/ProblemScreen";
import { ArchitectureScreen } from "@/screens/shared/ArchitectureScreen";
import { StrategicEcosystemScreen } from "@/screens/shared/StrategicEcosystemScreen";
import { StrategicInitiativeScreen } from "@/screens/shared/StrategicInitiativeScreen";
import { FutureScreen } from "@/screens/shared/FutureScreen";
import { modes } from "@/data/modes";
import type { Future2035ScreenId } from "@/screens/future2035/meta";

export default function Future2035App({ active, onChangeScreen }: { active: Future2035ScreenId; onChangeScreen: (id: Future2035ScreenId) => void }) {
  const mode = modes.future2035; const go = onChangeScreen;
  return (<>
    {active === "problem"      && <ProblemScreen mode={mode} onNext={() => go("architecture")} />}
    {active === "architecture" && <ArchitectureScreen mode={mode} onBack={() => go("problem")} onNext={() => go("why")} />}
    {active === "why"          && <StrategicEcosystemScreen mode={mode} onBack={() => go("architecture")} onNext={() => go("initiative")} />}
    {active === "initiative"   && <StrategicInitiativeScreen mode={mode} onBack={() => go("why")} onNext={() => go("future")} />}
    {active === "future"       && <FutureScreen mode={mode} onBack={() => go("initiative")} onRestart={() => go("problem")} />}
  </>);
}

import { lazy, Suspense, useState } from "react";
import { Play, Clapperboard, RotateCcw } from "lucide-react";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { LiveModeToggle } from "@/components/LiveModeToggle";
import { ViewModeSwitcher } from "@/components/ViewModeSwitcher";
import { ExecutiveWalkthrough } from "@/components/ExecutiveWalkthrough";
import { modes, type ModeId } from "@/data/modes";
import { BRAND_RU } from "@/data/branding";
import { bi } from "@/lib/bi";
import { IntroScreen } from "@/screens/IntroScreen";
import { OpeningExperience } from "@/components/experience/OpeningExperience";

// Meta (screen lists + hooks) — tiny, always bundled
import { sberScreens, useSberScreenState } from "@/screens/sber/meta";
import { vkScreens, useVKScreenState } from "@/screens/vk/meta";
import { rosatomScreens, useRosatomScreenState } from "@/screens/rosatom/meta";
import { yandexScreens, useYandexScreenState } from "@/screens/yandex/meta";

// Mode apps — lazy-loaded, each in its own chunk
const SberApp    = lazy(() => import("@/screens/sber/SberApp"));
const VKApp      = lazy(() => import("@/screens/vk/VKApp"));
const RosatomApp = lazy(() => import("@/screens/rosatom/RosatomApp"));
const YandexApp  = lazy(() => import("@/screens/yandex/YandexApp"));

function ModeLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-pres-label text-(--color-ink-3) animate-pulse">Загрузка…</div>
    </div>
  );
}

function App() {
  const [mode, setMode]             = useState<ModeId>("sber");
  const [started, setStarted]       = useState(false);
  const [openingDone, setOpeningDone] = useState(false);
  const [walkthrough, setWalkthrough] = useState(false);

  const [sberScreen,    setSberScreen]    = useSberScreenState();
  const [vkScreen,      setVkScreen]      = useVKScreenState();
  const [rosatomScreen, setRosatomScreen] = useRosatomScreenState();
  const [yandexScreen,  setYandexScreen]  = useYandexScreenState();

  function changeMode(id: ModeId) {
    setMode(id); setWalkthrough(false);
    if (started) {
      if (id === "sber")    setSberScreen("problem");
      if (id === "vk")      setVkScreen("problem");
      if (id === "rosatom") setRosatomScreen("problem");
      if (id === "yandex")  setYandexScreen("problem");
    }
  }

  const navItems =
    mode === "sber" ? sberScreens : mode === "vk" ? vkScreens :
    mode === "rosatom" ? rosatomScreens : yandexScreens;

  const activeId =
    mode === "sber" ? sberScreen : mode === "vk" ? vkScreen :
    mode === "rosatom" ? rosatomScreen : yandexScreen;

  function nav(id: string) {
    if (!started) setStarted(true);
    setWalkthrough(false);
    if (mode === "sber")    setSberScreen(id as never);
    if (mode === "vk")      setVkScreen(id as never);
    if (mode === "rosatom") setRosatomScreen(id as never);
    if (mode === "yandex")  setYandexScreen(id as never);
  }

  function wtNav(id: string) {
    if (!started) setStarted(true);
    if (mode === "sber")    setSberScreen(id as never);
    if (mode === "vk")      setVkScreen(id as never);
    if (mode === "rosatom") setRosatomScreen(id as never);
    if (mode === "yandex")  setYandexScreen(id as never);
  }

  return (
    <>
      {!openingDone && <OpeningExperience onComplete={() => setOpeningDone(true)} />}
      <div className="min-h-screen bg-(--color-canvas)">
      <TopBar
        mode={mode} onModeChange={changeMode}
        navItems={navItems} activeId={started ? activeId : "intro"}
        onNav={nav} started={started}
        onHome={() => { setStarted(false); setWalkthrough(false); }}
        onWalkthrough={() => { setStarted(true); setWalkthrough(true); }}
        walkthroughActive={walkthrough}
        onReplayExperience={() => setOpeningDone(false)}
      />
      <main key={started ? `${mode}-${activeId}` : `${mode}-intro`} className="animate-screen-in">
        {!started && <IntroScreen mode={modes[mode]} onStart={() => setStarted(true)} />}
        {started && (
          <Suspense fallback={<ModeLoader />}>
            {mode === "sber"    && <SberApp    active={sberScreen}    onChangeScreen={setSberScreen} />}
            {mode === "vk"      && <VKApp      active={vkScreen}      onChangeScreen={setVkScreen} />}
            {mode === "rosatom" && <RosatomApp active={rosatomScreen} onChangeScreen={setRosatomScreen} />}
            {mode === "yandex"  && <YandexApp  active={yandexScreen}  onChangeScreen={setYandexScreen} />}
          </Suspense>
        )}
      </main>
      {walkthrough && (
        <ExecutiveWalkthrough companyMode={mode} onNavigate={wtNav} onClose={() => setWalkthrough(false)} />
      )}
    </div>
    </>
  );
}

function TopBar({ mode, onModeChange, navItems, activeId, onNav, started, onHome, onWalkthrough, walkthroughActive, onReplayExperience }: {
  mode: ModeId; onModeChange: (id: ModeId) => void;
  navItems: readonly { id: string; label: string; labelRu: string; number: string }[];
  activeId: string; onNav: (id: string) => void;
  started: boolean; onHome: () => void;
  onWalkthrough: () => void; walkthroughActive: boolean;
  onReplayExperience: () => void;
}) {
  const cfg = modes[mode];
  return (
    <header className="sticky top-0 z-20 border-b border-(--color-border-soft) glass-subtle">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <button onClick={onHome} className="flex items-center gap-4 min-w-0 text-left hover:opacity-80 transition-opacity">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-[13px]"
              style={{ background: cfg.accentColor, color: "#06091A", boxShadow: `0 0 16px ${cfg.accentColor}55` }}>
              {cfg.badgeLetter}
            </div>
            <div className="min-w-0 hidden sm:block">
              <div className="text-pres-base font-semibold text-(--color-ink-1) leading-tight truncate">{BRAND_RU}</div>
              <div className="text-pres-xs text-(--color-ink-3) font-mono mt-0.5 truncate">{cfg.org} · {cfg.scenarioNameRu}</div>
            </div>
          </button>
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            <button onClick={onReplayExperience}
              className="hidden sm:flex items-center justify-center h-9 w-9 rounded-xl transition-all glass-subtle text-(--color-ink-3) hover:text-(--color-ink-2)"
              title="Пережить интерактивный опыт заново, без перезагрузки страницы">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={onWalkthrough}
              className={`hidden sm:flex items-center gap-2 rounded-xl px-4 py-2 text-pres-sm font-mono transition-all ${walkthroughActive ? "glass border-(--color-signal)/30 text-(--color-signal)" : "glass-subtle text-(--color-ink-3) hover:text-(--color-ink-2)"}`}
              title="Автоматический показ демонстрации для руководителя">
              <Clapperboard className="h-4 w-4" /> Демонстрация
            </button>
            <ViewModeSwitcher />
            <LiveModeToggle />
            <ModeSwitcher active={mode} onChange={onModeChange} />
          </div>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          {!started ? (
            <div className="flex items-center gap-2 px-4 py-2 text-pres-sm font-mono text-(--color-signal)">
              <Play className="h-3.5 w-3.5" /> Вступление
            </div>
          ) : navItems.map(s => (
            <button key={s.id} onClick={() => onNav(s.id)}
              className={["px-4 py-2 rounded-xl text-pres-sm font-mono transition-all whitespace-nowrap shrink-0",
                activeId === s.id ? "bg-(--color-surface-raised) text-(--color-ink-1) shadow-sm"
                                  : "text-(--color-ink-3) hover:text-(--color-ink-2) hover:bg-(--color-surface)",
              ].join(" ")}
              title={bi(s.label, s.labelRu)}>
              <span className="text-(--color-signal) mr-1.5">{s.number}</span>{s.labelRu}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default App;

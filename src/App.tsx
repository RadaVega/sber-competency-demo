import { useState } from "react";
import { Play, Clapperboard } from "lucide-react";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { LiveModeToggle } from "@/components/LiveModeToggle";
import { ViewModeSwitcher } from "@/components/ViewModeSwitcher";
import { ExecutiveWalkthrough } from "@/components/ExecutiveWalkthrough";
import { modes, type ModeId, PLATFORM_NAME } from "@/data/modes";
import { bi } from "@/lib/bi";
import { IntroScreen } from "@/screens/IntroScreen";
import { SberApp, sberScreens, useSberScreenState } from "@/screens/sber/SberApp";
import { VKApp, vkScreens, useVKScreenState } from "@/screens/vk/VKApp";
import { RosatomApp, rosatomScreens, useRosatomScreenState } from "@/screens/rosatom/RosatomApp";
import { YandexApp, yandexScreens, useYandexScreenState } from "@/screens/yandex/YandexApp";

function App() {
  const [mode, setMode] = useState<ModeId>("sber");
  const [started, setStarted] = useState(false);
  const [walkthroughActive, setWalkthroughActive] = useState(false);

  const [sberScreen, setSberScreen] = useSberScreenState();
  const [vkScreen, setVkScreen] = useVKScreenState();
  const [rosatomScreen, setRosatomScreen] = useRosatomScreenState();
  const [yandexScreen, setYandexScreen] = useYandexScreenState();

  function handleModeChange(id: ModeId) {
    setMode(id);
    setWalkthroughActive(false);
    if (started) {
      if (id === "sber")    setSberScreen("why");
      if (id === "vk")      setVkScreen("why");
      if (id === "rosatom") setRosatomScreen("why");
      if (id === "yandex")  setYandexScreen("why");
    }
  }

  const navItems =
    mode === "sber"    ? sberScreens    :
    mode === "vk"      ? vkScreens      :
    mode === "rosatom" ? rosatomScreens :
    yandexScreens;

  const activeScreenId =
    mode === "sber"    ? sberScreen    :
    mode === "vk"      ? vkScreen      :
    mode === "rosatom" ? rosatomScreen :
    yandexScreen;

  function handleNavClick(id: string) {
    if (!started) setStarted(true);
    setWalkthroughActive(false);
    if (mode === "sber")    setSberScreen(id as never);
    if (mode === "vk")      setVkScreen(id as never);
    if (mode === "rosatom") setRosatomScreen(id as never);
    if (mode === "yandex")  setYandexScreen(id as never);
  }

  function handleWalkthroughNavigate(screenId: string) {
    if (!started) setStarted(true);
    if (mode === "sber")    setSberScreen(screenId as never);
    if (mode === "vk")      setVkScreen(screenId as never);
    if (mode === "rosatom") setRosatomScreen(screenId as never);
    if (mode === "yandex")  setYandexScreen(screenId as never);
  }

  function startWalkthrough() {
    setStarted(true);
    setWalkthroughActive(true);
  }

  return (
    <div className="min-h-screen bg-(--color-canvas)">
      <TopBar
        mode={mode}
        onModeChange={handleModeChange}
        navItems={navItems}
        activeScreenId={started ? activeScreenId : "intro"}
        onNavClick={handleNavClick}
        started={started}
        onReturnToIntro={() => { setStarted(false); setWalkthroughActive(false); }}
        onStartWalkthrough={startWalkthrough}
        walkthroughActive={walkthroughActive}
      />

      <main key={started ? `${mode}-${activeScreenId}` : `${mode}-intro`} className="animate-screen-in">
        {!started && <IntroScreen mode={modes[mode]} onStart={() => setStarted(true)} />}
        {started && mode === "sber"    && <SberApp    active={sberScreen}    onChangeScreen={setSberScreen} />}
        {started && mode === "vk"      && <VKApp      active={vkScreen}      onChangeScreen={setVkScreen} />}
        {started && mode === "rosatom" && <RosatomApp active={rosatomScreen} onChangeScreen={setRosatomScreen} />}
        {started && mode === "yandex"  && <YandexApp  active={yandexScreen}  onChangeScreen={setYandexScreen} />}
      </main>

      {walkthroughActive && (
        <ExecutiveWalkthrough
          companyMode={mode}
          onNavigate={handleWalkthroughNavigate}
          onClose={() => setWalkthroughActive(false)}
        />
      )}
    </div>
  );
}

function TopBar({
  mode, onModeChange, navItems, activeScreenId,
  onNavClick, started, onReturnToIntro, onStartWalkthrough, walkthroughActive,
}: {
  mode: ModeId;
  onModeChange: (id: ModeId) => void;
  navItems: readonly { id: string; label: string; labelRu: string; number: string }[];
  activeScreenId: string;
  onNavClick: (id: string) => void;
  started: boolean;
  onReturnToIntro: () => void;
  onStartWalkthrough: () => void;
  walkthroughActive: boolean;
}) {
  const config = modes[mode];

  return (
    <header className="sticky top-0 z-20 border-b border-(--color-border-soft) glass-subtle">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-3 sm:py-4 flex flex-col gap-3">

        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          <button onClick={onReturnToIntro} className="flex items-center gap-3 min-w-0 text-left hover:opacity-80 transition-opacity">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-[11px]"
              style={{ background: config.accentColor, color: "#06091A", boxShadow: `0 0 12px ${config.accentColor}44` }}
            >
              {config.badgeLetter}
            </div>
            <div className="min-w-0 hidden sm:block">
              <div className="text-[13px] font-semibold text-(--color-ink-1) leading-tight truncate">{PLATFORM_NAME}</div>
              <div className="text-[11px] text-(--color-ink-3) font-mono leading-tight mt-0.5 truncate">{config.org} · {config.scenarioName}</div>
            </div>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {/* Executive Walkthrough button */}
            <button
              onClick={onStartWalkthrough}
              className={`hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11.5px] font-mono transition-all ${
                walkthroughActive
                  ? "text-(--color-signal) glass border-(--color-signal)/30"
                  : "glass-subtle text-(--color-ink-3) hover:text-(--color-ink-2)"
              }`}
              title="Auto-play executive demo (3-5 min)"
            >
              <Clapperboard className="h-3.5 w-3.5" />
              Walkthrough
            </button>
            <ViewModeSwitcher />
            <LiveModeToggle />
            <ModeSwitcher active={mode} onChange={onModeChange} />
          </div>
        </div>

        {/* Nav row */}
        <div className="flex items-center gap-1 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {!started ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-(--color-signal)">
              <Play className="h-3 w-3" /> Intro
            </div>
          ) : (
            navItems.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavClick(s.id)}
                className={[
                  "px-3 py-1.5 rounded-lg text-[12px] font-mono transition-all whitespace-nowrap shrink-0",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-signal)",
                  activeScreenId === s.id
                    ? "bg-(--color-surface-raised) text-(--color-ink-1) shadow-sm"
                    : "text-(--color-ink-3) hover:text-(--color-ink-2) hover:bg-(--color-surface)",
                ].join(" ")}
                title={bi(s.label, s.labelRu)}
              >
                <span className="text-(--color-signal) mr-1">{s.number}</span>
                {s.label}
              </button>
            ))
          )}
        </div>
      </div>
    </header>
  );
}

export default App;

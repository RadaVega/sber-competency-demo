import { useState } from "react";
import { Play } from "lucide-react";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { LiveModeToggle } from "@/components/LiveModeToggle";
import { ViewModeSwitcher } from "@/components/ViewModeSwitcher";
import { modes, type ModeId, PLATFORM_NAME } from "@/data/modes";
import { bi } from "@/lib/bi";
import { IntroScreen } from "@/screens/IntroScreen";
import { SberApp, sberScreens, useSberScreenState } from "@/screens/sber/SberApp";
import { VKApp, vkScreens, useVKScreenState } from "@/screens/vk/VKApp";
import {
  RosatomApp,
  rosatomScreens,
  useRosatomScreenState,
} from "@/screens/rosatom/RosatomApp";
import { YandexApp, yandexScreens, useYandexScreenState } from "@/screens/yandex/YandexApp";

function App() {
  const [mode, setMode] = useState<ModeId>("sber");
  const [started, setStarted] = useState(false);

  const [sberScreen, setSberScreen] = useSberScreenState();
  const [vkScreen, setVkScreen] = useVKScreenState();
  const [rosatomScreen, setRosatomScreen] = useRosatomScreenState();
  const [yandexScreen, setYandexScreen] = useYandexScreenState();

  // When the mode is switched from the intro screen, stay on intro.
  // When switched mid-demo, jump to that mode's first screen.
  function handleModeChange(id: ModeId) {
    setMode(id);
    if (started) {
      if (id === "sber") setSberScreen("dashboard");
      if (id === "vk") setVkScreen("initiative");
      if (id === "rosatom") setRosatomScreen("map");
      if (id === "yandex") setYandexScreen("builder");
    }
  }

  const navItems =
    mode === "sber"
      ? sberScreens
      : mode === "vk"
      ? vkScreens
      : mode === "rosatom"
      ? rosatomScreens
      : yandexScreens;

  const activeScreenId =
    mode === "sber"
      ? sberScreen
      : mode === "vk"
      ? vkScreen
      : mode === "rosatom"
      ? rosatomScreen
      : yandexScreen;

  function handleNavClick(id: string) {
    if (!started) setStarted(true);
    if (mode === "sber") setSberScreen(id as never);
    if (mode === "vk") setVkScreen(id as never);
    if (mode === "rosatom") setRosatomScreen(id as never);
    if (mode === "yandex") setYandexScreen(id as never);
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
        onReturnToIntro={() => setStarted(false)}
      />
      <main key={started ? `${mode}-${activeScreenId}` : `${mode}-intro`} className="animate-screen-in">
        {!started && (
          <IntroScreen mode={modes[mode]} onStart={() => setStarted(true)} />
        )}
        {started && mode === "sber" && (
          <SberApp active={sberScreen} onChangeScreen={setSberScreen} />
        )}
        {started && mode === "vk" && (
          <VKApp active={vkScreen} onChangeScreen={setVkScreen} />
        )}
        {started && mode === "rosatom" && (
          <RosatomApp active={rosatomScreen} onChangeScreen={setRosatomScreen} />
        )}
        {started && mode === "yandex" && (
          <YandexApp active={yandexScreen} onChangeScreen={setYandexScreen} />
        )}
      </main>
    </div>
  );
}

function TopBar({
  mode,
  onModeChange,
  navItems,
  activeScreenId,
  onNavClick,
  started,
  onReturnToIntro,
}: {
  mode: ModeId;
  onModeChange: (id: ModeId) => void;
  navItems: readonly { id: string; label: string; labelRu: string; number: string }[];
  activeScreenId: string;
  onNavClick: (id: string) => void;
  started: boolean;
  onReturnToIntro: () => void;
}) {
  const config = modes[mode];

  return (
    <header className="sticky top-0 z-20 border-b border-(--color-border-soft) glass-subtle">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-3 sm:py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-3 min-w-0 text-left hover:opacity-80 transition-opacity"
          >
            <div
              className="h-7 w-7 rounded-[6px] flex items-center justify-center shrink-0"
              style={{ background: config.accentColor }}
            >
              <span className="text-[11px] font-bold text-(--color-canvas)">
                {config.badgeLetter}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-(--color-ink-1) leading-tight truncate">
                {PLATFORM_NAME}
              </div>
              <div className="text-[11px] text-(--color-ink-3) font-mono leading-tight mt-0.5 truncate">
                {config.org} · {config.scenarioName}
              </div>
            </div>
          </button>

          <ViewModeSwitcher />
          <LiveModeToggle />
          <div className="shrink-0">
            <ModeSwitcher active={mode} onChange={onModeChange} />
          </div>
        </div>

        {/* Nav row: show intro pill when on intro, screen buttons when in demo */}
        <div className="flex items-center gap-1 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {!started ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono text-(--color-signal)">
              <Play className="h-3 w-3" />
              Intro
            </div>
          ) : (
            navItems.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavClick(s.id)}
                className={[
                  "px-3 py-1.5 rounded-md text-[12px] font-mono transition-colors whitespace-nowrap shrink-0",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-signal) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-canvas)",
                  activeScreenId === s.id
                    ? "bg-(--color-surface-raised) text-(--color-ink-1)"
                    : "text-(--color-ink-2) hover:text-(--color-ink-1) hover:bg-(--color-surface)",
                ].join(" ")}
                title={bi(s.label, s.labelRu)}
              >
                <span className="text-(--color-signal) mr-1.5">{s.number}</span>
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

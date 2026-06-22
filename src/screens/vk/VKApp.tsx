import { useState } from "react";
import { VKInitiativeScreen } from "@/screens/vk/VKInitiativeScreen";
import { VKTalentDiscoveryScreen } from "@/screens/vk/VKTalentDiscoveryScreen";
import { VKSimulatorScreen } from "@/screens/vk/VKSimulatorScreen";
import { VKExecutiveScreen } from "@/screens/vk/VKExecutiveScreen";

export const vkScreens = [
  { id: "initiative", label: "Initiative", labelRu: "Инициатива", number: "01" },
  { id: "talent", label: "Talent", labelRu: "Эксперты", number: "02" },
  { id: "simulator", label: "Simulator", labelRu: "Симулятор", number: "03" },
  { id: "executive", label: "Executive", labelRu: "Рекомендация", number: "04" },
] as const;

export type VKScreenId = (typeof vkScreens)[number]["id"];

export function VKApp({
  active,
  onChangeScreen,
}: {
  active: VKScreenId;
  onChangeScreen: (id: VKScreenId) => void;
}) {
  return (
    <>
      {active === "initiative" && (
        <VKInitiativeScreen onNext={() => onChangeScreen("talent")} />
      )}
      {active === "talent" && (
        <VKTalentDiscoveryScreen
          onBack={() => onChangeScreen("initiative")}
          onNext={() => onChangeScreen("simulator")}
        />
      )}
      {active === "simulator" && (
        <VKSimulatorScreen
          onBack={() => onChangeScreen("talent")}
          onNext={() => onChangeScreen("executive")}
        />
      )}
      {active === "executive" && (
        <VKExecutiveScreen onBack={() => onChangeScreen("simulator")} />
      )}
    </>
  );
}

export function useVKScreenState() {
  return useState<VKScreenId>("initiative");
}

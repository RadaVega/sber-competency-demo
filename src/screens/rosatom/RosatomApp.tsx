import { useState } from "react";
import { CapabilityMapScreen } from "@/screens/rosatom/CapabilityMapScreen";
import { ExpertNetworkScreen } from "@/screens/rosatom/ExpertNetworkScreen";

export const rosatomScreens = [
  { id: "map", label: "Capability Map", labelRu: "Карта компетенций", number: "01" },
  { id: "experts", label: "Expert Network", labelRu: "Сеть экспертов", number: "02" },
] as const;

export type RosatomScreenId = (typeof rosatomScreens)[number]["id"];

export function RosatomApp({
  active,
  onChangeScreen,
}: {
  active: RosatomScreenId;
  onChangeScreen: (id: RosatomScreenId) => void;
}) {
  return (
    <>
      {active === "map" && (
        <CapabilityMapScreen onNext={() => onChangeScreen("experts")} />
      )}
      {active === "experts" && (
        <ExpertNetworkScreen onBack={() => onChangeScreen("map")} />
      )}
    </>
  );
}

export function useRosatomScreenState() {
  return useState<RosatomScreenId>("map");
}

import { ProductTeamBuilderScreen } from "@/screens/yandex/ProductTeamBuilderScreen";

export const yandexScreens = [
  { id: "builder", label: "Team Builder", labelRu: "Конструктор команд", number: "01" },
] as const;

export type YandexScreenId = (typeof yandexScreens)[number]["id"];

export function YandexApp() {
  return <ProductTeamBuilderScreen />;
}

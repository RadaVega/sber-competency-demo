export interface NationalCapability {
  name: string;
  project: string;
  maturity: number; // 0-100
  risk: "low" | "medium" | "high";
  gapSummary: string;
}

export const strategicProjects = [
  "Северный морской путь",
  "Композитные материалы",
  "Новые энергетические системы",
  "Литиевые технологии",
  "Роботизация промышленности",
  "Космические проекты",
];

export const nationalCapabilities: NationalCapability[] = [
  {
    name: "Ледокольная навигация и логистика",
    project: "Северный морской путь",
    maturity: 71,
    risk: "low",
    gapSummary: "Требуется расширение экспертизы в автономной навигации.",
  },
  {
    name: "Композитные материалы для экстремальных условий",
    project: "Композитные материалы",
    maturity: 54,
    risk: "medium",
    gapSummary: "Дефицит специалистов по высокотемпературным композитам.",
  },
  {
    name: "Малые модульные реакторы",
    project: "Новые энергетические системы",
    maturity: 48,
    risk: "high",
    gapSummary: "Критический дефицит инженеров-проектировщиков SMR.",
  },
  {
    name: "Извлечение и переработка лития",
    project: "Литиевые технологии",
    maturity: 33,
    risk: "high",
    gapSummary: "Технология в ранней стадии — почти нет внутренней экспертизы.",
  },
  {
    name: "Промышленная робототехника",
    project: "Роботизация промышленности",
    maturity: 62,
    risk: "medium",
    gapSummary: "Нехватка специалистов по интеграции робототехники и AI.",
  },
  {
    name: "Космическое приборостроение",
    project: "Космические проекты",
    maturity: 58,
    risk: "medium",
    gapSummary: "Требуется развитие компетенций в радиационно-стойкой электронике.",
  },
];

export interface RosatomExpert {
  name: string;
  expertise: string;
  project: string;
  role: "expert" | "mentor";
}

export const rosatomExperts: RosatomExpert[] = [
  { name: "Виктор Орловский", expertise: "Автономная навигация", project: "Северный морской путь", role: "expert" },
  { name: "Светлана Кравцова", expertise: "Высокотемпературные композиты", project: "Композитные материалы", role: "mentor" },
  { name: "Андрей Зимин", expertise: "Проектирование SMR", project: "Новые энергетические системы", role: "expert" },
  { name: "Олег Денисов", expertise: "Литиевая металлургия", project: "Литиевые технологии", role: "expert" },
  { name: "Татьяна Воронцова", expertise: "AI-интеграция в робототехнику", project: "Роботизация промышленности", role: "mentor" },
  { name: "Михаил Грачёв", expertise: "Радиационно-стойкая электроника", project: "Космические проекты", role: "expert" },
];

export interface NationalCapability {
  name: string;
  project: string;
  maturity: number;
  risk: "low" | "medium" | "high";
  gapSummary: string;
  opportunityNote: string;
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
  { name: "Ледокольная навигация и логистика", project: "Северный морской путь", maturity: 71, risk: "low", gapSummary: "Требуется расширение экспертизы в автономной навигации.", opportunityNote: "Направление зрелое и стабильное — хорошая база для входа, но конкуренция за роли выше." },
  { name: "Композитные материалы для экстремальных условий", project: "Композитные материалы", maturity: 54, risk: "medium", gapSummary: "Дефицит специалистов по высокотемпературным композитам.", opportunityNote: "Умеренный дефицит — реальный шанс закрепиться как один из немногих специалистов." },
  { name: "Малые модульные реакторы", project: "Новые энергетические системы", maturity: 48, risk: "high", gapSummary: "Критический дефицит инженеров-проектировщиков SMR.", opportunityNote: "Один из самых востребованных профилей в отрасли прямо сейчас — вход почти без очереди." },
  { name: "Извлечение и переработка лития", project: "Литиевые технологии", maturity: 33, risk: "high", gapSummary: "Технология в ранней стадии — почти нет внутренней экспертизы.", opportunityNote: "Ранняя стадия направления — шанс стать одним из первых экспертов компании в этой области." },
  { name: "Промышленная робототехника", project: "Роботизация промышленности", maturity: 62, risk: "medium", gapSummary: "Нехватка специалистов по интеграции робототехники и AI.", opportunityNote: "Растущее направление на стыке робототехники и AI — редкое сочетание навыков ценится высоко." },
  { name: "Космическое приборостроение", project: "Космические проекты", maturity: 58, risk: "medium", gapSummary: "Требуется развитие компетенций в радиационно-стойкой электронике.", opportunityNote: "Узкая ниша с малой конкуренцией — специалистов по радстойкой электронике почти нет." },
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

export interface StrategicProgram {
  name: string;
  direction: string;
  progress: number;
  risk: "low" | "medium" | "high";
  criticalCompetencies: string[];
  staffingGap: number;
}

export const strategicPrograms: StrategicProgram[] = [
  { name: "Строительство нового энергоблока", direction: "Новые энергетические системы", progress: 62, risk: "medium", criticalCompetencies: ["Проектирование SMR", "Системы безопасности"], staffingGap: 14 },
  { name: "Цифровой инжиниринг АЭС", direction: "Цифровой инжиниринг", progress: 47, risk: "high", criticalCompetencies: ["Цифровые двойники", "Предиктивная аналитика"], staffingGap: 21 },
  { name: "Ядерная медицина", direction: "Ядерная медицина", progress: 55, risk: "medium", criticalCompetencies: ["Радиофармацевтика", "Материаловедение"], staffingGap: 9 },
  { name: "Северный морской путь", direction: "Логистика и навигация", progress: 71, risk: "low", criticalCompetencies: ["Автономная навигация", "Ледокольная логистика"], staffingGap: 4 },
  { name: "Аддитивные технологии", direction: "Новые материалы", progress: 39, risk: "high", criticalCompetencies: ["Порошковая металлургия", "3D-печать металлом"], staffingGap: 17 },
];

export const dashboardSummary = {
  programsInProgress: strategicPrograms.length,
  atRiskPrograms: strategicPrograms.filter((p) => p.risk === "high").length,
  avgProgress: Math.round(strategicPrograms.reduce((s, p) => s + p.progress, 0) / strategicPrograms.length),
  totalStaffingGap: strategicPrograms.reduce((s, p) => s + p.staffingGap, 0),
  criticalCompetenciesAtRisk: 6,
};

export const dashboardAIRecommendations = [
  "Усилить «Цифровой инжиниринг АЭС» тремя внутренними экспертами по цифровым двойникам — риск снижается с высокого до среднего.",
  "Начать подготовку резерва по порошковой металлургии уже сейчас — дефицит проявится через 8–10 месяцев.",
  "Перевести двух наставников из «Северного морского пути» в «Ядерную медицину» — там выше срочность.",
];

export interface HeatMapDomain {
  name: string;
  level: number;
  risk: "low" | "medium" | "high";
  explanation: string;
  opportunity: string;
}

export const heatMapDomains: HeatMapDomain[] = [
  { name: "Реакторные технологии", level: 10, risk: "low", explanation: "Базовая компетенция отрасли — глубокий внутренний опыт, риск минимален.", opportunity: "Направление насыщено экспертами — стабильный путь, но пробиться в число ведущих сложнее." },
  { name: "Цифровой инжиниринг", level: 7, risk: "medium", explanation: "Растущий спрос со стороны программ цифровых двойников опережает темп подготовки инженеров.", opportunity: "Спрос растёт быстрее подготовки кадров — хороший момент, чтобы войти в направление." },
  { name: "Материаловедение", level: 8, risk: "low", explanation: "Устойчивая экспертная база, но требует обновления под новые сплавы и композиты.", opportunity: "Стабильная база, но новые сплавы и композиты открывают свежие ниши для роста." },
  { name: "Системы безопасности", level: 9, risk: "low", explanation: "Критическая компетенция с непрерывным потоком подготовки специалистов.", opportunity: "Постоянный поток подготовки — предсказуемый, но конкурентный путь развития." },
  { name: "AI для инженерии", level: 4, risk: "high", explanation: "Новое направление — практически нет внутренней экспертизы, специалисты нужны немедленно.", opportunity: "Почти нет внутренних экспертов — редкий шанс стать одним из первых в новом направлении." },
];

export interface KnowledgeRiskArea {
  competency: string;
  uniqueExperts: number;
  avgAge: number;
  replaceability: "низкая" | "средняя" | "высокая";
  lossProbability: number;
}

export const knowledgeRiskAreas: KnowledgeRiskArea[] = [
  { competency: "Проектирование SMR", uniqueExperts: 6, avgAge: 58, replaceability: "низкая", lossProbability: 78 },
  { competency: "Литиевая металлургия", uniqueExperts: 3, avgAge: 61, replaceability: "низкая", lossProbability: 84 },
  { competency: "Радиационно-стойкая электроника", uniqueExperts: 5, avgAge: 54, replaceability: "средняя", lossProbability: 52 },
  { competency: "Автономная навигация", uniqueExperts: 9, avgAge: 47, replaceability: "высокая", lossProbability: 21 },
  { competency: "Высокотемпературные композиты", uniqueExperts: 4, avgAge: 56, replaceability: "средняя", lossProbability: 61 },
];

export const knowledgeRiskAIRecommendations = [
  { action: "Назначить наставником", detail: "Олег Денисов (литиевая металлургия) — единственный носитель технологии, требуется передача знаний в течение 12 месяцев." },
  { action: "Оцифровать знания", detail: "Методики проектирования SMR — зафиксировать в базе инженерных знаний до выхода ключевых специалистов на пенсию." },
  { action: "Подготовить резерв", detail: "3 инженера по радиационно-стойкой электронике — текущий состав стареет быстрее темпа замещения." },
  { action: "Наивысший риск", detail: "Литиевые технологии — 84% вероятность потери критических знаний в течение 5 лет без вмешательства." },
];

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: "expert" | "competency" | "project" | "technology" | "mentor" | "nextgen";
}

export interface KnowledgeGraphEdge {
  from: string;
  to: string;
}

export const knowledgeGraphNodes: KnowledgeGraphNode[] = [
  { id: "e1", label: "А. Зимин", type: "expert" },
  { id: "e2", label: "О. Денисов", type: "expert" },
  { id: "c1", label: "Проектирование SMR", type: "competency" },
  { id: "c2", label: "Литиевая металлургия", type: "competency" },
  { id: "p1", label: "Новые энергетические системы", type: "project" },
  { id: "p2", label: "Литиевые технологии", type: "project" },
  { id: "t1", label: "Цифровые двойники", type: "technology" },
  { id: "m1", label: "С. Кравцова", type: "mentor" },
  { id: "n1", label: "Молодые инженеры (12)", type: "nextgen" },
];

export const knowledgeGraphEdges: KnowledgeGraphEdge[] = [
  { from: "e1", to: "c1" },
  { from: "c1", to: "p1" },
  { from: "p1", to: "t1" },
  { from: "e2", to: "c2" },
  { from: "c2", to: "p2" },
  { from: "m1", to: "n1" },
  { from: "c1", to: "m1" },
];

export interface MissionProgram {
  name: string;
  requiredSpecialists: string[];
  internalExperts: string[];
  mentors: string[];
  missingCompetencies: string[];
  riskForecast: "low" | "medium" | "high";
}

export const missionPrograms: MissionProgram[] = [
  { name: "Строительство нового энергоблока", requiredSpecialists: ["Инженер-проектировщик SMR", "Специалист по системам безопасности", "Инженер цифровых двойников"], internalExperts: ["Андрей Зимин", "Михаил Грачёв"], mentors: ["Светлана Кравцова"], missingCompetencies: ["Цифровые двойники энергоблока"], riskForecast: "medium" },
  { name: "Цифровой инжиниринг", requiredSpecialists: ["Инженер цифровых двойников", "Специалист по предиктивной аналитике", "AI-инженер"], internalExperts: ["Татьяна Воронцова"], mentors: [], missingCompetencies: ["AI для инженерии", "Предиктивная аналитика"], riskForecast: "high" },
  { name: "Ядерная медицина", requiredSpecialists: ["Радиофармацевт", "Материаловед", "Инженер по изотопным технологиям"], internalExperts: ["Светлана Кравцова"], mentors: ["Светлана Кравцова"], missingCompetencies: ["Радиофармацевтика"], riskForecast: "medium" },
  { name: "Новые материалы", requiredSpecialists: ["Специалист по порошковой металлургии", "Инженер аддитивных технологий"], internalExperts: ["Светлана Кравцова"], mentors: ["Светлана Кравцова"], missingCompetencies: ["Порошковая металлургия", "3D-печать металлом"], riskForecast: "high" },
  { name: "Северный морской путь", requiredSpecialists: ["Инженер автономной навигации", "Специалист по ледокольной логистике"], internalExperts: ["Виктор Орловский"], mentors: ["Виктор Орловский"], missingCompetencies: [], riskForecast: "low" },
];

export interface EmployeeMatch {
  persona: string;
  expertise: string;
  matchedProgram: string; // must match a MissionProgram.name
  fitReason: string;
  growthOffer: string;
}

// Personal "which program needs me" matches — mirrors missionPrograms but from
// the employee's point of view: not "what does the program require" but
// "what do I get if I join it".
export const employeeMatches: EmployeeMatch[] = [
  {
    persona: "Молодой инженер-конструктор",
    expertise: "Базовая подготовка в реакторных технологиях, интерес к новым системам",
    matchedProgram: "Строительство нового энергоблока",
    fitReason: "Совпадение 74% с профилем программы — не хватает именно проектировщиков SMR",
    growthOffer: "Наставник — Андрей Зимин, реальный проект уже в стадии реализации",
  },
  {
    persona: "Специалист по данным / аналитик",
    expertise: "Интерес к AI и предиктивной аналитике, опыт с промышленными данными",
    matchedProgram: "Цифровой инжиниринг",
    fitReason: "Это направление с самым высоким риском — ваш вклад закроет критический дефицит",
    growthOffer: "Возможность стать одним из первых внутренних экспертов по AI для инженерии",
  },
  {
    persona: "Материаловед",
    expertise: "Химия материалов, интерес к применению в медицине",
    matchedProgram: "Ядерная медицина",
    fitReason: "Совпадение по компетенциям 82% — программа уже ищет именно такой профиль",
    growthOffer: "Работа с прямым влиянием на здоровье людей, наставник — Светлана Кравцова",
  },
  {
    persona: "Инженер-технолог",
    expertise: "Производственные процессы, интерес к аддитивным технологиям",
    matchedProgram: "Новые материалы",
    fitReason: "Один из двух направлений с наивысшим дефицитом — 17 открытых позиций",
    growthOffer: "Быстрый путь к экспертному статусу — конкуренция за эту нишу пока низкая",
  },
];

export interface AICenterQA {
  question: string;
  answer: string;
  chartData?: { label: string; value: number }[];
}

export const aiCenterQuestions: AICenterQA[] = [
  { question: "Какие программы находятся под риском?", answer: "Под высоким риском — «Цифровой инжиниринг АЭС» и «Аддитивные технологии»: обе испытывают критический дефицит специалистов, темп подготовки кадров отстаёт от темпа роста программ.", chartData: strategicPrograms.map((p) => ({ label: p.name, value: p.progress })) },
  { question: "Каких специалистов не хватает?", answer: "Наибольший дефицит — инженеры цифровых двойников (21 позиция) и специалисты по порошковой металлургии (17 позиций). Оба направления требуют немедленного запуска программ подготовки." },
  { question: "Где существует риск потери знаний?", answer: "Литиевая металлургия — 84% вероятность потери критической экспертизы за 5 лет, носитель технологии один. Требуется срочная передача знаний и цифровизация методик." },
  { question: "Какие подразделения перегружены?", answer: "Дивизион цифрового инжиниринга работает при 130% плановой нагрузки — три параллельные программы делят один и тот же пул экспертов по цифровым двойникам." },
  { question: "Какие команды можно усилить внутренними экспертами?", answer: "Команду «Ядерной медицины» можно усилить, временно перераспределив Светлану Кравцову с проекта композитных материалов — совпадение компетенций 82%." },
];

export const aiCenterEmployeeQuestions: AICenterQA[] = [
  {
    question: "Какой проект нуждается во мне прямо сейчас?",
    answer: "«Цифровой инжиниринг АЭС» и «Аддитивные технологии» испытывают наибольший дефицит специалистов — именно там ваш вклад будет заметнее всего и быстрее всего оценят.",
  },
  {
    question: "Где я могу вырасти быстрее всего?",
    answer: "AI для инженерии и цифровые двойники — направления с наименьшей внутренней зрелостью (4 и 7 из 10). Здесь меньше конкуренции за экспертизу и больше пространства стать заметным специалистом.",
  },
  {
    question: "Кто может стать моим наставником?",
    answer: "Если вы развиваетесь в проектировании SMR — Андрей Зимин. В материаловедении и композитах — Светлана Кравцова, которая уже отмечена как готовый наставник.",
  },
  {
    question: "Как увеличить свою ценность для компании?",
    answer: "Компетенции с высоким риском потери — литиевая металлургия, радиационно-стойкая электроника — ценятся сильнее всего именно потому, что носителей мало. Редкая экспертиза заметнее массовой.",
  },
  {
    question: "Что произойдёт, если я не буду развиваться?",
    answer: "Ничего катастрофического — но 5 из 5 стратегических программ уже испытывают дефицит специалистов. Каждый год промедления сокращает выбор направлений, где вы будете нужны сильнее всего.",
  },
];

export interface CapabilityForecast {
  competency: string;
  today: number;
  in3: number;
  in5: number;
  in10: number;
  specialistsToday: number;
  specialistsNeeded: number;
  prepStartYear: number;
}

export const capabilityForecasts: CapabilityForecast[] = [
  { competency: "Малые модульные реакторы", today: 48, in3: 58, in5: 72, in10: 90, specialistsToday: 14, specialistsNeeded: 45, prepStartYear: 2026 },
  { competency: "AI для инженерии", today: 22, in3: 45, in5: 68, in10: 88, specialistsToday: 6, specialistsNeeded: 60, prepStartYear: 2026 },
  { competency: "Литиевые технологии", today: 33, in3: 50, in5: 66, in10: 82, specialistsToday: 9, specialistsNeeded: 38, prepStartYear: 2027 },
  { competency: "Цифровые двойники", today: 40, in3: 62, in5: 78, in10: 92, specialistsToday: 11, specialistsNeeded: 50, prepStartYear: 2026 },
  { competency: "Аддитивные технологии", today: 35, in3: 52, in5: 70, in10: 87, specialistsToday: 8, specialistsNeeded: 34, prepStartYear: 2027 },
];

export const sovereigntyMetrics = {
  domesticTechShare: 74,
  importSubstitutionLevel: 68,
  digitalMaturity: 61,
  platformReadiness: 79,
};

export interface CriticalDependency {
  system: string;
  dependencyType: string;
  substitutionStatus: "завершено" | "в процессе" | "требует внимания";
}

export const criticalDependencies: CriticalDependency[] = [
  { system: "Инженерное CAD/CAE ПО", dependencyType: "Зарубежное лицензионное ПО", substitutionStatus: "в процессе" },
  { system: "AI-платформа для инженерии", dependencyType: "Отечественная разработка (GigaChat)", substitutionStatus: "завершено" },
  { system: "Промышленные датчики для АСУ ТП", dependencyType: "Импортные компоненты", substitutionStatus: "требует внимания" },
  { system: "Системы предиктивной аналитики", dependencyType: "Гибридное решение", substitutionStatus: "в процессе" },
];

// Shared domain types for the Competency Intelligence Demo.
// Every screen imports from here so Chunk 2+ can extend without breaking Chunk 1.

export interface RiskArea {
  name: string;
  severity: "low" | "medium" | "high";
}

export interface OrgUnit {
  organization: string;
  division: string;
  headcount: number;
  strategicGoal: string;
  readiness: number; // 0-100
  competencyCoverage: number; // 0-100
  mentorshipCoverage: number; // 0-100
  teamReadiness: number; // 0-100
  risks: RiskArea[];
  targetReadiness: number; // projected, e.g. 81
  timelineMonths: number;
}

export interface CompetencyScore {
  name: string;
  current: number; // 0-100, for radar chart
  required: number; // 0-100, required for target role
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  targetRole: string;
  currentCompetencies: string[];
  readinessCurrentRole: number;
  readinessTargetRole: number;
  criticalGaps: string[];
  radar: CompetencyScore[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  matchPercent: number;
  strengths: string[];
  reason: string;
}

export interface DevelopmentMilestone {
  period: "30" | "60" | "90";
  label: string;
  items: string[];
}

export interface TeamRole {
  role: string;
  requiredCompetencies: string[];
  coverage: number; // 0-100
  risks: string[];
}

export interface AgentStep {
  id: string;
  name: string;
  nameEn: string;
  description: string;
}

// All three analysis functions follow the same pattern:
//   - isLive=false  → skip the API call, return mock data immediately
//   - isLive=true   → call the server-side endpoint (GigaChat or Anthropic)
//                     on failure, fall back to mock data + source:"mock"
// The "provider" field returned by the server ("gigachat" | "anthropic")
// is surfaced in the UI so the presenter can verify which AI is running.

import type { Employee, CompetencyScore } from "@/data/types";
import { employee as mockEmployee } from "@/data/mockData";
import { vkRoles as mockVKRoles, type VKRole } from "@/data/vkData";
import { yandexRoles as mockYandexRoles, type YandexRole } from "@/data/yandexData";

export type AIProvider = "gigachat" | "anthropic" | "mock";

export interface AnalysisResult {
  readinessCurrentRole: number;
  readinessTargetRole: number;
  criticalGaps: string[];
  radar: CompetencyScore[];
  source: "live" | "mock";
  provider: AIProvider;
}

export interface VKAnalysisResult {
  roles: VKRole[];
  source: "live" | "mock";
  provider: AIProvider;
}

export interface YandexAnalysisResult {
  roles: YandexRole[];
  source: "live" | "mock";
  provider: AIProvider;
}

// ---- Sber Employee Analysis ----

export async function analyzeEmployee(
  emp: Employee,
  isLive: boolean
): Promise<AnalysisResult> {
  if (!isLive) return mockEmployeeResult();

  try {
    const res = await fetch("/api/analyze-employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: emp.role,
        targetRole: emp.targetRole,
        currentCompetencies: emp.currentCompetencies,
      }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.radar || !Array.isArray(data.radar)) throw new Error("Bad shape");
    return { ...data, source: "live", provider: data.provider ?? "gigachat" };
  } catch {
    return mockEmployeeResult();
  }
}

function mockEmployeeResult(): AnalysisResult {
  return {
    readinessCurrentRole: mockEmployee.readinessCurrentRole,
    readinessTargetRole:  mockEmployee.readinessTargetRole,
    criticalGaps:         mockEmployee.criticalGaps,
    radar:                mockEmployee.radar,
    source:               "mock",
    provider:             "mock",
  };
}

// ---- VK Initiative Analysis ----

export async function analyzeVKInitiative(
  initiative: string,
  isLive: boolean
): Promise<VKAnalysisResult> {
  if (!isLive) return { roles: mockVKRoles, source: "mock", provider: "mock" };

  try {
    const res = await fetch("/api/analyze-initiative", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initiative }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.roles || !Array.isArray(data.roles)) throw new Error("Bad shape");
    return { roles: data.roles, source: "live", provider: data.provider ?? "gigachat" };
  } catch {
    return { roles: mockVKRoles, source: "mock", provider: "mock" };
  }
}

// ---- Yandex Team Analysis ----

export async function analyzeYandexTeam(
  idea: string,
  isLive: boolean
): Promise<YandexAnalysisResult> {
  if (!isLive) return { roles: mockYandexRoles, source: "mock", provider: "mock" };

  try {
    const res = await fetch("/api/analyze-team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.roles || !Array.isArray(data.roles)) throw new Error("Bad shape");
    return { roles: data.roles, source: "live", provider: data.provider ?? "gigachat" };
  } catch {
    return { roles: mockYandexRoles, source: "mock", provider: "mock" };
  }
}

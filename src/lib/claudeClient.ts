import type { Employee, CompetencyScore } from "@/data/types";
import { employee as mockEmployee } from "@/data/mockData";
import { vkRoles as mockVKRoles, type VKRole } from "@/data/vkData";
import { yandexRoles as mockYandexRoles, type YandexRole } from "@/data/yandexData";

export interface AnalysisResult {
  readinessCurrentRole: number;
  readinessTargetRole: number;
  criticalGaps: string[];
  radar: CompetencyScore[];
  source: "live" | "mock";
}

export interface VKAnalysisResult {
  roles: VKRole[];
  source: "live" | "mock";
}

export interface YandexAnalysisResult {
  roles: YandexRole[];
  source: "live" | "mock";
}

/**
 * Calls the server-side Claude analysis endpoint (api/analyze-employee.ts).
 * If the endpoint isn't available — e.g. running `npm run dev` locally
 * without `vercel dev`, or no ANTHROPIC_API_KEY configured — falls back to
 * realistic mock data so the demo always works.
 */
export async function analyzeEmployee(emp: Employee): Promise<AnalysisResult> {
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

    return { ...data, source: "live" };
  } catch {
    // Mock fallback — simulate latency so the loading state still demos well.
    await new Promise((r) => setTimeout(r, 900));
    return {
      readinessCurrentRole: mockEmployee.readinessCurrentRole,
      readinessTargetRole: mockEmployee.readinessTargetRole,
      criticalGaps: mockEmployee.criticalGaps,
      radar: mockEmployee.radar,
      source: "mock",
    };
  }
}

/**
 * VK's Strategic Initiative Builder. Same pattern as analyzeEmployee:
 * calls api/analyze-initiative.ts, falls back to mock VK roles if the
 * endpoint isn't available or no ANTHROPIC_API_KEY is configured.
 */
export async function analyzeVKInitiative(initiative: string): Promise<VKAnalysisResult> {
  try {
    const res = await fetch("/api/analyze-initiative", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initiative }),
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    if (!data.roles || !Array.isArray(data.roles)) throw new Error("Bad shape");

    return { roles: data.roles, source: "live" };
  } catch {
    await new Promise((r) => setTimeout(r, 900));
    return { roles: mockVKRoles, source: "mock" };
  }
}

/**
 * Yandex's Product Team Builder. Same pattern again — calls
 * api/analyze-team.ts, falls back to mock Yandex roles.
 */
export async function analyzeYandexTeam(idea: string): Promise<YandexAnalysisResult> {
  try {
    const res = await fetch("/api/analyze-team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    if (!data.roles || !Array.isArray(data.roles)) throw new Error("Bad shape");

    return { roles: data.roles, source: "live" };
  } catch {
    await new Promise((r) => setTimeout(r, 900));
    return { roles: mockYandexRoles, source: "mock" };
  }
}

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { CompetencyScore } from "@/data/types";

export function CompetencyRadar({ data }: { data: CompetencyScore[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#232A37" />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "#9AA4B6", fontSize: 11, fontFamily: "Inter" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#5C6680", fontSize: 9 }}
          axisLine={false}
        />
        <Radar
          name="Текущий уровень"
          dataKey="current"
          stroke="#9AA4B6"
          fill="#9AA4B6"
          fillOpacity={0.18}
          strokeWidth={1.5}
        />
        <Radar
          name="Требуется для целевой роли"
          dataKey="required"
          stroke="#E8A33D"
          fill="#E8A33D"
          fillOpacity={0.12}
          strokeWidth={2}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: "#9AA4B6", fontFamily: "Inter" }}
        />
        <Tooltip
          contentStyle={{
            background: "#161B25",
            border: "1px solid #232A37",
            borderRadius: 8,
            fontSize: 12,
            fontFamily: "Inter",
          }}
          labelStyle={{ color: "#E7EAF0" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { airports, spendBandsNormalized } from "../data/survey";
import { brand } from "../theme";
import { CountPct } from "./AnimatedViz";

export function CompareStrip() {
  const vli = airports.vli;
  const son = airports.son;

  return (
    <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="card grid grid-cols-2 gap-4 p-5 xl:grid-cols-4">
        <Kpi
          label="Recommend · VLI"
          note="Port Vila advocacy"
          tone="vli"
        >
          <CountPct value={vli.recommend} />
        </Kpi>
        <Kpi
          label="Recommend · SON"
          note="Santo advocacy"
          tone="son"
        >
          <CountPct value={son.recommend} />
        </Kpi>
        <Kpi
          label="Holiday share"
          note="Port Vila is the leisure gateway"
          tone="neutral"
        >
          <CountPct value={89} />
          <span className="text-ink-soft"> vs </span>
          <CountPct value={54} />
        </Kpi>
        <Kpi
          label="VFR share"
          note="Santo’s visiting-friends mix"
          tone="neutral"
        >
          <CountPct value={5} />
          <span className="text-ink-soft"> vs </span>
          <CountPct value={24} />
        </Kpi>
      </div>

      <div className="card p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
          Spend, aligned bands
        </p>
        <h3 className="font-display mt-0.5 text-xl font-semibold">
          Where the money sits
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          Original bands differ by airport. These groups are recut for comparison.
        </p>
        <div className="mt-3 flex gap-4 text-xs text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-vli" />
            Port Vila
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-son" />
            Santo
          </span>
        </div>
        <div className="mt-2 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={spendBandsNormalized}
              margin={{ top: 8, right: 4, left: -22, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#c5dce0" />
              <XAxis
                dataKey="band"
                tick={{ fill: "#5a5a5a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5a5a5a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip
                formatter={(value, name) => [
                  `${value}%`,
                  name === "vli" ? "Port Vila" : "Santo",
                ]}
                contentStyle={{
                  background: "#ffffff",
                  border: `1px solid ${brand.line}`,
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="vli"
                fill={brand.teal}
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="son"
                fill={brand.lime}
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={980}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function Kpi({
  label,
  note,
  tone,
  children,
}: {
  label: string;
  note: string;
  tone: "vli" | "son" | "neutral";
  children: ReactNode;
}) {
  const color =
    tone === "vli" ? "text-vli" : tone === "son" ? "text-son" : "text-ink";
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
        {label}
      </p>
      <p className={`font-display mt-1 text-[1.65rem] leading-none font-semibold ${color}`}>
        {children}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{note}</p>
    </div>
  );
}

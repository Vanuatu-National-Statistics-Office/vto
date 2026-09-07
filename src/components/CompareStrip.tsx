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

export function CompareStrip() {
  const vli = airports.vli;
  const son = airports.son;

  return (
    <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="card grid grid-cols-2 gap-4 p-5 xl:grid-cols-4">
        <Kpi
          label="Recommend · VLI"
          value={`${vli.recommend}%`}
          note="Port Vila advocacy"
          tone="vli"
        />
        <Kpi
          label="Recommend · SON"
          value={`${son.recommend}%`}
          note="Santo advocacy"
          tone="son"
        />
        <Kpi
          label="Holiday share"
          value="89% vs 54%"
          note="Port Vila is the leisure gateway"
          tone="neutral"
        />
        <Kpi
          label="VFR share"
          value="5% vs 24%"
          note="Santo’s visiting-friends mix"
          tone="neutral"
        />
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
              <Bar dataKey="vli" fill={brand.teal} radius={[4, 4, 0, 0]} />
              <Bar dataKey="son" fill={brand.lime} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function Kpi({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "vli" | "son" | "neutral";
}) {
  const color =
    tone === "vli" ? "text-vli" : tone === "son" ? "text-son" : "text-ink";
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
        {label}
      </p>
      <p className={`font-display mt-1 text-[1.65rem] leading-none font-semibold ${color}`}>
        {value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{note}</p>
    </div>
  );
}

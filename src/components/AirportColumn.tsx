import type { ReactNode } from "react";
import {
  BedDouble,
  Briefcase,
  Palmtree,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Stamp,
  Users,
  Wifi,
} from "lucide-react";
import type { AirportId, AirportProfile, OriginSlice } from "../data/survey";
import { airportHex, originColors } from "../theme";

const icons = {
  Holiday: Palmtree,
  VFR: Users,
  Business: Briefcase,
  Other: Plane,
  Customs: Stamp,
  Immigration: ShieldCheck,
  Accommodation: BedDouble,
  Biosecurity: ShieldCheck,
  Internet: Wifi,
  Retail: ShoppingBag,
};

type Props = {
  airport: AirportProfile;
  focus: string;
};

function theme(id: AirportId) {
  return id === "vli"
    ? {
        deep: "bg-vli-deep",
        mid: "text-vli",
        soft: "bg-vli-soft",
        bar: "bg-vli",
        hex: airportHex.vli,
      }
    : {
        deep: "bg-son-deep",
        mid: "text-son",
        soft: "bg-son-soft",
        bar: "bg-son",
        hex: airportHex.son,
      };
}

function ringStyle(pct: number, color: string) {
  return {
    background: `conic-gradient(${color} ${pct * 3.6}deg, #dce8ea 0deg)`,
  } as const;
}

function OriginDonut({
  slices,
  colors,
}: {
  slices: OriginSlice[];
  colors: string[];
}) {
  let acc = 0;
  const stops = slices.map((slice, i) => {
    const start = acc;
    acc += slice.pct;
    return `${colors[i]} ${start}% ${acc}%`;
  });
  const lead = slices[0];

  return (
    <div
      className="grid h-[124px] w-[124px] place-items-center rounded-full"
      style={{ background: `conic-gradient(${stops.join(", ")})` }}
      aria-hidden
    >
      <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-white">
        <span className="font-display text-2xl leading-none font-semibold">
          {lead.pct}%
        </span>
        <span className="mt-0.5 text-[10px] tracking-wide text-ink-soft uppercase">
          Aus
        </span>
      </div>
    </div>
  );
}

function CardShell({
  title,
  kicker,
  children,
  dimmed,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  dimmed?: boolean;
}) {
  return (
    <section
      className={`card p-5 transition-opacity ${dimmed ? "opacity-45" : "opacity-100"}`}
    >
      {kicker ? (
        <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
          {kicker}
        </p>
      ) : null}
      <h3 className="font-display mt-0.5 text-xl font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function AirportColumn({ airport, focus }: Props) {
  const t = theme(airport.id);
  const dim = (keys: string[]) => focus !== "all" && !keys.includes(focus);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className={`${t.deep} rounded-2xl px-5 py-5 text-paper`}>
        <p className="text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">
          {airport.iata} · {airport.airport}
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold">
          {airport.name}
        </h2>
      </div>

      <CardShell
        title="Visitor origins"
        kicker="Source markets"
        dimmed={dim(["australia"])}
      >
        <div className="grid grid-cols-[124px_1fr] items-center gap-4">
          <OriginDonut
            slices={airport.origins}
            colors={originColors[airport.id]}
          />
          <ul className="space-y-2.5">
            {airport.origins.map((origin, i) => (
              <li key={origin.name} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: originColors[airport.id][i] }}
                  />
                  {origin.name}
                </span>
                <span className="font-display text-lg font-semibold">
                  {origin.pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardShell>

      <CardShell
        title="Purpose of visit"
        kicker="Trip mix"
        dimmed={dim(["vfr"])}
      >
        <ul className="space-y-3">
          {airport.purpose.map((item) => {
            const Icon = icons[item.short as keyof typeof icons] ?? Plane;
            return (
              <li key={item.name}>
                <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${t.mid}`} />
                    {item.name}
                  </span>
                  <span className="font-semibold">{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-paper-2">
                  <div
                    className={`h-full rounded-full ${t.bar}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </CardShell>

      <CardShell
        title="Key service satisfaction"
        kicker="Share satisfied"
        dimmed={dim(["service"])}
      >
        <div className="grid grid-cols-3 gap-3">
          {airport.satisfaction.map((item) => {
            const Icon = icons[item.name as keyof typeof icons] ?? ShieldCheck;
            return (
              <div key={item.name} className="text-center">
                <div
                  className="mx-auto grid h-[76px] w-[76px] place-items-center rounded-full"
                  style={ringStyle(item.pct, t.hex)}
                >
                  <div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-white">
                    <span className="font-display text-lg font-semibold leading-none">
                      {item.pct}
                    </span>
                  </div>
                </div>
                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-ink-soft">
                  <Icon className="h-3.5 w-3.5" />
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </CardShell>

      {airport.improvements ? (
        <CardShell
          title="Needs improvement"
          kicker="Visitor feedback"
          dimmed={dim(["service"])}
        >
          <div className="grid grid-cols-2 gap-3">
            {airport.improvements.map((item) => {
              const Icon = icons[item.name as keyof typeof icons] ?? Wifi;
              return (
                <div
                  key={item.name}
                  className="rounded-xl border border-coral/25 bg-coral/8 px-3 py-3"
                >
                  <Icon className="h-4 w-4 text-coral" />
                  <p className="font-display mt-2 text-2xl font-semibold">
                    {item.pct}%
                  </p>
                  <p className="text-sm text-ink-soft">{item.name}</p>
                </div>
              );
            })}
          </div>
        </CardShell>
      ) : null}

      <CardShell
        title="Visitor spend"
        kicker="Reported bands · VUV"
        dimmed={dim(["spend"])}
      >
        <ul className="space-y-2.5">
          {airport.spend.map((band) => (
            <li key={band.label} className="grid grid-cols-[7.5rem_1fr_2.4rem] items-center gap-2">
              <span className="text-xs text-ink-soft">{band.label}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-paper-2">
                <div
                  className={`h-full rounded-full ${t.bar}`}
                  style={{ width: `${(band.pct / 30) * 100}%` }}
                />
              </div>
              <span className="text-right text-sm font-semibold">{band.pct}%</span>
            </li>
          ))}
        </ul>
        <p className={`${t.soft} mt-4 rounded-xl px-3 py-2 text-sm text-ink-soft`}>
          {airport.spendNote}
        </p>
      </CardShell>

      <div className="mt-auto grid grid-cols-2 gap-4">
        <CardShell title="Length of stay" dimmed={dim(["all"])}>
          <p className="font-display text-3xl font-semibold">{airport.stay}</p>
          <p className="mt-1 text-sm text-ink-soft">{airport.stayDetail}</p>
        </CardShell>
        <section
          className={`card p-5 ${t.deep} text-paper ${
            dim(["all"]) ? "opacity-45" : ""
          }`}
        >
          <h3 className="text-[11px] font-semibold tracking-[0.16em] text-sand uppercase">
            Would recommend
          </h3>
          <p className="font-display mt-2 text-4xl font-semibold">
            {airport.recommend}%
          </p>
          <p className="mt-1 text-sm text-paper/75">
            {airport.recommend === 100 ? "Every Santo respondent" : "Near-universal advocacy"}
          </p>
        </section>
      </div>
    </div>
  );
}

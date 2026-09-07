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
import type { AirportId, AirportProfile } from "../data/survey";
import { airportHex, originColors } from "../theme";
import { CountPct, FillRing, GrowBar, OriginDonut } from "./AnimatedViz";

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
                <CountPct
                  value={origin.pct}
                  className="font-display text-lg font-semibold"
                />
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
                  <CountPct value={item.pct} className="font-semibold" />
                </div>
                <GrowBar pct={item.pct} className={t.bar} />
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
                <FillRing pct={item.pct} color={t.hex} />
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
                  <CountPct
                    value={item.pct}
                    className="font-display mt-2 block text-2xl font-semibold"
                  />
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
              <GrowBar pct={band.pct} max={30} height="h-2.5" className={t.bar} />
              <CountPct
                value={band.pct}
                className="text-right text-sm font-semibold"
              />
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
          <CountPct
            value={airport.recommend}
            className="font-display mt-2 block text-4xl font-semibold"
          />
          <p className="mt-1 text-sm text-paper/75">
            {airport.recommend === 100 ? "Every Santo respondent" : "Near-universal advocacy"}
          </p>
        </section>
      </div>
    </div>
  );
}

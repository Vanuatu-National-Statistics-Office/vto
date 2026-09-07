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
import {
  airportPages,
  airports,
  type AirportId,
  type ReportPage,
} from "../data/survey";
import {
  CountPct,
  FillRing,
  GrowBar,
  OriginDonut,
} from "../components/AnimatedViz";
import { PatternWash, WeaveBand } from "../components/MelanesianMotifs";
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
  id: AirportId;
  onPage: (page: ReportPage) => void;
};

export function AirportPage({ id, onPage }: Props) {
  const airport = airports[id];
  const page = airportPages[id];
  const isVli = id === "vli";
  const hex = airportHex[id];
  const next: ReportPage = isVli ? "son" : "compare";
  const nextLabel = isVli ? "Next: Santo" : "Next: Compare";
  const prev: ReportPage = isVli ? "cover" : "vli";
  const prevLabel = isVli ? "Back: Cover" : "Back: Port Vila";

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8">
      <header
        className={`relative overflow-hidden rounded-[1.75rem] pt-8 text-paper sm:pt-10 ${
          isVli ? "bg-vli-deep" : "bg-son-deep"
        }`}
      >
        <PatternWash variant="cover" />
        <div className="relative px-6 sm:px-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">
            {isVli ? "02" : "03"} · {airport.iata} · {airport.airport} · {page.island}
          </p>
          <div className="mt-3 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
                {airport.name}
              </h1>
              <p className="font-display mt-2 text-2xl text-sand italic">
                {page.headline}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/80">
                {page.deck}
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4">
              <HeroStat label="Recommend">
                <CountPct
                  value={airport.recommend}
                  className="font-display text-2xl font-semibold sm:text-3xl"
                />
              </HeroStat>
              <HeroStat label="Stay" value={airport.stay} />
              <HeroStat label="Australia">
                <CountPct
                  value={airport.origins[0].pct}
                  className="font-display text-2xl font-semibold sm:text-3xl"
                />
              </HeroStat>
            </dl>
          </div>
        </div>
        <div className="relative mt-8">
          <WeaveBand tone="paper" className="h-5" />
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="card p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
            This quarter
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            {page.story}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {page.notes.map((note) => (
              <article key={note.title} className="rounded-2xl bg-paper-2/70 p-4">
                <h2 className="font-display text-lg font-semibold">{note.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {note.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
            Source markets
          </p>
          <h2 className="font-display mt-1 text-2xl font-semibold">
            Visitor origins
          </h2>
          <div className="mt-5 flex items-center gap-5">
            <OriginDonut
              slices={airport.origins}
              colors={originColors[id]}
              size={132}
              inner={84}
            />
            <ul className="w-full space-y-2.5">
              {airport.origins.map((origin, i) => (
                <li key={origin.name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: originColors[id][i] }}
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
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
            Trip mix
          </p>
          <h2 className="font-display mt-1 text-2xl font-semibold">
            Purpose of visit
          </h2>
          <ul className="mt-5 space-y-3">
            {airport.purpose.map((item) => {
              const Icon = icons[item.short as keyof typeof icons] ?? Plane;
              return (
                <li key={item.name}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2">
                      <Icon className={isVli ? "h-4 w-4 text-vli" : "h-4 w-4 text-son"} />
                      {item.name}
                    </span>
                    <CountPct value={item.pct} className="font-semibold" />
                  </div>
                  <GrowBar
                    pct={item.pct}
                    className={isVli ? "bg-vli" : "bg-son"}
                  />
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
            Share satisfied
          </p>
          <h2 className="font-display mt-1 text-2xl font-semibold">
            Key services
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {airport.satisfaction.map((item) => {
              const Icon = icons[item.name as keyof typeof icons] ?? ShieldCheck;
              return (
                <div key={item.name} className="text-center">
                  <FillRing pct={item.pct} color={hex} size={84} inner={62} />
                  <p className="mt-2 flex items-center justify-center gap-1 text-xs text-ink-soft">
                    <Icon className="h-3.5 w-3.5" />
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          {airport.improvements ? (
            <div className="mt-6 grid grid-cols-2 gap-3">
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
                    <p className="text-sm text-ink-soft">Need work · {item.name}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-son-soft px-4 py-3 text-sm text-ink-soft">
              {airport.stayDetail}. Lowest service score this quarter is biosecurity
              at 61%.
            </p>
          )}
        </section>
      </div>

      <section className="card mt-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
              Reported bands · VUV
            </p>
            <h2 className="font-display mt-1 text-2xl font-semibold">
              Visitor spend
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink-soft">{airport.spendNote}</p>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-5">
          {airport.spend.map((band) => (
            <li key={band.label} className="rounded-2xl bg-paper-2/70 p-4">
              <p className="text-xs text-ink-soft">{band.label}</p>
              <CountPct
                value={band.pct}
                className="font-display mt-2 block text-3xl font-semibold"
              />
              <div className="mt-3">
                <GrowBar
                  pct={band.pct}
                  max={30}
                  height="h-1.5"
                  className={isVli ? "bg-vli" : "bg-son"}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onPage(prev)}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-soft hover:text-ink"
        >
          {prevLabel}
        </button>
        <button
          type="button"
          onClick={() => onPage(next)}
          className={`rounded-full px-4 py-2 text-sm text-paper ${
            isVli ? "bg-vli-deep" : "bg-son-deep"
          }`}
        >
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}

function HeroStat({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <dt className="text-[11px] tracking-wide text-paper/55 uppercase">{label}</dt>
      <dd className="font-display mt-1 text-2xl font-semibold sm:text-3xl">
        {children ?? value}
      </dd>
    </div>
  );
}

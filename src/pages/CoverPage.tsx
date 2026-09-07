import { BrandMark } from "../components/BrandMark";
import { airports, source, type ReportPage } from "../data/survey";

type Props = {
  onPage: (page: ReportPage) => void;
};

export function CoverPage({ onPage }: Props) {
  const vli = airports.vli;
  const son = airports.son;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-[1440px] flex-col px-5 py-6 sm:px-8 sm:py-8">
      <section className="relative flex flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-ink text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 55% 80% at 0% 100%, #00A3BE 0%, transparent 58%), radial-gradient(ellipse 55% 80% at 100% 100%, #6FBE3A 0%, transparent 58%)",
          }}
        />
        <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 sm:p-10 lg:p-14">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <BrandMark size="lg" plate />
              <p className="text-sm text-paper/70">Airport consent surveys</p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-sand uppercase">
              Q1 2026 · Visitor insights
            </p>
            <h1 className="font-display mt-3 text-4xl leading-[1.05] font-semibold sm:text-6xl">
              Port Vila and Santo, side by side
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
              How visitors arriving through Bauerfield and Santo-Pekoa described
              their trip, spend, and stay this quarter.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <button
              type="button"
              onClick={() => onPage("vli")}
              className="rounded-2xl bg-vli-deep/90 p-6 text-left transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] text-sand uppercase">
                02 · {vli.iata} · {vli.airport}
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold">
                {vli.name}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/75">
                Holiday-led, premium spend, 7-night stays.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <Stat label="Recommend" value={`${vli.recommend}%`} />
                <Stat label="Holiday" value="89%" />
                <Stat label="Australia" value="70%" />
              </dl>
            </button>

            <button
              type="button"
              onClick={() => onPage("son")}
              className="rounded-2xl bg-son-deep/90 p-6 text-left transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] text-sand uppercase">
                03 · {son.iata} · {son.airport}
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold">
                {son.name}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/75">
                Stronger VFR mix, Brisbane twice weekly, 7–8 nights.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <Stat label="Recommend" value={`${son.recommend}%`} />
                <Stat label="VFR" value="24%" />
                <Stat label="Australia" value="73%" />
              </dl>
            </button>
          </div>

          <div className="flex flex-col gap-3 border-t border-paper/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xs leading-relaxed text-paper/55">
              {source}
            </p>
            <button
              type="button"
              onClick={() => onPage("compare")}
              className="self-start rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink"
            >
              Open comparison
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-wide text-paper/55 uppercase">{label}</dt>
      <dd className="font-display mt-1 text-2xl font-semibold">{value}</dd>
    </div>
  );
}

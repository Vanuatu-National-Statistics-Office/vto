import { BrandMark } from "../components/BrandMark";
import { PatternWash, WeaveBand } from "../components/MelanesianMotifs";
import { source, type ReportPage } from "../data/survey";

type Props = {
  onPage: (page: ReportPage) => void;
};

export function CoverPage({ onPage }: Props) {
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
        <PatternWash variant="cover" />
        <div className="relative">
          <WeaveBand tone="paper" className="h-6 opacity-80" />
        </div>
        <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 sm:p-10 lg:p-14">
          <div className="flex items-start justify-between gap-4 py-2">
            <img
              src={`${import.meta.env.BASE_URL}coat-of-arms.png`}
              alt="Republic of Vanuatu coat of arms"
              className="logo-zoom h-24 w-auto object-contain sm:h-32"
            />
            <div className="flex flex-col items-end gap-2">
              <BrandMark size="lg" plate pulse />
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

          <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="relative">
          <WeaveBand tone="paper" className="h-6 opacity-80" />
        </div>
      </section>
    </div>
  );
}

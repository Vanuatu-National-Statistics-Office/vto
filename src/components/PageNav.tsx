import { BrandMark } from "./BrandMark";
import type { ReportPage } from "../data/survey";

const items: { id: ReportPage; label: string; no: string }[] = [
  { id: "cover", label: "Cover", no: "01" },
  { id: "vli", label: "Port Vila", no: "02" },
  { id: "son", label: "Santo", no: "03" },
  { id: "compare", label: "Compare", no: "04" },
];

type Props = {
  page: ReportPage;
  onPage: (page: ReportPage) => void;
};

export function PageNav({ page, onPage }: Props) {
  return (
    <nav className="sticky top-0 z-20 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <button
          type="button"
          onClick={() => onPage("cover")}
          className="flex items-center gap-2.5 text-left"
        >
          <BrandMark size="sm" />
          <span className="hidden sm:block">
            <span className="font-display text-sm font-semibold">
              Q1 2026 visitor insights
            </span>
          </span>
        </button>

        <div
          className="flex flex-wrap items-center justify-end gap-1"
          role="tablist"
          aria-label="Report pages"
        >
          {items.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onPage(item.id)}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? item.id === "vli"
                      ? "bg-vli-deep text-paper"
                      : item.id === "son"
                        ? "bg-son-deep text-paper"
                        : "bg-ink text-paper"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className="mr-1.5 hidden font-mono text-[10px] opacity-70 sm:inline">
                  {item.no}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import { insights } from "../data/survey";

type Props = {
  focus: string;
  onFocus: (id: string) => void;
};

export function InsightRail({ focus, onFocus }: Props) {
  return (
    <aside className="flex flex-col gap-3">
      <div className="px-1">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
          Reading the quarter
        </p>
        <h2 className="font-display mt-1 text-2xl font-semibold">
          What the surveys say
        </h2>
      </div>
      {insights.map((item) => {
        const active = focus === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onFocus(active ? "all" : item.id)}
            aria-pressed={active}
            className={`card px-4 py-4 text-left transition-colors ${
              active
                ? "bg-ink text-paper ring-2 ring-gold/70"
                : "hover:bg-paper-2"
            }`}
          >
            <p
              className={`text-[11px] font-semibold tracking-[0.16em] uppercase ${
                active ? "text-sand" : "text-gold"
              }`}
            >
              Insight
            </p>
            <h3 className="font-display mt-1 text-lg leading-snug font-semibold">
              {item.title}
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                active ? "text-paper/85" : "text-ink-soft"
              }`}
            >
              {item.body}
            </p>
          </button>
        );
      })}
    </aside>
  );
}

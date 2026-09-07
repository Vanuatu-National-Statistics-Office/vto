import { useState } from "react";
import { AirportColumn } from "../components/AirportColumn";
import { CompareStrip } from "../components/CompareStrip";
import { Header } from "../components/Header";
import { InsightRail } from "../components/InsightRail";
import { airports } from "../data/survey";

export function ComparePage() {
  const [focus, setFocus] = useState("all");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
            04 · Comparison desk
          </p>
          <p className="text-xs text-ink-soft">
            Click an insight to highlight the related cards
          </p>
        </div>
        <CompareStrip />
        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr_1fr]">
          <InsightRail focus={focus} onFocus={setFocus} />
          <AirportColumn airport={airports.vli} focus={focus} />
          <AirportColumn airport={airports.son} focus={focus} />
        </div>
      </main>
      <footer className="border-t border-line/80">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Vanuatu Tourism Office · Internal visitor insights desk</p>
          <p>Figures as published in the Q1 2026 airport consent survey snapshot.</p>
        </div>
      </footer>
    </>
  );
}

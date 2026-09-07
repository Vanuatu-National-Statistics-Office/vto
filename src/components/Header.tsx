import { BrandMark } from "./BrandMark";
import { source } from "../data/survey";

export function Header() {
  return (
    <header className="border-b border-line/80">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <BrandMark size="md" />
          <div>
            <h1 className="font-display max-w-xl text-[1.85rem] leading-[1.15] font-semibold text-ink sm:text-[2.15rem]">
              Airport consent surveys
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
              Q1 2026 visitor insights · Port Vila versus Santo
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <p className="font-display text-lg text-gold italic">
            Answer the call of Vanuatu
          </p>
          <p className="max-w-sm text-xs leading-relaxed text-ink-soft lg:text-right">
            {source}
          </p>
        </div>
      </div>
    </header>
  );
}

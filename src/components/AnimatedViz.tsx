import type { OriginSlice } from "../data/survey";
import { dataDuration, useCountUp, useReveal } from "../hooks/useReveal";

export function CountPct({
  value,
  className,
  suffix = "%",
}: {
  value: number;
  className?: string;
  suffix?: string;
}) {
  const { ref, on } = useReveal<HTMLSpanElement>();
  const shown = useCountUp(value, on, dataDuration(value));

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}

export function GrowBar({
  pct,
  className,
  max = 100,
  height = "h-2",
}: {
  pct: number;
  className: string;
  max?: number;
  height?: string;
}) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const width = on ? `${(pct / max) * 100}%` : "0%";

  return (
    <div
      ref={ref}
      className={`${height} overflow-hidden rounded-full bg-paper-2`}
    >
      <div
        className={`h-full rounded-full ${className}`}
        style={{
          width,
          transition: `width ${dataDuration(pct)}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      />
    </div>
  );
}

export function FillRing({
  pct,
  color,
  size = 76,
  inner = 56,
}: {
  pct: number;
  color: string;
  size?: number;
  inner?: number;
}) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const shown = useCountUp(pct, on, dataDuration(pct));

  return (
    <div
      ref={ref}
      className="mx-auto grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${shown * 3.6}deg, #dce8ea 0deg)`,
      }}
    >
      <div
        className="grid place-items-center rounded-full bg-white"
        style={{ width: inner, height: inner }}
      >
        <span className="font-display text-lg font-semibold leading-none">
          {shown}
        </span>
      </div>
    </div>
  );
}

export function OriginDonut({
  slices,
  colors,
  size = 124,
  inner = 78,
}: {
  slices: OriginSlice[];
  colors: string[];
  size?: number;
  inner?: number;
}) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const lead = slices[0];
  const shown = useCountUp(lead.pct, on, dataDuration(lead.pct));
  const progress = on ? shown / Math.max(lead.pct, 1) : 0;

  let acc = 0;
  const stops = slices.map((slice, i) => {
    const start = acc * progress;
    acc += slice.pct;
    return `${colors[i]} ${start}% ${acc * progress}%`;
  });

  return (
    <div
      ref={ref}
      className="grid shrink-0 place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${stops.join(", ")}, #e8f3f5 ${acc * progress}% 100%)`,
      }}
      aria-hidden
    >
      <div
        className="flex flex-col items-center justify-center rounded-full bg-white"
        style={{ width: inner, height: inner }}
      >
        <span className="font-display text-2xl leading-none font-semibold">
          {shown}%
        </span>
        <span className="mt-0.5 text-[10px] tracking-wide text-ink-soft uppercase">
          Aus
        </span>
      </div>
    </div>
  );
}

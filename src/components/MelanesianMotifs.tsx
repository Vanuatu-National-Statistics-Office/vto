import { useId } from "react";

type Tone = "paper" | "ink" | "teal" | "lime" | "muted";

const tones: Record<Tone, string> = {
  paper: "text-paper/25",
  ink: "text-ink/15",
  teal: "text-vli/20",
  lime: "text-son/20",
  muted: "text-vli/35",
};

/** Continuous-line motif in the spirit of Vanuatu sandroing. */
export function SandDrawing({
  className = "",
  tone = "paper",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`overflow-visible ${tones[tone]} ${className}`}
      aria-hidden
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M80 16 L128 48 L128 112 L80 144 L32 112 L32 48 Z" />
        <path d="M80 16 L80 144 M32 48 L128 112 M128 48 L32 112" />
        <path d="M56 48 L104 48 L104 112 L56 112 Z" />
        <path d="M80 48 L104 80 L80 112 L56 80 Z" />
        <path d="M32 80 H128 M56 16 H104 M56 144 H104" />
      </g>
      <g fill="currentColor">
        {[
          [80, 16],
          [128, 48],
          [128, 112],
          [80, 144],
          [32, 112],
          [32, 48],
          [80, 80],
          [56, 48],
          [104, 48],
          [104, 112],
          [56, 112],
          [80, 48],
          [104, 80],
          [80, 112],
          [56, 80],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" />
        ))}
      </g>
    </svg>
  );
}

/** Pandanus-style diamond and chevron frieze. */
export function WeaveBand({
  className = "",
  tone = "muted",
}: {
  className?: string;
  tone?: Tone;
}) {
  const weaveId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 640 28"
      preserveAspectRatio="none"
      className={`block w-full ${tones[tone]} ${className}`}
      aria-hidden
    >
      <defs>
        <pattern
          id={weaveId}
          x="0"
          y="0"
          width="64"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 6 H64 M0 22 H64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0 14 L16 6 L32 14 L16 22 Z M32 14 L48 6 L64 14 L48 22 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M16 6 L32 14 L16 22 M48 6 L64 14 L48 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.7"
          />
          <circle cx="16" cy="14" r="1.6" fill="currentColor" />
          <circle cx="48" cy="14" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="640" height="28" fill={`url(#${weaveId})`} />
    </svg>
  );
}

export function PatternWash({
  variant = "cover",
}: {
  variant?: "cover" | "vli" | "son";
}) {
  const tone: Tone = variant === "son" ? "lime" : variant === "vli" ? "teal" : "paper";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <SandDrawing
        tone={tone}
        className="absolute -top-6 -left-4 h-52 w-52 sm:h-64 sm:w-64"
      />
      <SandDrawing
        tone={tone}
        className="absolute -right-8 -bottom-10 h-56 w-56 rotate-180 sm:h-72 sm:w-72"
      />
      <SandDrawing
        tone={tone}
        className="absolute top-1/3 right-1/4 hidden h-36 w-36 opacity-70 lg:block"
      />
    </div>
  );
}

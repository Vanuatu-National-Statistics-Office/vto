type Props = {
  size?: "sm" | "md" | "lg";
  plate?: boolean;
  pulse?: boolean;
};

const heights = {
  sm: "h-10 sm:h-11",
  md: "h-16",
  lg: "h-[5.75rem] sm:h-24",
};

export function BrandMark({ size = "md", plate = false, pulse = false }: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vto-logo.png`}
      alt="Vanuatu Tourism Office"
      className={`w-auto object-contain ${heights[size]} ${
        plate ? "rounded-2xl bg-white p-2 shadow-none" : ""
      } ${pulse ? "logo-zoom logo-zoom-delay" : ""}`}
    />
  );
}

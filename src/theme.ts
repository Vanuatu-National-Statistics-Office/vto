import type { AirportId } from "./data/survey";

/** Sampled from the official VTO wordmark, wave, and conch. */
export const brand = {
  red: "#C22038",
  teal: "#00A3BE",
  tealDeep: "#0A4F58",
  lime: "#6FBE3A",
  limeDeep: "#356E1F",
  ink: "#2A2A2A",
  paper: "#FFFFFF",
  line: "#C5DCE0",
};

export const originColors: Record<AirportId, string[]> = {
  vli: [brand.teal, "#6FCFE0", "#C5E8EE"],
  son: [brand.lime, "#A8D96A", "#D4EBB8"],
};

export const airportHex: Record<AirportId, string> = {
  vli: brand.teal,
  son: brand.lime,
};

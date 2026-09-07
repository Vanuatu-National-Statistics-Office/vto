export type AirportId = "vli" | "son";

export type SpendBand = {
  label: string;
  pct: number;
};

export type OriginSlice = {
  name: string;
  pct: number;
};

export type PurposeSlice = {
  name: string;
  short: string;
  pct: number;
};

export type SatisfactionItem = {
  name: string;
  pct: number;
};

export type AirportProfile = {
  id: AirportId;
  name: string;
  airport: string;
  iata: string;
  origins: OriginSlice[];
  purpose: PurposeSlice[];
  satisfaction: SatisfactionItem[];
  improvements?: SatisfactionItem[];
  spend: SpendBand[];
  spendNote: string;
  stay: string;
  stayDetail: string;
  recommend: number;
  premiumSpendShare: number;
};

export const airports: Record<AirportId, AirportProfile> = {
  vli: {
    id: "vli",
    name: "Port Vila",
    airport: "Bauerfield International",
    iata: "VLI",
    origins: [
      { name: "Australia", pct: 70 },
      { name: "New Zealand", pct: 6 },
      { name: "Other markets", pct: 24 },
    ],
    purpose: [
      { name: "Holiday", short: "Holiday", pct: 89 },
      { name: "Visiting friends & relatives", short: "VFR", pct: 5 },
      { name: "Business", short: "Business", pct: 4 },
      { name: "Other", short: "Other", pct: 2 },
    ],
    satisfaction: [
      { name: "Immigration", pct: 85 },
      { name: "Customs", pct: 84 },
      { name: "Accommodation", pct: 68 },
    ],
    improvements: [
      { name: "Internet", pct: 67 },
      { name: "Retail", pct: 65 },
    ],
    spend: [
      { label: "VUV 20–99K", pct: 21 },
      { label: "VUV 100–149K", pct: 18 },
      { label: "VUV 150–299K", pct: 23 },
      { label: "VUV 300–399K", pct: 17 },
      { label: "VUV 400K+", pct: 21 },
    ],
    spendNote: "A significant share of Port Vila visitors sit in premium spend bands.",
    stay: "7 nights",
    stayDetail: "Average length of stay",
    recommend: 98,
    premiumSpendShare: 38,
  },
  son: {
    id: "son",
    name: "Santo",
    airport: "Santo-Pekoa International",
    iata: "SON",
    origins: [
      { name: "Australia", pct: 73 },
      { name: "New Zealand", pct: 11 },
      { name: "Other markets", pct: 16 },
    ],
    purpose: [
      { name: "Holiday", short: "Holiday", pct: 54 },
      { name: "Visiting friends & relatives", short: "VFR", pct: 24 },
      { name: "Business", short: "Business", pct: 6 },
      { name: "Other", short: "Other", pct: 16 },
    ],
    satisfaction: [
      { name: "Customs", pct: 75 },
      { name: "Accommodation", pct: 72 },
      { name: "Biosecurity", pct: 61 },
    ],
    spend: [
      { label: "VUV 10–29K", pct: 27 },
      { label: "VUV 30–69K", pct: 21 },
      { label: "VUV 70–99K", pct: 19 },
      { label: "VUV 100–299K", pct: 17 },
      { label: "VUV 300–400K", pct: 13 },
    ],
    spendNote:
      "Fewer high-end spenders than Port Vila — under 15% report VUV 300K+.",
    stay: "7–8 nights",
    stayDetail: "Direct Brisbane flight, twice weekly",
    recommend: 100,
    premiumSpendShare: 13,
  },
};

export const spendBandsNormalized = [
  {
    band: "Under 100K",
    vli: 21,
    son: 67,
  },
  {
    band: "100–299K",
    vli: 41,
    son: 17,
  },
  {
    band: "300K+",
    vli: 38,
    son: 13,
  },
];

export const insights = [
  {
    id: "australia",
    title: "Australia still carries the market",
    body: "Both gateways depend on Australia — 70% of Port Vila arrivals and 73% of Santo arrivals. New Zealand is a larger Santo share (11% vs 6%).",
  },
  {
    id: "vfr",
    title: "Santo is a VFR destination",
    body: "Visiting friends and relatives is 24% of Santo trips versus 5% in Port Vila. Holiday still leads Santo (54%), but the mix is far more mixed.",
  },
  {
    id: "spend",
    title: "Port Vila draws the premium spend",
    body: "38% of Port Vila visitors spend VUV 300K or more, against 13% in Santo. Santo’s largest band is VUV 10–29K (27%).",
  },
  {
    id: "service",
    title: "Service gaps differ by island",
    body: "Port Vila scores well on immigration (85%) and customs (84%), but internet (67%) and retail (65%) need work. Santo’s lowest score is biosecurity (61%).",
  },
];

export const source =
  "Vanuatu Airport Consent Surveys, Q1 2026 report. Ongoing surveys Q2–Q3.";

export type ReportPage = "cover" | AirportId | "compare";

export const airportPages: Record<
  AirportId,
  {
    island: string;
    headline: string;
    deck: string;
    story: string;
    notes: { title: string; body: string }[];
  }
> = {
  vli: {
    island: "Efate",
    headline: "The leisure gateway",
    deck: "Port Vila remains Vanuatu’s holiday airport — short stays, high spend, and almost everyone would recommend the trip.",
    story:
      "Nine in ten Bauerfield visitors are on holiday. Australia still supplies most arrivals, but the spend mix is the story: more than a third of visitors report VUV 300K or more. Border services score well; the stay experience is weaker on internet and retail.",
    notes: [
      {
        title: "Holiday first",
        body: "89% of trips are holidays. VFR and business together are only 9%.",
      },
      {
        title: "Premium spend",
        body: "38% spend VUV 300K+. The 150–299K band is the single largest group at 23%.",
      },
      {
        title: "Fix the visitor plant",
        body: "Immigration 85% and customs 84% sit well above accommodation (68%), internet (67%), and retail (65%).",
      },
    ],
  },
  son: {
    island: "Espiritu Santo",
    headline: "Friends, family, and the north",
    deck: "Santo is a different visitor economy — stronger VFR, longer stays, and a market still flying in on a twice-weekly Brisbane service.",
    story:
      "Holiday is still the largest purpose (54%), but visiting friends and relatives is now 24% — far above Port Vila’s 5%. Spend sits lower, with the biggest band at VUV 10–29K. Advocacy is perfect this quarter: every Santo respondent would recommend the visit.",
    notes: [
      {
        title: "VFR is the tell",
        body: "24% of Santo trips are VFR versus 5% in Port Vila. The north is a people destination, not only a holiday one.",
      },
      {
        title: "Australia, twice a week",
        body: "73% of visitors are Australian. The direct Brisbane flight runs twice weekly and matches a 7–8 night stay.",
      },
      {
        title: "Watch biosecurity",
        body: "Customs (75%) and accommodation (72%) lead. Biosecurity is the soft score at 61%.",
      },
    ],
  },
};

import type { AgentFormValues, CampaignFormValues } from "@/lib/schemas";

export type Campaign = CampaignFormValues & {
  id: string;
  agents: number;
  leads: number;
  conversionRate: number;
  lastHit: string;
};

export type Agent = AgentFormValues & {
  id: string;
  assignedToday: number;
  totalAssigned: number;
  responseRate: number;
};

export const campaigns: Campaign[] = [
  {
    id: "cmp-001",
    name: "Konsultasi Produk",
    slug: "konsultasi-produk",
    status: "active",
    rotationMode: "round_robin",
    linkMode: "standard",
    messageTemplate:
      "Halo {agent}, saya ingin konsultasi produk dari campaign {campaign}.",
    fallbackPhone: "+628123000111",
    timezone: "Asia/Jakarta",
    trafficCapPerDay: 300,
    conversionGoal: "qualified_lead",
    agents: 4,
    leads: 1268,
    conversionRate: 38,
    lastHit: "8 menit lalu",
  },
  {
    id: "cmp-002",
    name: "Promo Reseller",
    slug: "promo-reseller",
    status: "active",
    rotationMode: "percentage",
    linkMode: "deep_link",
    messageTemplate:
      "Halo, saya tertarik daftar reseller. Mohon dibantu oleh {agent}.",
    fallbackPhone: "+628123000222",
    timezone: "Asia/Jakarta",
    trafficCapPerDay: 120,
    conversionGoal: "reseller_signup",
    agents: 3,
    leads: 742,
    conversionRate: 31,
    lastHit: "21 menit lalu",
  },
  {
    id: "cmp-003",
    name: "Support After Sales",
    slug: "support-after-sales",
    status: "inactive",
    rotationMode: "least_assigned",
    linkMode: "standard",
    messageTemplate: "Halo {agent}, saya butuh bantuan after sales.",
    fallbackPhone: "+628123000333",
    timezone: "Asia/Jakarta",
    trafficCapPerDay: 0,
    conversionGoal: "support_ticket",
    agents: 2,
    leads: 298,
    conversionRate: 44,
    lastHit: "2 hari lalu",
  },
];

export const agents: Agent[] = [
  {
    id: "agt-001",
    name: "Rina CS",
    phone: "+6281211112222",
    countryCode: "ID",
    status: "active",
    enableSchedule: true,
    schedule: [
      { day: "Mon-Fri", start: "08:00", end: "17:00" },
      { day: "Sat", start: "09:00", end: "14:00" },
    ],
    dailyLimit: 80,
    priority: 1,
    percentageWeight: 35,
    assignedToday: 42,
    totalAssigned: 1342,
    responseRate: 96,
  },
  {
    id: "agt-002",
    name: "Bima Sales",
    phone: "+6281399998888",
    countryCode: "ID",
    status: "active",
    enableSchedule: true,
    schedule: [{ day: "Mon-Sun", start: "10:00", end: "21:00" }],
    dailyLimit: 100,
    priority: 2,
    percentageWeight: 45,
    assignedToday: 57,
    totalAssigned: 1620,
    responseRate: 91,
  },
  {
    id: "agt-003",
    name: "Dewi Support",
    phone: "+6285777776666",
    countryCode: "ID",
    status: "inactive",
    enableSchedule: false,
    schedule: [],
    dailyLimit: 0,
    priority: 3,
    percentageWeight: 20,
    assignedToday: 0,
    totalAssigned: 814,
    responseRate: 88,
  },
];

export const analytics = [
  { date: "Sen", leads: 126, routed: 118 },
  { date: "Sel", leads: 148, routed: 141 },
  { date: "Rab", leads: 132, routed: 129 },
  { date: "Kam", leads: 176, routed: 165 },
  { date: "Jum", leads: 194, routed: 182 },
  { date: "Sab", leads: 168, routed: 159 },
  { date: "Min", leads: 121, routed: 117 },
];

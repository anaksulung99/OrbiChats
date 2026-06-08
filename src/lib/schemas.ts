import { z } from "zod";

export const rotationModes = [
  "round_robin",
  "equal_distribution",
  "percentage",
  "least_assigned",
  "random",
] as const;

export const rotationModeLabels: Record<(typeof rotationModes)[number], string> = {
  round_robin: "Round Robin",
  equal_distribution: "Sama Rata",
  percentage: "Percentage",
  least_assigned: "Least Assigned",
  random: "Random",
};

export const campaignSchema = z.object({
  name: z.string().min(3, "Nama group minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9-]+$/, "Gunakan huruf kecil, angka, dan tanda -"),
  status: z.enum(["active", "inactive"]),
  rotationMode: z.enum(rotationModes),
  linkMode: z.enum(["deep_link", "standard"]),
  messageTemplate: z.string().min(10, "Template pesan terlalu pendek"),
  fallbackPhone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Nomor fallback tidak valid"),
  timezone: z.string().min(3),
  trafficCapPerDay: z.coerce.number().int().min(0),
  conversionGoal: z.string().min(3),
});

export const scheduleSchema = z.object({
  day: z.string().min(1),
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/),
});

export const agentSchema = z.object({
  name: z.string().min(3, "Nama agent minimal 3 karakter"),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Nomor wajib format internasional"),
  countryCode: z.string().min(2).max(3),
  status: z.enum(["active", "inactive"]),
  enableSchedule: z.boolean(),
  schedule: z.array(scheduleSchema),
  dailyLimit: z.coerce.number().int().min(0),
  priority: z.coerce.number().int().min(1).max(10),
  percentageWeight: z.coerce.number().int().min(1).max(100),
});

export const profileSchema = z.object({
  name: z.string().min(3),
  email: z.email("Email tidak valid"),
});

export const securitySchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const authSchemas = {
  login: z.object({
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
  }),
  forgot: z.object({
    email: z.email("Email tidak valid"),
  }),
  reset: z
    .object({
      password: z.string().min(8, "Password minimal 8 karakter"),
      confirmPassword: z.string().min(8),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: "Konfirmasi password tidak sama",
      path: ["confirmPassword"],
    }),
};

export type CampaignFormValues = z.infer<typeof campaignSchema>;
export type AgentFormValues = z.infer<typeof agentSchema>;

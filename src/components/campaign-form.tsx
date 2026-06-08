"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  campaignSchema,
  type CampaignFormValues,
  rotationModeLabels,
  rotationModes,
} from "@/lib/schemas";

const defaultValues: CampaignFormValues = {
  name: "",
  slug: "",
  status: "active",
  rotationMode: "round_robin",
  linkMode: "standard",
  messageTemplate: "Halo {agent}, saya ingin bertanya tentang {campaign}.",
  fallbackPhone: "+6281230000000",
  timezone: "Asia/Jakarta",
  trafficCapPerDay: 0,
  conversionGoal: "qualified_lead",
};

type FormErrors = Partial<Record<keyof CampaignFormValues, string>>;

export function CampaignForm({
  initialValues,
}: {
  initialValues?: CampaignFormValues;
}) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);
  const values = useMemo(() => initialValues ?? defaultValues, [initialValues]);
  const form = useForm<CampaignFormValues>({ defaultValues: values });
  const status = useWatch({ control: form.control, name: "status" });
  const slug = useWatch({ control: form.control, name: "slug" });
  const isActive = status === "active";

  function onSubmit(data: CampaignFormValues) {
    const parsed = campaignSchema.safeParse(data);

    if (!parsed.success) {
      setErrors(
        Object.fromEntries(
          parsed.error.issues.map((issue) => [
            issue.path[0],
            issue.message,
          ])
        ) as FormErrors
      );
      setSaved(false);
      return;
    }

    setErrors({});
    setSaved(true);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Informasi Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nama Group</FieldLabel>
              <Input id="name" {...form.register("name")} placeholder="Konsultasi Produk" />
              <FieldError>{errors.name}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="slug">Custom Slug</FieldLabel>
              <Input id="slug" {...form.register("slug")} placeholder="konsultasi-produk" />
              <FieldDescription>Public URL: /r/{slug || "custom-slug"}</FieldDescription>
              <FieldError>{errors.slug}</FieldError>
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="rotationMode">Metode Rotasi</FieldLabel>
                <select
                  id="rotationMode"
                  {...form.register("rotationMode")}
                  className="h-9 rounded-lg border bg-background px-3 text-sm"
                >
                  {rotationModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {rotationModeLabels[mode]}
                    </option>
                  ))}
                </select>
                <FieldError>{errors.rotationMode}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="linkMode">Link WhatsApp</FieldLabel>
                <select
                  id="linkMode"
                  {...form.register("linkMode")}
                  className="h-9 rounded-lg border bg-background px-3 text-sm"
                >
                  <option value="standard">Standard Global wa.me</option>
                  <option value="deep_link">Deep Link whatsapp://</option>
                </select>
                <FieldError>{errors.linkMode}</FieldError>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="messageTemplate">Template Pesan Chat</FieldLabel>
              <Textarea
                id="messageTemplate"
                rows={5}
                {...form.register("messageTemplate")}
                placeholder="Halo {agent}, saya ingin bertanya tentang {campaign}."
              />
              <FieldDescription>Variable tersedia: {"{agent}"} dan {"{campaign}"}.</FieldDescription>
              <FieldError>{errors.messageTemplate}</FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-6">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Routing</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field orientation="horizontal">
                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    form.setValue("status", checked ? "active" : "inactive")
                  }
                />
                <div>
                  <FieldLabel>Status Active</FieldLabel>
                  <FieldDescription>Campaign non-active tidak menerima traffic.</FieldDescription>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="fallbackPhone">Fallback Number</FieldLabel>
                <Input id="fallbackPhone" {...form.register("fallbackPhone")} />
                <FieldError>{errors.fallbackPhone}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="trafficCapPerDay">Daily Traffic Cap</FieldLabel>
                <Input id="trafficCapPerDay" type="number" {...form.register("trafficCapPerDay")} />
                <FieldDescription>Isi 0 untuk tanpa limit.</FieldDescription>
                <FieldError>{errors.trafficCapPerDay}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
                <Input id="timezone" {...form.register("timezone")} />
                <FieldError>{errors.timezone}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="conversionGoal">Conversion Goal</FieldLabel>
                <Input id="conversionGoal" {...form.register("conversionGoal")} />
                <FieldError>{errors.conversionGoal}</FieldError>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <CheckCircle2 className="size-4" />
          Simpan Campaign
        </Button>
        {saved && <p className="text-sm text-emerald-700">Draft campaign valid dan siap disimpan ke database.</p>}
      </div>
    </form>
  );
}

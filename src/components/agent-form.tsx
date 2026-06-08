"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Save } from "lucide-react";

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
import { agentSchema, type AgentFormValues } from "@/lib/schemas";

const defaultValues: AgentFormValues = {
  name: "",
  phone: "+6281230000000",
  countryCode: "ID",
  status: "active",
  enableSchedule: true,
  schedule: [{ day: "Mon-Fri", start: "08:00", end: "17:00" }],
  dailyLimit: 80,
  priority: 1,
  percentageWeight: 25,
};

type FormErrors = Partial<Record<keyof AgentFormValues, string>>;

export function AgentForm({ initialValues }: { initialValues?: AgentFormValues }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);
  const values = useMemo(() => initialValues ?? defaultValues, [initialValues]);
  const form = useForm<AgentFormValues>({ defaultValues: values });
  const enabled = useWatch({ control: form.control, name: "enableSchedule" });
  const status = useWatch({ control: form.control, name: "status" });
  const active = status === "active";

  function onSubmit(data: AgentFormValues) {
    const schedule = enabled ? data.schedule : [];
    const parsed = agentSchema.safeParse({ ...data, schedule });

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
          <CardTitle>Informasi Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nama Agent</FieldLabel>
              <Input id="name" {...form.register("name")} placeholder="Rina CS" />
              <FieldError>{errors.name}</FieldError>
            </Field>
            <div className="grid gap-4 md:grid-cols-[120px_1fr]">
              <Field>
                <FieldLabel htmlFor="countryCode">Country</FieldLabel>
                <Input id="countryCode" {...form.register("countryCode")} />
                <FieldError>{errors.countryCode}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Nomor WhatsApp</FieldLabel>
                <Input id="phone" {...form.register("phone")} placeholder="+6281211112222" />
                <FieldDescription>Gunakan format internasional, contoh +62812...</FieldDescription>
                <FieldError>{errors.phone}</FieldError>
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="dailyLimit">Daily Limit</FieldLabel>
                <Input id="dailyLimit" type="number" {...form.register("dailyLimit")} />
                <FieldError>{errors.dailyLimit}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="priority">Priority</FieldLabel>
                <Input id="priority" type="number" {...form.register("priority")} />
                <FieldError>{errors.priority}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="percentageWeight">Weight %</FieldLabel>
                <Input id="percentageWeight" type="number" {...form.register("percentageWeight")} />
                <FieldError>{errors.percentageWeight}</FieldError>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-6">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Schedule & Status</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field orientation="horizontal">
                <Switch
                  checked={active}
                  onCheckedChange={(checked) =>
                    form.setValue("status", checked ? "active" : "inactive")
                  }
                />
                <div>
                  <FieldLabel>Status Active</FieldLabel>
                  <FieldDescription>Agent inactive tidak ikut rotasi.</FieldDescription>
                </div>
              </Field>
              <Field orientation="horizontal">
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => form.setValue("enableSchedule", checked)}
                />
                <div>
                  <FieldLabel>Enable Schedule</FieldLabel>
                  <FieldDescription>Batasi agent sesuai hari dan jam kerja.</FieldDescription>
                </div>
              </Field>
              {enabled && (
                <div className="grid gap-3 rounded-lg border p-3">
                  <Field>
                    <FieldLabel htmlFor="scheduleDay">Days</FieldLabel>
                    <Input id="scheduleDay" {...form.register("schedule.0.day")} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="scheduleStart">Start</FieldLabel>
                      <Input id="scheduleStart" type="time" {...form.register("schedule.0.start")} />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="scheduleEnd">End</FieldLabel>
                      <Input id="scheduleEnd" type="time" {...form.register("schedule.0.end")} />
                    </Field>
                  </div>
                </div>
              )}
            </FieldGroup>
          </CardContent>
        </Card>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="size-4" />
          Simpan Agent
        </Button>
        {saved && <p className="text-sm text-emerald-700">Draft agent valid dan siap disimpan ke database.</p>}
      </div>
    </form>
  );
}

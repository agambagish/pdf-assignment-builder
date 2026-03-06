import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { INSTITUTES } from "@/lib/constants";
import type { AssignmentBuilderSchema } from "@/lib/schemas";

interface Props {
  form: UseFormReturn<AssignmentBuilderSchema>;
}

export function SelectTemplateStep({ form }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Controller
        control={form.control}
        name="instituteId"
        render={({ field, fieldState }) => (
          <RadioGroup
            name={field.name}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            {Object.keys(INSTITUTES).map((i) => (
              <Label
                className="flex items-start gap-2 border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
                key={i}
              >
                <RadioGroupItem
                  value={i}
                  id={`assignment-form-radiogroup-${i}`}
                  aria-invalid={fieldState.invalid}
                />
                <div className="flex flex-col gap-1 uppercase">
                  <p className="font-semibold">{i.split("_")[0]}</p>
                  <p className="text-muted-foreground text-xs">
                    {i.split("_")[1]}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
}

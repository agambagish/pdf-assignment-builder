import type { FieldPath, UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { INSTITUTES } from "@/lib/constants";
import type {
  AssignmentBuilderSchema,
  InstituteTemplateSchema,
} from "@/lib/schemas";

interface Props {
  instituteId: AssignmentBuilderSchema["instituteId"];
  form: UseFormReturn<AssignmentBuilderSchema>;
}

export function FillDetailsStep({ form, instituteId }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(INSTITUTES[instituteId]).map(
        ([field, { label, inputPlaceholder }], i) => (
          <Controller
            key={i.toString()}
            control={form.control}
            name={field as FieldPath<InstituteTemplateSchema>}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  placeholder={inputPlaceholder}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ),
      )}
    </div>
  );
}

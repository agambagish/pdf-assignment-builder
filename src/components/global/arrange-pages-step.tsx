import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";
import type { AssignmentBuilderSchema } from "@/lib/schemas";

import { PageOrganizer } from "./page-organizer";

interface Props {
  form: UseFormReturn<AssignmentBuilderSchema>;
}

export function ArrangePagesStep({ form }: Props) {
  return (
    <Controller
      control={form.control}
      name="files"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <PageOrganizer
            value={[
              {
                id: "frontpage",
                type: "frontpage",
              },
              ...field.value,
            ]}
            onChange={field.onChange}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

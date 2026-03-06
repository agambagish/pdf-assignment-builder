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
      render={({ field, fieldState }) => {
        // biome-ignore lint/suspicious/noExplicitAny: _
        function onReorder(newPages: any[]) {
          const filesOnly = newPages.filter((p) => p.type !== "frontpage");
          field.onChange(filesOnly);
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <PageOrganizer
              value={[
                {
                  id: "frontpage",
                  type: "frontpage",
                },
                ...field.value,
              ]}
              onChange={onReorder}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import type { AssignmentBuilderSchema } from "@/lib/schemas";

interface Props {
  form: UseFormReturn<AssignmentBuilderSchema>;
}

export function ExportStep({ form }: Props) {
  return (
    <div className="space-y-4">
      <Controller
        control={form.control}
        name="exportTitle"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>PDF Title</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="John Doe_16800123180"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>.pdf</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

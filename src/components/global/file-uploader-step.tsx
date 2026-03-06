import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";
import type { AssignmentBuilderSchema } from "@/lib/schemas";

import { FileUploader } from "./file-uploader";

interface Props {
  form: UseFormReturn<AssignmentBuilderSchema>;
}

export function FileUploaderStep({ form }: Props) {
  return (
    <Controller
      control={form.control}
      name="files"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FileUploader value={field.value} onChange={field.onChange} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

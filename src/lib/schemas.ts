import z from "zod";

export const baseSchema = z.object({
  files: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(["image", "pdf"]),
        data: z.object({
          url: z.string(),
          imageName: z.string().optional(),
          pdfUrl: z.string().optional(),
        }),
      }),
    )
    .refine((files) => {
      const images = files.filter((f) => f.type === "image");
      const pdfs = files.filter((f) => f.type === "pdf");

      if (images.length > 0 && pdfs.length === 0) return true;
      if (pdfs.length === 1 && images.length === 0) return true;

      return false;
    }, "Upload either multiple images OR a single PDF"),
});

export const instituteTemplateSchema = z.discriminatedUnion("instituteId", [
  z.object({
    instituteId: z.literal("FIEM_MAKAUT"),
    fullName: z.string().min(3),
    rollNo: z.string().min(5),
    paperName: z.string().nonempty(),
    paperCode: z.string().nonempty(),
    semester: z.string().nonempty(),
  }),
]);

export const assignmentBuilderSchema = baseSchema.and(instituteTemplateSchema);

export type BaseSchema = z.infer<typeof baseSchema>;
export type InstituteTemplateSchema = z.infer<typeof instituteTemplateSchema>;
export type AssignmentBuilderSchema = z.infer<typeof assignmentBuilderSchema>;

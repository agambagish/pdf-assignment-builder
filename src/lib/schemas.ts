import z from "zod";

import { SEMESTERS } from "./constants";

export const baseSchema = z.object({
  images: z.array(z.instanceof(File)),
});

export const instituteTemplateSchema = z.discriminatedUnion("instituteId", [
  z.object({
    instituteId: z.literal("FIEM_MAKAUT"),
    fullName: z.string().min(3),
    rollNo: z.string().min(5),
    paperName: z.string().nonempty(),
    paperCode: z.string().nonempty(),
    semester: z.enum(SEMESTERS),
  }),
]);

export const assignmentBuilderSchema = baseSchema.and(instituteTemplateSchema);

export type BaseSchema = z.infer<typeof baseSchema>;
export type InstituteTemplateSchema = z.infer<typeof instituteTemplateSchema>;
export type AssignmentBuilderSchema = z.infer<typeof assignmentBuilderSchema>;

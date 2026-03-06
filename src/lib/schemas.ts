import z from "zod";

import { SEMESTERS } from "./constants";

export const assignmentBuilderSchema = z.discriminatedUnion("instituteId", [
  z.object({
    instituteId: z.literal("fiem-makaut"),
    fullName: z.string().min(3),
    rollNo: z.string().min(5),
    paperName: z.string().nonempty(),
    paperCode: z.string().nonempty(),
    semester: z.enum(SEMESTERS),
  }),
]);

export type AssignmentBuilderSchema = z.infer<typeof assignmentBuilderSchema>;

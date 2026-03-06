import type { AssignmentBuilderSchema } from "./schemas";

type InstituteSchema<I extends AssignmentBuilderSchema["instituteId"]> =
  Extract<AssignmentBuilderSchema, { instituteId: I }>;

export type InstituteFields = {
  [I in AssignmentBuilderSchema["instituteId"]]: Array<
    keyof Omit<InstituteSchema<I>, "instituteId">
  >;
};

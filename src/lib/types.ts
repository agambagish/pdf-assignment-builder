import type { InstituteTemplateSchema } from "./schemas";

type InstituteSchema<I extends InstituteTemplateSchema["instituteId"]> =
  Extract<InstituteTemplateSchema, { instituteId: I }>;

export type InstituteFields = {
  [I in InstituteTemplateSchema["instituteId"]]: {
    [K in keyof Omit<InstituteSchema<I>, "instituteId">]: {
      label: string;
      placeholder: string;
      inputPlaceholder?: string;
    };
  };
};

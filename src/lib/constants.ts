import type { InstituteFields } from "./types";

export const SEMESTERS = [
  "1st Sem",
  "2nd Sem",
  "3rd Sem",
  "4th Sem",
  "5th Sem",
  "6th Sem",
  "7th Sem",
  "8th Sem",
] as const;

export const INSTITUTES: InstituteFields = {
  "fiem-makaut": ["fullName", "rollNo", "paperName", "paperCode", "semester"],
};

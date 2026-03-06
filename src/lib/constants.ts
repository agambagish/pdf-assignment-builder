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
  FIEM_MAKAUT: {
    fullName: {
      label: "Full Name",
      placeholder: "{{FULL_NAME}}",
    },
    rollNo: {
      label: "Roll Number",
      placeholder: "{{ROLL_NUMBER}}",
    },
    paperName: {
      label: "Paper Name",
      placeholder: "{{PAPER_NAME}}",
    },
    paperCode: {
      label: "Paper Code",
      placeholder: "{{PAPER_CODE}}",
    },
    semester: {
      label: "Semester",
      placeholder: "{{SEMESTER}}",
    },
  },
};

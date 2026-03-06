import type { InstituteFields } from "./types";

export const INSTITUTES: InstituteFields = {
  FIEM_MAKAUT: {
    fullName: {
      label: "Full Name",
      placeholder: "{{FULL_NAME}}",
      inputPlaceholder: "e.g. John Doe",
    },
    rollNo: {
      label: "Roll Number",
      placeholder: "{{ROLL_NUMBER}}",
      inputPlaceholder: "e.g. 16800123180",
    },
    paperName: {
      label: "Paper Name",
      placeholder: "{{PAPER_NAME}}",
      inputPlaceholder: "e.g. Data Structure & Algorithm",
    },
    paperCode: {
      label: "Paper Code",
      placeholder: "{{PAPER_CODE}}",
      inputPlaceholder: "e.g. PCC-CS301",
    },
    semester: {
      label: "Semester",
      placeholder: "{{SEMESTER}}",
      inputPlaceholder: "e.g. 1st Sem",
    },
  },
};

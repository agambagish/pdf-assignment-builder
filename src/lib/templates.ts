import { SEMESTERS } from "./constants";

type Template = {
  id: string;
  college: string;
  university: string;
  docName: string;
  fields: Array<
    | {
        label: string;
        placeholder: string;
        type: "string";
      }
    | {
        label: string;
        placeholder: string;
        type: "select";
        options: string[];
      }
  >;
};

export const TEMPLATES: Array<Template> = [
  {
    id: "1",
    college: "FIEM",
    university: "MAKAUT",
    docName: "fiem-makaut-148.docx",
    fields: [
      {
        label: "Full Name",
        placeholder: "{{FULLNAME}}",
        type: "string",
      },
      {
        label: "Roll Number",
        placeholder: "{{ROLL_NUMBER}}",
        type: "string",
      },
      {
        label: "Subject",
        placeholder: "{{SUBJECT}}",
        type: "string",
      },
      {
        label: "Semester",
        placeholder: "{{SEMESTER}}",
        type: "select",
        options: SEMESTERS,
      },
    ],
  },
];

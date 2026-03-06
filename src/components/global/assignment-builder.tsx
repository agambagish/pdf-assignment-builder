import type { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldPath } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INSTITUTES } from "@/lib/constants";
import type { AssignmentBuilderSchema } from "@/lib/schemas";
import { assignmentBuilderSchema } from "@/lib/schemas";

import { FillDetailsStep } from "./fill-details-step";
import { SelectTemplateStep } from "./select-template-step";

const steps = [
  {
    title: "Step 1: Select Template",
    description: "Choose your college or institution template",
    buttonText: "Continue",
  },
  {
    title: "Step 2: Fill Your Details",
    description: "Enter your information for the frontpage",
    buttonText: "Generate Frontpage",
  },
] as const;

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export function AssignmentBuilder({ currentStep, setCurrentStep }: Props) {
  const form = useForm<AssignmentBuilderSchema>({
    resolver: zodResolver(assignmentBuilderSchema),
    mode: "onChange",
  });

  const instituteId = form.watch("instituteId");

  function onSubmit(values: AssignmentBuilderSchema) {}

  function onBack() {
    if (currentStep === 0) return;
    setCurrentStep((v) => v - 1);
  }

  async function onContinue() {
    if (currentStep === 0 && !instituteId) return;

    if (
      currentStep === 1 &&
      !(await form.trigger(
        Object.keys(
          INSTITUTES[instituteId],
        ) as FieldPath<AssignmentBuilderSchema>[],
        { shouldFocus: true },
      ))
    )
      return;

    setCurrentStep((v) => v + 1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 0 && <SelectTemplateStep form={form} />}
          {currentStep === 1 && (
            <FillDetailsStep form={form} instituteId={instituteId} />
          )}
        </form>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-1" onClick={onContinue}>
          {steps[currentStep].buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

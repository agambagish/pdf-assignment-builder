"use client";

import { useState } from "react";

import { SelectTemplateStep } from "@/components/global/select-template-step";
import { StepIndicator } from "@/components/global/step-indicator";

export default function () {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-4xl tracking-tight">
            PDF Assignment Builder
          </h1>
          <p className="text-muted-foreground">
            Create your assignment with frontpage and documents in minutes
          </p>
        </div>
        <StepIndicator
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {currentStep === 1 && (
          <SelectTemplateStep setCurrentStep={setCurrentStep} />
        )}
      </div>
    </div>
  );
}

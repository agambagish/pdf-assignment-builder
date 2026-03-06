import type { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export function StepIndicator({ currentStep, setCurrentStep }: Props) {
  const steps = [0, 1, 2, 3, 4];

  return (
    <div className="flex justify-center">
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {steps.map((step) => (
          <div key={step} className="flex min-w-max items-center gap-2">
            <Button
              variant={currentStep >= step ? "secondary" : "outline"}
              size="sm"
              className="h-10 w-10 rounded-full p-0"
              onClick={() => step <= currentStep && setCurrentStep(step)}
            >
              {step + 1}
            </Button>
            {step < steps.length - 1 && (
              <div
                className={`h-1 w-8 ${
                  currentStep >= step + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

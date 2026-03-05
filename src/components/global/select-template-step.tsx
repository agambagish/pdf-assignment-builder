"use client";

import type { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TEMPLATES } from "@/lib/templates";

interface Props {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const selectedId = "1";

export function SelectTemplateStep({ setCurrentStep }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Select Template</CardTitle>
        <CardDescription>
          Choose your college or institution template
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {TEMPLATES.map((template) => (
            <Card
              key={template.college}
              className={`cursor-pointer transition-all ${
                selectedId === template.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "hover:border-primary/50"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {template.college}
                    </CardTitle>
                    <CardDescription>{template.university}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" disabled className="flex-1">
          Back
        </Button>
        <Button onClick={() => setCurrentStep(2)} className="flex-1">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

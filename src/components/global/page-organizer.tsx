"use client";

import { useState } from "react";

import { BookType, File, Image as ImageIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PageItem {
  id: string;
  type: "frontpage" | "image" | "pdf";
  data?: {
    url?: string;
    pdfUrl?: string;
    imageName?: string;
  };
}

interface Props {
  value?: PageItem[];
  onChange?: (pages: PageItem[]) => void;
}

export function PageOrganizer({ value = [], onChange }: Props) {
  const pages = value;
  const [draggedId, setDraggedId] = useState<string | null>(null);

  function updatePages(newPages: PageItem[]) {
    onChange?.(newPages);
  }

  function handleDragStart(id: string) {
    setDraggedId(id);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return;

    const draggedIdx = pages.findIndex((p) => p.id === draggedId);
    const targetIdx = pages.findIndex((p) => p.id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const newPages = [...pages];
    const [draggedPage] = newPages.splice(draggedIdx, 1);
    newPages.splice(targetIdx, 0, draggedPage);

    updatePages(newPages);
    setDraggedId(null);
  }

  function handleRemove(id: string) {
    updatePages(pages.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-4">
      {pages.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No pages yet. Upload files or generate a frontpage.
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {pages.map((page) => (
            <Card
              key={page.id}
              draggable={page.type !== "frontpage"}
              onDragStart={() => handleDragStart(page.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(page.id)}
              className={cn(
                "relative cursor-move p-4",
                draggedId === page.id && "bg-muted opacity-50",
              )}
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(page.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/10"
              >
                <Trash2 className="text-destructive" />
              </Button>
              <div className="flex flex-col items-start gap-2 pr-8">
                <div className="flex w-full items-start gap-3">
                  {page.type === "frontpage" ? (
                    <BookType className="mt-1 h-6 w-6 text-muted-foreground" />
                  ) : page.type === "pdf" ? (
                    <File className="mt-1 h-6 w-6 text-red-500" />
                  ) : (
                    <ImageIcon className="mt-1 h-6 w-6 text-blue-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">
                      {page.type === "frontpage"
                        ? "Frontpage"
                        : page.type === "pdf"
                          ? "PDF Document"
                          : page.data?.imageName || "Image"}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {page.type === "frontpage"
                        ? "Generated PDF"
                        : page.type === "pdf"
                          ? "Uploaded PDF"
                          : "Image"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { useRef, useState } from "react";

import { CloudUpload, File, ImageIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PageItem {
  id: string;
  type: "image" | "pdf";
  data: {
    url: string;
    imageName?: string;
    pdfUrl?: string;
  };
}

interface Props {
  value?: PageItem[];
  onChange?: (files: PageItem[]) => void;
}

export function FileUploader({ value = [], onChange }: Props) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList) {
    setError("");
    const newPages: PageItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isPDF = file.type === "application/pdf";
      const isImage = file.type.startsWith("image/");

      if (!isPDF && !isImage) {
        setError("Only images (JPG, PNG) and PDFs are allowed");
        continue;
      }

      const url = URL.createObjectURL(file);

      newPages.push({
        id: `${file.name}-${Date.now()}`,
        type: isPDF ? "pdf" : "image",
        data: {
          url,
          imageName: file.name,
          pdfUrl: isPDF ? url : undefined,
        },
      });
    }

    if (newPages.length) {
      onChange?.([...value, ...newPages]);
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }

  function removeFile(id: string) {
    onChange?.(value.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed p-8 text-center transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleChange}
          className="hidden"
        />
        <div className="space-y-2">
          <CloudUpload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div>
            <p className="font-medium">Drag files here or click to browse</p>
            <p className="text-muted-foreground text-sm">
              Upload images (JPG, PNG) or PDF files
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Files
          </Button>
        </div>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {value.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium text-sm">{value.length} file(s) uploaded</p>
          <div className="grid grid-cols-2 gap-4">
            {value.map((file) => (
              <Card key={file.id} className="relative p-4">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 hover:bg-destructive/10"
                >
                  <X className="text-destructive" />
                </Button>
                <div className="flex flex-col items-start gap-2 pr-8">
                  <div className="flex w-full items-start gap-3">
                    {file.type === "image" ? (
                      <ImageIcon className="mt-1 h-6 w-6 shrink-0 text-blue-500" />
                    ) : (
                      <File className="mt-1 h-6 w-6 shrink-0 text-red-500" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">
                        {file.data.imageName}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {file.type === "image" ? "Image" : "PDF"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

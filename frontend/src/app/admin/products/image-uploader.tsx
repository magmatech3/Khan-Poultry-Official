"use client";

import { useRef, useState } from "react";

export function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const upload = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be 5MB or smaller.");
      return;
    }
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(typeof reader.result === "string" ? reader.result : "");
      setBusy(false);
    };
    reader.onerror = () => {
      setUploadError("Could not read that image.");
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className="space-y-2">
      <label className="mb-1.5 block text-sm font-medium text-ink">Image</label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
          dragging ? "border-wood bg-wood/5" : "border-line bg-cream-light/40"
        }`}
      >
        <span className="text-sm font-semibold text-ink">{busy ? "Uploading…" : "Drag & drop an image here"}</span>
        <span className="text-xs text-ink-soft">
          or <span className="font-semibold text-wood">browse files</span> · JPG, PNG, WebP, GIF, AVIF · 5MB max
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
        />
      </div>

      {value && (
        <div className="flex items-center gap-3 rounded-xl border border-line bg-paper p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Product preview" className="h-16 w-16 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-ink-soft">{value}</p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-1 text-xs font-semibold text-danger hover:underline"
            >
              Remove image
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-ink-soft">
        <span>or paste a URL:</span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>

      {uploadError && <p className="text-xs font-medium text-danger">{uploadError}</p>}
    </div>
  );
}
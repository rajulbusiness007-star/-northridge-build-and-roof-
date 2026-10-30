import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

interface PhotoUploadProps {
  onPhotosChange: (files: { name: string; size: number; base64: string }[]) => void;
  maxFiles?: number;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotosChange, maxFiles = 4 }) => {
  const [photos, setPhotos] = useState<{ name: string; size: number; base64: string }[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/heic'].includes(file.type)) {
      setError('Please upload JPG, PNG, or WebP images only.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit. Please upload a smaller photo.');
      return;
    }
    if (photos.length >= maxFiles) {
      setError(`Maximum ${maxFiles} photos allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPhoto = {
        name: file.name,
        size: file.size,
        base64: reader.result as string,
      };
      const updated = [...photos, newPhoto];
      setPhotos(updated);
      onPhotosChange(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    onPhotosChange(updated);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-orange-500 bg-orange-50/50'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <div className="text-xs font-semibold text-slate-800">
          Click or drag &amp; drop photos of your roof or damage
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Supports JPG, PNG, WebP up to 10MB (Max {maxFiles} photos). High-resolution ground or attic photos welcome.
        </p>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg flex items-center gap-1.5 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {photos.map((p, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100">
              <img src={p.base64} alt={p.name} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(idx);
                }}
                className="absolute top-1 right-1 bg-slate-900/80 hover:bg-red-600 text-white p-1 rounded-full text-xs transition-colors cursor-pointer"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-[10px] text-white px-2 py-0.5 truncate">
                {p.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

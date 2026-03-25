"use client";

import * as React from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      label = 'Evidence (Optional)',
      description = 'PNG, JPG, PDF up to 10MB',
      accept = '.png,.jpg,.jpeg,.pdf',
      maxSizeMB = 10,
      id = 'file-upload',
      value = null,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Update filename when value prop changes
    React.useEffect(() => {
      if (value) {
        setFileName(value.name);
      } else {
        setFileName(null);
      }
    }, [value]);

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        handleFile(file);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        handleFile(file);
      }
    };

    const handleFile = (file: File) => {
      if (validateFile(file)) {
        setFileName(file.name);
        if (onChange) {
          onChange(file);
        }
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFileName(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      if (onChange) {
        onChange(null);
      }
    };

    const validateFile = (file: File): boolean => {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      const maxSize = (maxSizeMB || 10) * 1024 * 1024; // Convert MB to bytes

      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid file type (PNG, JPG, or PDF)');
        return false;
      }

      if (file.size > maxSize) {
        alert(`File size should not exceed ${maxSizeMB || 10}MB`);
        return false;
      }

      return true;
    };

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <label
          htmlFor={id}
          className={cn(
            'group relative flex flex-col items-center justify-center w-full h-32 px-4 py-6 text-sm transition-colors border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/20',
            isDragging ? 'border-primary bg-accent/10' : 'border-border',
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            {...{
              // Exclude custom props from being passed to the input element
              ...Object.fromEntries(
                Object.entries(props).filter(
                  ([key]) => !['maxSizeMB', 'label', 'description', 'value', 'onChange'].includes(key)
                )
              ),
              // Explicitly set the value to undefined to avoid React warning
              value: undefined
            }}
            ref={(node) => {
              // Handle both forwarded ref and our local ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }
              inputRef.current = node;
            }}
            id={id}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center text-center">
            <UploadCloud className="w-6 h-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="font-medium">
              {fileName ? (
                <span className="text-foreground">{fileName}</span>
              ) : (
                <>
                  <span className="text-foreground">Click to upload</span> or drag and drop
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
            {fileName && (
              <button
                type="button"
                onClick={handleRemove}
                className="mt-2 text-xs text-destructive hover:underline"
              >
                Remove file
              </button>
            )}
          </div>
        </label>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };

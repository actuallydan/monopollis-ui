import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Image, Video, Music, FileText } from 'lucide-react';
import { Button } from './Button';

interface FileWithPreview extends File {
  preview?: string;
}

interface FilePickerProps {
  label: string;
  onFilesSubmit?: (files: FileWithPreview[]) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  preview?: boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export const FilePicker: React.FC<FilePickerProps> = ({
  label,
  onFilesSubmit,
  multiple = false,
  accept,
  maxFiles = 10,
  maxSize,
  preview = false,
  description,
  error,
  disabled = false,
  required = false,
  className = '',
  id,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filePickerId = id || `filepicker-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${filePickerId}-description` : undefined;
  const errorId = error ? `${filePickerId}-error` : undefined;

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`;
    }
    return null;
  };

  const processFiles = useCallback((files: FileList | File[]): FileWithPreview[] => {
    const fileArray = Array.from(files);
    const validFiles: FileWithPreview[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
        return;
      }

      const fileWithPreview: FileWithPreview = file;
      
      if (preview && file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      validFiles.push(fileWithPreview);
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
    }

    return validFiles;
  }, [maxSize, preview]);

  const handleFileSelect = useCallback((files: FileList | File[]) => {
    if (disabled) return;

    const newFiles = processFiles(files);
    
    if (multiple) {
      const combinedFiles = [...selectedFiles, ...newFiles].slice(0, maxFiles);
      setSelectedFiles(combinedFiles);
    } else {
      setSelectedFiles(newFiles.slice(0, 1));
    }
  }, [selectedFiles, multiple, maxFiles, disabled, processFiles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter <= 0) {
        setIsDragOver(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files) {
      handleFileSelect(files);
    }
  }, [disabled, handleFileSelect]);

  const removeFile = (index: number) => {
    const file = selectedFiles[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = () => {
    if (onFilesSubmit) {
      onFilesSubmit(selectedFiles);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Music;
    if (file.type.includes('text') || file.type.includes('document')) return FileText;
    return File;
  };

  const baseClasses = `
    relative w-full
  `;

  const labelClasses = `
    block text-sm font-sans font-medium text-orange-300 mb-2
  `;

  const descriptionClasses = `
    mt-1 text-xs font-sans text-orange-300/80
  `;

  const errorClasses = `
    mt-1 text-xs font-sans text-red-400
  `;

  const dropzoneClasses = `
    w-full p-8 border-2 border-dashed rounded-md text-center transition-all duration-200
    font-sans text-base
    ${isDragOver
      ? 'border-orange-300 bg-orange-300/10'
      : 'border-orange-300/50 hover:border-orange-300/80 hover:bg-orange-300/5'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${error ? 'border-red-400' : ''}
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      <label htmlFor={filePickerId} className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      <div
        className={dropzoneClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={!!error}
      >
        <input
          ref={fileInputRef}
          id={filePickerId}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
          required={required}
        />
        
        <Upload className="w-8 h-8 text-orange-300 mx-auto mb-2" />
        <p className="text-orange-300 font-medium mb-1">
          {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-orange-300/80 text-sm">
          {multiple ? 'Multiple files allowed' : 'Single file only'}
          {accept && ` • ${accept}`}
          {maxSize && ` • Max ${formatFileSize(maxSize)}`}
        </p>
      </div>

      {/* File List */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-sans font-medium text-orange-300 text-sm">
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file: FileWithPreview, index: number) => {
              const FileIcon = getFileIcon(file);
              return (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 p-3 border border-orange-300/30 rounded-md bg-black"
                >
                  {preview && file.preview && file.type.startsWith('image/') ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded border border-orange-300/30"
                    />
                  ) : (
                    <FileIcon className="w-12 h-12 text-orange-300/80" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-orange-300 text-sm truncate">
                      {file.name}
                    </p>
                    <p className="font-sans text-orange-300/60 text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => removeFile(index)}
                    variant="secondary"
                    className="p-1 h-auto"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
          
          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="mt-3"
            disabled={selectedFiles.length === 0}
          >
            Submit Files
          </Button>
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-400/20 border border-yellow-400/50 rounded-md">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-yellow-400 text-sm">
              <p className="font-medium mb-1">File validation errors:</p>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {description && !error && (
        <p id={descriptionId} className={descriptionClasses}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={errorClasses} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}; 
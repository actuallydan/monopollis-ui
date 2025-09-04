import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Send,
  Plus,
  X,
  Image as ImageIcon,
  File as FileIcon,
} from "lucide-react";
import { Button } from "./Button";

export interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: "image" | "file";
}

interface ChatInputProps {
  onSend: (message: string, attachments: Attachment[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxAttachments?: number;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = "Type a message...",
  disabled = false,
  className = "",
  maxAttachments = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedFileTypes = ["image/*", ".pdf", ".doc", ".docx", ".txt"],
}) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dynamic height growth for textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current).lineHeight
      );
      const minHeight = lineHeight; // 1 row
      const maxHeight = lineHeight * 8; // 8 rows max
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message, attachments]);

  // Handle paste events for clipboard images/files
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    let hasFiles = false;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          handleFileAdd(file);
          hasFiles = true;
        }
      } else if (item.type.startsWith("text/")) {
        // Only let text paste if there are no files
        if (hasFiles) {
          e.preventDefault();
          return;
        }
        continue;
      } else {
        // Try to get as file
        const file = item.getAsFile();
        if (file) {
          handleFileAdd(file);
          hasFiles = true;
        }
      }
    }

    // If we found files, prevent the default paste behavior
    if (hasFiles) {
      e.preventDefault();
    }
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleFileAdd);
  }, []);

  // Handle file selection from input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(handleFileAdd);

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Add file to attachments
  const handleFileAdd = (file: File) => {
    if (attachments.length >= maxAttachments) {
      alert(`Maximum ${maxAttachments} attachments allowed`);
      return;
    }

    if (file.size > maxFileSize) {
      alert(
        `File ${file.name} is too large. Maximum size is ${formatFileSize(
          maxFileSize
        )}.`
      );
      return;
    }

    const attachment: Attachment = {
      id: `${Date.now()}-${Math.random()}`,
      file,
      type: file.type.startsWith("image/") ? "image" : "file",
    };

    // Generate preview for images
    if (attachment.type === "image") {
      const reader = new FileReader();
      reader.onload = (e) => {
        attachment.preview = e.target?.result as string;
        setAttachments((prev) => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    } else {
      setAttachments((prev) => [...prev, attachment]);
    }
  };

  // Remove attachment
  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  // Send message
  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;

    onSend(message.trim(), attachments);
    setMessage("");
    setAttachments([]);

    // Focus back to textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle Enter key (Shift+Enter for new line, Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return ImageIcon;
    if (file.type.includes("pdf")) return FileIcon;
    if (file.type.includes("document") || file.type.includes("text"))
      return FileIcon;
    return FileIcon;
  };

  const baseClasses = `
    w-full border-2 border-orange-300/50 rounded-md bg-black
    ${isDragOver ? "border-orange-300 bg-orange-300/5" : ""}
    ${className}
  `;

  const attachmentPreviewClasses = `
    flex items-center gap-2 p-2 border border-orange-300/30 rounded-md bg-black
    ${isDragOver ? "border-orange-300/60" : ""}
  `;

  return (
    <div className={baseClasses}>
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="p-3 border-b border-orange-300/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-300">
              Attachments ({attachments.length}/{maxAttachments})
            </span>
            <Button
              onClick={() => setAttachments([])}
              variant="secondary"
              className="text-xs px-2 py-1 h-auto"
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {attachments.map((attachment) => {
              const FileIconComponent = getFileIcon(attachment.file);
              return (
                <div key={attachment.id} className={attachmentPreviewClasses}>
                  {attachment.type === "image" && attachment.preview ? (
                    <img
                      src={attachment.preview}
                      alt={attachment.file.name}
                      className="w-12 h-12 object-cover rounded border border-orange-300/30"
                    />
                  ) : (
                    <FileIconComponent className="w-12 h-12 text-orange-300/80" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-orange-300 text-sm truncate">
                      {attachment.file.name}
                    </p>
                    <p className="font-sans text-orange-300/60 text-xs">
                      {formatFileSize(attachment.file.size)}
                    </p>
                  </div>

                  <Button
                    onClick={() => removeAttachment(attachment.id)}
                    variant="secondary"
                    className="p-1 h-auto"
                    aria-label={`Remove ${attachment.file.name}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3">
        <div className="flex gap-2 items-start">
          {/* Attachment picker button */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            disabled={disabled || attachments.length >= maxAttachments}
            className="px-3 py-2 h-auto flex-shrink-0"
            aria-label="Add attachment"
          >
            <Plus className="w-4 h-4" />
          </Button>

          {/* Growing textarea */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="w-full px-4 py-2 rounded-md resize-none font-sans text-base bg-black text-orange-300 placeholder-orange-300/50 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              rows={1}
              style={{ minHeight: '2.5rem' }}
              aria-label="Message input"
            />
          </div>

          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={disabled || (!message.trim() && attachments.length === 0)}
            className="px-4 py-2 h-auto flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          aria-label="File attachment input"
        />

        {/* Drag and drop hint */}
        {isDragOver && (
          <div className="mt-2 text-center text-sm text-orange-300/80">
            Drop files here to attach them
          </div>
        )}
      </div>
    </div>
  );
};

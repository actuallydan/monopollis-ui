import { useState } from "react";
import { ChatInput, Card, Paragraph, Divider, InlineAudioPlayer } from "../components";
import { FileIcon, ImageIcon, VideoIcon, FileTextIcon, Music } from "lucide-react";
import type { Attachment } from "../components/ChatInput";

export default function ChatInputShowcase() {
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: string;
      message: string;
      attachments: Array<{
        id: string;
        name: string;
        type: "image" | "file";
        size: number;
        url: string;
      }>;
      timestamp: Date;
      isOwn: boolean;
    }>
  >([
    {
      id: "1",
      message: "Hello world! How are you doing today?",
      attachments: [],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: "2", 
      message: "Hi back! I'm doing great, thanks for asking.",
      attachments: [],
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
    },
    {
      id: "3",
      message: "Check out this cool image I found",
      attachments: [
        { id: "1", name: "cool-image.jpg", type: "image", size: 1024000, url: "https://picsum.photos/300/200?random=1" }
      ],
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
    {
      id: "4",
      message: "Here's a document for you to review",
      attachments: [
        { id: "2", name: "document.pdf", type: "file", size: 2048000, url: "#" }
      ],
      timestamp: new Date(Date.now() - 120000),
      isOwn: true,
    },
    {
      id: "5",
      message: "And here's an audio file",
      attachments: [
        { id: "3", name: "audio-clip.mp3", type: "file", size: 5120000, url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" }
      ],
      timestamp: new Date(Date.now() - 60000),
      isOwn: false,
    }
  ]);

  // Chat handlers
  const handleChatSend = (message: string, attachments: Attachment[]) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      attachments: attachments.map(att => ({
        id: att.id,
        name: att.file.name,
        type: att.type,
        size: att.file.size,
        url: att.preview || URL.createObjectURL(att.file) // Use preview if available, otherwise create object URL
      })),
      timestamp: new Date(),
      isOwn: true,
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderAttachment = (attachment: {
    id: string;
    name: string;
    type: "image" | "file";
    size: number;
    url: string;
  }) => {
    if (attachment.type === 'image') {
      return (
        <div className="space-y-2">
          <img 
            src={attachment.url} 
            alt={attachment.name}
            className="max-w-full h-auto rounded border border-orange-300/20"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = `https://via.placeholder.com/300x200/1f2937/9ca3af?text=${encodeURIComponent(attachment.name)}`;
            }}
          />
          <div className="flex items-center gap-2 p-2 bg-black/50 rounded border border-orange-300/20">
            <ImageIcon className="w-4 h-4 text-orange-300" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-orange-300 truncate">
                {attachment.name}
              </div>
              <div className="text-xs text-orange-300/70">
                {formatFileSize(attachment.size)}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // For audio files, use the InlineAudioPlayer
    if (attachment.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      return (
        <div className="space-y-2">
          <InlineAudioPlayer 
            src={attachment.url} 
            title={attachment.name}
            className="bg-black/50 border border-orange-300/20 rounded p-2"
          />
          <div className="flex items-center gap-2 p-2 bg-black/50 rounded border border-orange-300/20">
            <Music className="w-4 h-4 text-orange-300" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-orange-300 truncate">
                {attachment.name}
              </div>
              <div className="text-xs text-orange-300/70">
                {formatFileSize(attachment.size)}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // For other files, show the standard file preview
    return (
      <div className="flex items-center gap-2 p-2 bg-black/50 rounded border border-orange-300/20">
        {getAttachmentIcon(attachment.type, attachment.name)}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-orange-300 truncate">
            {attachment.name}
          </div>
          <div className="text-xs text-orange-300/70">
            {formatFileSize(attachment.size)}
          </div>
        </div>
      </div>
    );
  };

  const getAttachmentIcon = (type: "image" | "file", fileName: string) => {
    if (type === 'image') return <ImageIcon className="w-4 h-4" />;
    if (type === 'file') {
      if (fileName.endsWith('.mp3') || fileName.endsWith('.wav') || fileName.endsWith('.ogg')) {
        return <Music className="w-4 h-4" />;
      }
      if (fileName.endsWith('.mp4') || fileName.endsWith('.avi') || fileName.endsWith('.mov')) {
        return <VideoIcon className="w-4 h-4" />;
      }
      return <FileTextIcon className="w-4 h-4" />;
    }
    return <FileIcon className="w-4 h-4" />;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-black overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b-2 border-orange-300/20 flex-shrink-0">
        <h1 className="text-2xl font-bold text-orange-300"># general <span className="text-orange-300/80 text-sm">files are not uploaded to any server</span></h1>
      </div>

      {/* Messages - takes up all remaining space */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
              {/* Message bubble */}
              <div className={`rounded-lg p-3 ${
                msg.isOwn 
                  ? 'bg-orange-300/20 border-2 border-orange-300/30 text-orange-300' 
                  : 'bg-black border-2 border-orange-300/20 text-orange-300'
              }`}>
                <Paragraph size="base" className="break-words whitespace-pre-wrap">
                  {msg.message}
                </Paragraph>
                
                {/* Attachments */}
                {msg.attachments.length > 0 && (
                  <div className="space-y-2">
                    {msg.attachments.map((attachment) => (
                      <div key={attachment.id}>
                        {renderAttachment(attachment)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Timestamp */}
              <div className={`text-xs text-orange-300/50 mt-1 ${
                msg.isOwn ? 'text-right' : 'text-left'
              }`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat input - anchored to bottom, can grow */}
      <div className="flex-shrink-0 border-t-2 border-orange-300/20">
        <ChatInput
          onSend={handleChatSend}
          placeholder="Type your message here..."
          // maxAttachments={3}
          maxFileSize={5 * 1024 * 1024} // 5MB
          acceptedFileTypes={["image/*", ".pdf", ".doc", ".docx", ".txt", "video/*", "audio/*"]}
        />
      </div>
    </div>
  );
}

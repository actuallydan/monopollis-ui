import { useState } from "react";
import { ChatInput, Card, Header, Paragraph, Divider } from "../components";
import { FileIcon } from "lucide-react";
import type { Attachment } from "../components/ChatInput";

export default function ChatInputShowcase() {
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: string;
      message: string;
      attachments: Attachment[];
      timestamp: Date;
    }>
  >([]);

  // Chat handlers
  const handleChatSend = (message: string, attachments: Attachment[]) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      attachments,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="space-y-8">
      <Card title="Chat Input Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            Discord-like chat input with file attachments, drag & drop, and
            clipboard support.
          </Paragraph>

          <ChatInput
            onSend={handleChatSend}
            placeholder="Type your message here..."
            maxAttachments={3}
            maxFileSize={5 * 1024 * 1024} // 5MB
            acceptedFileTypes={["image/*", ".pdf", ".doc", ".docx", ".txt"]}
          />

          <Divider />

          <div className="space-y-3">
            <Paragraph size="sm">Chat History:</Paragraph>
            {chatMessages.length === 0 ? (
              <Paragraph size="sm" className="text-orange-300/60">
                No messages yet. Send a message above to see it here!
              </Paragraph>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 border border-orange-300/30 rounded-md bg-black"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-orange-300">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {msg.message && (
                      <Paragraph size="sm" className="mb-2">
                        {msg.message}
                      </Paragraph>
                    )}
                    {msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.attachments.map((att, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 border border-orange-300/30 rounded-md bg-black"
                          >
                            {att.type === "image" && att.preview ? (
                              <img
                                src={att.preview}
                                alt={att.file.name}
                                className="w-8 h-8 object-cover rounded border border-orange-300/30"
                              />
                            ) : (
                              <FileIcon className="w-8 h-8 text-orange-300/80" />
                            )}
                            <span className="text-xs text-orange-300/80">
                              {att.file.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

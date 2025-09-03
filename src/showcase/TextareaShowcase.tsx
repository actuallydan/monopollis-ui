import { useState } from "react";
import { Textarea, Card, Paragraph } from "../components";

export default function TextareaShowcase() {
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <div className="space-y-8">
      <Card title="Textarea Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            Auto-growing textarea with minimum and maximum rows.
          </Paragraph>

          <Textarea
            label="Description"
            value={textareaValue}
            onChange={setTextareaValue}
            placeholder="Enter your description here..."
            minRows={3}
            maxRows={8}
            description="This textarea will grow as you type, up to 8 rows maximum"
          />
        </div>
      </Card>
    </div>
  );
}

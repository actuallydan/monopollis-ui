import { Clipboard, Card, Header, Paragraph } from "../components";

export default function ClipboardShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Clipboard Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            Copy commands and text with the clipboard component. Text scrolls
            when it overflows.
          </Paragraph>

          <Clipboard text="npm install lucide-react" label="Command" />

          <Clipboard
            text="This is a very long text that will definitely overflow and demonstrate the scrolling animation feature of the clipboard component"
            label="Long Text"
          />

          <Clipboard
            text="pnpm add @types/node --save-dev"
            label="Package Manager"
          />
        </div>
      </Card>
    </div>
  );
}

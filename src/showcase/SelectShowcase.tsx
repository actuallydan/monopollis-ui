import { useState } from "react";
import { Select, Card, Header, Paragraph } from "../components";

export default function SelectShowcase() {
  const [selectValue, setSelectValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);

  // Sample select options
  const selectOptions = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "vite", label: "Vite" },
    { value: "lucide", label: "Lucide React" },
    { value: "tanstack", label: "TanStack Table" },
    { value: "node", label: "Node.js" },
    { value: "express", label: "Express" },
  ];

  return (
    <div className="space-y-8">
      <Card title="Select Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            Select dropdown with autocomplete search functionality.
          </Paragraph>

          <Select
            label="Choose Technology"
            value={selectValue}
            onChange={(value) => setSelectValue(value as string)}
            options={selectOptions}
            placeholder="Select a technology..."
            description="Choose your preferred technology stack"
            allowClear={true}
            searchable={true}
          />

          <Select
            label="Multi-Select Technologies"
            value={multiSelectValue}
            onChange={(value) => setMultiSelectValue(value as string[])}
            options={selectOptions}
            placeholder="Select multiple technologies..."
            description="Choose multiple technologies for your stack"
            allowClear={true}
            searchable={true}
            multiselect={true}
          />

          <Select
            label="Disabled Select"
            value=""
            onChange={() => {}}
            options={selectOptions}
            placeholder="This select is disabled"
            disabled={true}
          />
        </div>
      </Card>
    </div>
  );
}

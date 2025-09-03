import { useState } from "react";
import { DatePicker, Card, Paragraph } from "../components";

export default function DatePickerShowcase() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="space-y-8">
      <Card title="Date Picker Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            Accessible date picker with keyboard navigation and monochromatic
            terminal styling.
          </Paragraph>

          <DatePicker
            label="Select Date"
            value={selectedDate || undefined}
            onChange={setSelectedDate}
            placeholder="Choose a date..."
            description="Select a date for your appointment"
          />

          <DatePicker
            label="Disabled Date Picker"
            value={undefined}
            onChange={() => {}}
            placeholder="This picker is disabled"
            disabled={true}
          />
        </div>
      </Card>
    </div>
  );
}

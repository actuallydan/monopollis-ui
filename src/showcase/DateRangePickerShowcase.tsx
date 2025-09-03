import { useState } from "react";
import { DateRangePicker, Card, Paragraph } from "../components";

export default function DateRangePickerShowcase() {
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  return (
    <div className="space-y-8">
      <Card title="Date Range Picker Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            Date range picker with dual calendar view and range selection.
          </Paragraph>

          <DateRangePicker
            label="Select Date Range"
            value={dateRange}
            onChange={setDateRange}
            placeholder="Choose start and end dates..."
            description="Select a date range for your booking"
          />
        </div>
      </Card>
    </div>
  );
}

import { Timeline, Card, Header, Paragraph, Divider } from "../components";

export default function TimelineShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Timeline Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            Vertical timeline component with status indicators, inspired by Ant
            Design but customized for the monochromatic terminal theme.
          </Paragraph>

          <div className="space-y-8">
            {/* Basic Timeline */}
            <div>
              <Header size="sm" className="mb-4">
                Basic Timeline
              </Header>
              <Timeline
                items={[
                  {
                    id: "1",
                    title: "Project Started",
                    description:
                      "Initial project setup and configuration completed",
                    timestamp: "2024-01-15",
                    status: "success",
                  },
                  {
                    id: "2",
                    title: "Core Components Built",
                    description:
                      "Basic UI components implemented with monochromatic theme",
                    timestamp: "2024-01-20",
                    status: "success",
                  },
                  {
                    id: "3",
                    title: "Advanced Features",
                    description:
                      "Complex components like DatePicker and FilePicker added",
                    timestamp: "2024-01-25",
                    status: "warning",
                  },
                  {
                    id: "4",
                    title: "Testing & Polish",
                    description: "Final testing and UI refinements",
                    timestamp: "2024-01-30",
                    status: "pending",
                  },
                ]}
              />
            </div>

            <Divider />

            {/* Custom Timeline */}
            <div>
              <Header size="sm" className="mb-4">
                Custom Timeline with Pending
              </Header>
              <Timeline
                pending="More features coming soon..."
                items={[
                  {
                    id: "1",
                    title: "Current Release",
                    description: "All planned components are now available",
                    timestamp: "v1.0.0",
                    status: "success",
                  },
                  {
                    id: "2",
                    title: "Next Release",
                    description: "Additional components and enhancements",
                    timestamp: "v1.1.0",
                    status: "pending",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

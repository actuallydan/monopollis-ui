import { TerminalMenu, Card, Header, Paragraph, Divider } from "../components";
import { Download, Upload, RefreshCw, Lock } from "lucide-react";

export default function TerminalMenuShowcase() {
  return (
    <div className="space-y-8">
      <Card title="Terminal Menu Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            Terminal-style navigation menu with keyboard navigation, inspired by
            TUI and Fallout computer interfaces.
          </Paragraph>

          <div className="space-y-8">
            {/* Basic Menu */}
            <div>
              <Header size="sm" className="mb-4">
                Basic Navigation Menu
              </Header>
              <TerminalMenu
                items={[
                  {
                    id: "home",
                    label: "Home",
                    description: "Return to the main dashboard",
                    action: () => alert("Navigating to Home"),
                  },
                  {
                    id: "settings",
                    label: "Settings",
                    description: "Configure your preferences and options",
                    action: () => alert("Opening Settings"),
                  },
                  {
                    id: "profile",
                    label: "User Profile",
                    description: "View and edit your profile information",
                    action: () => alert("Opening Profile"),
                  },
                  {
                    id: "help",
                    label: "Help & Support",
                    description: "Get help and contact support",
                    action: () => alert("Opening Help"),
                  },
                ]}
                onEsc={() => alert("Escape pressed - going back")}
              />
            </div>

            <Divider />

            {/* Advanced Menu */}
            <div>
              <Header size="sm" className="mb-4">
                Advanced Menu with Icons
              </Header>
              <TerminalMenu
                items={[
                  {
                    id: "download",
                    label: "Download Files",
                    description: "Download your saved files and documents",
                    action: () => alert("Starting download..."),
                    icon: <Download className="w-4 h-4" />,
                  },
                  {
                    id: "upload",
                    label: "Upload Files",
                    description: "Upload new files to your account",
                    action: () => alert("Opening file upload..."),
                    icon: <Upload className="w-4 h-4" />,
                  },
                  {
                    id: "sync",
                    label: "Sync Data",
                    description: "Synchronize your data across devices",
                    action: () => alert("Starting sync..."),
                    icon: <RefreshCw className="w-4 h-4" />,
                  },
                  {
                    id: "disabled",
                    label: "Disabled Option",
                    description: "This option is currently unavailable",
                    disabled: true,
                    icon: <Lock className="w-4 h-4" />,
                  },
                ]}
                maxHeight={300}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

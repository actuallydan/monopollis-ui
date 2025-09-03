import { useState } from "react";
import {
  Button,
  IconButton,
  Card,
  Header,
  Paragraph,
  Divider,
} from "../components";
import { Zap, Settings, Download, Upload, Edit, Trash2 } from "lucide-react";

export default function ButtonShowcase() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-8">
      <Card title="Button Components" variant="bordered">
        <div className="space-y-8">
          {/* Basic Buttons */}
          <div>
            <Header size="lg" className="mb-4">
              Basic Buttons
            </Header>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => alert("Primary button clicked!")}>
                Primary Button
              </Button>
              <Button
                variant="secondary"
                onClick={() => alert("Secondary button clicked!")}
              >
                Secondary Button
              </Button>
              <Button disabled aria-label="This button is currently disabled">
                Disabled Button
              </Button>
            </div>
          </div>

          <Divider />

          {/* Buttons with Icons */}
          <div>
            <Header size="lg" className="mb-4">
              Buttons with Icons
            </Header>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => alert("Button with icon clicked!")}
                icon={<Zap />}
              >
                Button with Icon
              </Button>
              <Button
                variant="secondary"
                onClick={() => alert("Secondary with icon clicked!")}
                icon={<Settings />}
              >
                Secondary with Icon
              </Button>
            </div>
          </div>

          <Divider />

          {/* Loading Buttons */}
          <div>
            <Header size="lg" className="mb-4">
              Loading Buttons
            </Header>
            <div className="flex flex-wrap gap-4">
              <Button
                isLoading={true}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
              >
                Controlled Loading Button
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
              >
                Click Me!
              </Button>
            </div>
          </div>

          <Divider />

          {/* Icon Buttons */}
          <div>
            <Header size="lg" className="mb-4">
              Icon Buttons
            </Header>
            <div className="flex flex-wrap gap-4">
              <IconButton
                icon={<Download />}
                onClick={() => alert("Download clicked!")}
                aria-label="Download file"
              />
              <IconButton
                icon={<Upload />}
                variant="secondary"
                onClick={() => alert("Upload clicked!")}
                aria-label="Upload file"
              />
              <IconButton
                icon={<Edit />}
                size="lg"
                onClick={() => alert("Edit clicked!")}
                aria-label="Edit item"
              />
              <IconButton
                icon={<Trash2 />}
                variant="secondary"
                size="sm"
                onClick={() => alert("Delete clicked!")}
                aria-label="Delete item"
              />
              <IconButton
                icon={<Download />}
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
                aria-label="Loading download"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

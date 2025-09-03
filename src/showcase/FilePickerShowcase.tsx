import { useState } from "react";
import { FilePicker, Card, Header, Paragraph, Divider } from "../components";

export default function FilePickerShowcase() {
  const [submittedFiles, setSubmittedFiles] = useState<File[]>([]);

  return (
    <div className="space-y-8">
      <Card title="File Picker Component" variant="bordered">
        <div className="space-y-6">
          <Paragraph size="sm">
            Drag and drop file picker with preview support and accessibility
            features.
          </Paragraph>

          <FilePicker
            label="Upload Images"
            onFilesSubmit={setSubmittedFiles}
            multiple={true}
            accept="image/*"
            maxFiles={5}
            maxSize={5 * 1024 * 1024} // 5MB
            preview={true}
            description="Upload up to 5 images, maximum 5MB each"
          />

          <Divider />

          <FilePicker
            label="Single File Upload"
            onFilesSubmit={(files) => setSubmittedFiles(files)}
            multiple={false}
            accept=".pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024} // 10MB
            description="Upload a single document file"
          />
        </div>
      </Card>
    </div>
  );
}

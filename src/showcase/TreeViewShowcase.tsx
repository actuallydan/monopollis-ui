import { TreeView, Card, Paragraph, type TreeNode } from "../components";
import {
  Folder,
  Code,
  FileText,
  Image,
  Music,
  Video,
  File,
  FolderOpen,
} from "lucide-react";

export default function TreeViewShowcase() {
  // Sample tree data
  const treeData: TreeNode[] = [
    {
      id: "1",
      label: "Documents",
      children: [
        {
          id: "1-1",
          label: "Work",
          children: [
            { id: "1-1-1", label: "report.pdf" },
            { id: "1-1-2", label: "presentation.pptx" },
            { id: "1-1-3", label: "budget.xlsx" },
          ],
        },
        {
          id: "1-2",
          label: "Personal",
          children: [
            {
              id: "1-2-1",
              label: "photos",
              children: [
                { id: "1-2-1-1", label: "vacation.jpg" },
                { id: "1-2-1-2", label: "family.png" },
              ],
            },
            {
              id: "1-2-2",
              label: "music",
              children: [
                { id: "1-2-2-1", label: "playlist.mp3" },
                { id: "1-2-2-2", label: "album.flac" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Projects",
      children: [
        {
          id: "2-1",
          label: "monopollis",
          children: [
            {
              id: "2-1-1",
              label: "src",
              children: [
                {
                  id: "2-1-1-1",
                  label: "components",
                  children: [
                    { id: "2-1-1-1-1", label: "Button.tsx" },
                    { id: "2-1-1-1-2", label: "TreeView.tsx" },
                    { id: "2-1-1-1-3", label: "index.ts" },
                  ],
                },
                { id: "2-1-1-2", label: "App.tsx" },
                { id: "2-1-1-3", label: "main.tsx" },
              ],
            },
            { id: "2-1-2", label: "package.json" },
            { id: "2-1-3", label: "README.md" },
          ],
        },
      ],
    },
  ];

  // Custom icon function for file explorer
  const getFileIcon = (node: TreeNode, isOpen: boolean) => {
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      return isOpen ? FolderOpen : Folder;
    }

    const extension = node.label.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "tsx":
      case "ts":
      case "js":
      case "jsx":
        return Code;
      case "json":
      case "md":
      case "pdf":
      case "pptx":
      case "xlsx":
        return FileText;
      case "jpg":
      case "png":
      case "gif":
      case "svg":
        return Image;
      case "mp3":
      case "flac":
      case "wav":
        return Music;
      case "mp4":
      case "avi":
      case "mov":
        return Video;
      default:
        return File;
    }
  };

  return (
    <div className="space-y-8">
      <Card title="TreeView Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            File explorer-style tree view with expandable nodes and action
            buttons.
          </Paragraph>

          <TreeView
            data={treeData}
            maxHeight={400}
            getNodeIcon={getFileIcon}
            onNodeClick={(node) => alert(`Clicked: ${node.label}`)}
            onNodeAction={(node) => alert(`Actions for: ${node.label}`)}
          />
        </div>
      </Card>
    </div>
  );
}

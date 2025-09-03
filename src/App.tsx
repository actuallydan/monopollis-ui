import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { TreeView, type TreeNode } from "./components";
import { Folder, Code, FileText, Music, File } from "lucide-react";

// Component showcase pages
import ButtonShowcase from "./showcase/ButtonShowcase";
import TextInputShowcase from "./showcase/TextInputShowcase";
import BadgeShowcase from "./showcase/BadgeShowcase";
import FormControlsShowcase from "./showcase/FormControlsShowcase";
import TreeViewShowcase from "./showcase/TreeViewShowcase";
import TextareaShowcase from "./showcase/TextareaShowcase";
import ClipboardShowcase from "./showcase/ClipboardShowcase";
import LoadingSpinnerShowcase from "./showcase/LoadingSpinnerShowcase";
import TableShowcase from "./showcase/TableShowcase";
import BreadcrumbsShowcase from "./showcase/BreadcrumbsShowcase";
import SelectShowcase from "./showcase/SelectShowcase";
import TransferListShowcase from "./showcase/TransferListShowcase";
import DatePickerShowcase from "./showcase/DatePickerShowcase";
import DateRangePickerShowcase from "./showcase/DateRangePickerShowcase";
import AudioPlayerShowcase from "./showcase/AudioPlayerShowcase";
import FilePickerShowcase from "./showcase/FilePickerShowcase";
import ChatInputShowcase from "./showcase/ChatInputShowcase";
import TimelineShowcase from "./showcase/TimelineShowcase";
import InputOtpShowcase from "./showcase/InputOtpShowcase";
import TerminalMenuShowcase from "./showcase/TerminalMenuShowcase";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-orange-300">
        <ComponentShowcase />
      </div>
    </Router>
  );
}

function ComponentShowcase() {
  const navigate = useNavigate();
  const location = useLocation();

  // Component tree data
  const componentTree: TreeNode[] = [
    {
      id: "buttons",
      label: "Buttons",
      children: [
        { id: "button-basic", label: "Basic Buttons" },
        { id: "button-icons", label: "Buttons with Icons" },
        { id: "button-loading", label: "Loading Buttons" },
        { id: "icon-buttons", label: "Icon Buttons" },
      ],
    },
    {
      id: "inputs",
      label: "Form Inputs",
      children: [
        { id: "text-input", label: "Text Input" },
        { id: "textarea", label: "Textarea" },
        { id: "select", label: "Select" },
        { id: "checkbox", label: "Checkbox" },
        { id: "switch", label: "Switch" },
        { id: "radio", label: "Radio" },
        { id: "range-slider", label: "Range Slider" },
        { id: "input-otp", label: "Input OTP" },
      ],
    },
    {
      id: "data-display",
      label: "Data Display",
      children: [
        { id: "badge", label: "Badge" },
        { id: "table", label: "Table" },
        { id: "tree-view", label: "TreeView" },
        { id: "timeline", label: "Timeline" },
        { id: "transfer-list", label: "Transfer List" },
      ],
    },
    {
      id: "navigation",
      label: "Navigation",
      children: [
        { id: "breadcrumbs", label: "Breadcrumbs" },
        { id: "terminal-menu", label: "Terminal Menu" },
      ],
    },
    {
      id: "media",
      label: "Media",
      children: [
        { id: "audio-player", label: "Audio Player" },
        { id: "file-picker", label: "File Picker" },
      ],
    },
    {
      id: "date-time",
      label: "Date & Time",
      children: [
        { id: "date-picker", label: "Date Picker" },
        { id: "date-range-picker", label: "Date Range Picker" },
      ],
    },
    {
      id: "feedback",
      label: "Feedback",
      children: [
        { id: "loading-spinner", label: "Loading Spinner" },
        { id: "clipboard", label: "Clipboard" },
        { id: "chat-input", label: "Chat Input" },
      ],
    },
  ];

  // Custom icon function for component tree
  const getComponentIcon = (node: TreeNode, isOpen: boolean) => {
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      return isOpen ? Folder : Folder;
    }

    // Map component IDs to specific icons
    const componentIcons: Record<string, any> = {
      "button-basic": Code,
      "text-input": FileText,
      badge: Code,
      table: FileText,
      "tree-view": Folder,
      select: FileText,
      checkbox: Code,
      switch: Code,
      radio: Code,
      "range-slider": Code,
      textarea: FileText,
      clipboard: FileText,
      "loading-spinner": Code,
      breadcrumbs: FileText,
      "transfer-list": FileText,
      "date-picker": FileText,
      "date-range-picker": FileText,
      "audio-player": Music,
      "file-picker": File,
      timeline: FileText,
      "input-otp": Code,
      "terminal-menu": Code,
      "chat-input": FileText,
    };

    return componentIcons[node.id] || File;
  };

  const handleNodeClick = (node: TreeNode) => {
    if (!node.children || node.children.length === 0) {
      navigate(`/component/${node.id}`);
    }
  };

  const handleNodeAction = (node: TreeNode) => {
    if (!node.children || node.children.length === 0) {
      navigate(`/component/${node.id}`);
    }
  };

  // Get current component ID from URL
  const getCurrentComponentId = () => {
    const path = location.pathname;
    const match = path.match(/\/component\/(.+)/);
    return match ? match[1] : null;
  };

  // Get component title from tree data
  const getComponentTitle = (componentId: string) => {
    const findNode = (nodes: TreeNode[], id: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(componentTree, componentId);
    return node ? node.label : "Component";
  };

  const currentComponentId = getCurrentComponentId();
  const componentTitle = currentComponentId
    ? getComponentTitle(currentComponentId)
    : "Component Showcase";

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Component Tree */}
      <div className="w-80 bg-black border-r border-orange-300/30 p-4 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-orange-300 mb-2">
            Component Library
          </h1>
          <p className="text-sm text-orange-300/70">
            Click on any component to view its showcase
          </p>
        </div>

        <TreeView
          data={componentTree}
          maxHeight={window.innerHeight - 120}
          getNodeIcon={getComponentIcon}
          onNodeClick={handleNodeClick}
          onNodeAction={handleNodeAction}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {!currentComponentId ? (
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-orange-300 mb-4">
                Component Showcase
              </h1>
              <p className="text-lg text-orange-300/70 mb-8">
                Select a component from the left sidebar to view its showcase
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {componentTree.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border border-orange-300/30 rounded-lg"
                  >
                    <h3 className="font-semibold text-orange-300 mb-2">
                      {category.label}
                    </h3>
                    <div className="text-sm text-orange-300/60">
                      {category.children?.length || 0} components
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-orange-300 mb-2">
                  {componentTitle}
                </h1>
                <p className="text-orange-300/70">
                  Interactive showcase and examples
                </p>
              </div>

              <Routes>
                <Route
                  path="/component/button-basic"
                  element={<ButtonShowcase />}
                />
                <Route
                  path="/component/button-icons"
                  element={<ButtonShowcase />}
                />
                <Route
                  path="/component/button-loading"
                  element={<ButtonShowcase />}
                />
                <Route
                  path="/component/icon-buttons"
                  element={<ButtonShowcase />}
                />
                <Route
                  path="/component/text-input"
                  element={<TextInputShowcase />}
                />
                <Route path="/component/badge" element={<BadgeShowcase />} />
                <Route
                  path="/component/checkbox"
                  element={<FormControlsShowcase />}
                />
                <Route
                  path="/component/switch"
                  element={<FormControlsShowcase />}
                />
                <Route
                  path="/component/radio"
                  element={<FormControlsShowcase />}
                />
                <Route
                  path="/component/range-slider"
                  element={<FormControlsShowcase />}
                />
                <Route
                  path="/component/tree-view"
                  element={<TreeViewShowcase />}
                />
                <Route
                  path="/component/textarea"
                  element={<TextareaShowcase />}
                />
                <Route
                  path="/component/clipboard"
                  element={<ClipboardShowcase />}
                />
                <Route
                  path="/component/loading-spinner"
                  element={<LoadingSpinnerShowcase />}
                />
                <Route path="/component/table" element={<TableShowcase />} />
                <Route
                  path="/component/breadcrumbs"
                  element={<BreadcrumbsShowcase />}
                />
                <Route path="/component/select" element={<SelectShowcase />} />
                <Route
                  path="/component/transfer-list"
                  element={<TransferListShowcase />}
                />
                <Route
                  path="/component/date-picker"
                  element={<DatePickerShowcase />}
                />
                <Route
                  path="/component/date-range-picker"
                  element={<DateRangePickerShowcase />}
                />
                <Route
                  path="/component/audio-player"
                  element={<AudioPlayerShowcase />}
                />
                <Route
                  path="/component/file-picker"
                  element={<FilePickerShowcase />}
                />
                <Route
                  path="/component/timeline"
                  element={<TimelineShowcase />}
                />
                <Route
                  path="/component/input-otp"
                  element={<InputOtpShowcase />}
                />
                <Route
                  path="/component/terminal-menu"
                  element={<TerminalMenuShowcase />}
                />
                <Route
                  path="/component/chat-input"
                  element={<ChatInputShowcase />}
                />
              </Routes>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

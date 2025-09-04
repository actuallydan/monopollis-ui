import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Clipboard,
  Checkbox,
  DatePicker,
  FilePicker,
  Header,
  IconButton,
  Link as InnerLink,
  InputOtp,
  LoadingSpinner,
  Paragraph,
  RangeSlider,
  Select,
  Switch,
  TextInput,
} from "./components";
import AudioPlayerShowcase from "./showcase/AudioPlayerShowcase";
import BadgeShowcase from "./showcase/BadgeShowcase";
import ButtonShowcase from "./showcase/ButtonShowcase";
import BreadcrumbsShowcase from "./showcase/BreadcrumbsShowcase";
import ChatInputShowcase from "./showcase/ChatInputShowcase";
import ClipboardShowcase from "./showcase/ClipboardShowcase";
import DatePickerShowcase from "./showcase/DatePickerShowcase";
import DateRangePickerShowcase from "./showcase/DateRangePickerShowcase";
import FilePickerShowcase from "./showcase/FilePickerShowcase";
import FormControlsShowcase from "./showcase/FormControlsShowcase";
import InputOtpShowcase from "./showcase/InputOtpShowcase";
import LoadingSpinnerShowcase from "./showcase/LoadingSpinnerShowcase";
import SelectShowcase from "./showcase/SelectShowcase";
import TableShowcase from "./showcase/TableShowcase";
import TextareaShowcase from "./showcase/TextareaShowcase";
import TextInputShowcase from "./showcase/TextInputShowcase";
import TimelineShowcase from "./showcase/TimelineShowcase";
import TransferListShowcase from "./showcase/TransferListShowcase";
import TreeViewShowcase from "./showcase/TreeViewShowcase";
import TerminalMenuShowcase from "./showcase/TerminalMenuShowcase";
import type { FileWithPreview } from "./components/FilePicker";
import { Settings, Menu, X } from "lucide-react";

const Link = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <InnerLink as={RouterLink} to={href} onClick={onClick}>
      {children}
    </InnerLink>
  );
};

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <Router basename="/monopollis-ui">
      <div className="min-h-screen bg-black text-orange-300">
        <div className="flex h-screen">
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <IconButton
              icon={isMobileSidebarOpen ? X : Menu}
              aria-label="Toggle menu"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="bg-black/80 border border-orange-300/30"
            />
          </div>

          {/* Mobile Overlay */}
          {isMobileSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={closeMobileSidebar}
            />
          )}

          {/* Left Sidebar */}
          <div className={`
            w-80 bg-black border-r border-orange-300/30 p-4 overflow-hidden
            lg:relative lg:translate-x-0 lg:z-auto
            fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="mb-6 cursor-pointer">
              <RouterLink to={"/"} onClick={closeMobileSidebar}>
                <Badge>Monopollis UI</Badge>
              </RouterLink>
            </div>

            {/* Sidebar content will go here */}
            <div className="space-y-2 flex flex-col gap-2 overflow-y-auto h-full pb-20">
              <Link href={"/components/AudioPlayer"} onClick={closeMobileSidebar}>Audio Player</Link>
              <Link href={"/components/Badge"} onClick={closeMobileSidebar}>Badge</Link>
              <Link href={"/components/Breadcrumb"} onClick={closeMobileSidebar}>Breadcrumb</Link>
              <Link href={"/components/Button"} onClick={closeMobileSidebar}>Button</Link>
              <Link href={"/components/ChatInput"} onClick={closeMobileSidebar}>Chat Input</Link>
              <Link href={"/components/Clipboard"} onClick={closeMobileSidebar}>Clipboard</Link>
              <Link href={"/components/DatePicker"} onClick={closeMobileSidebar}>Date Picker</Link>
              <Link href={"/components/DateRangePicker"} onClick={closeMobileSidebar}>
                Date Range Picker
              </Link>
              <Link href={"/components/FilePicker"} onClick={closeMobileSidebar}>File Picker</Link>
              <Link href={"/components/FormControls"} onClick={closeMobileSidebar}>Form Controls</Link>
              <Link href={"/components/InputOtp"} onClick={closeMobileSidebar}>Input OTP</Link>
              <Link href={"/components/LoadingSpinner"} onClick={closeMobileSidebar}>Loading Spinner</Link>
              <Link href={"/components/Select"} onClick={closeMobileSidebar}>Select</Link>
              <Link href={"/components/Table"} onClick={closeMobileSidebar}>Table</Link>
              <Link href={"/components/Terminal"} onClick={closeMobileSidebar}>Terminal Menu</Link>
              <Link href={"/components/Textarea"} onClick={closeMobileSidebar}>Textarea</Link>
              <Link href={"/components/TextInput"} onClick={closeMobileSidebar}>Text Input</Link>
              <Link href={"/components/Timeline"} onClick={closeMobileSidebar}>Timeline</Link>
              <Link href={"/components/TransferList"} onClick={closeMobileSidebar}>Transfer List</Link>
              <Link href={"/components/TreeView"} onClick={closeMobileSidebar}>Tree View</Link>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto lg:ml-0">
            <div className="p-4 lg:p-8 pt-16 lg:pt-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="space-y-12 py-12">
                      <div className="text-center mb-16">
                        <Header
                          size="2xl"
                          className="text-6xl font-bold text-orange-300 mb-6"
                        >
                          Monopollis UI
                        </Header>
                        <Paragraph className="text-xl text-orange-300/80 max-w-3xl mx-auto mb-8">
                          A comprehensive React component library built with
                          TypeScript and Tailwind CSS. Explore our collection of
                          production-ready components designed for modern web
                          applications.
                        </Paragraph>
                        <div className="flex justify-center gap-4">
                          <Button
                            onClick={() =>
                              (window.location.href = "/components/Button")
                            }
                          >
                            Get Started
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              (window.location.href =
                                "/components/FormControls")
                            }
                          >
                            View All Components
                          </Button>
                        </div>
                      </div>

                      <div className="max-w-7xl mx-auto">
                        <Header
                          size="xl"
                          className="text-3xl font-bold text-orange-300 mb-8 text-center"
                        >
                          Component Showcase
                        </Header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <Card className="p-6 ">
                            <Header
                              size="lg"
                              className="text-xl font-semibold text-orange-300 mb-4"
                            >
                              Form Controls
                            </Header>
                            <div className="space-y-4">
                              <TextInput
                                label="Name"
                                value=""
                                onChange={() => {}}
                                placeholder="Enter your name"
                              />
                              <Select
                                label="Category"
                                value=""
                                onChange={() => {}}
                                options={[
                                  { value: "option1", label: "Option 1" },
                                  { value: "option2", label: "Option 2" },
                                ]}
                                placeholder="Choose an option"
                              />
                              <div className="flex items-center gap-4">
                                <Checkbox
                                  label="Accept terms"
                                  checked={false}
                                  onChange={() => {}}
                                />
                                <Switch
                                  label="Enable notifications"
                                  checked={false}
                                  onChange={() => {}}
                                />
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-300/20">
                              <Link href="/components/FormControls">
                                View all form components →
                              </Link>
                            </div>
                          </Card>

                          <Card className="p-6 ">
                            <Header
                              size="lg"
                              className="text-xl font-semibold text-orange-300 mb-4"
                            >
                              Data Display
                            </Header>
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <Badge variant="default">New</Badge>
                                <Badge variant="success">Beta</Badge>
                              </div>
                              <LoadingSpinner size="sm" />
                              <div className="text-sm text-orange-300/70">
                                Tables, timelines, tree views, and more...
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-300/20">
                              <Link href="/components/Table">
                                Explore data components →
                              </Link>
                            </div>
                          </Card>

                          <Card className="p-6 ">
                            <Header
                              size="lg"
                              className="text-xl font-semibold text-orange-300 mb-4"
                            >
                              Interactive Elements
                            </Header>
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <Button onClick={() => {}}>Primary</Button>
                                <Button variant="secondary" onClick={() => {}}>
                                  Secondary
                                </Button>
                              </div>
                              <IconButton
                                icon={Settings}
                                aria-label="Link"
                                onClick={() => {}}
                              />
                              <div className="text-sm text-orange-300/70">
                                Buttons, menus, and navigation...
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-300/20">
                              <Link href="/components/Button">
                                See interactive components →
                              </Link>
                            </div>
                          </Card>

                          <Card className="p-6 ">
                            <Header
                              size="lg"
                              className="text-xl font-semibold text-orange-300 mb-4"
                            >
                              Media & Input
                            </Header>
                            <div className="space-y-4">
                              <FilePicker
                                accept=".txt,.pdf,.doc"
                                onFilesSubmit={(file: FileWithPreview[]) =>
                                  console.log(file)
                                }
                                label="Choose a file..."
                              />
                              <InputOtp
                                length={4}
                                value=""
                                onChange={() => {}}
                              />
                              <div className="text-sm text-orange-300/70">
                                File pickers, audio players, and more...
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-300/20">
                              <Link href="/components/FilePicker">
                                Discover media components →
                              </Link>
                            </div>
                          </Card>

                          <Card className="p-6 ">
                            <Header
                              size="lg"
                              className="text-xl font-semibold text-orange-300 mb-4"
                            >
                              Advanced Components
                            </Header>
                            <div className="space-y-4">
                              <DatePicker
                                value={new Date()}
                                onChange={(date) => console.log(date)}
                                label="Choose a date..."
                              />
                              <RangeSlider
                                min={0}
                                max={100}
                                onChange={(value) => console.log(value)}
                                value={25}
                                label="Choose a range..."
                              />
                              <div className="text-sm text-orange-300/70">
                                Date pickers, sliders, and complex inputs...
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-300/20">
                              <Link href="/components/DatePicker">
                                Explore advanced components →
                              </Link>
                            </div>
                          </Card>

                          <Card className="p-6 ">
                            <Header
                              size="lg"
                              className="text-xl font-semibold text-orange-300 mb-4"
                            >
                              Utility Components
                            </Header>
                            <div className="space-y-4">
                              <Clipboard text="Copy this text" />
                              <Breadcrumbs
                                items={[
                                  { label: "Home", href: "/" },
                                  { label: "Components", href: "/components" },
                                ]}
                              />
                              <div className="text-sm text-orange-300/70">
                                Clips, breadcrumbs, and helpers...
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-300/20">
                              <Link href="/components/Clipboard">
                                View utility components →
                              </Link>
                            </div>
                          </Card>
                        </div>
                      </div>

                      <div className="text-center py-12">
                        <Header
                          size="xl"
                          className="text-2xl font-bold text-orange-300 mb-4"
                        >
                          Ready to build something frustrating and mediocre?
                        </Header>
                        <Paragraph className="text-orange-300/80 mb-6">
                          Start exploring our component library and see how
                          Monopollis UI can mildly pique your interest before
                          you realize there's a reason we stopped using these
                          UIs.
                        </Paragraph>
                        <Button
                          onClick={() =>
                            (window.location.href = "/components/Button")
                          }
                        >
                          Browse All Components
                        </Button>
                      </div>
                    </div>
                  }
                />

                <Route
                  path="/components/AudioPlayer"
                  element={<AudioPlayerShowcase />}
                />
                <Route path="/components/Badge" element={<BadgeShowcase />} />
                <Route path="/components/Button" element={<ButtonShowcase />} />
                <Route
                  path="/components/Breadcrumb"
                  element={<BreadcrumbsShowcase />}
                />
                <Route
                  path="/components/ChatInput"
                  element={<ChatInputShowcase />}
                />
                <Route
                  path="/components/Clipboard"
                  element={<ClipboardShowcase />}
                />
                <Route
                  path="/components/DatePicker"
                  element={<DatePickerShowcase />}
                />
                <Route
                  path="/components/DateRangePicker"
                  element={<DateRangePickerShowcase />}
                />
                <Route
                  path="/components/FilePicker"
                  element={<FilePickerShowcase />}
                />
                <Route
                  path="/components/FormControls"
                  element={<FormControlsShowcase />}
                />
                <Route
                  path="/components/InputOtp"
                  element={<InputOtpShowcase />}
                />
                <Route
                  path="/components/LoadingSpinner"
                  element={<LoadingSpinnerShowcase />}
                />
                <Route path="/components/Select" element={<SelectShowcase />} />
                <Route path="/components/Table" element={<TableShowcase />} />
                <Route
                  path="/components/Terminal"
                  element={<TerminalMenuShowcase />}
                />
                <Route
                  path="/components/Textarea"
                  element={<TextareaShowcase />}
                />
                <Route
                  path="/components/TextInput"
                  element={<TextInputShowcase />}
                />
                <Route
                  path="/components/Timeline"
                  element={<TimelineShowcase />}
                />
                <Route
                  path="/components/TransferList"
                  element={<TransferListShowcase />}
                />
                <Route
                  path="/components/TreeView"
                  element={<TreeViewShowcase />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

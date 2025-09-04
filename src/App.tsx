import React from "react";
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import { Badge, Link as InnerLink } from "./components";
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

const Link = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <InnerLink as={RouterLink} to={href}>
      {children}
    </InnerLink>
  )
}

function App() {
  return (
    <Router basename="/monopollis-ui">
      <div className="min-h-screen bg-black text-orange-300">
      <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-80 bg-black border-r border-orange-300/30 p-4 overflow-hidden">
        <div className="mb-6 transition-all duration-100 hover:scale-105">
          <RouterLink to={"/"}>
          <Badge>
            Monopollis UI
          </Badge>
          </RouterLink>
        </div>

        {/* Sidebar content will go here */}
        <div className="space-y-2 flex flex-col gap-2 overflow-y-auto h-full pb-20">
          <Link href={"/components/AudioPlayer"}>Audio Player</Link>
          <Link href={"/components/Badge"}>Badge</Link>
          <Link href={"/components/Breadcrumb"}>Breadcrumb</Link>
          <Link href={"/components/Button"}>Button</Link>
          <Link href={"/components/ChatInput"}>Chat Input</Link>
          <Link href={"/components/Clipboard"}>Clipboard</Link>
          <Link href={"/components/DatePicker"}>Date Picker</Link>
          <Link href={"/components/DateRangePicker"}>Date Range Picker</Link>
          <Link href={"/components/FilePicker"}>File Picker</Link>
          <Link href={"/components/FormControls"}>Form Controls</Link>
          <Link href={"/components/InputOtp"}>Input OTP</Link>
          <Link href={"/components/LoadingSpinner"}>Loading Spinner</Link>
          <Link href={"/components/Select"}>Select</Link>
          <Link href={"/components/Table"}>Table</Link>
          <Link href={"/components/Terminal"}>Terminal Menu</Link>
          <Link href={"/components/Textarea"}>Textarea</Link>
          <Link href={"/components/TextInput"}>Text Input</Link>
          <Link href={"/components/Timeline"}>Timeline</Link>
          <Link href={"/components/TransferList"}>Transfer List</Link>
          <Link href={"/components/TreeView"}>Tree View</Link>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-orange-300 mb-4">
                  Component Showcase
                </h1>
                <p className="text-lg text-orange-300 hover:text-orange-100 focus:outline-none focus:bg-orange-300  rounded focus:text-black">
                  Add your content here
                </p>
              </div>
            } />

          <Route path="/components/AudioPlayer" element={<AudioPlayerShowcase/>} />
          <Route path="/components/Badge" element={<BadgeShowcase/>} />
          <Route path="/components/Button" element={<ButtonShowcase/>} />
          <Route path="/components/Breadcrumb" element={<BreadcrumbsShowcase/>} />
          <Route path="/components/ChatInput" element={<ChatInputShowcase/>} />
          <Route path="/components/Clipboard" element={<ClipboardShowcase/>} />
          <Route path="/components/DatePicker" element={<DatePickerShowcase/>} />
          <Route path="/components/DateRangePicker" element={<DateRangePickerShowcase/>} />
          <Route path="/components/FilePicker" element={<FilePickerShowcase/>} />
          <Route path="/components/FormControls" element={<FormControlsShowcase/>} />
          <Route path="/components/InputOtp" element={<InputOtpShowcase/>} />
          <Route path="/components/LoadingSpinner" element={<LoadingSpinnerShowcase/>} />
          <Route path="/components/Select" element={<SelectShowcase/>} />
          <Route path="/components/Table" element={<TableShowcase/>} />
          <Route path="/components/Terminal" element={<TerminalMenuShowcase/>} />
          <Route path="/components/Textarea" element={<TextareaShowcase/>} />
          <Route path="/components/TextInput" element={<TextInputShowcase/>} />
          <Route path="/components/Timeline" element={<TimelineShowcase/>} />
          <Route path="/components/TransferList" element={<TransferListShowcase/>} />
          <Route path="/components/TreeView" element={<TreeViewShowcase/>} />
          </Routes>
        </div>
      </div>
    </div>
      </div>
    </Router>
  );
}


export default App;

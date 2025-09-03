import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import {
  Button,
  IconButton,
  TextInput,
  Textarea,
  RangeSlider,
  Checkbox,
  Switch,
  Radio,
  Paragraph,
  Header,
  Card,
  Badge,
  Divider,
  Clipboard,
  TreeView,
  LoadingSpinner,
  Table,
  Breadcrumbs,
  Select,
  TransferList,
  DatePicker,
  DateRangePicker,
  AudioPlayer,
  InlineAudioPlayer,
  FilePicker,
  ChatInput,
  Timeline,
  InputOtp,
  TerminalMenu,
  type TreeNode
} from './components'
import { Zap, Settings, Copy, Check, Download, Upload, Trash2, Edit, ChevronRight, Folder, File, FolderOpen, FileText, Code, Image, Music, Video, FileIcon, RefreshCw, Lock } from 'lucide-react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [sliderValue, setSliderValue] = useState(50)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [textareaValue, setTextareaValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null })
  const [submittedFiles, setSubmittedFiles] = useState<File[]>([])
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; message: string; attachments: any[]; timestamp: Date }>>([])
  const [otpValue, setOtpValue] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [transferLeftItems, setTransferLeftItems] = useState([
    { id: '1', label: 'React' },
    { id: '2', label: 'TypeScript' },
    { id: '3', label: 'Tailwind CSS' },
    { id: '4', label: 'Vite' },
    { id: '5', label: 'Lucide React' },
    { id: '6', label: 'TanStack Table' },
  ])
  const [transferRightItems, setTransferRightItems] = useState([
    { id: '7', label: 'Node.js' },
    { id: '8', label: 'Express' },
  ])

  // Sample tree data
  const treeData: TreeNode[] = [
    {
      id: '1',
      label: 'Documents',
      children: [
        {
          id: '1-1',
          label: 'Work',
          children: [
            { id: '1-1-1', label: 'report.pdf' },
            { id: '1-1-2', label: 'presentation.pptx' },
            { id: '1-1-3', label: 'budget.xlsx' }
          ]
        },
        {
          id: '1-2',
          label: 'Personal',
          children: [
            { id: '1-2-1', label: 'photos', children: [
              { id: '1-2-1-1', label: 'vacation.jpg' },
              { id: '1-2-1-2', label: 'family.png' }
            ]},
            { id: '1-2-2', label: 'music', children: [
              { id: '1-2-2-1', label: 'playlist.mp3' },
              { id: '1-2-2-2', label: 'album.flac' }
            ]}
          ]
        }
      ]
    },
    {
      id: '2',
      label: 'Projects',
      children: [
        {
          id: '2-1',
          label: 'monopollis',
          children: [
            { id: '2-1-1', label: 'src', children: [
              { id: '2-1-1-1', label: 'components', children: [
                { id: '2-1-1-1-1', label: 'Button.tsx' },
                { id: '2-1-1-1-2', label: 'TreeView.tsx' },
                { id: '2-1-1-1-3', label: 'index.ts' }
              ]},
              { id: '2-1-1-2', label: 'App.tsx' },
              { id: '2-1-1-3', label: 'main.tsx' }
            ]},
            { id: '2-1-2', label: 'package.json' },
            { id: '2-1-3', label: 'README.md' }
          ]
        },
        {
          id: '2-2',
          label: 'other-project',
          children: [
            { id: '2-2-1', label: 'assets', children: [
              { id: '2-2-1-1', label: 'video.mp4' },
              { id: '2-2-1-2', label: 'logo.svg' }
            ]}
          ]
        }
      ]
    }
  ]

  // Sample table data
  const tableData = [
    { id: '1', name: 'OTE 002', value: 705700, status: 'Active', category: 'Main Grp' },
    { id: '2', name: 'OTE 003', value: 909964, status: 'Inactive', category: 'Main Grp' },
    { id: '3', name: 'OTE 004', value: 396, status: 'Active', category: 'Periods' },
    { id: '4', name: 'OTE 005', value: 68, status: 'Active', category: 'Periods' },
    { id: '5', name: 'OTE 006', value: 1.6735, status: 'Inactive', category: 'Chem' },
    { id: '6', name: 'OTE 007', value: 1105, status: 'Active', category: 'Chem' },
    { id: '7', name: 'OTE 008', value: 234, status: 'Active', category: 'Main Grp' },
    { id: '8', name: 'OTE 009', value: 567, status: 'Inactive', category: 'Periods' },
    { id: '9', name: 'OTE 010', value: 890, status: 'Active', category: 'Chem' },
    { id: '10', name: 'OTE 011', value: 123, status: 'Active', category: 'Main Grp' },
  ]

  const columnHelper = createColumnHelper<typeof tableData[0]>()

  const tableColumns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('value', {
      header: 'Value',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <Badge variant={info.getValue() === 'Active' ? 'success' : 'warning'}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => info.getValue(),
    }),
  ]

  // Sample select options
  const selectOptions = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'vite', label: 'Vite' },
    { value: 'lucide', label: 'Lucide React' },
    { value: 'tanstack', label: 'TanStack Table' },
    { value: 'node', label: 'Node.js' },
    { value: 'express', label: 'Express' },
  ]

  // Transfer list handlers
  const handleTransfer = (fromLeft: boolean, itemIds: string[]) => {
    if (fromLeft) {
      const itemsToMove = transferLeftItems.filter(item => itemIds.includes(item.id))
      setTransferLeftItems(prev => prev.filter(item => !itemIds.includes(item.id)))
      setTransferRightItems(prev => [...prev, ...itemsToMove])
    } else {
      const itemsToMove = transferRightItems.filter(item => itemIds.includes(item.id))
      setTransferRightItems(prev => prev.filter(item => !itemIds.includes(item.id)))
      setTransferLeftItems(prev => [...prev, ...itemsToMove])
    }
  }

  // Chat handlers
  const handleChatSend = (message: string, attachments: any[]) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      attachments,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  }

  // Custom icon function for file explorer
  const getFileIcon = (node: TreeNode, isOpen: boolean) => {
    const hasChildren = node.children && node.children.length > 0;
    
    if (hasChildren) {
      return isOpen ? FolderOpen : Folder;
    }
    
    const extension = node.label.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return Code;
      case 'json':
      case 'md':
      case 'pdf':
      case 'pptx':
      case 'xlsx':
        return FileText;
      case 'jpg':
      case 'png':
      case 'gif':
      case 'svg':
        return Image;
      case 'mp3':
      case 'flac':
      case 'wav':
        return Music;
      case 'mp4':
      case 'avi':
      case 'mov':
        return Video;
      default:
        return File;
    }
  }

  return (
    <div className="min-h-screen bg-black text-orange-300 p-8">
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-300 text-black px-4 py-2 rounded-md font-sans font-medium z-50"
      >
        Skip to main content
      </a>
      
      <div id="main-content" className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Header size="2xl" className="text-center mb-8">
          Monochromatic Terminal UI
        </Header>

        {/* Typography Section */}
        <Card title="Typography" variant="bordered">
          <div className="space-y-4">
            <Header size="lg">Header Component</Header>
            <Header size="base">Medium Header</Header>
            <Header size="sm">Small Header</Header>
            
            <Divider />
            
            <Paragraph size="lg">
              This is a large paragraph demonstrating the monochromatic terminal aesthetic.
            </Paragraph>
            <Paragraph>
              This is a standard paragraph with the default styling. The design system uses
              only two colors: off-black background and bright orange-yellow text.
            </Paragraph>
            <Paragraph size="sm">
              This is a small paragraph for secondary information.
            </Paragraph>
          </div>
        </Card>

        {/* Button Section */}
        <Card title="Buttons" variant="bordered">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => alert('Primary button clicked!')}>
                Primary Button
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary button clicked!')}>
                Secondary Button
              </Button>
              <Button disabled aria-label="This button is currently disabled">
                Disabled Button
              </Button>
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
            
            <Divider />
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => alert('Button with icon clicked!')} icon={<Zap />}>
                Button with Icon
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary with icon clicked!')} icon={<Settings />}>
                Secondary with Icon
              </Button>
            </div>
            
            <Divider />
            
            <div className="flex flex-wrap gap-4">
              <IconButton 
                icon={<Download />} 
                onClick={() => alert('Download clicked!')}
                aria-label="Download file"
              />
              <IconButton 
                icon={<Upload />} 
                variant="secondary"
                onClick={() => alert('Upload clicked!')}
                aria-label="Upload file"
              />
              <IconButton 
                icon={<Edit />} 
                size="lg"
                onClick={() => alert('Edit clicked!')}
                aria-label="Edit item"
              />
              <IconButton 
                icon={<Trash2 />} 
                variant="secondary"
                size="sm"
                onClick={() => alert('Delete clicked!')}
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
        </Card>

        {/* Text Input Section */}
        <Card title="Text Inputs" variant="bordered">
          <div className="space-y-6">
            <TextInput
              label="Username"
              value={inputValue}
              onChange={setInputValue}
              placeholder="Enter your username"
              description="This is a description for the username field"
              required
            />
            
            <TextInput
              label="Email Address"
              value={emailValue}
              onChange={setEmailValue}
              type="email"
              placeholder="Enter your email"
              error="Please enter a valid email address"
            />
            
            <TextInput
              label="Password"
              value={passwordValue}
              onChange={setPasswordValue}
              type="password"
              placeholder="Enter your password"
              description="Password must be at least 8 characters"
            />
            
            <TextInput
              label="Disabled Input"
              value="This input is disabled"
              onChange={() => {}}
              disabled
              description="This input field is disabled"
            />
          </div>
        </Card>

        {/* Badge Section */}
        <Card title="Badges" variant="bordered">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
            
            <Divider />
            
            <div className="flex flex-wrap gap-4">
              <Badge size="sm">Small Default</Badge>
              <Badge size="sm" variant="success">Small Success</Badge>
              <Badge size="sm" variant="warning">Small Warning</Badge>
              <Badge size="sm" variant="error">Small Error</Badge>
            </div>
          </div>
        </Card>

        {/* Form Controls Section */}
        <Card title="Form Controls" variant="bordered">
          <div className="space-y-6">
            <RangeSlider
              label="Volume Level"
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              description="Adjust the volume from 0 to 100"
            />
            
            <div className="space-y-4">
              <Checkbox
                label="Enable notifications"
                checked={checkboxValue}
                onChange={setCheckboxValue}
                description="Receive push notifications for updates"
              />
              
              <Switch
                label="Dark mode"
                checked={switchValue}
                onChange={setSwitchValue}
                description="Toggle between light and dark themes"
              />
            </div>
            
            <div className="space-y-3">
              <Paragraph size="sm">Select your preferred option:</Paragraph>
              <Radio
                label="Option 1"
                checked={radioValue === 'option1'}
                onChange={() => setRadioValue('option1')}
              />
              <Radio
                label="Option 2"
                checked={radioValue === 'option2'}
                onChange={() => setRadioValue('option2')}
              />
              <Radio
                label="Option 3"
                checked={radioValue === 'option3'}
                onChange={() => setRadioValue('option3')}
              />
            </div>
          </div>
        </Card>

        {/* TreeView Section */}
        <Card title="TreeView Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              File explorer-style tree view with expandable nodes and action buttons.
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

        {/* Textarea Section */}
        <Card title="Textarea Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              Auto-growing textarea with minimum and maximum rows.
            </Paragraph>
            
            <Textarea
              label="Description"
              value={textareaValue}
              onChange={setTextareaValue}
              placeholder="Enter your description here..."
              minRows={3}
              maxRows={8}
              description="This textarea will grow as you type, up to 8 rows maximum"
            />
          </div>
        </Card>

        {/* Clipboard Section */}
        <Card title="Clipboard Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              Copy commands and text with the clipboard component. Text scrolls when it overflows.
            </Paragraph>
            
            <Clipboard 
              text="npm install lucide-react" 
              label="Command"
            />
            
            <Clipboard 
              text="This is a very long text that will definitely overflow and demonstrate the scrolling animation feature of the clipboard component" 
              label="Long Text"
            />
            
            <Clipboard 
              text="pnpm add @types/node --save-dev" 
              label="Package Manager"
            />
          </div>
        </Card>

        {/* Loading Spinner Section */}
        <Card title="Loading Spinner" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              CLI-style loading spinner in different sizes.
            </Paragraph>
            
            <div className="flex items-center gap-4">
              <LoadingSpinner size="sm" />
              <LoadingSpinner size="base" />
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </Card>

        {/* Table Component */}
        <Card title="Table Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              High-performance table with sorting, pagination, and monochromatic styling inspired by terminal interfaces.
            </Paragraph>
            
            <Table
              data={tableData}
              columns={tableColumns as any}
              maxHeight={400}
              enableSorting={true}
              enablePagination={true}
              pageSize={5}
            />
          </div>
        </Card>

        {/* Breadcrumbs Component */}
        <Card title="Breadcrumbs Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              Navigation breadcrumbs with customizable separators and home icon.
            </Paragraph>
            
            <Breadcrumbs
              items={[
                { label: 'Projects', href: '#projects' },
                { label: 'monopollis', href: '#monopollis' },
                { label: 'src', href: '#src' },
                { label: 'components' }
              ]}
              showHome={true}
              homeHref="#home"
            />
            
            <Divider />
            
            <Breadcrumbs
              items={[
                { label: 'Settings', href: '#settings' },
                { label: 'User Preferences', href: '#preferences' },
                { label: 'Theme' }
              ]}
              showHome={false}
              separator={<span className="text-orange-300/50">/</span>}
            />
          </div>
        </Card>

        {/* Select Component */}
        <Card title="Select Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              Select dropdown with autocomplete search functionality.
            </Paragraph>
            
            <Select
              label="Choose Technology"
              value={selectValue}
              onChange={(value) => setSelectValue(value as string)}
              options={selectOptions}
              placeholder="Select a technology..."
              description="Choose your preferred technology stack"
              allowClear={true}
              searchable={true}
            />
            
            <Select
              label="Multi-Select Technologies"
              value={multiSelectValue}
              onChange={(value) => setMultiSelectValue(value as string[])}
              options={selectOptions}
              placeholder="Select multiple technologies..."
              description="Choose multiple technologies for your stack"
              allowClear={true}
              searchable={true}
              multiselect={true}
            />
            
            <Select
              label="Disabled Select"
              value=""
              onChange={() => {}}
              options={selectOptions}
              placeholder="This select is disabled"
              disabled={true}
            />
          </div>
        </Card>

        {/* Transfer List Component */}
        <Card title="Transfer List Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              Transfer items between two lists with search and bulk selection capabilities.
            </Paragraph>
            
            <TransferList
              leftTitle="Available Technologies"
              rightTitle="Selected Technologies"
              leftItems={transferLeftItems}
              rightItems={transferRightItems}
              onTransfer={handleTransfer}
              maxHeight={250}
              searchable={true}
              selectAll={true}
            />
          </div>
        </Card>

        {/* Date Picker Component */}
        <Card title="Date Picker Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              Accessible date picker with keyboard navigation and monochromatic terminal styling.
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

        {/* Date Range Picker Component */}
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

        {/* Audio Player Component */}
        <Card title="Audio Player Component" variant="bordered">
          <div className="space-y-4">
            <Paragraph size="sm">
              Simple audio player with monochromatic terminal styling and full controls.
            </Paragraph>
            
            <AudioPlayer
              src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
              title="Sample Audio Track"
              className="max-w-md"
            />
            
            <Divider />
            
            <Paragraph size="sm">
              Inline audio player for compact previews.
            </Paragraph>
            
            <InlineAudioPlayer
              src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
              title="Inline Preview"
              className="max-w-md"
            />
          </div>
        </Card>

        {/* File Picker Component */}
        <Card title="File Picker Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              Drag and drop file picker with preview support and accessibility features.
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

        {/* Chat Input Component */}
        <Card title="Chat Input Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              Discord-like chat input with file attachments, drag & drop, and clipboard support.
            </Paragraph>
            
            <ChatInput
              onSend={handleChatSend}
              placeholder="Type your message here..."
              maxAttachments={3}
              maxFileSize={5 * 1024 * 1024} // 5MB
              acceptedFileTypes={['image/*', '.pdf', '.doc', '.docx', '.txt']}
            />
            
            <Divider />
            
            <div className="space-y-3">
              <Paragraph size="sm">Chat History:</Paragraph>
              {chatMessages.length === 0 ? (
                <Paragraph size="sm" className="text-orange-300/60">
                  No messages yet. Send a message above to see it here!
                </Paragraph>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="p-3 border border-orange-300/30 rounded-md bg-black">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-orange-300">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {msg.message && (
                        <Paragraph size="sm" className="mb-2">
                          {msg.message}
                        </Paragraph>
                      )}
                      {msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {msg.attachments.map((att, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border border-orange-300/30 rounded-md bg-black">
                              {att.type === 'image' && att.preview ? (
                                <img
                                  src={att.preview}
                                  alt={att.file.name}
                                  className="w-8 h-8 object-cover rounded border border-orange-300/30"
                                />
                              ) : (
                                <FileIcon className="w-8 h-8 text-orange-300/80" />
                              )}
                              <span className="text-xs text-orange-300/80">
                                {att.file.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Timeline Component */}
        <Card title="Timeline Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              Vertical timeline component with status indicators, inspired by Ant Design but customized for the monochromatic terminal theme.
            </Paragraph>
            
            <div className="space-y-8">
              {/* Basic Timeline */}
              <div>
                <Header size="sm" className="mb-4">Basic Timeline</Header>
                <Timeline
                  items={[
                    {
                      id: '1',
                      title: 'Project Started',
                      description: 'Initial project setup and configuration completed',
                      timestamp: '2024-01-15',
                      status: 'success'
                    },
                    {
                      id: '2',
                      title: 'Core Components Built',
                      description: 'Basic UI components implemented with monochromatic theme',
                      timestamp: '2024-01-20',
                      status: 'success'
                    },
                    {
                      id: '3',
                      title: 'Advanced Features',
                      description: 'Complex components like DatePicker and FilePicker added',
                      timestamp: '2024-01-25',
                      status: 'warning'
                    },
                    {
                      id: '4',
                      title: 'Testing & Polish',
                      description: 'Final testing and UI refinements',
                      timestamp: '2024-01-30',
                      status: 'pending'
                    }
                  ]}
                />
              </div>
              
              <Divider />
              

              
              {/* Custom Timeline */}
              <div>
                <Header size="sm" className="mb-4">Custom Timeline with Pending</Header>
                <Timeline
                  pending="More features coming soon..."
                  items={[
                    {
                      id: '1',
                      title: 'Current Release',
                      description: 'All planned components are now available',
                      timestamp: 'v1.0.0',
                      status: 'success'
                    },
                    {
                      id: '2',
                      title: 'Next Release',
                      description: 'Additional components and enhancements',
                      timestamp: 'v1.1.0',
                      status: 'pending'
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Input OTP Component */}
        <Card title="Input OTP Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              One-time password input component with masked mode, inspired by PrimeReact but customized for the monochromatic terminal theme.
            </Paragraph>
            
            <div className="space-y-8">
              {/* Basic OTP */}
              <div>
                <Header size="sm" className="mb-4">Basic 4-Digit OTP</Header>
                <InputOtp
                  value={otpValue}
                  onChange={setOtpValue}
                  length={4}
                  autoFocus={true}
                />
                <Paragraph size="sm" className="mt-2 text-orange-300/60">
                  Current value: {otpValue || 'None'}
                </Paragraph>
              </div>
              
              <Divider />
              
              {/* 6-Digit OTP with Mask */}
              <div>
                <Header size="sm" className="mb-4">6-Digit OTP with Mask</Header>
                <InputOtp
                  value={otpValue}
                  onChange={setOtpValue}
                  length={4}
                  mask={true}
                  integerOnly={true}
                />
                <Paragraph size="sm" className="mt-2 text-orange-300/60">
                  Current value: {otpValue || 'None'}
                </Paragraph>
              </div>
              
              <Divider />
              
              {/* Disabled OTP */}
              <div>
                <Header size="sm" className="mb-4">Disabled OTP</Header>
                <InputOtp
                  value="1234"
                  onChange={() => {}}
                  length={4}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Terminal Menu Component */}
        <Card title="Terminal Menu Component" variant="bordered">
          <div className="space-y-6">
            <Paragraph size="sm">
              Terminal-style navigation menu with keyboard navigation, inspired by TUI and Fallout computer interfaces.
            </Paragraph>
            
            <div className="space-y-8">
              {/* Basic Menu */}
              <div>
                <Header size="sm" className="mb-4">Basic Navigation Menu</Header>
                <TerminalMenu
                  items={[
                    {
                      id: 'home',
                      label: 'Home',
                      description: 'Return to the main dashboard',
                      action: () => alert('Navigating to Home'),
                    },
                    {
                      id: 'settings',
                      label: 'Settings',
                      description: 'Configure your preferences and options',
                      action: () => alert('Opening Settings'),
                    },
                    {
                      id: 'profile',
                      label: 'User Profile',
                      description: 'View and edit your profile information',
                      action: () => alert('Opening Profile'),
                    },
                    {
                      id: 'help',
                      label: 'Help & Support',
                      description: 'Get help and contact support',
                      action: () => alert('Opening Help'),
                    },
                  ]}
                  onEsc={() => alert('Escape pressed - going back')}
                />
              </div>
              
              <Divider />
              
              {/* Advanced Menu */}
              <div>
                <Header size="sm" className="mb-4">Advanced Menu with Icons</Header>
                <TerminalMenu
                  items={[
                    {
                      id: 'download',
                      label: 'Download Files',
                      description: 'Download your saved files and documents',
                      action: () => alert('Starting download...'),
                      icon: <Download className="w-4 h-4" />,
                    },
                    {
                      id: 'upload',
                      label: 'Upload Files',
                      description: 'Upload new files to your account',
                      action: () => alert('Opening file upload...'),
                      icon: <Upload className="w-4 h-4" />,
                    },
                    {
                      id: 'sync',
                      label: 'Sync Data',
                      description: 'Synchronize your data across devices',
                      action: () => alert('Starting sync...'),
                      icon: <RefreshCw className="w-4 h-4" />,
                    },
                    {
                      id: 'disabled',
                      label: 'Disabled Option',
                      description: 'This option is currently unavailable',
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

        {/* Layout Example */}
        <Card title="Layout Example" variant="bordered">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Header size="sm">Left Column</Header>
              <Paragraph size="sm">
                This demonstrates how the components work together in a layout.
                The grid system and spacing create a clean, organized interface.
              </Paragraph>
              <Button variant="secondary">
                Action Button
              </Button>
            </div>
            
            <div className="space-y-4">
              <Header size="sm">Right Column</Header>
              <div className="flex flex-wrap gap-2">
                <Badge>Status</Badge>
                <Badge variant="success">Online</Badge>
              </div>
              <TextInput
                label="Quick Input"
                value=""
                onChange={() => {}}
                placeholder="Type something..."
              />
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-orange-300/80 text-sm">
          <Paragraph size="sm">
            Monochromatic Terminal UI Design System
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default App

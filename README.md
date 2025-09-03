# Monopollis UI Component Library

A modern React component library built with TypeScript, Vite, and Tailwind CSS. This library provides a comprehensive set of accessible, customizable UI components designed for building beautiful web applications.

[![short demo video](/assets/example.mp4)](https://github.com/user-attachments/assets/1948c2fc-079b-488a-ad6b-43fa9471d7a2)

## 🚀 Features

- **Modern React**: Built with React 19 and TypeScript
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Accessible**: Components follow ARIA best practices
- **TypeScript**: Full type safety and IntelliSense support
- **Customizable**: Easy to theme and extend
- **Responsive**: Mobile-first design approach

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd monopollis-ui

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

## 🧩 Available Components

### Form Components

#### Button

A versatile button component with multiple variants and states.

```tsx
import { Button } from './components';

<Button variant="primary" onClick={() => console.log('clicked')}>
  Click me
</Button>

<Button variant="secondary" disabled>
  Disabled Button
</Button>

<Button isLoading loadingText="Saving...">
  Save
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary'
- `disabled`: boolean
- `isLoading`: boolean
- `loadingText`: string
- `icon`: ReactNode | LucideIcon
- `type`: 'button' | 'submit' | 'reset'

#### TextInput

Standard text input field with customizable styling.

```tsx
import { TextInput } from "./components";

<TextInput placeholder="Enter your name" label="Name" required />;
```

#### Textarea

Multi-line text input component.

```tsx
import { Textarea } from "./components";

<Textarea placeholder="Enter your message" rows={4} maxLength={500} />;
```

#### Checkbox

Accessible checkbox component.

```tsx
import { Checkbox } from "./components";

<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Accept terms and conditions"
/>;
```

#### Switch

Toggle switch component.

```tsx
import { Switch } from "./components";

<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
/>;
```

#### Radio

Radio button group component.

```tsx
import { Radio } from "./components";

<Radio
  name="size"
  value="large"
  checked={selectedSize === "large"}
  onChange={(value) => setSelectedSize(value)}
  label="Large"
/>;
```

#### Select

Dropdown select component.

```tsx
import { Select } from "./components";

<Select
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Choose an option"
/>;
```

#### DatePicker & DateRangePicker

Date selection components with calendar interface.

```tsx
import { DatePicker, DateRangePicker } from './components';

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select date"
/>

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }}
/>
```

#### InputOtp

One-time password input component.

```tsx
import { InputOtp } from "./components";

<InputOtp length={6} value={otp} onChange={setOtp} />;
```

### Layout Components

#### Card

Container component for grouping related content.

```tsx
import { Card } from "./components";

<Card title="User Profile" variant="bordered">
  <p>Card content goes here</p>
</Card>;
```

**Props:**

- `title`: string (optional)
- `variant`: 'default' | 'bordered'

#### Header

Typography component for headings.

```tsx
import { Header } from './components';

<Header size="lg">Main Heading</Header>
<Header size="md">Section Title</Header>
<Header size="sm">Subtitle</Header>
```

#### Paragraph

Text component for body content.

```tsx
import { Paragraph } from "./components";

<Paragraph>This is a paragraph of text.</Paragraph>;
```

#### Divider

Visual separator component.

```tsx
import { Divider } from "./components";

<Divider />;
```

### Data Display Components

#### Table

Data table component with sorting and pagination.

```tsx
import { Table } from "./components";

<Table data={tableData} columns={columns} sortable pagination />;
```

#### TreeView

Hierarchical data display component.

```tsx
import { TreeView } from "./components";

<TreeView data={treeData} onNodeSelect={handleNodeSelect} />;
```

#### Timeline

Chronological event display component.

```tsx
import { Timeline } from "./components";

<Timeline items={timelineItems} variant="vertical" />;
```

#### Badge

Small status indicator component.

```tsx
import { Badge } from './components';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Error</Badge>
```

### Navigation Components

#### Breadcrumbs

Navigation breadcrumb component.

```tsx
import { Breadcrumbs } from "./components";

<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Current Page" },
  ]}
/>;
```

#### TerminalMenu

Terminal-style navigation menu.

```tsx
import { TerminalMenu } from "./components";

<TerminalMenu items={menuItems} onItemSelect={handleItemSelect} />;
```

### Media Components

#### AudioPlayer

Full-featured audio player component.

```tsx
import { AudioPlayer } from "./components";

<AudioPlayer src="/audio/file.mp3" title="Audio Title" showControls />;
```

#### InlineAudioPlayer

Compact inline audio player.

```tsx
import { InlineAudioPlayer } from "./components";

<InlineAudioPlayer src="/audio/file.mp3" autoPlay={false} />;
```

### Utility Components

#### LoadingSpinner

Loading indicator component.

```tsx
import { LoadingSpinner } from './components';

<LoadingSpinner size="lg" />
<LoadingSpinner size="md" />
<LoadingSpinner size="sm" />
```

#### Clipboard

Copy-to-clipboard functionality component.

```tsx
import { Clipboard } from "./components";

<Clipboard text="Text to copy" onCopy={() => console.log("Copied!")}>
  Copy Text
</Clipboard>;
```

#### FilePicker

File selection component.

```tsx
import { FilePicker } from "./components";

<FilePicker accept=".pdf,.doc,.docx" multiple onFileSelect={handleFileSelect}>
  Choose Files
</FilePicker>;
```

#### ChatInput

Chat message input component.

```tsx
import { ChatInput } from "./components";

<ChatInput
  placeholder="Type your message..."
  onSend={handleSendMessage}
  showEmojiPicker
/>;
```

#### TransferList

Dual-list transfer component.

```tsx
import { TransferList } from "./components";

<TransferList
  leftItems={leftItems}
  rightItems={rightItems}
  onTransfer={handleTransfer}
/>;
```

#### RangeSlider

Range selection slider component.

```tsx
import { RangeSlider } from "./components";

<RangeSlider min={0} max={100} value={[25, 75]} onChange={setValue} step={5} />;
```

## 🎨 Styling

The component library uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Overriding component styles using the `className` prop
3. Creating custom CSS variables for theme colors

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # Component library
│   ├── index.ts        # Component exports
│   ├── Button.tsx      # Button component
│   ├── Card.tsx        # Card component
│   └── ...             # Other components
├── App.tsx             # Main application
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 📚 Dependencies

### Core Dependencies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool

### Component Dependencies

- **@react-aria** - Accessibility primitives
- **@react-stately** - State management
- **@tanstack/react-table** - Table functionality
- **lucide-react** - Icon library
- **@internationalized/date** - Date handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For questions or issues, please open an issue in the repository or contact the development team.

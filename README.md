# Monopollis UI - Component Library

A comprehensive monochromatic terminal-style UI component library built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Monochromatic Terminal Theme**: Consistent black and orange color scheme
- 🧩 **30+ Components**: From basic buttons to complex data tables
- 📱 **Fully Responsive**: Works on all device sizes
- ♿ **Accessible**: Built with accessibility in mind
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🎯 **Interactive Showcase**: Live examples of all components

## Component Categories

- **Buttons**: Basic, Icons, Loading, Icon Buttons
- **Form Inputs**: Text Input, Textarea, Select, Checkbox, Switch, Radio, Range Slider, Input OTP
- **Data Display**: Badge, Table, TreeView, Timeline, Transfer List
- **Navigation**: Breadcrumbs, Terminal Menu
- **Media**: Audio Player, File Picker
- **Date & Time**: Date Picker, Date Range Picker
- **Feedback**: Loading Spinner, Clipboard, Chat Input

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dankral/monopollis-ui.git
cd monopollis-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Steps:

1. **Enable GitHub Pages** in your repository settings:

   - Go to Settings → Pages
   - Source: "GitHub Actions"

2. **Push to main branch**: The GitHub Action will automatically build and deploy your app

3. **Your app will be available at**: `https://dankral.github.io/monopollis-ui`

#### Manual Deployment

If you prefer manual deployment:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Other Platforms

You can deploy the built `dist` folder to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket
- **Firebase Hosting**: Use `firebase deploy`

## Project Structure

```
src/
├── components/          # All UI components
├── showcase/           # Component showcase pages
├── App.tsx            # Main app with routing
└── main.tsx           # Entry point

.github/workflows/      # GitHub Actions for deployment
```

## Development

### Adding New Components

1. Create your component in `src/components/`
2. Export it from `src/components/index.ts`
3. Create a showcase page in `src/showcase/`
4. Add the route to `src/App.tsx`

### Styling

This project uses Tailwind CSS v4 with a custom monochromatic theme. All components follow the terminal aesthetic with:

- Background: Black (`bg-black`)
- Text: Orange (`text-orange-300`)
- Borders: Orange with transparency (`border-orange-300/30`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Live Demo

Visit the live component showcase: [https://dankral.github.io/monopollis-ui](https://dankral.github.io/monopollis-ui)

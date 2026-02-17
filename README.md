# Event Invitation Designer

A modern, embeddable event editor built with React and TypeScript. This application empowers users to design stunning invitations for weddings, anniversaries, baptisms, graduations, and other special occasions, complete with integrated RSVP management.

## Features

- **Versatile Invitation Design**: Create beautiful invitations for broad range of events including weddings, anniversaries, baptisms, graduations, and general parties.
- **Embedded Component Mode**: Seamlessly integrate the editor directly into your React application as a component.
- **Editor API**: Control the editor from external applications using the cross-origin PostMessage API.
- **Public View & Dynamic Rendering**: Render invitations in a standalone, read-only mode with auto-device detection or export them as a single HTML file.
- **Rich Visual Effects**: Enhance invitations with interactive effects like confetti, sparkles, balloons, and more.
- **Background Music**: Add atmosphere with built-in music tracks.
- **RSVP Management**: Built-in functionality to collect and manage guest RSVPs efficiently.
- **Responsive Experience**: Adaptive editor interface and content rendering that automatically adjusts to Desktop, Tablet, and Mobile layouts.
- **Auto-Device Detection**: The `DynamicRenderer` component intelligently detects its container size to serve the optimal layout.
- **Full Viewport Options**: Support for "Boxed" (standard) and "Full Width" (immersive) layout modes.
- **In-Page Navigation**: New `NavSection` component for smooth scrolling between invitation sections.
- **Standalone Examples**: Comprehensive HTML examples demonstrating specific integration patterns.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wysiwyg-event-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Usage

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Integration Guides

### 1. React Component Embedding
For React applications, use the direct component integration for best performance and control.
See [docs/embedding_guide.md](docs/embedding_guide.md).

### 2. Iframe / External API
For non-React apps or isolated environments, use the Iframe + PostMessage API.
See [docs/api_guide.md](docs/api_guide.md).

### 3. Public View
To render a read-only version of an invitation:
`http://localhost:3000/?view=public`

## Project Structure

```
wysiwyg-event-editor/
├── src/
│   ├── features/
│   │   └── editor/        # Core editor logic and components
│   │       ├── components/  # Editor UI components (Toolbar, Canvas, Sections)
│   │       ├── hooks/       # State management (useEditorState)
│   │       └── utils/       # Helpers (Export, Schema Registry)
│   ├── components/        # Shared UI components
│   ├── App.tsx            # Root component with routing logic
│   └── index.tsx          # Entry point
├── public/                # Static assets
├── .env                   # Environment variables
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Technologies Used

- **React**: UI library for building the user interface.
- **TypeScript**: Static type checking for JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Hook Form**: Form management and validation.
- **Zod**: Schema declaration and validation.
- **React Draft Wysiwyg**: Rich text editing component.
- **Lucide React**: Icon library.
- **clsx**: Utility for building `className` strings.
- **date-fns**: Date utility library.
- **canvas-confetti**: Visual effects library.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# API configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## License

This project is licensed under the MIT License.

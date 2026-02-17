# Editor Embedding Guide

The `wysiwyg-event-editor` can be integrated into your application in two ways:

1.  **Iframe + PostMessage API**: Best for non-React apps or completely isolated environments. (See `api_guide.md`)
2.  **Direct React Component**: Best for React applications where you want full control and shared context.

## Direct React Component Integration

If your host application is built with React, you can import and render the `EditorCanvas` directly.

### Prerequisites
-   Your app must use React 18+.
-   Install dependencies: `npm install lucide-react react-rnd canvas-confetti date-fns clsx tailwind-merge`

### Installation
Currently, the editor is a source-code integration. Copy the `src/features/editor` directory into your project.

### Usage

```tsx
import { EditorCanvas } from './features/editor/EditorCanvas';
import type { EventLayout } from './features/editor/types';

function MyEditorPage() {
  const handleSave = (layout: EventLayout) => {
    console.log('User saved the design:', layout);
    // Save to your backend here
  };

  const initialData = { /* ... your layout JSON ... */ };

  return (
    <div className="editor-container">
       <EditorCanvas 
          initialLayout={initialData} 
          onSave={handleSave} 
       />
    </div>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `initialLayout` | `EventLayout` (Optional) | The starting state of the editor. If omitted, a default wedding template is used. |
| `onSave` | `(layout: EventLayout) => void` (Optional) | Callback triggered when the user clicks the "GUARDAR" button in the toolbar. |
| `onInteraction` | `(interaction: Interaction) => void` (Optional) | Callback for user events like guestbook/RSVP submissions or element clicks. |

### Styling
Ensure your application has Tailwind CSS configured, as the editor relies on it for styling.

## Rendering Read-Only Content

If you want to display the final invitation to your users (e.g., on a public page), use the `DynamicRenderer` component.

```tsx
import { DynamicRenderer } from './features/editor/components/DynamicRenderer';
import { BackgroundMusic } from './features/editor/components/BackgroundMusic';
import { EffectsOverlay } from './features/editor/components/EffectsOverlay';

function InvitationView({ layout }) {
  return (
    <div className="invitation-container relative min-h-screen">
       {/* DynamicRenderer now handles background music and dark mode toggles internally */}
       <DynamicRenderer 
          layout={layout} 
          readOnly={true} 
          device="desktop" // or 'mobile'
          onInteraction={(event) => {
            console.log('Interaction caught:', event.type, event.payload);
          }}
       />
    </div>
  );
}
```

This component is lighter than `EditorCanvas` as it doesn't load the editing tools or heavy interactive logic.

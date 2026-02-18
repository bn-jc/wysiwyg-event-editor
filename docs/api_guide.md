# Editor API Usage Guide

The Editor API allows external applications to communicate with the WYSIWYG Event Editor via the **Browser PostMessage API**. This is ideal for hosting the editor in an `iframe` within another dashboard or SaaS application.

## 1. Hosting the Editor
Embed the editor using an `iframe`:

```html
<iframe id="editor-iframe" src="https://your-editor-url.com/" width="100%" height="600px"></iframe>
```

> **Note:** If you are building a React application, consider using the direct component embedding method instead. See [embedding_guide.md](./embedding_guide.md).

## 2. Sending Messages to the Editor
Use `targetWindow.postMessage(message, targetOrigin)`.

### Load a Layout
Initialize the editor with a specific design.
```javascript
const layout = {
  id: 'event-123',
  name: 'My Wedding',
  sections: [ /* ... sections array ... */ ],
  globalStyles: { /* ... */ }
};

iframe.contentWindow.postMessage({
  type: 'EDITOR_LOAD_LAYOUT',
  payload: layout
}, '*');
```

### Force Set Layout (Hard Reset)
Updates the entire layout and resets the internal editor state.
```javascript
iframe.contentWindow.postMessage({
  type: 'EDITOR_SET_LAYOUT',
  payload: layout
}, '*');
```

### Update a Section
Change content programmatically without a full reload.
```javascript
iframe.contentWindow.postMessage({
  type: 'EDITOR_UPDATE_SECTION',
  payload: {
    sectionId: 'splash-1',
    content: { title: 'New Event Title' }
  }
}, '*');
```

### Get Current Layout
Request the current state of the design.
```javascript
iframe.contentWindow.postMessage({ type: 'EDITOR_GET_LAYOUT' }, '*');
```

## 3. Receiving Messages from the Editor
Listen for the `message` event on your host window.

```javascript
window.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'EDITOR_READY':
      console.log('Editor is fully loaded and ready for API commands.');
      break;

    case 'EDITOR_LAYOUT_DATA':
      console.log('Received full layout data:', payload);
      break;

    case 'EDITOR_LAYOUT_CHANGE':
      console.log('Editor state updated (autosave/live sync):', payload);
      break;

    case 'EDITOR_INTERACTION':
      handleInteraction(payload);
      break;
  }
});
```

## 4. Handling User Interactions
When the editor is in `preview` mode (read-only), it broadcasts user actions via `EDITOR_INTERACTION`.

### Interaction Types

| Type | Description | Payload Example |
| :--- | :--- | :--- |
| `INVITATION_OPENED` | User dismissed the Splash Screen. | `{ timestamp: 1700000000000 }` |
| `RSVP_SUBMIT` | User submitted the RSVP form. | `{ attendance: "Sim", name: "John", ... }` |
| `GUESTBOOK_SUBMIT` | User posted a message. | `{ name: "Maria", message: "Parabéns!", ... }` |
| `CLICK_ELEMENT` | User clicked any element. | `{ tagName: "button", textContent: "RSVP", ... }` |

### Interaction Schema
Every interaction contains a `type`, a `payload`, and a `timestamp`.

```javascript
{
  "type": "RSVP_SUBMIT",
  "payload": {
    "attendance": "Sim, Eu vou!",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "message": "Mal podemos esperar!"
  },
  "timestamp": 1708212456789
}
```

## 5. Built-in Features
When using the `DynamicRenderer` (preview mode), the following features are handled automatically based on the layout data:

- **Dark Mode**: A floating toggle allows users to switch between light and dark themes. The theme supports automatic system preference detection, and in the editor interface, the preview is automatically synchronized with the designer's theme preference.
- **Splash Transitions**: 9 immersive styles for bridging the splash screen and main content (Fade, Curtain, Zoom, Blur, Envelope, Book, Heart, Star, Parallax).
- **Sections**: All standard sections support bespoke dark mode styles out-of-the-box.

---

## Reference Implementation
For a complete working example with UI controls, see:
`public/test-harness.html` in the repository.

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
  }
});
```

---

## Reference Implementation
For a complete working example with UI controls, see:
`public/test-harness.html` in the repository.

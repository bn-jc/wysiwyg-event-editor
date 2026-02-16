# Event Invitation Designer

A modern, embeddable event editor built with React and TypeScript. This application empowers users to design stunning invitations for weddings, anniversaries, baptisms, graduations, and other special occasions, complete with integrated RSVP management.

## Features

- **Versatile Invitation Design**: Create beautiful invitations for broad range of events including weddings, anniversaries, baptisms, graduations, and general parties.
- **Embeddable Editor**: Seamlessly integrate the editor into any existing webpage or application.
- **RSVP Management**: Built-in functionality to collect and manage guest RSVPs efficiently.
- **Rich Text Customization**: rigorous control over typography and layout with a powerful WYSIWYG editor.
- **Media Integration**: Easy image uploads and management with drag-and-drop support.
- **Responsive Experience**: Fully responsive designs that look perfect on desktops, tablets, and mobile phones.
- **Modern UI/UX**: A clean, intuitive interface featuring smooth animations and real-time validation.

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

### Embedding

To embed the editor in your application, you can use an `iframe`:

```html
<iframe 
  src="https://your-deployment-url.com" 
  width="100%" 
  height="800px" 
  style="border: none; border-radius: 8px;"
></iframe>
```

## Project Structure

```
wysiwyg-event-editor/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── EventForm.tsx    # Main event creation form
│   │   ├── ImageUpload.tsx  # Image upload component
│   │   ├── RichTextEditor.tsx # WYSIWYG editor wrapper
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Root component
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

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# API configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## License

This project is licensed under the MIT License.

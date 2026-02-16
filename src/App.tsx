import { EditorCanvas } from '@/features/editor/EditorCanvas';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <main className="flex-1 overflow-hidden p-4">
        <EditorCanvas />
      </main>
    </div>
  );
}

export default App;

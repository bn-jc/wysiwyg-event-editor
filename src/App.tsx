import { useState, useEffect } from 'react';
import { EditorCanvas } from '@/features/editor/EditorCanvas';
import { PublicInvitation } from '@/features/editor/components/PublicInvitation';
import { useEditorState } from '@/features/editor/hooks/useEditorState';

function App() {
  const [viewMode, setViewMode] = useState<'editor' | 'public' | 'embedded'>('editor');
  const { layout } = useEditorState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('view');
    if (mode === 'public') {
      setViewMode('public');
    } else if (mode === 'embedded') {
      setViewMode('embedded');
    }
  }, []);

  if (viewMode === 'public') {
    return <PublicInvitation layout={layout} />;
  }

  if (viewMode === 'embedded') {
    const embeddedLayout = {
      ...layout,
      name: "Embedded Event"
    };

    return (
      <div className="h-screen w-screen p-8 bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
        <h1 className="text-white text-2xl mb-4 font-bold">Host App Context (Try Resizing Window)</h1>
        <div className="w-full h-full max-w-[1200px] max-h-[800px] bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700 flex flex-col">
          <EditorCanvas
            initialLayout={embeddedLayout}
            onSave={(savedLayout) => {
              console.log('Host App received save:', savedLayout);
              alert(`Host App: Saved "${savedLayout.name}" successfully!`);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <main className="flex-1 overflow-hidden p-4">
        <EditorCanvas />
      </main>
    </div>
  );
}

export default App;

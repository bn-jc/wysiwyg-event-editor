import { useState, useEffect } from 'react';
import { EditorCanvas } from '@/features/editor/EditorCanvas';
import { PublicInvitation } from '@/features/editor/components/PublicInvitation';
import { useEditorState } from '@/features/editor/hooks/useEditorState';

function App() {
  const [viewMode, setViewMode] = useState<'editor' | 'public'>('editor');
  const { layout } = useEditorState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'public') {
      setViewMode('public');
    }
  }, []);

  if (viewMode === 'public') {
    return <PublicInvitation layout={layout} />;
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

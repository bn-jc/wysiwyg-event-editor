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
      <div className="min-h-screen w-full p-8 bg-slate-900 overflow-auto">
        <h1 className="text-white text-2xl mb-8 font-bold text-center">Responsive Embed Verification</h1>

        <div className="flex flex-wrap gap-8 justify-center pb-20">
          {/* Wide Container */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-mono text-sm">Wide (1000px)</span>
            <div className="w-[1000px] h-[600px] bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700">
              <EditorCanvas initialLayout={embeddedLayout} />
            </div>
          </div>

          {/* Compact Container */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-mono text-sm">Compact (800px)</span>
            <div className="w-[800px] h-[600px] bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700">
              <EditorCanvas initialLayout={embeddedLayout} />
            </div>
          </div>

          {/* Mobile Container */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-mono text-sm">Mobile (400px)</span>
            <div className="w-[400px] h-[600px] bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700">
              <EditorCanvas initialLayout={embeddedLayout} />
            </div>
          </div>
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

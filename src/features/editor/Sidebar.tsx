import React from 'react';
import { Type, Square, Layers } from 'lucide-react';
import { ImageUploadButton } from './ImageUploadButton';

interface SidebarProps {
    onAddText: () => void;
    onAddImage: (url: string) => void;
    onAddContainer: () => void;
    onAddInput: () => void;
    onToggleLayers: () => void;
    isLayersOpen: boolean;
    readOnly?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    onAddText,
    onAddImage,
    onAddContainer,
    onAddInput,
    onToggleLayers,
    isLayersOpen,
    readOnly = false
}) => {
    if (readOnly) return null;

    return (
        <div className="w-16 flex flex-col items-center py-4 bg-white border-r border-gray-200 h-full shadow-sm z-20 overflow-y-auto no-scrollbar">
            {/* Tools Category */}
            <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex flex-col items-center gap-1 group relative">
                    <button
                        onClick={onToggleLayers}
                        className={`p-3 rounded-xl transition-colors border ${isLayersOpen ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'}`}
                        title="Layers"
                    >
                        <Layers size={24} />
                    </button>
                    <span className="text-[10px] font-medium text-gray-500">Layers</span>
                </div>
            </div>

            <div className="w-8 h-px bg-gray-200 my-4" />

            {/* Basic Category */}
            <div className="flex flex-col items-center gap-4 w-full">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Basic</span>

                <div className="flex flex-col items-center gap-1 group relative">
                    <button
                        onClick={onAddContainer}
                        className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200"
                        title="Add Container"
                    >
                        <Square size={24} />
                    </button>
                    <span className="text-[10px] font-medium text-gray-500">Box</span>
                </div>

                <div className="flex flex-col items-center gap-1 group relative">
                    <button
                        onClick={onAddText}
                        className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200"
                        title="Add Text"
                    >
                        <Type size={24} />
                    </button>
                    <span className="text-[10px] font-medium text-gray-500">Text</span>
                </div>

                <div className="flex flex-col items-center gap-1 group relative">
                    <div className="p-0">
                        <ImageUploadButton onImageUpload={onAddImage} sidebarMode={true} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500">Image</span>
                </div>
            </div>

            <div className="w-8 h-px bg-gray-200 my-4" />

            {/* Forms Category */}
            <div className="flex flex-col items-center gap-4 w-full">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Forms</span>

                <div className="flex flex-col items-center gap-1 group relative">
                    <button
                        onClick={onAddInput}
                        className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200"
                        title="Add Input Field"
                    >
                        <div className="w-6 h-6 flex items-center justify-center border-2 border-current rounded bg-transparent">
                            <div className="w-4 h-0.5 bg-current"></div>
                        </div>
                    </button>
                    <span className="text-[10px] font-medium text-gray-500">Input</span>
                </div>
            </div>
        </div>
    );
};

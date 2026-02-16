import React, { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';


interface ImageUploadButtonProps {
    onImageUpload: (url: string) => void;
    sidebarMode?: boolean;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageUpload, sidebarMode = false }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    onImageUpload(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerClick = () => fileInputRef.current?.click();

    return (
        <>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            {sidebarMode ? (
                <button
                    onClick={triggerClick}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200"
                    title="Add Image"
                >
                    <ImageIcon size={24} />
                </button>
            ) : (
                <button
                    onClick={triggerClick}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border rounded hover:bg-gray-100"
                >
                    <ImageIcon size={16} /> Add Image
                </button>
            )}
        </>
    );
};

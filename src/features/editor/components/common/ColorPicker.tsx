import React, { useState, useEffect } from 'react';
import { Pipette, Check } from 'lucide-react';

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    label?: string;
}

const PRESETS = [
    { name: 'Gold', color: '#D4AF37' },
    { name: 'Rose Gold', color: '#B76E79' },
    { name: 'Sage', color: '#B2AC88' },
    { name: 'Lavender', color: '#E6E6FA' },
    { name: 'Wine', color: '#800020' },
    { name: 'Navy', color: '#000080' },
    { name: 'Dusty Rose', color: '#DCAE96' },
    { name: 'White', color: '#FFFFFF' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
    const [isCustom, setIsCustom] = useState(false);

    useEffect(() => {
        const isPreset = PRESETS.some(p => p.color.toLowerCase() === value.toLowerCase());
        setIsCustom(!isPreset && value !== '');
    }, [value]);

    return (
        <div className="flex flex-col gap-3 mb-6">
            {label && (
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {label}
                </label>
            )}

            <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                    <button
                        key={p.color}
                        onClick={() => onChange(p.color)}
                        title={p.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${value.toLowerCase() === p.color.toLowerCase()
                            ? 'border-blue-500 scale-110 shadow-md'
                            : 'border-transparent hover:scale-105'
                            }`}
                        style={{ backgroundColor: p.color }}
                    >
                        {value.toLowerCase() === p.color.toLowerCase() && (
                            <Check size={14} className={p.color === '#FFFFFF' ? 'text-gray-800' : 'text-white'} />
                        )}
                    </button>
                ))}

                <div className="relative">
                    <button
                        onClick={() => setIsCustom(true)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ${isCustom ? 'border-blue-500 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                            }`}
                    >
                        <Pipette size={14} className="text-white" />
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100 items-center animate-in fade-in slide-in-from-top-1">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200">
                    <input
                        type="color"
                        value={value || '#FFFFFF'}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                    />
                </div>
                <input
                    type="text"
                    value={(value || '').toUpperCase()}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#FFFFFF"
                    className="flex-1 bg-transparent border-none text-xs font-mono text-gray-600 focus:ring-0 uppercase"
                />
            </div>
        </div>
    );
};

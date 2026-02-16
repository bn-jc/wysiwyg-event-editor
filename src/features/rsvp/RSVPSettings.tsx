import React from 'react';
import { X } from 'lucide-react';

interface RSVPSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    settings: RSVPSettingsData;
    onUpdate: (settings: RSVPSettingsData) => void;
}

export interface RSVPSettingsData {
    enabled: boolean;
    deadline: string;
    maxGuests: number;
}

export const RSVPSettings: React.FC<RSVPSettingsProps> = ({
    isOpen,
    onClose,
    settings,
    onUpdate,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">RSVP Settings</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="rsvp-enabled"
                            checked={settings.enabled}
                            onChange={(e) => onUpdate({ ...settings, enabled: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="rsvp-enabled" className="font-medium text-gray-700">
                            Enable RSVP Collection
                        </label>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Response Deadline
                        </label>
                        <input
                            type="date"
                            value={settings.deadline}
                            onChange={(e) => onUpdate({ ...settings, deadline: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            disabled={!settings.enabled}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Max Guests per Invitation
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={settings.maxGuests}
                            onChange={(e) => onUpdate({ ...settings, maxGuests: parseInt(e.target.value) || 1 })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            disabled={!settings.enabled}
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

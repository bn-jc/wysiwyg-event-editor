import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';

export const AgendaSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate
}) => {
    const { content } = section;
    const items = content.items || [];

    const updateItem = (index: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ items: newItems });
    };

    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
                <InlineText
                    tagName="h2"
                    value={content.title || 'Programação'}
                    onChange={(val) => onUpdate({ title: val })}
                    className="text-4xl md:text-5xl text-center"
                    style={{ fontFamily: globalStyles.fontFamilyTitle, color: globalStyles.primaryColor }}
                />

                <div className="w-full flex flex-col gap-0">
                    {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-3 h-3 rounded-full mt-2"
                                    style={{ backgroundColor: globalStyles.primaryColor }}
                                />
                                {idx < items.length - 1 && (
                                    <div className="w-[1px] flex-1 bg-gray-300 my-2" />
                                )}
                            </div>
                            <div className="pb-12 pt-1 transition-transform group-hover:translate-x-1 w-full">
                                <InlineText
                                    tagName="span"
                                    value={item.time}
                                    onChange={(val) => updateItem(idx, 'time', val)}
                                    className="text-sm font-bold tracking-widest uppercase mb-2 block w-fit"
                                    style={{ color: globalStyles.secondaryColor }}
                                />

                                <InlineText
                                    tagName="h4"
                                    value={item.label}
                                    onChange={(val) => updateItem(idx, 'label', val)}
                                    className="text-xl font-medium mb-1 block w-full"
                                />

                                <InlineText
                                    tagName="p"
                                    value={item.location}
                                    onChange={(val) => updateItem(idx, 'location', val)}
                                    className="text-gray-500 font-light block w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

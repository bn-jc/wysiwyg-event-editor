import React from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { InlineText } from '../common/InlineText';


export const AgendaSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    readOnly,
    onElementSelect,
    isDark
}) => {
    const { content } = section;
    const items = content.items || [];

    const updateItem = (index: number, field: string, value: string) => {
        if (readOnly) return;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ items: newItems });
    };

    return (
        <section
            className="px-6 bg-transparent"
            style={{
                paddingTop: section.styles?.paddingTop || '80px',
                paddingBottom: section.styles?.paddingBottom || '80px',
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
            }}
        >
            <div
                className="max-w-2xl mx-auto flex flex-col items-center"
                style={{ gap: section.styles?.gap || '48px' }}
            >
                <InlineText
                    tagName="h2"
                    value={content.title || 'Programação'}
                    onChange={(val) => onUpdate({ title: val })}
                    onSelectElement={() => onElementSelect?.('title')}
                    className={cn(
                        content.titleSize && content.titleSize !== 'inherit' ? content.titleSize : "text-4xl md:text-5xl"
                    )}
                    readOnly={readOnly}
                    style={{
                        fontFamily: content.titleFont && content.titleFont !== 'inherit' ? content.titleFont : globalStyles.fontFamilyTitle,
                        color: content.titleColor || section.styles?.color || (isDark ? '#FFFFFF' : globalStyles.primaryColor),
                        textAlign: section.styles?.textAlign || 'center'
                    }}
                />

                <div
                    className="w-full flex flex-col gap-0"
                    style={{ textAlign: section.styles?.textAlign || 'center' }}
                >
                    {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-4 md:gap-6 group">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-3 h-3 rounded-full mt-2"
                                    style={{ backgroundColor: isDark ? '#FFFFFF' : globalStyles.primaryColor }}
                                />
                                {idx < items.length - 1 && (
                                    <div className={cn("w-[1px] flex-1 my-2 transition-colors", isDark ? "bg-white/20" : "bg-gray-300")} />
                                )}
                            </div>
                            <div className="pb-10 md:pb-12 pt-1 transition-transform group-hover:translate-x-1 w-full">
                                <InlineText
                                    tagName="span"
                                    value={item.time}
                                    onChange={(val) => updateItem(idx, 'time', val)}
                                    onSelectElement={() => onElementSelect?.('items')}
                                    className={cn(
                                        "font-bold tracking-widest uppercase mb-2 block w-fit",
                                        section.styles?.textAlign === 'right' ? 'ml-auto' :
                                            section.styles?.textAlign === 'left' ? 'mr-auto' : 'mx-auto',
                                        content.itemTimeSize && content.itemTimeSize !== 'inherit' ? content.itemTimeSize : "text-sm"
                                    )}
                                    readOnly={readOnly}
                                    style={{
                                        fontFamily: content.itemTimeFont && content.itemTimeFont !== 'inherit' ? content.itemTimeFont : 'inherit',
                                        color: content.itemTimeColor || section.styles?.color || globalStyles.secondaryColor
                                    }}
                                />
                                <InlineText
                                    tagName="h4"
                                    value={item.label}
                                    onChange={(val) => updateItem(idx, 'label', val)}
                                    onSelectElement={() => onElementSelect?.('items')}
                                    className={cn(
                                        "font-medium mb-1 block w-full",
                                        content.itemLabelSize && content.itemLabelSize !== 'inherit' ? content.itemLabelSize : "text-xl"
                                    )}
                                    readOnly={readOnly}
                                    style={{
                                        fontFamily: content.itemLabelFont && content.itemLabelFont !== 'inherit' ? content.itemLabelFont : 'inherit',
                                        color: content.itemLabelColor || 'inherit'
                                    }}
                                />
                                <InlineText
                                    tagName="p"
                                    value={item.location}
                                    onChange={(val) => updateItem(idx, 'location', val)}
                                    onSelectElement={() => onElementSelect?.('items')}
                                    className={cn(
                                        "opacity-50 font-light block w-full",
                                        content.itemLocationSize && content.itemLocationSize !== 'inherit' ? content.itemLocationSize : ""
                                    )}
                                    readOnly={readOnly}
                                    style={{
                                        fontFamily: content.itemLocationFont && content.itemLocationFont !== 'inherit' ? content.itemLocationFont : 'inherit',
                                        color: content.itemLocationColor || section.styles?.color || 'rgb(107 114 128)'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

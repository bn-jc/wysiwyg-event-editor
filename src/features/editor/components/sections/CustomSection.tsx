import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';

export const CustomSection: React.FC<SectionRendererProps> = ({
    section,
    onUpdate
}) => {
    const { elements = [] } = section.content;

    const handleUpdateElement = (index: number, newContent: any) => {
        const newElements = [...elements];
        newElements[index] = { ...newElements[index], ...newContent };
        onUpdate({ elements: newElements });
    };

    const handleUpdateListItem = (elementIndex: number, itemIndex: number, newValue: string) => {
        const newElements = [...elements];
        const newItems = [...newElements[elementIndex].items];
        newItems[itemIndex] = newValue;
        newElements[elementIndex] = { ...newElements[elementIndex], items: newItems };
        onUpdate({ elements: newElements });
    };

    return (
        <section
            className="px-6 bg-transparent"
            style={{
                paddingTop: section.styles?.paddingTop || '80px',
                paddingBottom: section.styles?.paddingBottom || '80px',
                backgroundColor: section.styles?.backgroundColor
            }}
        >
            <div
                className="max-w-2xl mx-auto flex flex-col"
                style={{ gap: section.styles?.gap || '40px' }}
            >
                {elements.map((element: any, index: number) => {
                    if (element.type === 'image') {
                        return (
                            <div key={index} className="w-full rounded-3xl overflow-hidden shadow-xl">
                                <img
                                    src={element.url}
                                    alt="Custom"
                                    className="w-full h-auto object-cover max-h-[500px]"
                                />
                            </div>
                        );
                    }

                    if (element.type === 'list') {
                        const ListTag = element.listType === 'ordered' ? 'ol' : 'ul';
                        const format = element.format || (element.listType === 'ordered' ? 'decimal' : 'disc');

                        const listStyleClass = {
                            'decimal': 'list-decimal',
                            'upper-roman': 'list-[upper-roman]',
                            'disc': 'list-disc',
                            'square': 'list-[square]',
                            'triangle': 'list-none',
                            'diamond': 'list-none'
                        }[format as string] || 'list-disc';

                        const isCustomMarker = format === 'triangle' || format === 'diamond';

                        return (
                            <ListTag
                                key={index}
                                className={`space-y-4 pl-6 ${listStyleClass}`}
                            >
                                {element.items.map((item: string, iIdx: number) => (
                                    <li key={iIdx} className="relative group">
                                        {isCustomMarker && (
                                            <span className="absolute -left-6 top-1 text-blue-500 font-bold text-xs select-none">
                                                {format === 'triangle' ? '▶' : '◆'}
                                            </span>
                                        )}
                                        <InlineText
                                            tagName="span"
                                            value={item}
                                            onChange={(val) => handleUpdateListItem(index, iIdx, val)}
                                            className="text-lg leading-relaxed block opacity-80"
                                            style={{ color: section.styles?.color }}
                                        />
                                    </li>
                                ))}
                            </ListTag>
                        );
                    }

                    return (
                        <InlineText
                            key={index}
                            tagName={element.style === 'heading' ? 'h2' : 'p'}
                            value={element.content}
                            onChange={(val) => handleUpdateElement(index, { content: val })}
                            className={
                                element.style === 'heading'
                                    ? "text-4xl font-bold text-center mb-2"
                                    : "text-lg leading-relaxed text-center opacity-80"
                            }
                            style={{ color: section.styles?.color }}
                        />
                    );
                })}
            </div>
        </section>
    );
};

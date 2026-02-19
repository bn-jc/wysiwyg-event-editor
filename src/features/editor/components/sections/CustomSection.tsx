import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';
import { cn } from '@/utils/cn';

export const CustomSection: React.FC<SectionRendererProps> = ({
    section,
    onUpdate,
    readOnly,
    isDark,
    globalStyles
}) => {
    const { elements = [] } = section.content;

    const handleUpdateElement = (index: number, newContent: any) => {
        if (readOnly) return;
        const newElements = [...elements];
        newElements[index] = { ...newElements[index], ...newContent };
        onUpdate({ elements: newElements });
    };

    const getEmbedUrl = (url: string) => {
        if (!url) return '';

        // YouTube
        const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
        if (ytMatch) {
            const id = ytMatch[1].split('&')[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        // Vimeo
        const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(.+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }

        return url;
    };

    const handleUpdateListItem = (elementIndex: number, itemIndex: number, newValue: string) => {
        if (readOnly) return;
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
                paddingTop: section.styles?.paddingTop || '5rem',
                paddingBottom: section.styles?.paddingBottom || '5rem',
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
            }}
        >
            <div
                className="max-w-2xl mx-auto flex flex-col"
                style={{ gap: section.styles?.gap || '2.5rem' }}
            >
                {elements.map((element: any, index: number) => {
                    if (element.type === 'video') {
                        const embedUrl = getEmbedUrl(element.url);
                        const isEmbed = embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com');

                        return (
                            <div key={index} className="w-full rounded-3xl overflow-hidden shadow-xl bg-black aspect-video">
                                {isEmbed ? (
                                    <iframe
                                        src={embedUrl}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                ) : (
                                    <video
                                        src={element.url}
                                        controls
                                        className="w-full h-full object-contain"
                                        poster={element.posterUrl}
                                    />
                                )}
                            </div>
                        );
                    }

                    if (element.type === 'gallery') {
                        const columns = element.columns || 2;
                        const gap = element.gap || '1rem';
                        const imageItems = element.galleryImages || [];

                        return (
                            <div
                                key={index}
                                className="grid w-full"
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                    gap: gap
                                }}
                            >
                                {imageItems.map((img: any, iIdx: number) => (
                                    <div key={iIdx} className="aspect-square rounded-2xl overflow-hidden shadow-md group relative">
                                        <img
                                            src={img.url}
                                            alt={`Gallery ${iIdx}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {img.caption && (
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs font-medium truncate">{img.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    }

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
                                className={cn(
                                    "space-y-4 pl-6",
                                    listStyleClass
                                )}
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
                                            className={cn(
                                                "leading-relaxed block opacity-80",
                                                element.itemSize && element.itemSize !== 'inherit' ? element.itemSize : "text-lg"
                                            )}
                                            readOnly={readOnly}
                                            style={{
                                                fontFamily: element.itemFont && element.itemFont !== 'inherit' ? element.itemFont : 'inherit',
                                                color: element.itemColor || section.styles?.color || 'inherit'
                                            }}
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
                            multiline={element.style !== 'heading'}
                            className={cn(
                                "text-center",
                                element.style === 'heading'
                                    ? cn("font-bold mb-2", element.contentSize && element.contentSize !== 'inherit' ? element.contentSize : "text-4xl")
                                    : cn("leading-relaxed opacity-80", element.contentSize && element.contentSize !== 'inherit' ? element.contentSize : "text-lg")
                            )}
                            readOnly={readOnly}
                            style={{
                                fontFamily: element.contentFont && element.contentFont !== 'inherit' ? element.contentFont : 'inherit',
                                color: element.contentColor || section.styles?.color || 'inherit'
                            }}
                        />
                    );
                })}
            </div>
        </section>
    );
};

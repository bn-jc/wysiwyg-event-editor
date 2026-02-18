import React, { useState } from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { InlineText } from '../common/InlineText';

import { Send, MessageCircle, Heart, User } from 'lucide-react';

export const GuestbookSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    onInteraction,
    readOnly,
    onElementSelect,
    isDark,
    externalInputState
}) => {
    const { content } = section;
    const externalValues = externalInputState?.values[section.id] || {};
    const externalStatuses = externalInputState?.statuses[section.id] || {};
    const messages = content.messages || [];

    // Local state for the form
    const [name, setName] = useState(externalValues.name || '');
    const [message, setMessage] = useState(externalValues.message || '');

    // Sync external values
    React.useEffect(() => {
        if (externalValues.name !== undefined) setName(externalValues.name);
        if (externalValues.message !== undefined) setMessage(externalValues.message);
    }, [externalValues]);

    const isFieldHidden = (key: string) => externalStatuses[key]?.hidden;
    const isFieldDisabled = (key: string) => externalStatuses[key]?.disabled;

    const handleSubmit = () => {
        if (!name || !message) return;

        const newMessage = {
            name,
            message,
            date: 'Agora mesmo'
        };

        onUpdate({
            messages: [newMessage, ...messages]
        });

        onInteraction?.({
            type: 'GUESTBOOK_SUBMIT',
            payload: { name, message },
            timestamp: Date.now()
        });

        setName('');
        setMessage('');
    };

    return (
        <section
            className="px-6 bg-transparent"
            style={{
                paddingTop: section.styles?.paddingTop || '96px',
                paddingBottom: section.styles?.paddingBottom || '96px',
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
            }}
        >
            <div
                className="max-w-4xl mx-auto flex flex-col"
                style={{ gap: section.styles?.gap || '64px' }}
            >
                {/* Header */}
                <div className="text-center mb-16 flex flex-col items-center gap-4">
                    <InlineText
                        tagName="h2"
                        value={content.title || 'Deixe uma Mensagem'}
                        onChange={(val) => onUpdate({ title: val })}
                        onSelectElement={() => onElementSelect?.('title')}
                        className={cn(
                            content.titleSize && content.titleSize !== 'inherit' ? content.titleSize : "text-4xl md:text-5xl"
                        )}
                        style={{
                            fontFamily: content.titleFont && content.titleFont !== 'inherit' ? content.titleFont : globalStyles.fontFamilyTitle,
                            color: content.titleColor || section.styles?.color || 'inherit'
                        }}
                        readOnly={readOnly}
                    />
                    <InlineText
                        tagName="p"
                        value={content.subtitle || 'Partilhe o seu amor e desejos para os noivos.'}
                        onChange={(val) => onUpdate({ subtitle: val })}
                        onSelectElement={() => onElementSelect?.('subtitle')}
                        className={cn(
                            "font-light opacity-80",
                            content.subtitleSize && content.subtitleSize !== 'inherit' ? content.subtitleSize : ""
                        )}
                        readOnly={readOnly}
                        style={{
                            fontFamily: content.subtitleFont && content.subtitleFont !== 'inherit' ? content.subtitleFont : 'inherit',
                            color: content.subtitleColor || section.styles?.color || 'rgb(107 114 128)'
                        }}
                    />
                </div>

                {/* Input Form */}
                <div className={cn(
                    "rounded-[2rem] p-8 transition-all duration-500 border relative overflow-hidden",
                    isDark ? "bg-[#1E1E1E] border-white/5 shadow-2xl" : "bg-white border-gray-100 shadow-xl shadow-gray-100"
                )}>
                    <div className={cn("absolute top-0 left-0 w-full h-2 opacity-50", isDark ? "bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40" : "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100")} />

                    <div className="space-y-6">
                        {!isFieldHidden('name') && (
                            <div>
                                <label
                                    className={cn(
                                        "uppercase tracking-widest mb-2 block ml-1 opacity-70",
                                        content.fieldLabelSize && content.fieldLabelSize !== 'inherit' ? content.fieldLabelSize : "text-[10px] font-bold"
                                    )}
                                    style={{
                                        fontFamily: content.fieldLabelFont && content.fieldLabelFont !== 'inherit' ? content.fieldLabelFont : 'inherit',
                                        color: content.fieldLabelColor || section.styles?.color || (isDark ? '#9CA3AF' : 'rgb(156 163 175)')
                                    }}
                                >
                                    <InlineText
                                        tagName="span"
                                        value={content.nameLabel || 'Seu Nome'}
                                        onChange={(val) => onUpdate({ nameLabel: val })}
                                        onSelectElement={() => onElementSelect?.('nameLabel')}
                                        readOnly={readOnly}
                                    />
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: Tio Manel"
                                        readOnly={!readOnly || externalStatuses.name?.readOnly}
                                        disabled={isFieldDisabled('name')}
                                        className={cn(
                                            "w-full border border-transparent rounded-xl p-4 pl-12 text-sm transition-all outline-none",
                                            isDark ? "bg-black/40 text-gray-200 focus:bg-black/60 focus:ring-2 focus:ring-blue-900/30" : "bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                                        )}
                                    />
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                                </div>
                            </div>
                        )}

                        {!isFieldHidden('message') && (
                            <div>
                                <label
                                    className={cn(
                                        "uppercase tracking-widest mb-2 block ml-1 opacity-70",
                                        content.fieldLabelSize && content.fieldLabelSize !== 'inherit' ? content.fieldLabelSize : "text-[10px] font-bold"
                                    )}
                                    style={{
                                        fontFamily: content.fieldLabelFont && content.fieldLabelFont !== 'inherit' ? content.fieldLabelFont : 'inherit',
                                        color: content.fieldLabelColor || section.styles?.color || (isDark ? '#9CA3AF' : 'rgb(156 163 175)')
                                    }}
                                >
                                    <InlineText
                                        tagName="span"
                                        value={content.messageLabel || 'Sua Mensagem'}
                                        onChange={(val) => onUpdate({ messageLabel: val })}
                                        onSelectElement={() => onElementSelect?.('messageLabel')}
                                        readOnly={readOnly}
                                    />
                                </label>
                                <div className="relative group">
                                    <textarea
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Escreva algo bonito..."
                                        readOnly={!readOnly || externalStatuses.message?.readOnly}
                                        disabled={isFieldDisabled('message')}
                                        className={cn(
                                            "w-full border border-transparent rounded-xl p-4 pl-12 text-sm transition-all outline-none resize-none",
                                            isDark ? "bg-black/40 text-gray-200 focus:bg-black/60 focus:ring-2 focus:ring-blue-900/30" : "bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                                        )}
                                    />
                                    <MessageCircle size={18} className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                                </div>
                            </div>
                        )}

                        <div
                            className={cn(
                                "w-full flex",
                                content.buttonAlignment === 'left' ? "justify-start" :
                                    content.buttonAlignment === 'right' ? "justify-end" :
                                        content.buttonAlignment === 'full' ? "justify-center" : "justify-center"
                            )}
                        >
                            <button
                                onClick={handleSubmit}
                                onMouseDown={(e) => {
                                    if (!readOnly) {
                                        e.stopPropagation();
                                        onElementSelect?.('buttonLabel');
                                    }
                                }}
                                disabled={!name || !message || isFieldDisabled('submit')}
                                className={cn(
                                    "py-4 font-bold uppercase tracking-widest transition-all shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                    content.buttonSize && content.buttonSize !== 'inherit' ? content.buttonSize : "text-xs",
                                    content.buttonShape || "rounded-xl",
                                    content.buttonAlignment === 'full' ? "w-full" : "px-10",
                                    !content.buttonColor && "bg-blue-500 text-white hover:shadow-xl hover:-translate-y-0.5"
                                )}
                                style={{
                                    backgroundColor: isFieldDisabled('submit') ? '#ccc' : (content.buttonColor ? `${content.buttonColor}11` : globalStyles.primaryColor),
                                    fontFamily: content.buttonFont && content.buttonFont !== 'inherit' ? content.buttonFont : 'inherit',
                                    color: content.buttonColor || 'white',
                                    border: content.buttonColor ? `1px solid ${content.buttonColor}` : undefined
                                }}
                            >
                                <Send size={16} />
                                <InlineText
                                    tagName="span"
                                    value={content.buttonLabel || 'Publicar Mensagem'}
                                    onChange={(val) => onUpdate({ buttonLabel: val })}
                                    onSelectElement={() => onElementSelect?.('buttonLabel')}
                                    readOnly={readOnly}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-6">
                    {messages.length === 0 ? (
                        <div className="text-center py-12 opacity-50">
                            <Heart className="mx-auto mb-4 text-gray-300" size={48} />
                            <InlineText
                                tagName="p"
                                value={content.emptyStateText || 'Seja o primeiro a deixar uma mensagem!'}
                                onChange={(val) => onUpdate({ emptyStateText: val })}
                                onSelectElement={() => onElementSelect?.('emptyStateText')}
                                className={cn(
                                    "font-light opacity-50",
                                    content.emptyStateSize && content.emptyStateSize !== 'inherit' ? content.emptyStateSize : ""
                                )}
                                readOnly={readOnly}
                                style={{
                                    fontFamily: content.emptyStateFont && content.emptyStateFont !== 'inherit' ? content.emptyStateFont : 'inherit',
                                    color: content.emptyStateColor || section.styles?.color || 'rgb(156 163 175)'
                                }}
                            />
                        </div>
                    ) : (
                        messages.map((msg: any, idx: number) => (
                            <div key={idx} className={cn(
                                "p-6 rounded-2xl border flex gap-4 transition-all hover:shadow-md",
                                isDark ? "bg-[#1E1E1E] border-white/5 text-gray-200 shadow-2xl" : "bg-white border-gray-100 text-gray-800 shadow-sm"
                            )}>
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", isDark ? "bg-blue-900/20 text-blue-400" : "bg-gradient-to-br from-blue-50 to-purple-50 text-blue-300")}>
                                    <Heart size={20} fill="currentColor" className="opacity-50" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={cn("font-bold", isDark ? "text-gray-200" : "text-gray-800")}>{msg.name}</h4>
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{msg.date}</span>
                                    </div>
                                    <p className={cn("font-light leading-relaxed text-sm", isDark ? "text-gray-400" : "text-gray-600")}>"{msg.message}"</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

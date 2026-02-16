import React, { useState } from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';
import { Send, MessageCircle, Heart, User } from 'lucide-react';

export const GuestbookSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate
}) => {
    const { content } = section;
    const messages = content.messages || [];

    // Local state for the form
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

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

        setName('');
        setMessage('');
    };

    return (
        <section
            className="px-6 bg-transparent"
            style={{
                paddingTop: section.styles?.paddingTop || '96px',
                paddingBottom: section.styles?.paddingBottom || '96px',
                backgroundColor: section.styles?.backgroundColor
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
                        className="text-4xl md:text-5xl"
                        style={{
                            fontFamily: globalStyles.fontFamilyTitle,
                            color: section.styles?.color || globalStyles.primaryColor
                        }}
                    />
                    <InlineText
                        tagName="p"
                        value={content.subtitle || 'Partilhe o seu amor e desejos para os noivos.'}
                        onChange={(val) => onUpdate({ subtitle: val })}
                        className="font-light opacity-80"
                        style={{ color: section.styles?.color || 'rgb(107 114 128)' }}
                    />
                </div>

                {/* Input Form */}
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 mb-16 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-50" />

                    <div className="space-y-6">
                        <div>
                            <label
                                className="text-[10px] font-bold uppercase tracking-widest mb-2 block ml-1 opacity-70"
                                style={{ color: section.styles?.color || 'rgb(156 163 175)' }}
                            >
                                <InlineText
                                    tagName="span"
                                    value={content.nameLabel || 'Seu Nome'}
                                    onChange={(val) => onUpdate({ nameLabel: val })}
                                />
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Tio Manel"
                                    className="w-full bg-gray-50 border border-transparent rounded-xl p-4 pl-12 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all outline-none"
                                />
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label
                                className="text-[10px] font-bold uppercase tracking-widest mb-2 block ml-1 opacity-70"
                                style={{ color: section.styles?.color || 'rgb(156 163 175)' }}
                            >
                                <InlineText
                                    tagName="span"
                                    value={content.messageLabel || 'Sua Mensagem'}
                                    onChange={(val) => onUpdate({ messageLabel: val })}
                                />
                            </label>
                            <div className="relative group">
                                <textarea
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escreva algo bonito..."
                                    className="w-full bg-gray-50 border border-transparent rounded-xl p-4 pl-12 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all outline-none resize-none"
                                />
                                <MessageCircle size={18} className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!name || !message}
                            className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ backgroundColor: globalStyles.primaryColor }}
                        >
                            <Send size={16} />
                            <InlineText
                                tagName="span"
                                value={content.buttonLabel || 'Publicar Mensagem'}
                                onChange={(val) => onUpdate({ buttonLabel: val })}
                            />
                        </button>
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
                                className="font-light opacity-50"
                                style={{ color: section.styles?.color || 'rgb(156 163 175)' }}
                            />
                        </div>
                    ) : (
                        messages.map((msg: any, idx: number) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-blue-300 flex-shrink-0">
                                    <Heart size={20} fill="currentColor" className="opacity-50" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-800">{msg.name}</h4>
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{msg.date}</span>
                                    </div>
                                    <p className="text-gray-600 font-light leading-relaxed text-sm">"{msg.message}"</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

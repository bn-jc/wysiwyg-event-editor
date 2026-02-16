import React from 'react';
import type { SectionRendererProps } from '../../types';
import { Mail, Users, MessageSquare } from 'lucide-react';
import { InlineText } from '../common/InlineText';

export const RSVPSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate
}) => {
    const { content } = section;

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-32 -mt-32 opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full -ml-32 -mb-32 opacity-50" />

            <div className="max-w-xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <InlineText
                        tagName="h2"
                        value={content.title || 'Confirme a sua Presença'}
                        onChange={(val) => onUpdate({ title: val })}
                        className="text-4xl md:text-5xl mb-4"
                        style={{ fontFamily: globalStyles.fontFamilyTitle, color: globalStyles.primaryColor }}
                    />

                    {content.deadline && (
                        <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">
                            <InlineText
                                tagName="span"
                                value={content.deadlineLabel || 'Por favor responda até '}
                                onChange={(val) => onUpdate({ deadlineLabel: val })}
                            />
                            <InlineText
                                tagName="span"
                                value={content.deadline}
                                onChange={(val) => onUpdate({ deadline: val })}
                                className="font-bold underline cursor-pointer ml-1"
                            />
                        </p>
                    )}
                </div>

                <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <div className="group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">
                                <InlineText
                                    tagName="span"
                                    value={content.nameLabel || 'Seu Nome Completo'}
                                    onChange={(val) => onUpdate({ nameLabel: val })}
                                />
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={content.namePlaceholder || "Ex: Maria & João Silva"}
                                    readOnly // Prevent typing in preview/edit mode to avoid confusion with inline edit
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 hover:border-gray-200 transition-all outline-none pl-12 cursor-default"
                                />
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-blue-500 transition-colors" size={18} />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">
                                <InlineText
                                    tagName="span"
                                    value={content.emailLabel || 'E-mail para Contacto'}
                                    onChange={(val) => onUpdate({ emailLabel: val })}
                                />
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder={content.emailPlaceholder || "seu-email@exemplo.com"}
                                    readOnly
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-400 hover:border-gray-200 transition-all outline-none pl-12 cursor-default"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-blue-400 transition-colors" size={18} />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">
                                <InlineText
                                    tagName="span"
                                    value={content.messageLabel || 'Mensagem para os Noivos'}
                                    onChange={(val) => onUpdate({ messageLabel: val })}
                                />
                            </label>
                            <div className="relative">
                                <textarea
                                    rows={4}
                                    placeholder={content.messagePlaceholder || "Alguma restrição alimentar ou mensagem especial?"}
                                    readOnly
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-400 hover:border-gray-200 transition-all outline-none pl-12 resize-none cursor-default"
                                />
                                <MessageSquare className="absolute left-4 top-4 text-gray-300 group-hover:text-blue-400 transition-colors" size={18} />
                            </div>
                        </div>

                        <button
                            className="w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            style={{ backgroundColor: globalStyles.primaryColor, color: '#white' }}
                        >
                            <InlineText
                                tagName="span"
                                value={content.buttonLabel || 'CONFIRMAR PRESENÇA'}
                                onChange={(val) => onUpdate({ buttonLabel: val })}
                                className="text-white"
                            />
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <InlineText
                        tagName="p"
                        value={content.footerText || 'Estamos ansiosos por celebrar este dia especial convosco!'}
                        onChange={(val) => onUpdate({ footerText: val })}
                        className="text-gray-400 text-sm italic font-light"
                    />
                </div>
            </div>
        </section>
    );
};

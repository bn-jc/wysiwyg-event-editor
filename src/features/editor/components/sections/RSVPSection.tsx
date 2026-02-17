import React from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { Mail, Users, MessageSquare } from 'lucide-react';
import { InlineText } from '../common/InlineText';


export const RSVPSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    onInteraction,
    readOnly,
    isDark
}) => {
    const { content } = section;

    // Form state
    const [attendance, setAttendance] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = () => {
        if (!attendance || !name || !email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        onInteraction?.({
            type: 'RSVP_SUBMIT',
            payload: {
                attendance,
                name,
                email,
                message
            },
            timestamp: Date.now()
        });

        setIsSubmitted(true);
    };

    if (isSubmitted && readOnly) {
        return (
            <section className="px-6 py-24 text-center bg-transparent">
                <div className="max-w-md mx-auto bg-white p-12 rounded-[2.5rem] shadow-xl">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Obrigado!</h3>
                    <p className="text-gray-500">A sua resposta foi enviada com sucesso.</p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-sm font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600"
                    >
                        Editar Resposta
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section
            className="px-6 bg-transparent relative overflow-hidden"
            style={{
                paddingTop: section.styles?.paddingTop || '96px',
                paddingBottom: section.styles?.paddingBottom || '96px',
                backgroundColor: section.styles?.backgroundColor
            }}
        >
            {/* Background Decorative Elements */}
            <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 transition-opacity duration-700", isDark ? "bg-white/5 opacity-10" : "bg-gray-50 opacity-50")} />
            <div className={cn("absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 transition-opacity duration-700", isDark ? "bg-white/5 opacity-10" : "bg-gray-50 opacity-50")} />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <InlineText
                        tagName="h2"
                        value={content.title || 'Confirme a sua Presença'}
                        onChange={(val) => onUpdate({ title: val })}
                        className="text-4xl md:text-5xl mb-4"
                        style={{
                            fontFamily: globalStyles.fontFamilyTitle,
                            color: section.styles?.color || (isDark ? '#FFFFFF' : globalStyles.primaryColor)
                        }}
                        readOnly={readOnly}
                    />

                    {content.deadline && (
                        <p
                            className="uppercase tracking-widest text-[10px] font-bold opacity-70"
                            style={{ color: section.styles?.color || 'rgb(156 163 175)' }}
                        >
                            <InlineText
                                tagName="span"
                                value={content.deadlineLabel || 'Por favor responda até '}
                                onChange={(val) => onUpdate({ deadlineLabel: val })}
                                readOnly={readOnly}
                            />
                            <InlineText
                                tagName="span"
                                value={content.deadline}
                                onChange={(val) => onUpdate({ deadline: val })}
                                className="font-bold underline cursor-pointer ml-1"
                                readOnly={readOnly}
                            />
                        </p>
                    )}
                </div>

                <div className={cn(
                    "rounded-[2.5rem] p-6 md:p-12 shadow-sm border transition-all duration-500",
                    isDark ? "bg-[#1E1E1E] border-white/5 shadow-2xl" : "bg-white border-gray-100"
                )}>
                    <div className="space-y-6">

                        <div className="group">
                            <label
                                className="text-[10px] font-bold uppercase tracking-widest mb-2 block ml-1 opacity-70"
                                style={{ color: section.styles?.color || 'rgb(156 163 175)' }}
                            >
                                <InlineText
                                    tagName="span"
                                    value={content.attendanceLabel || 'Você vai?'}
                                    onChange={(val) => onUpdate({ attendanceLabel: val })}
                                    readOnly={readOnly}
                                />
                            </label>
                            <div className="relative">
                                <select
                                    className={cn(
                                        "w-full border border-transparent rounded-2xl p-4 text-base md:text-sm focus:ring-2 transition-all outline-none pl-12 appearance-none cursor-pointer disabled:cursor-default",
                                        isDark ? "bg-black/40 text-gray-200 focus:ring-blue-500/50" : "bg-gray-50 text-gray-900 focus:ring-blue-500"
                                    )}
                                    value={attendance}
                                    onChange={(e) => setAttendance(e.target.value)}
                                    disabled={!readOnly}
                                >
                                    <option value="" disabled>Selecione uma opção</option>
                                    {(content.attendanceOptions || ['Sim, Eu vou!', 'Desculpe, não posso ir']).map((option: string, idx: number) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">
                                <InlineText
                                    tagName="span"
                                    value={content.nameLabel || 'Seu Nome Completo'}
                                    onChange={(val) => onUpdate({ nameLabel: val })}
                                    readOnly={readOnly}
                                />
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={content.namePlaceholder || "Ex: Maria & João Silva"}
                                    readOnly={!readOnly}
                                    className={cn(
                                        "w-full border border-transparent rounded-2xl p-4 text-base md:text-sm focus:ring-2 transition-all outline-none pl-12",
                                        isDark ? "bg-black/40 text-gray-200 focus:ring-blue-500/50" : "bg-gray-50 text-gray-900 focus:ring-blue-500",
                                        readOnly ? 'cursor-text' : 'cursor-default'
                                    )}
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
                                    readOnly={readOnly}
                                />
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={content.emailPlaceholder || "seu-email@exemplo.com"}
                                    readOnly={!readOnly}
                                    className={cn(
                                        "w-full border border-transparent rounded-2xl p-4 text-base md:text-sm focus:ring-2 transition-all outline-none pl-12",
                                        isDark ? "bg-black/40 text-gray-200 focus:ring-blue-400/50" : "bg-gray-50 text-gray-900 focus:ring-blue-400",
                                        readOnly ? 'cursor-text' : 'cursor-default'
                                    )}
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-blue-400 transition-colors" size={18} />
                            </div>
                        </div>

                        {(content.showMessageField !== false) && (
                            <div className="group">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">
                                    <InlineText
                                        tagName="span"
                                        value={content.messageLabel || 'Mensagem para os Noivos'}
                                        onChange={(val) => onUpdate({ messageLabel: val })}
                                        readOnly={readOnly}
                                    />
                                </label>
                                <div className="relative">
                                    <textarea
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={content.messagePlaceholder || "Alguma restrição alimentar ou mensagem especial?"}
                                        readOnly={!readOnly}
                                        className={cn(
                                            "w-full border border-transparent rounded-2xl p-4 text-base md:text-sm focus:ring-2 transition-all outline-none pl-12 resize-none",
                                            isDark ? "bg-black/40 text-gray-200 focus:ring-blue-400/50" : "bg-gray-50 text-gray-900 focus:ring-blue-400",
                                            readOnly ? 'cursor-text' : 'cursor-default'
                                        )}
                                    />
                                    <MessageSquare className="absolute left-4 top-4 text-gray-300 group-hover:text-blue-400 transition-colors" size={18} />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={readOnly ? handleSubmit : undefined}
                            className="w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            style={{ backgroundColor: globalStyles.primaryColor, color: 'white' }}
                        >
                            <InlineText
                                tagName="span"
                                value={content.buttonLabel || 'CONFIRMAR PRESENÇA'}
                                onChange={(val) => onUpdate({ buttonLabel: val })}
                                className="text-white"
                                readOnly={readOnly}
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
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </section>
    );
};

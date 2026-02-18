import React from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { Mail, Users, MessageSquare, Phone, Smartphone, MessageCircle } from 'lucide-react';
import { InlineText } from '../common/InlineText';


export const RSVPSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    onInteraction,
    onValidate,
    readOnly,
    onElementSelect,
    isDark,
    externalInputState
}) => {
    const { content } = section;
    const externalValues = externalInputState?.values[section.id] || {};
    const externalStatuses = externalInputState?.statuses[section.id] || {};

    // Form state
    const [attendance, setAttendance] = React.useState(externalValues.attendance || '');
    const [name, setName] = React.useState(externalValues.name || '');
    const [contact, setContact] = React.useState(externalValues.contact || '');
    const [message, setMessage] = React.useState(externalValues.message || '');
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Sync external values
    React.useEffect(() => {
        if (externalValues.attendance !== undefined) setAttendance(externalValues.attendance);
        if (externalValues.name !== undefined) setName(externalValues.name);
        if (externalValues.contact !== undefined) setContact(externalValues.contact);
        if (externalValues.message !== undefined) setMessage(externalValues.message);
    }, [externalValues]);

    const isFieldHidden = (key: string) => externalStatuses[key]?.hidden;
    const isFieldDisabled = (key: string) => externalStatuses[key]?.disabled;

    const handleSubmit = () => {
        if (!attendance || !name || !contact) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (onValidate && !onValidate('rsvp-contact', contact, { contactType: content.contactType || 'email' })) {
            setError(
                (content.contactType || 'email') === 'email'
                    ? 'Por favor, insira um e-mail válido.'
                    : 'Por favor, insira um número de telefone válido.'
            );
            return;
        }

        setError(null);

        onInteraction?.({
            type: 'RSVP_SUBMIT',
            payload: {
                attendance,
                name,
                contact,
                contactType: content.contactType || 'email',
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
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
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
                        onSelectElement={() => onElementSelect?.('title')}
                        className={cn(
                            "mb-4",
                            content.titleSize && content.titleSize !== 'inherit' ? content.titleSize : "text-4xl md:text-5xl"
                        )}
                        style={{
                            fontFamily: content.titleFont && content.titleFont !== 'inherit' ? content.titleFont : globalStyles.fontFamilyTitle,
                            color: content.titleColor || section.styles?.color || 'inherit'
                        }}
                        readOnly={readOnly}
                    />

                    {content.deadline && (
                        <p
                            className={cn(
                                "uppercase tracking-widest text-[10px] font-bold opacity-70",
                                content.deadlineLabelSize && content.deadlineLabelSize !== 'inherit' ? content.deadlineLabelSize : ""
                            )}
                            style={{
                                fontFamily: content.deadlineLabelFont && content.deadlineLabelFont !== 'inherit' ? content.deadlineLabelFont : 'inherit',
                                color: content.deadlineLabelColor || section.styles?.color || 'rgb(156 163 175)'
                            }}
                        >
                            <InlineText
                                tagName="span"
                                value={content.deadlineLabel || 'Por favor responda até '}
                                onChange={(val) => onUpdate({ deadlineLabel: val })}
                                onSelectElement={() => onElementSelect?.('deadlineLabel')}
                                readOnly={readOnly}
                            />
                            <InlineText
                                tagName="span"
                                value={content.deadline}
                                onChange={(val) => onUpdate({ deadline: val })}
                                onSelectElement={() => onElementSelect?.('deadline')}
                                className={cn(
                                    "underline cursor-pointer ml-1",
                                    content.deadlineSize && content.deadlineSize !== 'inherit' ? content.deadlineSize : "font-bold"
                                )}
                                style={{
                                    fontFamily: content.deadlineFont && content.deadlineFont !== 'inherit' ? content.deadlineFont : 'inherit',
                                    color: content.deadlineColor || 'inherit'
                                }}
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

                        {!isFieldHidden('attendance') && (
                            <div className="group">
                                <label
                                    className={cn(
                                        "uppercase tracking-widest mb-2 block ml-1 opacity-70",
                                        content.fieldLabelSize && content.fieldLabelSize !== 'inherit' ? content.fieldLabelSize : "text-[10px] font-bold"
                                    )}
                                    style={{
                                        fontFamily: content.fieldLabelFont && content.fieldLabelFont !== 'inherit' ? content.fieldLabelFont : 'inherit',
                                        color: content.fieldLabelColor || section.styles?.color || 'rgb(156 163 175)'
                                    }}
                                >
                                    <InlineText
                                        tagName="span"
                                        value={content.attendanceLabel || 'Você vai?'}
                                        onChange={(val) => onUpdate({ attendanceLabel: val })}
                                        onSelectElement={() => onElementSelect?.('attendanceLabel')}
                                        readOnly={readOnly}
                                    />
                                </label>
                                <div className="relative">
                                    <select
                                        className={cn(
                                            "w-full border border-transparent rounded-2xl p-4 transition-all outline-none pl-12 appearance-none cursor-pointer disabled:cursor-default",
                                            content.fieldPlaceholderSize && content.fieldPlaceholderSize !== 'inherit' ? content.fieldPlaceholderSize : "text-base md:text-sm",
                                            isDark ? "bg-black/40 text-gray-200 focus:ring-blue-500/50" : "bg-gray-50 text-gray-900 focus:ring-blue-500"
                                        )}
                                        style={{
                                            fontFamily: content.fieldPlaceholderFont && content.fieldPlaceholderFont !== 'inherit' ? content.fieldPlaceholderFont : 'inherit',
                                            color: content.fieldPlaceholderColor || 'inherit'
                                        }}
                                        value={attendance}
                                        onChange={(e) => setAttendance(e.target.value)}
                                        disabled={!readOnly || isFieldDisabled('attendance')}
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
                        )}

                        {!isFieldHidden('name') && (
                            <div className="group">
                                <label
                                    className={cn(
                                        "uppercase tracking-widest mb-2 block ml-1 opacity-70",
                                        content.fieldLabelSize && content.fieldLabelSize !== 'inherit' ? content.fieldLabelSize : "text-[10px] font-bold"
                                    )}
                                    style={{
                                        fontFamily: content.fieldLabelFont && content.fieldLabelFont !== 'inherit' ? content.fieldLabelFont : 'inherit',
                                        color: content.fieldLabelColor || 'rgb(156 163 175)'
                                    }}
                                >
                                    <InlineText
                                        tagName="span"
                                        value={content.nameLabel || 'Seu Nome Completo'}
                                        onChange={(val) => onUpdate({ nameLabel: val })}
                                        onSelectElement={() => onElementSelect?.('nameLabel')}
                                        readOnly={readOnly}
                                    />
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={content.namePlaceholder || "Ex: Maria & João Silva"}
                                        readOnly={!readOnly || externalStatuses.name?.readOnly}
                                        disabled={isFieldDisabled('name')}
                                        className={cn(
                                            "w-full border border-transparent rounded-2xl p-4 transition-all outline-none pl-12",
                                            content.fieldPlaceholderSize && content.fieldPlaceholderSize !== 'inherit' ? content.fieldPlaceholderSize : "text-base md:text-sm",
                                            isDark ? "bg-black/40 text-gray-200 focus:ring-blue-500/50" : "bg-gray-50 text-gray-900 focus:ring-blue-500",
                                            readOnly ? 'cursor-text' : 'cursor-default'
                                        )}
                                        style={{
                                            fontFamily: content.fieldPlaceholderFont && content.fieldPlaceholderFont !== 'inherit' ? content.fieldPlaceholderFont : 'inherit',
                                            color: content.fieldPlaceholderColor || 'inherit'
                                        }}
                                    />
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-blue-500 transition-colors" size={18} />
                                </div>
                            </div>
                        )}

                        {!isFieldHidden('contact') && (
                            <div className="group">
                                <div className="flex justify-between items-end mb-2 ml-1">
                                    <label
                                        className={cn(
                                            "uppercase tracking-widest opacity-70",
                                            content.fieldLabelSize && content.fieldLabelSize !== 'inherit' ? content.fieldLabelSize : "text-[10px] font-bold"
                                        )}
                                        style={{
                                            fontFamily: content.fieldLabelFont && content.fieldLabelFont !== 'inherit' ? content.fieldLabelFont : 'inherit',
                                            color: content.fieldLabelColor || 'rgb(156 163 175)'
                                        }}
                                    >
                                        <InlineText
                                            tagName="span"
                                            value={
                                                content.contactType === 'email' ? (content.emailLabel || 'E-mail para Contacto') :
                                                    (content.phoneLabel || 'Telemóvel para Contacto')
                                            }
                                            onChange={(val) => {
                                                if (content.contactType === 'email') onUpdate({ emailLabel: val });
                                                else onUpdate({ phoneLabel: val });
                                            }}
                                            onSelectElement={() => onElementSelect?.(content.contactType === 'email' ? 'emailLabel' : 'phoneLabel')}
                                            readOnly={readOnly}
                                        />
                                    </label>
                                    {!readOnly && (
                                        <div className="flex gap-2 text-[10px] font-bold">
                                            {['email', 'phone', 'sms', 'whatsapp'].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => onUpdate({ contactType: type })}
                                                    className={cn(
                                                        "transition-colors",
                                                        content.contactType === type ? "text-blue-500" : "text-gray-300 hover:text-gray-400"
                                                    )}
                                                >
                                                    {type.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={content.contactType === 'email' ? 'email' : 'tel'}
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder={
                                            content.contactType === 'email'
                                                ? (content.emailPlaceholder || "seu-email@exemplo.com")
                                                : (content.phonePlaceholder || "Ex: +258 84 123 4567")
                                        }
                                        readOnly={!readOnly || externalStatuses.contact?.readOnly}
                                        disabled={isFieldDisabled('contact')}
                                        className={cn(
                                            "w-full border border-transparent rounded-2xl p-4 transition-all outline-none pl-12",
                                            content.fieldPlaceholderSize && content.fieldPlaceholderSize !== 'inherit' ? content.fieldPlaceholderSize : "text-base md:text-sm",
                                            isDark ? "bg-black/40 text-gray-200 focus:ring-blue-400/50" : "bg-gray-50 text-gray-900 focus:ring-blue-400",
                                            readOnly ? 'cursor-text' : 'cursor-default',
                                            error && !contact && "border-red-500/50"
                                        )}
                                        style={{
                                            fontFamily: content.fieldPlaceholderFont && content.fieldPlaceholderFont !== 'inherit' ? content.fieldPlaceholderFont : 'inherit',
                                            color: content.fieldPlaceholderColor || 'inherit'
                                        }}
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-blue-400 transition-colors">
                                        {content.contactType === 'email' && <Mail size={18} />}
                                        {content.contactType === 'phone' && <Phone size={18} />}
                                        {content.contactType === 'sms' && <Smartphone size={18} />}
                                        {content.contactType === 'whatsapp' && <MessageCircle size={18} />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <p data-testid="contact-error" className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1 mt-1 animate-pulse">
                                {error}
                            </p>
                        )}

                        {(content.showMessageField !== false) && !isFieldHidden('message') && (
                            <div className="group">
                                <label
                                    className={cn(
                                        "uppercase tracking-widest mb-2 block ml-1 opacity-70",
                                        content.fieldLabelSize && content.fieldLabelSize !== 'inherit' ? content.fieldLabelSize : "text-[10px] font-bold"
                                    )}
                                    style={{
                                        fontFamily: content.fieldLabelFont && content.fieldLabelFont !== 'inherit' ? content.fieldLabelFont : 'inherit',
                                        color: content.fieldLabelColor || 'rgb(156 163 175)'
                                    }}
                                >
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
                                        readOnly={!readOnly || externalStatuses.message?.readOnly}
                                        disabled={isFieldDisabled('message')}
                                        className={cn(
                                            "w-full border border-transparent rounded-2xl p-4 transition-all outline-none pl-12 resize-none",
                                            content.fieldPlaceholderSize && content.fieldPlaceholderSize !== 'inherit' ? content.fieldPlaceholderSize : "text-base md:text-sm",
                                            isDark ? "bg-black/40 text-gray-200 focus:ring-blue-400/50" : "bg-gray-50 text-gray-900 focus:ring-blue-400",
                                            readOnly ? 'cursor-text' : 'cursor-default'
                                        )}
                                        style={{
                                            fontFamily: content.fieldPlaceholderFont && content.fieldPlaceholderFont !== 'inherit' ? content.fieldPlaceholderFont : 'inherit',
                                            color: content.fieldPlaceholderColor || 'inherit'
                                        }}
                                    />
                                    <MessageSquare className="absolute left-4 top-4 text-gray-300 group-hover:text-blue-400 transition-colors" size={18} />
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
                                onClick={readOnly ? handleSubmit : undefined}
                                onMouseDown={(e) => {
                                    if (!readOnly) {
                                        e.stopPropagation();
                                        onElementSelect?.('buttonLabel');
                                    }
                                }}
                                disabled={isFieldDisabled('submit')}
                                className={cn(
                                    "py-5 font-black tracking-[0.2em] transition-all shadow-md active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",
                                    content.buttonSize && content.buttonSize !== 'inherit' ? content.buttonSize : "text-xs",
                                    content.buttonShape || "rounded-2xl",
                                    content.buttonAlignment === 'full' ? "w-full" : "px-10",
                                    !content.buttonColor && "bg-blue-500 text-white hover:shadow-xl hover:-translate-y-0.5"
                                )}
                                style={{
                                    backgroundColor: isFieldDisabled('submit') ? '#ccc' : (content.buttonColor ? `${content.buttonColor}11` : globalStyles.primaryColor),
                                    color: content.buttonColor || 'white',
                                    border: content.buttonColor ? `1px solid ${content.buttonColor}` : undefined,
                                    fontFamily: content.buttonFont && content.buttonFont !== 'inherit' ? content.buttonFont : 'inherit'
                                }}
                            >
                                <InlineText
                                    tagName="span"
                                    value={content.buttonLabel || 'CONFIRMAR PRESENÇA'}
                                    onChange={(val) => onUpdate({ buttonLabel: val })}
                                    onSelectElement={() => onElementSelect?.('buttonLabel')}
                                    readOnly={readOnly}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <InlineText
                        tagName="p"
                        value={content.footerText || 'Estamos ansiosos por celebrar este dia especial convosco!'}
                        onChange={(val) => onUpdate({ footerText: val })}
                        onSelectElement={() => onElementSelect?.('footerText')}
                        className={cn(
                            "text-gray-400 font-light",
                            content.footerSize && content.footerSize !== 'inherit' ? content.footerSize : "text-sm italic"
                        )}
                        style={{
                            fontFamily: content.footerFont && content.footerFont !== 'inherit' ? content.footerFont : 'inherit',
                            color: content.footerColor || 'inherit'
                        }}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </section>
    );
};

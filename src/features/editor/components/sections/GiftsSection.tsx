import React from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { InlineText } from '../common/InlineText';

import { Plane, Utensils, Home, Gift, DollarSign, Landmark, CreditCard, Info } from 'lucide-react';

const IconMap: Record<string, React.FC<any>> = {
    plane: Plane,
    utensils: Utensils,
    home: Home,
    gift: Gift,
    dollar: DollarSign,
    bank: Landmark,
    card: CreditCard,
    info: Info
};

export const GiftsSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    readOnly,
    onElementSelect,
    isDark,
    externalInputState
}) => {
    const { content } = section;
    const externalValues = externalInputState?.values[section.id] || {};
    const giftItems = content.giftItems || [];
    const bankDetails = {
        ...content.bankDetails,
        ...externalValues
    };

    const updateGiftItem = (index: number, field: string, value: string) => {
        if (readOnly) return;
        const newItems = [...giftItems];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ giftItems: newItems });
    };

    const updateBankDetail = (field: string, value: string) => {
        if (readOnly) return;
        onUpdate({
            bankDetails: {
                ...bankDetails,
                [field]: value
            }
        });
    };

    return (
        <section
            className="px-6 py-20 bg-transparent"
            style={{
                paddingTop: section.styles?.paddingTop || '5rem',
                paddingBottom: section.styles?.paddingBottom || '5rem',
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
            }}
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
                <div className="text-center flex flex-col gap-4">
                    <InlineText
                        tagName="h2"
                        value={content.title || 'Lista de Presentes'}
                        onChange={(val) => onUpdate({ title: val })}
                        onSelectElement={() => onElementSelect?.('title')}
                        className={cn(
                            content.titleSize && content.titleSize !== 'inherit' ? content.titleSize : "text-4xl md:text-5xl"
                        )}
                        readOnly={readOnly}
                        style={{
                            fontFamily: content.titleFont && content.titleFont !== 'inherit' ? content.titleFont : globalStyles.fontFamilyTitle,
                            color: content.titleColor || section.styles?.color || 'inherit'
                        }}
                    />
                    <InlineText
                        tagName="p"
                        value={content.description || 'A sua presença é o nosso maior presente...'}
                        onChange={(val) => onUpdate({ description: val })}
                        onSelectElement={() => onElementSelect?.('description')}
                        className={cn(
                            "opacity-80 max-w-2xl mx-auto",
                            content.descriptionSize && content.descriptionSize !== 'inherit' ? content.descriptionSize : "text-lg"
                        )}
                        readOnly={readOnly}
                        style={{
                            fontFamily: content.descriptionFont && content.descriptionFont !== 'inherit' ? content.descriptionFont : 'inherit',
                            color: content.descriptionColor || 'inherit'
                        }}
                    />
                </div>

                {content.showGifts && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {giftItems.map((item: any, idx: number) => {
                            const Icon = IconMap[item.icon] || Gift;
                            return (
                                <div
                                    key={item.id || idx}
                                    className={cn(
                                        "p-6 rounded-2xl border flex items-start gap-4 transition-all hover:shadow-lg backdrop-blur-sm",
                                        isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/50 border-gray-100"
                                    )}
                                    style={{ borderColor: !isDark ? `${globalStyles.primaryColor}22` : undefined }}
                                >
                                    <div className="flex flex-col gap-1 w-full relative">
                                        {item.imageUrl && (
                                            <div className="w-full aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100 ring-1 ring-black/5">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="p-3 rounded-full shrink-0"
                                                style={{ backgroundColor: `${globalStyles.primaryColor}11`, color: globalStyles.primaryColor }}
                                            >
                                                <Icon size={24} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 w-full">
                                                <InlineText
                                                    tagName="h4"
                                                    value={item.name}
                                                    onChange={(val) => updateGiftItem(idx, 'name', val)}
                                                    onSelectElement={() => onElementSelect?.('giftItems')}
                                                    className={cn(
                                                        "font-medium leading-tight",
                                                        content.giftNameSize && content.giftNameSize !== 'inherit' ? content.giftNameSize : "text-xl"
                                                    )}
                                                    readOnly={readOnly}
                                                    style={{
                                                        fontFamily: content.giftNameFont && content.giftNameFont !== 'inherit' ? content.giftNameFont : 'inherit',
                                                        color: content.giftNameColor || 'inherit'
                                                    }}
                                                />
                                                <InlineText
                                                    tagName="p"
                                                    value={item.description}
                                                    onChange={(val) => updateGiftItem(idx, 'description', val)}
                                                    onSelectElement={() => onElementSelect?.('giftItems')}
                                                    className={cn(
                                                        "opacity-60 leading-relaxed",
                                                        content.giftDescriptionSize && content.giftDescriptionSize !== 'inherit' ? content.giftDescriptionSize : "text-sm"
                                                    )}
                                                    readOnly={readOnly}
                                                    style={{
                                                        fontFamily: content.giftDescriptionFont && content.giftDescriptionFont !== 'inherit' ? content.giftDescriptionFont : 'inherit',
                                                        color: content.giftDescriptionColor || 'inherit'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {item.linkUrl && (
                                            <a
                                                href={item.linkUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 py-2.5 px-6 rounded-xl text-center text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group/btn w-full"
                                                style={{
                                                    backgroundColor: globalStyles.primaryColor,
                                                    color: '#FFFFFF'
                                                }}
                                            >
                                                Ver Detalhes / Comprar
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {content.showBankDetails && (
                    <div
                        className="w-full max-w-2xl p-6 md:p-8 rounded-3xl border flex flex-col gap-6"
                        style={{
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : `${globalStyles.primaryColor}33`,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : `${globalStyles.primaryColor}05`
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <Landmark className="shrink-0" style={{ color: globalStyles.primaryColor }} />
                            <h3 className="text-2xl font-semibold" style={{ fontFamily: globalStyles.fontFamilyTitle }}>
                                Dados Bancários
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {[
                                { label: 'Banco', field: 'bankName' },
                                { label: 'Titular', field: 'accountName' },
                                { label: 'Conta', field: 'accountNumber' },
                                { label: 'NIB', field: 'nib' },
                                { label: 'IBAN', field: 'iban' }
                            ].map((detail) => (
                                <div key={detail.field} className="flex flex-col gap-1">
                                    <span
                                        className={cn(
                                            "uppercase tracking-wider opacity-50 font-bold",
                                            content.bankLabelSize && content.bankLabelSize !== 'inherit' ? content.bankLabelSize : "text-xs"
                                        )}
                                        style={{
                                            fontFamily: content.bankLabelFont && content.bankLabelFont !== 'inherit' ? content.bankLabelFont : 'inherit',
                                            color: content.bankLabelColor || 'inherit'
                                        }}
                                    >
                                        {detail.label}
                                    </span>
                                    <InlineText
                                        tagName="p"
                                        value={bankDetails[detail.field]}
                                        onChange={(val) => updateBankDetail(detail.field, val)}
                                        onSelectElement={() => onElementSelect?.('bankDetails')}
                                        className={cn(
                                            "font-medium",
                                            content.bankValueSize && content.bankValueSize !== 'inherit' ? content.bankValueSize : "text-md"
                                        )}
                                        readOnly={readOnly}
                                        style={{
                                            fontFamily: content.bankValueFont && content.bankValueFont !== 'inherit' ? content.bankValueFont : 'inherit',
                                            color: content.bankValueColor || 'inherit'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

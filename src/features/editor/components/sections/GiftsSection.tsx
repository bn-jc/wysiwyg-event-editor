import React from 'react';
import type { SectionRendererProps } from '../../types';
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
    readOnly
}) => {
    const { content } = section;
    const giftItems = content.giftItems || [];
    const bankDetails = content.bankDetails || {};

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
                paddingTop: section.styles?.paddingTop || '80px',
                paddingBottom: section.styles?.paddingBottom || '80px',
                backgroundColor: section.styles?.backgroundColor,
                color: section.styles?.color || 'inherit'
            }}
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
                <div className="text-center flex flex-col gap-4">
                    <InlineText
                        tagName="h2"
                        value={content.title || 'Lista de Presentes'}
                        onChange={(val) => onUpdate({ title: val })}
                        className="text-4xl md:text-5xl"
                        readOnly={readOnly}
                        style={{
                            fontFamily: globalStyles.fontFamilyTitle,
                            color: section.styles?.color || globalStyles.primaryColor
                        }}
                    />
                    <InlineText
                        tagName="p"
                        value={content.description || 'A sua presença é o nosso maior presente...'}
                        onChange={(val) => onUpdate({ description: val })}
                        className="text-lg opacity-80 max-w-2xl mx-auto"
                        readOnly={readOnly}
                    />
                </div>

                {content.showGifts && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {giftItems.map((item: any, idx: number) => {
                            const Icon = IconMap[item.icon] || Gift;
                            return (
                                <div
                                    key={item.id || idx}
                                    className="p-6 rounded-2xl border flex items-start gap-4 transition-all hover:shadow-lg bg-white/50 backdrop-blur-sm"
                                    style={{ borderColor: `${globalStyles.primaryColor}22` }}
                                >
                                    <div
                                        className="p-3 rounded-full shrink-0"
                                        style={{ backgroundColor: `${globalStyles.primaryColor}11`, color: globalStyles.primaryColor }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <InlineText
                                            tagName="h4"
                                            value={item.name}
                                            onChange={(val) => updateGiftItem(idx, 'name', val)}
                                            className="text-xl font-medium"
                                            readOnly={readOnly}
                                        />
                                        <InlineText
                                            tagName="p"
                                            value={item.description}
                                            onChange={(val) => updateGiftItem(idx, 'description', val)}
                                            className="text-sm opacity-60"
                                            readOnly={readOnly}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {content.showBankDetails && (
                    <div
                        className="w-full max-w-2xl p-8 rounded-3xl border flex flex-col gap-6"
                        style={{
                            borderColor: `${globalStyles.primaryColor}33`,
                            backgroundColor: `${globalStyles.primaryColor}05`
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
                                    <span className="text-xs uppercase tracking-wider opacity-50 font-bold">{detail.label}</span>
                                    <InlineText
                                        tagName="p"
                                        value={bankDetails[detail.field]}
                                        onChange={(val) => updateBankDetail(detail.field, val)}
                                        className="text-md font-medium"
                                        readOnly={readOnly}
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

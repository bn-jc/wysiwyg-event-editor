
export const validateContact = (contact: string, type: 'email' | 'phone' | 'sms' | 'whatsapp'): boolean => {
    if (!contact) return false;

    switch (type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
        case 'phone':
        case 'sms':
        case 'whatsapp':
            // Basic phone validation: digits, spaces, +, -, ()
            // Require at least 7 digits
            const digits = contact.replace(/\D/g, '');
            return digits.length >= 7 && /^[+\d\s()/-]+$/.test(contact);
        default:
            return true;
    }
};

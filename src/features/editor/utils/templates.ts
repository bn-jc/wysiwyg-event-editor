import type { EditorNode } from '../types';

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

export const TEMPLATES = {
    HERO: {
        name: 'Hero Section',
        elements: (): EditorNode[] => [
            {
                id: generateId(),
                type: 'container',
                x: 0,
                y: 0,
                width: 400,
                height: 400,
                styles: {
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    borderRadius: '0px'
                },
                children: [
                    {
                        id: generateId(),
                        type: 'text',
                        content: 'The Wedding of',
                        x: 100,
                        y: 50,
                        width: 200,
                        height: 30,
                        styles: { fontSize: '18px', textAlign: 'center', color: '#64748b' }
                    },
                    {
                        id: generateId(),
                        type: 'text',
                        content: 'Wahyu & Riski',
                        x: 50,
                        y: 100,
                        width: 300,
                        height: 80,
                        styles: {
                            fontSize: '48px',
                            textAlign: 'center',
                            fontFamily: "'Sacramento', cursive",
                            color: '#1a1a1a'
                        }
                    },
                    {
                        id: generateId(),
                        type: 'text',
                        content: 'SAVE THE DATE | 12.12.2026',
                        x: 50,
                        y: 200,
                        width: 300,
                        height: 30,
                        styles: {
                            fontSize: '14px',
                            textAlign: 'center',
                            fontWeight: '600',
                            letterSpacing: '2px',
                            color: '#334155'
                        }
                    }
                ]
            }
        ]
    },
    COUPLE: {
        name: 'Couple Profile',
        elements: (): EditorNode[] => {
            return [
                {
                    id: generateId(),
                    type: 'container',
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 300,
                    styles: {
                        backgroundColor: '#f8fafc',
                        padding: '20px',
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    children: [
                        {
                            id: generateId(),
                            type: 'container',
                            x: 0,
                            y: 0,
                            width: 150,
                            height: 200,
                            styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                            children: [
                                {
                                    id: generateId(),
                                    type: 'image',
                                    content: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
                                    x: 25,
                                    y: 0,
                                    width: 100,
                                    height: 100,
                                    styles: { borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                                },
                                {
                                    id: generateId(),
                                    type: 'text',
                                    content: 'Wahyu Pratama',
                                    x: 0,
                                    y: 110,
                                    width: 150,
                                    height: 30,
                                    styles: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }
                                }
                            ]
                        }
                    ]
                }
            ];
        }
    }
};

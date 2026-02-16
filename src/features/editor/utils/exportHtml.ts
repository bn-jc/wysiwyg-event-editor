import type { EventLayout } from '../types';

export const generateStandaloneHtml = (layout: EventLayout): string => {
    return `
<!DOCTYPE html>
<html lang="${layout.language || 'pt-PT'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${layout.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Sacramento&family=Josefin+Sans:wght@300;400;600&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: ${layout.globalStyles.backgroundColor || '#ffffff'};
            font-family: 'Josefin Sans', sans-serif;
        }
        .font-title { font-family: 'Sacramento', cursive; }
        .font-body { font-family: 'Josefin Sans', sans-serif; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
        }
        .animate-float { animation: float linear infinite; }
    </style>
</head>
<body>
    <div id="root">
        <!-- Rendered Content would go here -->
        <div class="text-center py-20">
            <h1 class="text-4xl font-title">${layout.name}</h1>
            <p class="mt-4">This is a standalone export placeholder.</p>
            <p class="text-xs mt-8 opacity-50">To implement full static generation, we would need to serialize the React components to static HTML.</p>
        </div>
    </div>
    
    <script>
        // In a real implementation, we could inject the JSON and a mini-renderer here
        console.log('Layout Data:', ${JSON.stringify(layout)});
    </script>
</body>
</html>
    `.trim();
};

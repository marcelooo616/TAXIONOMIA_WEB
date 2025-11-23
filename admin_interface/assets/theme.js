// assets/theme.js
(function() {
    // Referências
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // --- 1. DEFINIÇÃO DOS ÍCONES SVG (OFFLINE) ---
    

    const iconSun = `<svg id="themeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="none" stroke="currentColor" stroke-width="16"><line x1="128" y1="40" x2="128" y2="16" stroke-linecap="round" stroke-linejoin="round"/><circle cx="128" cy="128" r="56" stroke-linecap="round" stroke-linejoin="round"/><line x1="64" y1="64" x2="48" y2="48" stroke-linecap="round" stroke-linejoin="round"/><line x1="64" y1="192" x2="48" y2="208" stroke-linecap="round" stroke-linejoin="round"/><line x1="192" y1="64" x2="208" y2="48" stroke-linecap="round" stroke-linejoin="round"/><line x1="192" y1="192" x2="208" y2="208" stroke-linecap="round" stroke-linejoin="round"/><line x1="40" y1="128" x2="16" y2="128" stroke-linecap="round" stroke-linejoin="round"/><line x1="128" y1="216" x2="128" y2="240" stroke-linecap="round" stroke-linejoin="round"/><line x1="216" y1="128" x2="240" y2="128" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const iconMoon = `<svg id="themeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="none" stroke="currentColor" stroke-width="16"><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" stroke-linecap="round" stroke-linejoin="round"/></svg>`;


    // --- 2. LÓGICA DE INICIALIZAÇÃO ---

    // Verifica se já existe uma preferência salva ou usa a do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Define o tema inicial
    const currentTheme = savedTheme ? savedTheme : (systemDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', currentTheme);

    // Função para atualizar o ícone baseado no estado ATUAL
    const updateIcon = () => {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';
            // Lógica: Se está Dark, mostra o Sol. Se está Light, mostra a Lua.
            btn.innerHTML = isDark ? iconSun : iconMoon;
            
            // Ajuste de acessibilidade
            btn.setAttribute('aria-label', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
        }
    };

    // --- 3. EVENTOS ---

    // Executa assim que o script carrega (para evitar piscadas)
    updateIcon();

    // Garante que o botão funcione mesmo se o script rodar antes do HTML estar pronto
    window.addEventListener('DOMContentLoaded', () => {
        updateIcon(); // Garante o ícone correto ao carregar

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const isDarkNow = htmlElement.getAttribute('data-theme') === 'dark';
                const newTheme = isDarkNow ? 'light' : 'dark';
                
                // Aplica o tema
                htmlElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Atualiza o ícone
                updateIcon();
            });
        }
    });

})();
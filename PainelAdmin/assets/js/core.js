console.log("1-core.js carregado");

window.App = {
    CONFIG: {
        'dados': { label: 'Base Geral', type: 'table', icon: 'ph-database' },
        'produtosMicrosoft': { label: 'Produtos', type: 'table', icon: 'ph-package' },
        'refunds': { label: 'Reembolsos', type: 'table', icon: 'ph-currency-dollar' },
        'dadosRefund': { label: 'Dados Reembolso', type: 'table', icon: 'ph-receipt' },
        'dadosRefaund': { label: 'Legado (Refaund)', type: 'table', icon: 'ph-warning-circle' },
        'sapPathsData': { label: 'Caminhos SAP', type: 'table', icon: 'ph-tree-structure' },
        'emailTemplates': { label: 'Emails', type: 'email', icon: 'ph-envelope-simple' }
    },

    state: {
        originalHtml: null,
        datasets: {},
        activeKey: null,
        data: [],
        filteredData: [],
        filters: {}
    },

    UI: {
        loading: document.getElementById('loadingOverlay'),
        sidebarNav: document.getElementById('sidebarNav'),
        fileInput: document.getElementById('fileInput'),
        toastContainer: document.getElementById('toast-container'),
        // Referências Mobile
        appSidebar: document.getElementById('appSidebar'),
        mobileOverlay: document.getElementById('mobileOverlay'),
        views: {
            upload: document.getElementById('view-upload'),
            table: document.getElementById('view-table'),
            email: document.getElementById('view-emails')
        }
    },

    utils: {
        showLoading: (show, msg="Processando...") => {
            const el = App.UI.loading;
            if(el) {
                el.querySelector('#loadingMessage').textContent = msg;
                if(show) el.classList.remove('hidden'); 
                else el.classList.add('hidden');
            }
        },

        // --- NOVO SISTEMA DE NOTIFICAÇÃO (TOAST) ---
        toast: (message, type = 'info') => { // types: info, success, error, warning
            const container = App.UI.toastContainer;
            if(!container) return alert(message); // Fallback

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            // Ícone baseado no tipo
            let icon = 'ph-info';
            if(type === 'success') icon = 'ph-check-circle';
            if(type === 'error') icon = 'ph-warning-circle';
            if(type === 'warning') icon = 'ph-warning';

            toast.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="ph ${icon}" style="font-size: 1.2rem;"></i>
                    <span>${message}</span>
                </div>
                <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
            `;

            container.appendChild(toast);

            // Auto remover após 4 segundos
            setTimeout(() => {
                toast.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => toast.remove(), 500);
            }, 4000);
        },

        smartExtractArray: (text, startPos) => {
            let openBrackets = 0;
            let inString = false;
            let stringChar = '';

            for (let i = startPos; i < text.length; i++) {
                const char = text[i];
                if (inString) {
                    if (char === stringChar && text[i-1] !== '\\') inString = false;
                    continue;
                }
                if (char === '"' || char === "'" || char === '`') {
                    inString = true; stringChar = char; continue;
                }
                if (char === '[') openBrackets++;
                if (char === ']') {
                    openBrackets--;
                    if (openBrackets === 0) return text.substring(startPos, i + 1);
                }
            }
            return null;
        }
    }
};
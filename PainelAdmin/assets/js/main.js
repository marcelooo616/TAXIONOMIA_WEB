console.log("5-main.js carregado");

App.Main = {
    init: function() {
        console.log("App Inicializado");
        
        if(App.UI.fileInput) {
            App.UI.fileInput.addEventListener('change', App.Parser.handleFileUpload);
        }

        // Inicializa Módulos
        App.Table.init();
        App.Email.init();

        // --- LÓGICA MOBILE ---
        const openBtn = document.getElementById('openSidebarBtn');
        const closeBtn = document.getElementById('closeSidebarBtn');
        const overlay = document.getElementById('mobileOverlay');

        if(openBtn) openBtn.onclick = App.Main.toggleSidebar;
        if(closeBtn) closeBtn.onclick = App.Main.toggleSidebar;
        if(overlay) overlay.onclick = App.Main.toggleSidebar;
    },

    toggleSidebar: function() {
        const sidebar = App.UI.appSidebar;
        const overlay = App.UI.mobileOverlay;
        const closeBtn = document.getElementById('closeSidebarBtn');

        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
        
        // Mostra botão de fechar apenas se estiver aberto
        if(sidebar.classList.contains('open')) {
            closeBtn.style.display = 'block';
        } else {
            closeBtn.style.display = 'none';
        }
    },

    renderSidebar: function() {
        const nav = App.UI.sidebarNav;
        nav.innerHTML = '';

        Object.keys(App.state.datasets).forEach(key => {
            const config = App.CONFIG[key] || { label: key, icon: 'ph-brackets-curly', type: 'table' };
            
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<i class="ph ${config.icon}"></i> ${config.label}`;
            
            btn.onclick = () => {
                App.Main.switchView(key);
                // Fecha menu no mobile ao clicar
                if(window.innerWidth <= 768) App.Main.toggleSidebar();
            };
            btn.dataset.key = key;
            
            nav.appendChild(btn);
        });
    },

    switchView: function(key) {
        App.state.activeKey = key;
        App.state.data = App.state.datasets[key].data;
        App.state.filteredData = [...App.state.data];

        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-item[data-key="${key}"]`);
        if(activeBtn) activeBtn.classList.add('active');

        Object.values(App.UI.views).forEach(v => v.classList.add('hidden'));

        const type = (App.CONFIG[key] && App.CONFIG[key].type) || 'table';

        if (type === 'email') {
            App.UI.views.email.classList.remove('hidden');
            App.Email.renderList();
        } else {
            App.UI.views.table.classList.remove('hidden');
            const config = App.CONFIG[key] || { label: key, icon: 'ph-table' };
            document.getElementById('tableTitle').innerText = config.label;
            document.getElementById('tableIcon').className = `ph ${config.icon}`;
            App.Table.generateFilters();
            App.Table.runFilters();
        }
    }
};

document.addEventListener('DOMContentLoaded', App.Main.init);
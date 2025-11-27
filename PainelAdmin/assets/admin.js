(function () {
    // 1. CONFIGURAÇÃO DE NOMES AMIGÁVEIS E TIPOS
    const DATASET_CONFIG = {
        'dados': { 
            label: 'Base Geral de Suporte', 
            type: 'table', 
            icon: 'ph-files' 
        },
        'produtosMicrosoft': { 
            label: 'Catálogo de Produtos', 
            type: 'table', 
            icon: 'ph-tag' 
        },
        'refunds': { 
            label: 'Matriz de Reembolsos', 
            type: 'table', 
            icon: 'ph-currency-dollar' 
        },
        'dadosRefund': { 
            label: 'Reembolsos (Dados)', 
            type: 'table', 
            icon: 'ph-credit-card' 
        },
        'dadosRefaund': { 
            label: 'Reembolsos (Legado)', 
            type: 'table', 
            icon: 'ph-warning-circle' 
        },
        'sapPathsData': { 
            label: 'Mapeamento SAP', 
            type: 'table', // Vamos usar tabela para simplificar
            icon: 'ph-tree-structure' 
        },
        'emailTemplates': { 
            label: 'Modelos de E-mail', 
            type: 'email', 
            icon: 'ph-envelope' 
        }
    };

    // Variáveis que queremos buscar no arquivo
    const TARGET_VARS = Object.keys(DATASET_CONFIG);

    // Estado da Aplicação
    const state = {
        originalHtml: null,
        datasets: {}, // Armazena { dados: [...], produtosMicrosoft: [...] }
        activeKey: null,
        data: [], // Dados da tabela ativa
        filteredData: [],
        filters: {} // Filtros ativos
    };

    // Referências do DOM
    const UI = {
        fileInput: document.getElementById('fileInput'),
        sidebarNav: document.getElementById('sidebarNav'),
        loading: document.getElementById('loadingOverlay'),
        views: {
            upload: document.getElementById('view-upload'),
            table: document.getElementById('view-table'),
            email: document.getElementById('view-emails')
        },
        // Tabela
        tableTitle: document.getElementById('tableTitle'),
        tableIcon: document.getElementById('tableIcon'),
        tableContainer: document.getElementById('tableContainer'),
        searchInput: document.getElementById('searchInput'),
        filtersContainer: document.getElementById('filtersContainer'),
        recordCount: document.getElementById('recordCount'),
        btnAddRow: document.getElementById('btnAddRow'),
        btnExport: document.getElementById('btnExport'),
        // Email
        emailList: document.getElementById('emailListContainer'),
        emailName: document.getElementById('emailName'),
        emailSubject: document.getElementById('emailSubject'),
        visualEditor: document.getElementById('visualEditor'),
        codeEditor: document.getElementById('codeEditor'),
        btnNewEmail: document.getElementById('btnNewEmail'),
        btnSaveEmail: document.getElementById('btnSaveEmail'),
        btnViewSource: document.getElementById('btnViewSource'),
        btnExportEmail: document.getElementById('btnExportEmail'),
        // Modal
        modal: document.getElementById('editModal'),
        modalForm: document.getElementById('editForm'),
        btnCloseModal: document.getElementById('btnCloseModal'),
        btnSaveModal: document.getElementById('btnSaveModal'),
        btnCancelModal: document.getElementById('btnCancelModal')
    };

    // --- INICIALIZAÇÃO ---
    function init() {
        UI.fileInput.addEventListener('change', handleFileUpload);
        
        // Tabela
        UI.searchInput.addEventListener('input', runFilters);
        UI.btnAddRow.addEventListener('click', addNewRow);
        UI.btnExport.addEventListener('click', exportHtml);
        
        // Modal
        UI.btnCloseModal.onclick = closeModal;
        UI.btnCancelModal.onclick = closeModal;
        UI.btnSaveModal.onclick = saveModal;

        // Email
        UI.btnNewEmail.onclick = createNewEmail;
        UI.btnSaveEmail.onclick = saveCurrentEmail;
        UI.btnExportEmail.onclick = exportHtml;
        UI.btnViewSource.onclick = toggleEmailSource;
        setupRichTextToolbar();
    }

    // --- 1. UPLOAD E PARSER ---
    async function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        showLoading(true);
        try {
            const text = await file.text();
            state.originalHtml = text;
            state.datasets = {};

            let foundCount = 0;

            TARGET_VARS.forEach(varName => {
                // Regex: procura por "const nome = [" ou "var nome = ["
                const regex = new RegExp(`(const|let|var)\\s+(${varName})\\s*=\\s*\\[`, 'i');
                const match = text.match(regex);

                if (match) {
                    const startIndex = match.index + match[0].length - 1; // Posição do '['
                    const extractedArrayStr = smartExtractArray(text, startIndex);
                    
                    if (extractedArrayStr) {
                        try {
                            // Converte string JS para Objeto Real
                            // Tratamento para aspas simples e quebras de linha
                            let cleanStr = extractedArrayStr
                                .replace(/[\u2018\u2019]/g, "'") // Aspas curvas
                                .replace(/[\u201C\u201D]/g, '"');
                                
                            // O "new Function" é perigoso em produção aberta, mas seguro em ferramenta local
                            const data = new Function(`return ${cleanStr};`)();
                            
                            if (Array.isArray(data)) {
                                state.datasets[varName] = {
                                    data: data,
                                    originalString: extractedArrayStr
                                };
                                foundCount++;
                            }
                        } catch (err) {
                            console.error(`Erro ao fazer parse de ${varName}:`, err);
                        }
                    }
                }
            });

            if (foundCount === 0) {
                alert("Nenhuma variável conhecida encontrada neste arquivo HTML.");
                return;
            }

            renderSidebar();
            // Abre o primeiro item encontrado
            const firstKey = Object.keys(state.datasets)[0];
            switchView(firstKey);

        } catch (error) {
            alert("Erro ao ler arquivo: " + error.message);
        } finally {
            showLoading(false);
        }
    }

    // Extrai o array balanceando colchetes [ ]
    function smartExtractArray(text, startPos) {
        let openBrackets = 0;
        let inString = false;
        let stringChar = '';

        for (let i = startPos; i < text.length; i++) {
            const char = text[i];

            if (inString) {
                if (char === stringChar && text[i-1] !== '\\') {
                    inString = false;
                }
                continue;
            }

            if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
                continue;
            }

            if (char === '[') openBrackets++;
            if (char === ']') {
                openBrackets--;
                if (openBrackets === 0) {
                    return text.substring(startPos, i + 1);
                }
            }
        }
        return null;
    }

    // --- 2. INTERFACE E NAVEGAÇÃO ---
    function renderSidebar() {
        UI.sidebarNav.innerHTML = '';
        
        Object.keys(state.datasets).forEach(key => {
            const config = DATASET_CONFIG[key] || { label: key, icon: 'ph-brackets-curly', type: 'table' };
            
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<i class="ph ${config.icon}"></i> ${config.label}`;
            btn.onclick = () => switchView(key);
            btn.dataset.key = key;
            
            UI.sidebarNav.appendChild(btn);
        });
    }

    function switchView(key) {
        state.activeKey = key;
        state.data = state.datasets[key].data;
        state.filteredData = [...state.data];
        
        // Atualiza Sidebar
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-item[data-key="${key}"]`);
        if(activeBtn) activeBtn.classList.add('active');

        // Esconde todas as telas
        Object.values(UI.views).forEach(el => el.classList.add('hidden'));

        const config = DATASET_CONFIG[key] || { type: 'table', label: key };
        
        if (config.type === 'email') {
            UI.views.email.classList.remove('hidden');
            renderEmailList();
            // Limpa editor
            UI.visualEditor.innerHTML = '<p style="color:#999; padding: 20px;">Selecione um email ao lado</p>';
            UI.emailName.value = '';
            UI.emailSubject.value = '';
        } else {
            UI.views.table.classList.remove('hidden');
            UI.tableTitle.innerText = config.label;
            UI.tableIcon.className = `ph ${config.icon || 'ph-table'}`;
            generateFilters();
            runFilters();
        }
    }

    // --- 3. EDITOR DE TABELAS ---
    function generateFilters() {
        UI.filtersContainer.innerHTML = '';
        state.filters = {};
        if (state.data.length === 0) return;

        const keys = Object.keys(state.data[0]);
        // Filtra colunas interessantes para filtro (exclui descrições longas)
        const filterKeys = keys.filter(k => 
            !['comment', 'scenario', 'content', 'procedure'].some(bad => k.toLowerCase().includes(bad)) &&
            state.data.length > 0
        );

        if (filterKeys.length === 0) UI.filtersContainer.classList.add('hidden');
        else UI.filtersContainer.classList.remove('hidden');

        filterKeys.forEach(key => {
            // Cria Select
            const group = document.createElement('div');
            group.className = 'filter-group';
            group.innerHTML = `<label class="filter-label">${key}</label>`;
            
            const select = document.createElement('select');
            select.className = 'filter-select';
            select.dataset.key = key;
            select.innerHTML = '<option value="">Todos</option>';
            
            // Popula valores únicos
            const unique = [...new Set(state.data.map(item => item[key]))].sort();
            unique.forEach(val => {
                if (val) select.innerHTML += `<option value="${val}">${val}</option>`;
            });

            select.addEventListener('change', () => {
                if (select.value === "") delete state.filters[key];
                else state.filters[key] = select.value;
                runFilters();
            });

            group.appendChild(select);
            UI.filtersContainer.appendChild(group);
        });
    }

    function runFilters() {
        const term = UI.searchInput.value.toLowerCase();
        
        state.filteredData = state.data.filter(item => {
            // 1. Busca Texto
            const matchesSearch = Object.values(item).some(val => 
                String(val).toLowerCase().includes(term)
            );
            
            // 2. Filtros Dropdown
            const matchesFilters = Object.keys(state.filters).every(key => 
                String(item[key]) === String(state.filters[key])
            );

            return matchesSearch && matchesFilters;
        });

        renderTable();
    }

    function renderTable() {
        UI.recordCount.innerText = `${state.filteredData.length} registros`;
        UI.tableContainer.innerHTML = '';

        if (state.filteredData.length === 0) {
            UI.tableContainer.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">Nenhum dado encontrado.</div>';
            return;
        }

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        const keys = Object.keys(state.filteredData[0] || state.data[0]);
        
        // Cabeçalho
        let headerHTML = '<tr>';
        keys.forEach(k => headerHTML += `<th>${k}</th>`);
        headerHTML += '<th style="width: 80px;">Ações</th></tr>';
        thead.innerHTML = headerHTML;

        // Corpo
        // Limitando a 100 linhas para performance se for muito grande
        const pageData = state.filteredData.slice(0, 100); 
        
        pageData.forEach(row => {
            const tr = document.createElement('tr');
            
            // Achar o índice real no array original (para edição)
            const realIndex = state.data.indexOf(row);
            
            keys.forEach(k => {
                const td = document.createElement('td');
                td.textContent = row[k];
                // Limita texto grande na visualização
                if (td.textContent.length > 50) td.textContent = td.textContent.substring(0, 50) + '...';
                tr.appendChild(td);
            });

            // Botões Ação
            const tdAction = document.createElement('td');
            tdAction.className = 'td-actions';
            tdAction.innerHTML = `
                <button class="icon-btn" onclick="openEditModal(${realIndex})"><i class="ph ph-pencil-simple"></i></button>
                <button class="icon-btn" style="color: var(--danger)" onclick="deleteRow(${realIndex})"><i class="ph ph-trash"></i></button>
            `;
            tr.appendChild(tdAction);
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        UI.tableContainer.appendChild(table);
    }

    // --- 4. FUNÇÕES DE CRUD (TABELA) ---
    window.openEditModal = function(index) {
        state.editingIndex = index;
        const row = state.data[index];
        UI.modalForm.innerHTML = '';
        
        Object.keys(row).forEach(key => {
            const group = document.createElement('div');
            group.className = 'form-group';
            
            const isLong = String(row[key]).length > 60;
            const inputTag = isLong ? 'textarea' : 'input';
            
            group.innerHTML = `
                <label>${key}</label>
                <${inputTag} class="form-control" name="${key}" ${isLong ? 'rows="5"' : ''}>${row[key]}</${inputTag}>
            `;
            // Popula valor (necessário fazer assim p/ textarea funcionar bem)
            group.querySelector(inputTag).value = row[key];
            
            UI.modalForm.appendChild(group);
        });
        
        UI.modal.showModal();
    };

    function saveModal() {
        const formData = new FormData(UI.modalForm);
        const row = state.data[state.editingIndex];
        
        for (const [key, value] of formData.entries()) {
            // Tenta converter número se parecer número
            const num = Number(value);
            row[key] = (!isNaN(num) && value !== '') ? num : value;
        }
        
        closeModal();
        runFilters(); // Atualiza tela
    }

    function closeModal() { UI.modal.close(); }

    window.deleteRow = function(index) {
        if(confirm('Tem certeza que deseja excluir?')) {
            state.data.splice(index, 1);
            runFilters();
        }
    };

    function addNewRow() {
        if (state.data.length === 0) return;
        // Clona a estrutura do primeiro objeto limpando valores
        const template = { ...state.data[0] };
        Object.keys(template).forEach(k => template[k] = "");
        
        state.data.unshift(template);
        state.editingIndex = 0;
        runFilters();
        window.openEditModal(0);
    }


    // --- 5. EDITOR DE EMAIL ---
    let activeEmailId = null;

    function renderEmailList() {
        UI.emailList.innerHTML = '';
        state.data.forEach((email, idx) => {
            const div = document.createElement('div');
            div.className = `email-item ${email.id === activeEmailId ? 'active' : ''}`;
            div.innerHTML = `<strong>${email.name || 'Sem Nome'}</strong>`;
            div.onclick = () => loadEmail(email);
            UI.emailList.appendChild(div);
        });
    }

    function loadEmail(email) {
        activeEmailId = email.id;
        UI.emailName.value = email.name;
        UI.emailSubject.value = email.subject || '';
        UI.visualEditor.innerHTML = email.content;
        UI.codeEditor.value = email.content;
        renderEmailList();
    }

    function createNewEmail() {
        const newEmail = {
            id: Date.now(),
            name: 'Novo Modelo',
            subject: '',
            content: '<p>Olá...</p>'
        };
        state.data.push(newEmail);
        loadEmail(newEmail);
    }

    function saveCurrentEmail() {
        if (!activeEmailId) return;
        const email = state.data.find(e => e.id === activeEmailId);
        if (email) {
            email.name = UI.emailName.value;
            email.subject = UI.emailSubject.value;
            // Salva o que estiver visível (Visual ou Código)
            email.content = UI.codeEditor.classList.contains('hidden') ? UI.visualEditor.innerHTML : UI.codeEditor.value;
            renderEmailList();
            alert('Modelo salvo na memória!');
        }
    }

    function toggleEmailSource() {
        const isVisual = !UI.visualEditor.classList.contains('hidden');
        if (isVisual) {
            UI.codeEditor.value = UI.visualEditor.innerHTML;
            UI.visualEditor.classList.add('hidden');
            UI.codeEditor.classList.remove('hidden');
            UI.btnViewSource.innerText = "Ver Visual";
        } else {
            UI.visualEditor.innerHTML = UI.codeEditor.value;
            UI.codeEditor.classList.add('hidden');
            UI.visualEditor.classList.remove('hidden');
            UI.btnViewSource.innerText = "Ver HTML";
        }
    }

    function setupRichTextToolbar() {
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.onclick = () => {
                document.execCommand(btn.dataset.cmd, false, null);
                UI.visualEditor.focus();
            };
        });
        document.getElementById('colorPicker').oninput = (e) => document.execCommand('foreColor', false, e.target.value);
        document.getElementById('varSelect').onchange = (e) => {
            if(e.target.value) {
                document.execCommand('insertText', false, e.target.value);
                e.target.value = '';
            }
        };
    }


    // --- 6. EXPORTAR ---
    function exportHtml() {
        if (!state.originalHtml) return;
        showLoading(true);

        setTimeout(() => {
            let finalHtml = state.originalHtml;

            // Percorre todos os datasets que foram carregados e substitui no texto original
            Object.keys(state.datasets).forEach(key => {
                const datasetInfo = state.datasets[key];
                const newJsonString = JSON.stringify(datasetInfo.data, null, 4);
                
                // Substitui a string antiga pela nova
                // Nota: usar replace direto na string original funciona porque guardamos o 'originalString' exato
                finalHtml = finalHtml.replace(datasetInfo.originalString, newJsonString);
                
                // Atualiza a referência para futuros saves
                datasetInfo.originalString = newJsonString;
            });

            // Download
            const blob = new Blob([finalHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sistema_atualizado.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            showLoading(false);
        }, 500);
    }

    function showLoading(show) {
        if(show) UI.loading.classList.remove('hidden');
        else UI.loading.classList.add('hidden');
    }

    init();
})();
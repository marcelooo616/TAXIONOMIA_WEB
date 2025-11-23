(function () {
    // 1. Ícones SVG
    const ICONS = {
        save: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H172.1a24,24,0,0,0-17,7L123.1,71a24,24,0,0,0-7,17V128h-64V32H48V224H208V32ZM40,224V32A8,8,0,0,1,48,24H208a8,8,0,0,1,8,8V224a8,8,0,0,1-8,8H48A8,8,0,0,1,40,224Zm80-88h64a8,8,0,0,1,0,16H120a8,8,0,0,1,0-16Zm0,32h64a8,8,0,0,1,0,16H120a8,8,0,0,1,0-16Zm-28-55V40h57.4l31.9,31.9Z"></path></svg>`,
        trash: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>`,
        plus: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.1,104.1,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v24a8,8,0,0,1-16,0V136H96a8,8,0,0,1,0-16h24V96a8,8,0,0,1,16,0v24h24A8,8,0,0,1,168,128Z"></path></svg>`,
        export: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112a8,8,0,0,1,16,0v96H200V112a8,8,0,0,1,16,0ZM93.7,77.7l26.3-26.4V152a8,8,0,0,0,16,0V51.3l26.3,26.4a8,8,0,0,0,11.4-11.4l-40-40a8.1,8.1,0,0,0-11.4,0l-40,40a8,8,0,0,0,11.4,11.4Z"></path></svg>`,
        edit: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M227.3,73.4,182.6,28.7a16.1,16.1,0,0,0-22.6,0L36.7,152.1a15.9,15.9,0,0,0-4.7,11.3V208a16,16,0,0,0,16,16H92.7a15.9,15.9,0,0,0,11.3-4.7L227.3,96a16.1,16.1,0,0,0,0-22.6ZM96,208H48V160l96-96,48,48Z"></path></svg>`
    };

    const TARGET_VARS = ['dados', 'produtosMicrosoft', 'dadosRefaund', 'dadosRefund', 'refunds', 'sapPathsData '];

    const state = {
        originalHtml: null,
        datasets: {},
        activeDatasetKey: null,
        activeData: [],
        filteredData: [],
        activeFilters: {}, 
        keys: [],
        searchDebounce: null,
        editingIndex: null
    };

    const UI = {
        fileInput: document.getElementById('fileInput'),
        uploadBox: document.getElementById('uploadBox'),
        editorBox: document.getElementById('editorBox'),
        datasetSelect: document.getElementById('datasetSelect'),
        tableContainer: document.getElementById('tableContainer'),
        searchInput: document.getElementById('searchInput'),
        filtersContainer: document.getElementById('filtersContainer'),
        filterStatus: document.getElementById('filterStatus'),
        loading: document.getElementById('loadingOverlay'),
        loadingMsg: document.getElementById('loadingMessage'),
        btns: { add: document.getElementById('btnAddRow'), export: document.getElementById('btnExport') },
        modal: document.getElementById('editModal'),
        modalForm: document.getElementById('editForm'),
        modalTitle: document.getElementById('modalTitle'),
        btnSaveModal: document.getElementById('btnSaveModal'),
        btnCancelModal: document.getElementById('btnCancelModal'),
        btnCloseModal: document.getElementById('btnCloseModal')
    };

    function init() {
        UI.btns.add.innerHTML = `${ICONS.plus} <span>Novo</span>`;
        UI.btns.export.innerHTML = `${ICONS.export} <span>Exportar</span>`;

        UI.fileInput.addEventListener('change', handleFileUpload);
        // Busca global roda separado dos filtros de coluna agora
        UI.searchInput.addEventListener('input', () => { updateCascadingFilters(); runFinalFilter(); });
        UI.datasetSelect.addEventListener('change', switchDataset);
        UI.btns.add.addEventListener('click', addNewRow);
        UI.btns.export.addEventListener('click', exportHtml);

        UI.btnSaveModal.addEventListener('click', saveFromModal);
        UI.btnCancelModal.addEventListener('click', closeModal);
        UI.btnCloseModal.addEventListener('click', closeModal);
        UI.modal.addEventListener('click', (e) => { if (e.target === UI.modal) closeModal(); });
    }

    // --- UPLOAD E PARSER (MANTIDO IGUAL) ---
    async function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        toggleLoading(true, 'Escaneando arquivo...');
        try {
            const text = await file.text();
            state.originalHtml = text;
            state.datasets = {};
            let foundAny = false;

            TARGET_VARS.forEach(varName => {
                const startRegex = new RegExp(`(const|let|var)\\s+(${varName})\\s*=\\s*\\[`, 'i');
                const startMatch = text.match(startRegex);
                if (startMatch) {
                    const varRealName = startMatch[2];
                    const startIndex = startMatch.index;
                    const arrayStartIndex = startIndex + startMatch[0].length - 1; 
                    const extractedBlock = smartExtractArray(text, arrayStartIndex);
                    if (extractedBlock) {
                        try {
                            let cleanBlock = extractedBlock.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
                            const data = new Function(`return ${cleanBlock};`)();
                            if (Array.isArray(data)) {
                                state.datasets[varRealName] = {
                                    data: data,
                                    originalString: cleanBlock,
                                    fullDefinitionIndex: startIndex,
                                    arrayStartIndex: arrayStartIndex
                                };
                                foundAny = true;
                            }
                        } catch (e) {}
                    }
                }
            });

            if (!foundAny) throw new Error('Nenhum array válido encontrado.');
            populateDatasetSelect();
            setActiveDataset(Object.keys(state.datasets)[0]);
            UI.uploadBox.classList.add('hidden');
            UI.editorBox.classList.remove('hidden');
            Toast.show('Arquivo carregado!', 'success');
        } catch (err) { Toast.show('Erro: ' + err.message, 'error'); } 
        finally { toggleLoading(false); }
    }

    function smartExtractArray(text, startPos) {
        let openBrackets = 0;
        let inString = false;
        let stringChar = ''; 
        let isEscaped = false;
        for (let i = startPos; i < text.length; i++) {
            const char = text[i];
            if (inString) {
                if (isEscaped) isEscaped = false;
                else if (char === '\\') isEscaped = true;
                else if (char === stringChar) inString = false;
                continue; 
            }
            if (char === '"' || char === "'" || char === '`') {
                inString = true; stringChar = char; continue;
            }
            if (char === '[') openBrackets++;
            else if (char === ']') {
                openBrackets--;
                if (openBrackets === 0) return text.substring(startPos, i + 1);
            }
        }
        return null;
    }

    // --- GERENCIAMENTO DE DATASET ---

    function populateDatasetSelect() {
        UI.datasetSelect.innerHTML = '';
        Object.keys(state.datasets).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key; opt.textContent = key;
            UI.datasetSelect.appendChild(opt);
        });
    }

    function switchDataset(e) { setActiveDataset(e.target.value); }

    function setActiveDataset(key) {
        state.activeDatasetKey = key;
        state.activeData = state.datasets[key].data;
        state.keys = extractKeys(state.activeData);
        
        // Reseta filtros
        UI.searchInput.value = '';
        state.activeFilters = {}; 
        state.filteredData = [...state.activeData];
        
        // 1. Gera os DROPDOWNS vazios (esqueleto) na ordem correta
        generateFilterSkeleton();
        
        // 2. Preenche as opções baseadas no estado inicial
        updateCascadingFilters();

        runFinalFilter();
    }

    // Define a ordem de prioridade estrita para o efeito cascata funcionar bem
    function extractKeys(data) {
        const keys = new Set();
        data.forEach(item => {
            if(typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(k => keys.add(k));
            }
        });
        // A ORDEM AQUI É FUNDAMENTAL PARA A CASCATA
        // LOB -> Product Area -> Product -> Topic -> Subtopic -> Outros
        const priority = ['LOB', 'Product Area', 'Product', 'Topic', 'Subtopic', 'issueId', 'sapPath','request_type', 'region', 'kb_id'];
        const ordered = priority.filter(k => keys.has(k));
        const others = Array.from(keys).filter(k => !priority.includes(k)).sort();
        return [...ordered, ...others];
    }

    // --- SISTEMA DE CASCATA (NOVO) ---

    // Passo 1: Criar os elementos <select> no HTML na ordem certa
    function generateFilterSkeleton() {
        UI.filtersContainer.innerHTML = '';
        
        const ignoredFields = ['comment', 'scenario', 'advocate_procedure', 'refund_criteria', 'usage_timing', 'additional_note', 'nome', 'preco', 'tipo'];
        const filterKeys = state.keys.filter(k => !ignoredFields.includes(k));

        if (filterKeys.length === 0) {
            UI.filtersContainer.classList.add('hidden');
            return;
        }
        UI.filtersContainer.classList.remove('hidden');

        filterKeys.forEach(key => {
            const group = document.createElement('div');
            group.className = 'filter-group';

            const label = document.createElement('label');
            label.className = 'filter-label';
            label.textContent = key.replace(/_/g, ' ');

            const select = document.createElement('select');
            select.className = 'filter-select cascade-filter';
            select.dataset.key = key;
            select.innerHTML = '<option value="ALL">Todos</option>'; // Inicializa vazio

            // Quando mudar, atualiza os filtros seguintes
            select.addEventListener('change', (e) => {
                const val = e.target.value;
                if (val === 'ALL') delete state.activeFilters[key];
                else state.activeFilters[key] = val;

                // Importante: Atualiza a cascata e depois renderiza a tabela
                updateCascadingFilters();
                runFinalFilter();
            });

            group.append(label, select);
            UI.filtersContainer.appendChild(group);
        });
    }

    // Passo 2: Popular as opções respeitando o "O que foi selecionado antes"
    function updateCascadingFilters() {
        const selects = Array.from(document.querySelectorAll('.cascade-filter'));
        
        // Contexto cumulativo: começa com todos os dados
        let currentDataSubset = [...state.activeData];

        selects.forEach(select => {
            const key = select.dataset.key;
            const currentValue = state.activeFilters[key] || 'ALL';

            // 1. Extrai valores únicos DISPONÍVEIS no subset atual
            const uniqueValues = [...new Set(currentDataSubset.map(item => item[key]))]
                .filter(v => v !== null && v !== undefined && v !== '')
                .sort();

            // 2. Salva a seleção atual do usuário para restaurar (se ainda for válida)
            // Mas se a seleção atual não existe mais no novo subset, precisamos resetar!
            let newValue = currentValue;
            if (currentValue !== 'ALL' && !uniqueValues.includes(currentValue) && !uniqueValues.map(String).includes(String(currentValue))) {
                 newValue = 'ALL'; // Reseta se a opção sumiu
                 delete state.activeFilters[key];
            }

            // 3. Reconstrói as opções do HTML
            select.innerHTML = '<option value="ALL">Todos</option>';
            uniqueValues.forEach(val => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = val;
                if (String(val) === String(newValue)) opt.selected = true;
                select.appendChild(opt);
            });

            // 4. Atualiza o subset para o PRÓXIMO filtro da lista
            // Se o usuário selecionou algo aqui, o próximo filtro só vê dados compatíveis com essa seleção
            if (newValue !== 'ALL') {
                currentDataSubset = currentDataSubset.filter(row => String(row[key]) === String(newValue));
            }
            // Se for ALL, o subset continua igual para o próximo
        });
    }

    // Filtro Final que renderiza a tabela (Considera Busca Global + Filtros Cascata)
    function runFinalFilter() {
        const searchTerm = UI.searchInput.value.toLowerCase().trim();
        
        state.filteredData = state.activeData.filter(row => {
            // 1. Busca Global
            const matchesSearch = searchTerm === '' || Object.values(row).some(val => 
                String(val).toLowerCase().includes(searchTerm)
            );

            // 2. Filtros Selecionados
            const matchesFilters = Object.entries(state.activeFilters).every(([key, filterVal]) => {
                return String(row[key]) === String(filterVal);
            });

            return matchesSearch && matchesFilters;
        });

        renderTable();
    }

    function renderTable() {
        UI.tableContainer.innerHTML = '';
        UI.filterStatus.textContent = `${state.activeDatasetKey} | ${state.filteredData.length} registros`;

        if (state.filteredData.length === 0) {
            UI.tableContainer.innerHTML = '<div style="padding:2rem;text-align:center;opacity:0.6">Nenhum registro corresponde aos filtros.</div>';
            return;
        }

        const keyName = state.activeDatasetKey.toLowerCase();
        const isComplex = keyName.includes('refund') || keyName.includes('refaund') || state.keys.includes('request_type');

        if (isComplex) renderListView();
        else renderStandardTable();
    }

    // --- RENDERIZADORES (Lista e Tabela) ---
    function renderListView() {
        const listContainer = document.createElement('div');
        listContainer.className = 'list-view-container';

        state.filteredData.forEach((row) => {
            const realIndex = state.activeData.indexOf(row);
            const titleKey = state.keys.find(k => k === 'request_type' || k === 'nome') || state.keys[0];
            const title = row[titleKey] || 'Sem Título';
            const subTitleKey = state.keys.find(k => k === 'usage_timing' || k === 'scenario' || k === 'LOB');
            const subTitle = subTitleKey ? row[subTitleKey] : '';

            const card = document.createElement('div');
            card.className = 'list-card';
            const contentDiv = document.createElement('div');
            contentDiv.className = 'list-card-content';
            contentDiv.innerHTML = `<div class="list-card-title">${title}</div><div class="list-card-subtitle">${subTitle}</div>`;
            const actionsEl = document.createElement('div');
            actionsEl.style.display = 'flex'; actionsEl.style.gap = '8px'; actionsEl.style.flexShrink = '0';

            const btnEdit = document.createElement('button');
            btnEdit.className = 'btn btn-primary';
            btnEdit.style.padding = '6px 12px'; btnEdit.style.fontSize = '0.85rem';
            btnEdit.innerHTML = `${ICONS.edit} <span>Editar</span>`;
            btnEdit.onclick = () => openEditModal(realIndex);

            const btnDel = document.createElement('button');
            btnDel.className = 'btn btn-danger';
            btnDel.style.padding = '6px 10px';
            btnDel.innerHTML = `${ICONS.trash}`;
            btnDel.onclick = () => deleteRow(realIndex);

            actionsEl.append(btnEdit, btnDel);
            card.append(contentDiv, actionsEl);
            listContainer.appendChild(card);
        });
        UI.tableContainer.appendChild(listContainer);
    }

    function renderStandardTable() {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        state.keys.forEach(k => {
            const th = document.createElement('th'); th.textContent = k; headerRow.appendChild(th);
        });
        const thAct = document.createElement('th'); thAct.textContent = 'Ações'; thAct.style.textAlign = 'center'; headerRow.appendChild(thAct);
        thead.appendChild(headerRow); table.appendChild(thead);
        const tbody = document.createElement('tbody');
        const displayData = state.filteredData.slice(0, 100); 

        displayData.forEach(row => {
            const realIndex = state.activeData.indexOf(row);
            const tr = document.createElement('tr');
            state.keys.forEach(key => {
                const td = document.createElement('td');
                const val = row[key] !== undefined ? row[key] : '';
                const inp = document.createElement('input');
                inp.className = 'data-input'; inp.value = val;
                inp.addEventListener('change', (e) => {
                    state.activeData[realIndex][key] = tryParseNumber(e.target.value);
                    const btn = tr.querySelector('.btn-save');
                    if(btn) btn.classList.add('text-primary');
                });
                td.appendChild(inp); tr.appendChild(td);
            });
            const tdAct = document.createElement('td'); tdAct.className = 'actions-cell';
            const btnSave = document.createElement('button'); btnSave.className = 'btn btn-ghost btn-save'; btnSave.innerHTML = ICONS.save;
            btnSave.onclick = () => { btnSave.classList.remove('text-primary'); Toast.show('Atualizado.', 'success'); };
            const btnDel = document.createElement('button'); btnDel.className = 'btn btn-danger'; btnDel.innerHTML = ICONS.trash;
            btnDel.onclick = () => deleteRow(realIndex);
            tdAct.append(btnSave, btnDel); tr.appendChild(tdAct); tbody.appendChild(tr);
        });
        table.appendChild(tbody); UI.tableContainer.appendChild(table);
    }

    // --- MODAL & CRUD ---
    function openEditModal(index) {
        state.editingIndex = index;
        const rowData = state.activeData[index];
        UI.modalForm.innerHTML = ''; 
        const title = rowData.request_type || rowData.nome || 'Registro';
        UI.modalTitle.textContent = `Editando: ${title}`;
        state.keys.forEach(key => {
            const val = rowData[key] !== undefined ? rowData[key] : '';
            const isLong = String(val).length > 60 || ['scenario','advocate_procedure','refund_criteria','comment'].includes(key);
            const group = document.createElement('div'); group.className = 'form-group';
            const label = document.createElement('label'); label.textContent = key.replace(/_/g, ' ').toUpperCase();
            let input;
            if (isLong) { input = document.createElement('textarea'); input.className = 'form-control'; input.rows = 6; }
            else { input = document.createElement('input'); input.className = 'form-control'; input.type = 'text'; }
            input.value = val; input.dataset.key = key;
            group.append(label, input); UI.modalForm.appendChild(group);
        });
        UI.modal.showModal();
    }

    function saveFromModal() {
        if (state.editingIndex === null) return;
        const inputs = UI.modalForm.querySelectorAll('.form-control');
        const currentRow = state.activeData[state.editingIndex];
        inputs.forEach(input => { currentRow[input.dataset.key] = tryParseNumber(input.value); });
        Toast.show('Salvo!', 'success');
        closeModal();
        updateCascadingFilters(); // Re-calcula filtros
        runFinalFilter();
    }

    function closeModal() { UI.modal.close(); state.editingIndex = null; }

    function addNewRow() {
        const newObj = {};
        state.keys.forEach(k => newObj[k] = '');
        if (state.keys.includes('issueId')) {
            const max = state.activeData.reduce((m, i) => Math.max(m, Number(i.issueId) || 0), 0);
            newObj.issueId = max + 1;
        }
        state.activeData.unshift(newObj);
        UI.searchInput.value = ''; 
        state.activeFilters = {};
        updateCascadingFilters(); // Reseta filtros
        runFinalFilter();
        const keyName = state.activeDatasetKey.toLowerCase();
        if (keyName.includes('refund') || keyName.includes('refaund') || state.keys.includes('request_type')) openEditModal(0);
    }

    function deleteRow(index) {
        if(confirm('Excluir?')) {
            state.activeData.splice(index, 1);
            updateCascadingFilters();
            runFinalFilter();
            Toast.show('Excluído.', 'warning');
        }
    }

    async function exportHtml() {
        if (!state.originalHtml) return;
        toggleLoading(true, 'Gerando HTML...');
        await new Promise(r => setTimeout(r, 100));
        try {
            let finalHtml = state.originalHtml;
            Object.keys(state.datasets).forEach(key => {
                const info = state.datasets[key];
                const jsonStr = JSON.stringify(info.data, null, 4);
                finalHtml = finalHtml.replace(info.originalString, jsonStr);
                info.originalString = jsonStr;
            });
            const blob = new Blob([finalHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'index_atualizado.html';
            document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
            Toast.show('Arquivo gerado!', 'success');
        } catch (e) { Toast.show('Erro: ' + e.message, 'error'); }
        toggleLoading(false);
    }

    function toggleLoading(show, msg) {
        if(show) { UI.loadingMsg.textContent = msg; UI.loading.classList.remove('hidden'); }
        else { UI.loading.classList.add('hidden'); }
    }

    function tryParseNumber(val) {
        const str = String(val).trim();
        if (/^\d+$/.test(str) && str.length < 15 && !str.startsWith('0')) return Number(str);
        return val;
    }

    init();
})();
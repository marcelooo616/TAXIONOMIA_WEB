console.log("3-table.js carregado (Modal Wide + Grid Layout)");

App.Table = {
    UI: {
        container: document.getElementById('tableContainer'),
        title: document.getElementById('tableTitle'),
        icon: document.getElementById('tableIcon'),
        searchInput: document.getElementById('searchInput'),
        filtersContainer: document.getElementById('filtersContainer'),
        recordCount: document.getElementById('recordCount'),
        modal: document.getElementById('editModal'),
        modalForm: document.getElementById('editForm')
    },

    init: function() {
        const btnAdd = document.getElementById('btnAddRow');
        if(btnAdd) btnAdd.onclick = App.Table.addNewRow;

        const btnExport = document.getElementById('btnExport');
        if(btnExport) btnExport.onclick = App.Parser.exportHtml;

        if(App.Table.UI.searchInput) {
            App.Table.UI.searchInput.addEventListener('input', App.Table.runFilters);
        }

        document.getElementById('btnCloseModal').onclick = App.Table.closeModal;
        document.getElementById('btnCancelModal').onclick = App.Table.closeModal;
        document.getElementById('btnSaveModal').onclick = App.Table.saveModal;
    },

    render: function() {
        App.Table.UI.recordCount.innerText = `${App.state.filteredData.length} registros`;
        App.Table.UI.container.innerHTML = '';

        if (App.state.data.length === 0) {
            App.Table.UI.container.innerHTML = '<div style="padding:20px;text-align:center;">Nenhum dado carregado.</div>';
            return;
        }

        const masterItem = App.state.data[0];
        const keys = Object.keys(masterItem);

        if (App.state.filteredData.length === 0) {
            App.Table.UI.container.innerHTML = '<div style="padding:40px;text-align:center; color: var(--text-muted);">Nenhum resultado encontrado.</div>';
            return;
        }

        if (keys.includes('request_type')) {
            App.Table.renderCards(keys);
        } else {
            App.Table.renderStandardTable(keys);
        }
    },

    // --- RENDERIZADOR DE CARDS ---
    renderCards: function(keys) {
        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        const pageData = App.state.filteredData.slice(0, 50);

        pageData.forEach(row => {
            const realIndex = App.state.data.indexOf(row);
            const card = document.createElement('div');
            card.className = 'data-card fade-in';
            const title = row['request_type'] || 'Sem Título';
            
            let bodyHTML = '';
            keys.forEach(k => {
                if(k === 'request_type') return; 
                const val = row[k];
                if(!val && val !== 0) return; 
                
                const lowerKey = k.toLowerCase();
                const isBadgeField = lowerKey.includes('region') || lowerKey.includes('kb') || lowerKey.includes('id') || lowerKey.includes('lob');
                const isBlockField = lowerKey.includes('comment') || lowerKey.includes('scenario') || lowerKey.includes('procedure') || lowerKey.includes('description');

                if ( (isBadgeField || String(val).length < 15) && !isBlockField ) {
                    bodyHTML += `<span class="card-badge">${k}: ${val}</span> `;
                } else {
                    bodyHTML += `<div class="card-field"><strong>${k}:</strong> ${val}</div>`;
                }
            });

            card.innerHTML = `
                <div class="card-content">
                    <div class="card-title">${title}</div>
                    <div style="margin-bottom: 10px;">${bodyHTML}</div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="App.Table.openEditModal(${realIndex})"><i class="ph ph-pencil-simple"></i> Editar</button>
                    <button class="icon-btn" style="color:var(--danger)" onclick="App.Table.deleteRow(${realIndex})"><i class="ph ph-trash"></i></button>
                </div>
            `;
            grid.appendChild(card);
        });
        App.Table.UI.container.appendChild(grid);
    },

    // --- RENDERIZADOR TABELA ---
    renderStandardTable: function(keys) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        let headerHTML = '<tr>';
        keys.forEach(k => headerHTML += `<th>${k}</th>`);
        headerHTML += '<th style="text-align:right">Ações</th></tr>';
        thead.innerHTML = headerHTML;

        const pageData = App.state.filteredData.slice(0, 100);
        pageData.forEach(row => {
            const tr = document.createElement('tr');
            const realIndex = App.state.data.indexOf(row);
            
            keys.forEach(k => {
                const td = document.createElement('td');
                let val = row[k] !== undefined ? row[k] : '';
                if(val && String(val).length > 50) {
                    td.title = val;
                    val = String(val).substring(0,50) + '...';
                }
                td.textContent = val;
                tr.appendChild(td);
            });

            const tdAct = document.createElement('td');
            tdAct.style.textAlign = 'right';
            tdAct.innerHTML = `
                <div style="display:flex; justify-content:flex-end; gap:5px;">
                    <button class="icon-btn" onclick="App.Table.openEditModal(${realIndex})"><i class="ph ph-pencil-simple"></i></button>
                    <button class="icon-btn" style="color:var(--danger)" onclick="App.Table.deleteRow(${realIndex})"><i class="ph ph-trash"></i></button>
                </div>
            `;
            tr.appendChild(tdAct);
            tbody.appendChild(tr);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        App.Table.UI.container.appendChild(table);
    },

    // --- FILTROS ---
    generateFilters: function() {
        const container = App.Table.UI.filtersContainer;
        container.innerHTML = '';
        App.state.filters = {};
        if (App.state.data.length === 0) return;

        const keys = Object.keys(App.state.data[0]);
        const filterKeys = keys.filter(k => 
            !['comment', 'scenario', 'content', 'procedure', 'description', 'request_type'].some(bad => k.toLowerCase().includes(bad))
        );

        if(filterKeys.length === 0) container.classList.add('hidden');
        else container.classList.remove('hidden');

        filterKeys.forEach(key => {
            const group = document.createElement('div');
            group.className = 'filter-group';
            group.innerHTML = `<label class="filter-label">${key}</label><select class="filter-select" data-key="${key}"><option value="">Todos</option></select>`;
            group.querySelector('select').addEventListener('change', (e) => {
                const val = e.target.value;
                if(val === "") delete App.state.filters[key];
                else App.state.filters[key] = val;
                App.Table.runFilters();
                App.Table.updateCascadingOptions();
            });
            container.appendChild(group);
        });
        App.Table.updateCascadingOptions();
    },

    updateCascadingOptions: function() {
        const selects = document.querySelectorAll('.filter-select');
        selects.forEach(select => {
            const key = select.dataset.key;
            const currentSelectedValue = App.state.filters[key];
            const validRows = App.state.data.filter(row => {
                return Object.keys(App.state.filters).every(filterKey => {
                    if (filterKey === key) return true; 
                    return String(row[filterKey]) === String(App.state.filters[filterKey]);
                });
            });
            const uniqueVals = [...new Set(validRows.map(r => r[key]))].filter(v => v !== null && v !== "").sort();
            let html = '<option value="">Todos</option>';
            uniqueVals.forEach(v => {
                const isSelected = String(v) === String(currentSelectedValue) ? 'selected' : '';
                html += `<option value="${v}" ${isSelected}>${v}</option>`;
            });
            select.innerHTML = html;
        });
    },

    runFilters: function() {
        const rawInput = App.Table.UI.searchInput.value.toLowerCase();
        const searchTokens = rawInput.split(/[\s|]+/).filter(token => token.trim() !== '');

        App.state.filteredData = App.state.data.filter(item => {
            const matchText = searchTokens.every(token => {
                return Object.values(item).some(val => String(val).toLowerCase().includes(token));
            });
            const matchFilters = Object.keys(App.state.filters).every(k => String(item[k]) === String(App.state.filters[k]));
            return matchText && matchFilters;
        });
        App.Table.render();
    },

    // --- NOVO CRUD COM MODAL WIDE & GRID ---
    openEditModal: function(index) {
        App.state.editingIndex = index;
        const row = App.state.data[index];
        const form = App.Table.UI.modalForm;
        form.innerHTML = '';
        const keys = Object.keys(App.state.data[0]);

        // Cria o Container do Grid
        const gridContainer = document.createElement('div');
        gridContainer.className = 'form-grid';

        keys.forEach(key => {
            const val = row[key] !== undefined ? row[key] : '';
            const lowerKey = key.toLowerCase();

            // Lógica para detectar se é campo "Longo" (ocupa linha inteira) ou "Curto" (Grid)
            const isText =  lowerKey.includes('comment') || 
                            lowerKey.includes('scenario') || 
                            lowerKey.includes('procedure') || 
                            lowerKey.includes('description') ||
                            lowerKey.includes('criteria') ||
                            String(val).length > 80;

            const div = document.createElement('div');
            // Se for longo, adiciona classe 'full-width'
            div.className = isText ? 'form-group full-width' : 'form-group';
            
            const tag = isText ? 'textarea' : 'input';
            const rowsAttr = isText ? 'rows="5"' : '';

            div.innerHTML = `
                <label>${key}</label>
                <${tag} class="form-control" name="${key}" ${rowsAttr}>${val}</${tag}>
            `;
            
            // Garante que o valor apareça no textarea (que não usa value attribute)
            if(isText) div.querySelector(tag).textContent = val;
            else div.querySelector(tag).value = val;

            gridContainer.appendChild(div);
        });

        form.appendChild(gridContainer);
        App.Table.UI.modal.showModal();
    },

    saveModal: function() {
        const formData = new FormData(App.Table.UI.modalForm);
        const row = App.state.data[App.state.editingIndex];
        for (const [key, value] of formData.entries()) {
            const num = Number(value);
            row[key] = (!isNaN(num) && value !== '') ? num : value;
        }
        App.Table.closeModal();
        App.Table.runFilters();
        App.Table.updateCascadingOptions();
        App.utils.toast("Salvo com sucesso!", "success");
    },

    closeModal: function() { App.Table.UI.modal.close(); },
    
    deleteRow: function(index) {
        if(confirm("Excluir registro?")) {
            App.state.data.splice(index, 1);
            App.Table.runFilters();
            App.Table.updateCascadingOptions();
            App.utils.toast("Registro excluído.", "warning");
        }
    },

    addNewRow: function() {
        if(App.state.data.length === 0) return;
        const newObj = { ...App.state.data[0] };
        Object.keys(newObj).forEach(k => newObj[k] = ""); 
        App.state.data.unshift(newObj);
        App.Table.runFilters();
        App.utils.toast("Linha criada.", "info");
        App.Table.openEditModal(0);
    }
};
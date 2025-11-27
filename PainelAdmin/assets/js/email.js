console.log("4-email.js carregado");

App.Email = {
    UI: {
        list: document.getElementById('emailListContainer'),
        editorVisual: document.getElementById('visualEditor'),
        editorCode: document.getElementById('codeEditor'),
        inputName: document.getElementById('emailName'),
        inputSubject: document.getElementById('emailSubject'),
        btnSource: document.getElementById('btnViewSource')
    },
    activeId: null,

    init: function() {
        document.getElementById('btnNewEmail').onclick = App.Email.createNew;
        document.getElementById('btnSaveEmail').onclick = App.Email.save;
        document.getElementById('btnExportEmail').onclick = App.Parser.exportHtml;
        
        if(App.Email.UI.btnSource) {
            App.Email.UI.btnSource.onclick = App.Email.toggleSource;
        }

        // Toolbar
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.onclick = () => {
                document.execCommand(btn.dataset.cmd, false, null);
                App.Email.UI.editorVisual.focus();
            };
        });
        
        const picker = document.getElementById('colorPicker');
        if(picker) picker.oninput = (e) => document.execCommand('foreColor', false, e.target.value);
        
        const varSelect = document.getElementById('varSelect');
        if(varSelect) varSelect.onchange = (e) => {
            if(e.target.value) {
                document.execCommand('insertText', false, e.target.value);
                e.target.value = '';
            }
        };
    },

    renderList: function() {
        const container = App.Email.UI.list;
        container.innerHTML = '';
        
        App.state.data.forEach(email => {
            const item = document.createElement('div');
            item.className = `email-item ${email.id === App.Email.activeId ? 'active' : ''}`;
            item.innerHTML = `<strong>${email.name || 'Sem Nome'}</strong>`;
            item.onclick = () => App.Email.load(email);
            container.appendChild(item);
        });
    },

    load: function(email) {
        App.Email.activeId = email.id;
        App.Email.UI.inputName.value = email.name;
        App.Email.UI.inputSubject.value = email.subject || '';
        App.Email.UI.editorVisual.innerHTML = email.content;
        App.Email.UI.editorCode.value = email.content;
        App.Email.renderList();
    },

    createNew: function() {
        const newEmail = { id: Date.now(), name: 'Novo Email', subject: '', content: '<p>Olá...</p>' };
        App.state.data.push(newEmail);
        App.Email.load(newEmail);
    },

    save: function() {
        if(!App.Email.activeId) return;
        const email = App.state.data.find(e => e.id === App.Email.activeId);
        if(email) {
            email.name = App.Email.UI.inputName.value;
            email.subject = App.Email.UI.inputSubject.value;
            
            if(!App.Email.UI.editorCode.classList.contains('hidden')) {
                email.content = App.Email.UI.editorCode.value;
                App.Email.UI.editorVisual.innerHTML = email.content; // Sincroniza
            } else {
                email.content = App.Email.UI.editorVisual.innerHTML;
            }
            App.Email.renderList();
            alert("Salvo na memória!");
        }
    },

    toggleSource: function() {
        const visual = App.Email.UI.editorVisual;
        const code = App.Email.UI.editorCode;
        const btn = App.Email.UI.btnSource;

        if (visual.classList.contains('hidden')) {
            // Voltar para Visual
            visual.innerHTML = code.value;
            code.classList.add('hidden');
            visual.classList.remove('hidden');
            btn.innerText = "Ver HTML";
        } else {
            // Ir para Código
            code.value = visual.innerHTML;
            visual.classList.add('hidden');
            code.classList.remove('hidden');
            btn.innerText = "Ver Visual";
        }
    }
};
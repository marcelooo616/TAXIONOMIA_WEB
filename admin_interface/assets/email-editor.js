(function() {
    // --- 1. DEFINIÇÃO DOS BLOCOS (SNIPPETS) ---
    const SNIPPETS = {
        greeting: {
            label: "👋 Saudação",
            html: `
            <tr>
                <td style="padding: 0 40px; font-size: 16px; line-height: 1.6;">
                    <p style="margin: 0 0 16px;">Olá <span style="color: #0078D7; font-weight: bold;">\${nomeCliente}</span>, tudo bem?</p>
                    <p style="margin: 0 0 16px;">Me chamo <strong style="color: #0078D7;">\${nomeAtendente}</strong> e estou aqui para te ajudar.</p>
                </td>
            </tr>`
        },
        title: {
            label: "H1 Título",
            html: `
            <tr>
                <td style="padding: 0 40px;">
                    <h1 style="font-size: 21px; color: #0078D7; margin-bottom: 20px; margin-top: 0;">Escreva o Título Aqui</h1>
                </td>
            </tr>`
        },
        paragraph: {
            label: "📝 Texto Padrão",
            html: `
            <tr>
                <td style="padding: 0 40px; font-size: 16px; line-height: 1.6;">
                    <p style="margin: 0 0 16px;">Clique aqui para editar seu parágrafo...</p>
                </td>
            </tr>`
        },
        warning: {
            label: "⚠️ Aviso (Amarelo)",
            html: `
            <tr>
                <td style="padding: 0 40px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                            <td style="padding: 15px; background-color: #FFFBEB; border-left: 4px solid #F8C51B; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #555;">
                                <b>Atenção:</b> Insira seu aviso importante aqui.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>`
        },
        info: {
            label: "ℹ️ Destaque (Azul)",
            html: `
            <tr>
                <td style="padding: 0 40px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                            <td style="padding: 15px; background-color: #edf4fc; border-left: 4px solid #0078D7; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #333;">
                                <b>Informação:</b> Insira o texto de destaque aqui.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>`
        },
        strike3: {
            label: "🚫 Protocolo Strike 3",
            html: `
            <tr>
                <td style="padding: 0 40px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                            <td style="background-color: #FFF6F6; border-left: 4px solid #E05C5C; padding: 20px; border-radius: 8px; font-size: 16px;">
                                <p style="margin: 0; font-weight: bold; color: #D83B01;">Este é um aviso final sobre o Protocolo \${numeroProtocolo}.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>`
        },
        linkList: {
            label: "🔗 Lista de Links",
            html: `
            <tr>
                <td style="padding: 0 40px 20px 40px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e6f2ff; border-radius: 8px; border: 1px solid #cce0ff;">
                        <tr>
                            <td style="padding: 20px; font-size: 16px;">
                                <ul style="padding: 0; margin: 0; list-style-type: none;">
                                    <li style="margin-bottom: 12px; border-bottom: 1px solid #d9e6f2; padding-bottom: 12px;">
                                        <p style="margin: 0; font-size: 16px; color: #333;">
                                            Texto do item. <a href="#" style="color: #0078D7; text-decoration: none; font-weight: bold;">Link &raquo;</a>
                                        </p>
                                    </li>
                                    <li style="margin-bottom: 0;">
                                        <p style="margin: 0; font-size: 16px; color: #333;">
                                            Outro item. <a href="#" style="color: #0078D7; text-decoration: none; font-weight: bold;">Link &raquo;</a>
                                        </p>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>`
        }
    };

    // O "Envelope" Base
    const BASE_TEMPLATE = `
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; height: 100%;">
    <tr>
        <td style="padding: 20px 0; vertical-align: top;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08); border-collapse: separate;">
                <tr>
                    <td align="center" style="padding: 40px 40px 20px 40px;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" style="height: 30px; width: auto;">
                    </td>
                </tr>

                <tbody id="email-content-area">
                    <tr><td style="padding:20px; text-align:center; color:#ccc;">(Adicione blocos aqui)</td></tr>
                </tbody>

                <tr>
                    <td style="padding: 30px 40px; border-top: 1px solid #ddd; font-size: 14px; color: #555;">
                        <p style="margin: 0 0 10px;"><strong style="color: #0078D7;">Suporte Microsoft</strong></p>
                        <p style="font-size: 10px; color: #888; margin-top: 20px;">Confidencialidade e Termos de Uso.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;

    const editorState = {
        currentId: null,
        isSourceView: false
    };

    const UI = {
        listContainer: document.getElementById('emailListContainer'),
        btnNew: document.getElementById('btnNewEmail'),
        nameInput: document.getElementById('emailName'),
        subjectInput: document.getElementById('emailSubject'),
        visualEditor: document.getElementById('visualEditor'),
        codeEditor: document.getElementById('codeEditor'),
        btnViewSource: document.getElementById('btnViewSource'),
        btnSave: document.getElementById('btnSaveEmail'),
        varSelect: document.getElementById('varSelect'),
        colorPicker: document.getElementById('colorPicker'),
        toolBtns: document.querySelectorAll('.tool-btn'),
        blockButtonsContainer: document.getElementById('blockButtonsContainer') // NOVO
    };

    function init() {
        if (window.AdminApp && window.AdminApp.events) {
            window.AdminApp.events.addEventListener('dataLoaded', () => {
                renderList();
                if(window.AdminApp.emails.length > 0) loadEmail(window.AdminApp.emails[0].id);
            });
        }
        
        if(UI.btnNew) UI.btnNew.addEventListener('click', createNew);
        if(UI.btnSave) UI.btnSave.addEventListener('click', saveCurrent);
        if(UI.btnViewSource) UI.btnViewSource.addEventListener('click', toggleSource);
        
        setupToolbar();
        renderBlockButtons(); // Renderiza os botões de componentes
    }

    function renderBlockButtons() {
        if(!UI.blockButtonsContainer) return;
        UI.blockButtonsContainer.innerHTML = '';
        
        Object.keys(SNIPPETS).forEach(key => {
            const snippet = SNIPPETS[key];
            const btn = document.createElement('button');
            btn.className = 'block-btn';
            btn.textContent = snippet.label;
            btn.title = "Inserir " + snippet.label;
            
            btn.addEventListener('click', () => insertHtmlBlock(snippet.html));
            
            UI.blockButtonsContainer.appendChild(btn);
        });
    }

    function insertHtmlBlock(html) {
        if(editorState.isSourceView) return alert("Volte para o modo Visual para adicionar blocos.");
        
        UI.visualEditor.focus();
        
        // Tenta encontrar o tbody principal do email para inserir dentro
        // Se o usuário clicar fora, tentamos forçar a inserção no lugar certo
        // Como execCommand 'insertHTML' é meio burro com tabelas, vamos fazer algo mais seguro:
        
        // 1. Verifica se estamos focados dentro do editor
        const selection = window.getSelection();
        if (!selection.rangeCount || !UI.visualEditor.contains(selection.anchorNode)) {
             // Se não estiver focado, foca no final do tbody
             // (Simplificação: insertHTML direto)
        }
        
        document.execCommand('insertHTML', false, html);
    }

    function renderList() {
        const emails = window.AppState.emails || [];
        UI.listContainer.innerHTML = '';
        if (emails.length === 0) {
            UI.listContainer.innerHTML = '<div style="padding:20px;text-align:center;color:#888">Nenhum modelo.</div>';
            return;
        }
        emails.forEach(email => {
            const div = document.createElement('div');
            div.className = `email-item ${email.id === editorState.currentId ? 'selected' : ''}`;
            div.innerHTML = `<div class="email-item-name">${email.name || 'Sem Nome'}</div><div class="email-item-sub">${email.subject || ''}</div>`;
            div.addEventListener('click', () => loadEmail(email.id));
            UI.listContainer.appendChild(div);
        });
    }

    function loadEmail(id) {
        const email = window.AppState.emails.find(e => e.id === id);
        if (!email) return;
        editorState.currentId = id;
        UI.nameInput.value = email.name || '';
        UI.subjectInput.value = email.subject || '';
        editorState.isSourceView = false;
        updateEditors(email.content || BASE_TEMPLATE);
        UI.visualEditor.classList.remove('hidden');
        UI.codeEditor.classList.add('hidden');
        UI.btnViewSource.textContent = "Ver HTML";
        renderList();
    }

    function createNew() {
        const newId = Date.now();
        const newEmail = {
            id: newId,
            name: "Novo E-mail Microsoft",
            subject: "Assunto...",
            content: BASE_TEMPLATE // Já começa com o envelope bonito
        };
        window.AppState.emails.push(newEmail);
        window.AppState.datasets['emailTemplates'].data = window.AppState.emails;
        renderList();
        loadEmail(newId);
    }

    function saveCurrent() {
        if (!editorState.currentId) return;
        const content = editorState.isSourceView ? UI.codeEditor.value : UI.visualEditor.innerHTML;
        const email = window.AppState.emails.find(e => e.id === editorState.currentId);
        if (email) {
            email.name = UI.nameInput.value;
            email.subject = UI.subjectInput.value;
            email.content = content;
            window.AppState.datasets['emailTemplates'].data = window.AppState.emails;
            renderList();
            if(window.Toast) window.Toast.show('Salvo!', 'success');
        }
    }

    function updateEditors(content) {
        UI.visualEditor.innerHTML = content;
        UI.codeEditor.value = content;
    }

    function toggleSource() {
        editorState.isSourceView = !editorState.isSourceView;
        if (editorState.isSourceView) {
            UI.codeEditor.value = UI.visualEditor.innerHTML;
            UI.visualEditor.classList.add('hidden'); UI.codeEditor.classList.remove('hidden');
            UI.btnViewSource.textContent = "Ver Visual";
        } else {
            UI.visualEditor.innerHTML = UI.codeEditor.value;
            UI.codeEditor.classList.add('hidden'); UI.visualEditor.classList.remove('hidden');
            UI.btnViewSource.textContent = "Ver HTML";
        }
    }

    function setupToolbar() {
        UI.toolBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.execCommand(btn.dataset.cmd, false, null);
                UI.visualEditor.focus();
            });
        });
        if(UI.colorPicker) UI.colorPicker.addEventListener('input', (e) => document.execCommand('foreColor', false, e.target.value));
        if(UI.varSelect) UI.varSelect.addEventListener('change', (e) => {
            if(!e.target.value) return;
            if(!editorState.isSourceView) { UI.visualEditor.focus(); document.execCommand('insertText', false, e.target.value); }
            e.target.value = '';
        });
    }

    init();
})();
console.log("2-parser.js carregado");

App.Parser = {
    handleFileUpload: async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        console.log("Iniciando leitura do arquivo...");
        App.utils.showLoading(true);

        try {
            const text = await file.text();
            App.state.originalHtml = text;
            App.state.datasets = {};
            
            let foundCount = 0;
            const TARGET_VARS = Object.keys(App.CONFIG);

            TARGET_VARS.forEach(varName => {
                // Regex para achar "const nome = ["
                const regex = new RegExp(`(const|let|var)\\s+(${varName})\\s*=\\s*\\[`, 'i');
                const match = text.match(regex);

                if (match) {
                    const startIndex = match.index + match[0].length - 1;
                    // Usa a função que definimos no Core
                    const extractedArrayStr = App.utils.smartExtractArray(text, startIndex);
                    
                    if (extractedArrayStr) {
                        try {
                            // Limpeza de aspas curvas do Word/Excel se houver
                            let cleanStr = extractedArrayStr
                                .replace(/[\u2018\u2019]/g, "'")
                                .replace(/[\u201C\u201D]/g, '"');
                                
                            // Transforma texto em Objeto JS
                            const data = new Function(`return ${cleanStr};`)();
                            
                            if (Array.isArray(data)) {
                                App.state.datasets[varName] = {
                                    data: data,
                                    originalString: extractedArrayStr
                                };
                                foundCount++;
                                console.log(`Encontrado: ${varName} (${data.length} itens)`);
                            }
                        } catch (err) {
                            console.error(`Erro ao fazer parse de ${varName}:`, err);
                            
                        }
                    }
                }
            });

            if (foundCount === 0) {
                alert("Nenhuma estrutura de dados conhecida foi encontrada neste arquivo.");
            } else {
                // Chama a função do Main para desenhar o menu
                if(App.Main && App.Main.renderSidebar) {
                    App.Main.renderSidebar();
                    // Abre o primeiro item encontrado
                    const firstKey = Object.keys(App.state.datasets)[0];
                    App.Main.switchView(firstKey);
                }
            }

        } catch (error) {
            console.error(error);
            App.utils.toast("Erro fatal ao ler arquivo: ", error.message)
        } finally {
            App.utils.showLoading(false);
        }
    },

    exportHtml: function() {
        if (!App.state.originalHtml) return;
        App.utils.showLoading(true);

        setTimeout(() => {
            let finalHtml = App.state.originalHtml;

            Object.keys(App.state.datasets).forEach(key => {
                const datasetInfo = App.state.datasets[key];
                const newJsonString = JSON.stringify(datasetInfo.data, null, 4);
                
                finalHtml = finalHtml.replace(datasetInfo.originalString, newJsonString);
                datasetInfo.originalString = newJsonString;
            });

            const blob = new Blob([finalHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sistema_atualizado.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            App.utils.showLoading(false);
        }, 500);
    }
};
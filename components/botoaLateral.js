// componentes/botaoLateral.js

/**
 * Cria e retorna um elemento HTML de botão lateral.
 *
 * @param {string} iconContent - O conteúdo do ícone (ex: '💲', '⚙️', '❓'). Pode ser um emoji, um caractere especial, etc.
 * @param {string} textContent - O texto a ser exibido no botão (ex: 'Reembolso', 'Configurações', 'Ajuda').
 * @param {function} onClickHandler - A função JavaScript a ser executada quando o botão for clicado.
 * @returns {HTMLElement} O elemento <div> completo do botão lateral.
 */
export function criarBotaoLateral(iconContent, textContent, onClickHandler) {
    // Cria o elemento <div> principal do botão
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('componente-lateral'); // Adiciona a classe CSS para estilização

    // Cria o <span> para o ícone
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('icone');
    iconSpan.textContent = iconContent;

    // Cria o <span> para o texto
    const textSpan = document.createElement('span');
    textSpan.classList.add('texto');
    textSpan.textContent = textContent;

    // Adiciona o ícone e o texto ao <div> principal
    buttonDiv.appendChild(iconSpan);
    buttonDiv.appendChild(textSpan);

    // Anexa o event listener para o clique, se uma função for fornecida
    if (onClickHandler && typeof onClickHandler === 'function') {
        buttonDiv.addEventListener('click', onClickHandler);
    }

    return buttonDiv; // Retorna o elemento HTML construído
}
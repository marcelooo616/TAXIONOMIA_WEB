function BotaoLateralTerceiro() {
  const div = document.createElement('div');
  div.className = 'componente-lateral-terceiro'; // CORRETO: sem ponto

  div.onclick = function () {
    abrirDialogoEmail(); // Sua função de clique
  };

  const spanIcone = document.createElement('span');
  spanIcone.className = 'icone';
  spanIcone.textContent = '📩';

  const spanTexto = document.createElement('span');
  spanTexto.className = 'texto';
  spanTexto.textContent = 'Case Note';

  div.appendChild(spanIcone);
  div.appendChild(spanTexto);

  return div;
}

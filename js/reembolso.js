const produtosMicrosoft = [
  { nome: "Microsoft 365 Personal", preco: "R$ 299,00/ano" },
  { nome: "Microsoft 365 Family", preco: "R$ 399,00/ano" },
  { nome: "Windows 11 Home", preco: "R$ 729,00" },
  { nome: "Windows 11 Pro", preco: "R$ 1.099,00" },
  { nome: "Visual Studio Professional", preco: "R$ 2.999,00/ano" },
  { nome: "Visual Studio Enterprise", preco: "R$ 6.999,00/ano" },
  { nome: "Xbox Game Pass Ultimate", preco: "R$ 49,99/mês" },
  { nome: "Microsoft Azure - VM Standard_B2s", preco: "R$ 0,25/hora" },
  { nome: "Power BI Pro", preco: "R$ 49,00/mês" },
  { nome: "Dynamics 365 Sales", preco: "R$ 470,00/mês" }
];

const dadosRefaund = [
  {
  request_type: "Assinatura em Dunning",
  usage_timing: "O cliente tem uma assinatura do Office 365 em Dunning.",
  comment: "KBs 4338529, 2846004 and Dunning guidelines update (ACC)",
  scenario: `Quando um cliente deseja realizar o cancelamento de Assinaturas com saldo em aberto`,
  refund_criteria: `- Quando um cliente deseja realizar o cancelamento de Assinaturas
- Esta Assinatura está com saldo em aberto
- Sempre que acontecer`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Services

- Localize a Assinatura que deseja cancelar
- Clique na reticências ao lado da assinatura e clique em Cancel Subscription
- Selecione o motivo do cancelamento
- Insira o comentário (copiado anteriormente), clique em Next > Submit

ESTE TIPO DE CANCELAMENTO NÃO GERA REEMBOLSO`,
  region: "LATAM EMEA",
  kb_id: "4338529|1.3-2"
},

  {
  request_type: "2. Microsoft 365 - Compra de Assinatura",
  usage_timing: "Quando o cliente deseja cancelar a Assinatura que teve a primeira cobrança realizada nos últimos 30 dias",
  comment: "KB 4338529 | Subscription specific cancel and refund policy overview",
  scenario: `- Cliente comprou uma Assinatura do Microsoft 365
- Deseja cancelar dentro do 30 dias da primeira cobrança.

( Microsoft 365 | OneDrive | https://url.de.m.mimecastprotect.com/s/mo46CLZjkgIkY1vBEcBfviy8_YO?domain=outlook.com | Solitaire Premium Edition | Visual Studio )

IMPORTANTE: Confira quando foi realizada a primeira cobrança dentro da sessão Orders`,
  refund_criteria: `- Primeira cobrança da Assinatura
- Até 30 dias desta primeira cobrança
- Válido para PT-BR  e PT-PT`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"No Longer wants App/Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "KB4338529|2.1"
},
{
  request_type: "2.1. Microsoft 365 - Renovação de Assinatura (Exceções Única)",
  usage_timing: "Usar nos cenários de assinaturas que foram renovadas",
  comment: "KB 4338529 | 1.3 Once per lifetime of a Microsoft account, at customer's request within 30 days of a renewal charge for the subscription",
  scenario: `- O cliente recebeu a cobrança da renovação automática de sua assinatura.
- NUNCA recebeu esta exceção para a mesma assinatura/produto

PT | Considere o Reembolso Proporcional para Assinaturas superiores à 1 mês`,
  refund_criteria: `- Dentro de 30 dias após a cobrança recorrente da Assinatura
- NUNCA recebeu esta exceção para a mesma assinatura/produto

Ex. Recebi reembolso da assinatura Office e agora desejo reembolso da Assinatura Xbox`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"No Longer wants App/Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338529|1.3-3"
},
{
  request_type: "5. Política Padrão de Devolução da Microsoft Store (Software)",
  usage_timing: `Usar em cenários de:

Reembolso de compra realizada na Microsoft Store que esteja dentro de 14 dias;
Motivo não deve ser utilizado em jogos e itens de jogos;
Não relacionado a assinaturas;`,
  comment: "KB 4338530 | 1. Microsoft Store refund and return guideline | Purchases may be refunded within 14 days of purchase",
  scenario: `- Compra na Microsoft Store que esteja dentro de 14 dias;
- Motivo não deve ser utilizado em jogos e itens de jogos;
- Não relacionado a assinaturas;`,
  refund_criteria: `- Produto não relacionado a Games;
- Não relacionado a assinaturas;
- Item adquirido na Microsoft Store dentro de 14 dias;
- Não se enquadra nos outros motivos da planilha;`,
  additional_note: `Certifique-se que o cliente está dentro dos critérios:

- É uma compra única
- O cliente contatou o suporte dentro dos 14 dias da transação original`,
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"No Longer wants App/Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530 |1"
},
{
  request_type: "5.1 Política Padrão de Devolução da Microsoft Store (Hardware)",
  usage_timing: "Usar apenas para reembolso de produtos físicos",
  comment: "KB 3083551 | 3.2 Current extended return guidelines - Store Promise",
  scenario: `Produtos físicos comprados em lojas da Microsoft Store desde que obedeçam os critérios:

Familia Surface
Xbox e Consoles
Acessórios para PC

Produtos elegíveis: Dispositivos / Acessórios / Consoles`,
  refund_criteria: `Família Surface - 60 Dias a partir da data de entrega
(https://url.de.m.mimecastprotect.com/s/bbMtCNOlmxuZMBRkvCjiNiyTrsr?domain=microsoft.com)
Acessórios Xbox e Consoles - 30 Dias a partir da data de entrega
Acessórios para PC - 30 Dias a partir da data de entrega`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"No Longer wants App/Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "3083551 |3.2"
},
 {
    request_type: "6. Compra acidental",
    usage_timing: "Usar nos cenários de compra acidental",
    comment: "KB 4338530 | 2.2 Exceptions by scenario | Accidental purchase scenario",
    scenario: `Quando um cliente comprar um produto por acidente:

- Incorreto item comprado
- Versão incorreta comprada
- Utilizada conta incorreta para realizar a compra
- Já possui total ou parte do conteúdo`,
    refund_criteria: `- É uma compra única
- O valor da compra é menor ou igual a $150 Dolares
- O cliente contatou o suporte dentro dos 5 dias da transação original
- O cliente não recebeu nenhum reembolso por compras acidentais nos últimos 365 dias`,
    additional_note: `Certifique-se que o cliente está dentro dos critérios:

- É uma compra única
- O valor da compra é menor ou igual a $150 Dolares
- O cliente contatou o suporte dentro dos 5 dias da transação original
- O cliente não recebeu nenhum reembolso por compras acidentais nos últimos 365 dias`,
    advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Accidental Purchase Of App"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
    region: "LATAM EMEA",
    kb_id: "4338530|2.2",
  },
  

{
  request_type: "7. O Conteúdo não corresponde à descrição da Loja",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Content does not match description in Microsoft Store",
  scenario: `Esta exceção não pode ser baseada nos comentários apresentados na Loja.

Exemplos de fatos que devem ser levados em consideração:

- Período de aluguel definido como 48 horas mas expirado em 24 horas
- Jogo está listado contendo 10 níveis gratuitos, mas inclui apenas 1
- Compra o episódio 3 de uma série mas ao executar é reproduzido um título diferente.`,
  refund_criteria: `- O produto adquirido com período de 48 para expiração mas expirou em 24 horas
- Cliente descreve o cenário e você pode confirmar o problema relatado através do MST`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Product has incorrect Atrribute (like color, processor, etc)"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},

{
  request_type: "8. O cliente não consegue usar o produto que foi comprado",
  usage_timing: "",
  comment: "KB 4338530 |2.2 Exceptions by scenario  | Customer can't use the purchased product scenario",
  scenario: `- Cliente realiza a compra 
- Não consegue realizar o download 
- Não consegue realizar a instalação
- Não consegue executar 

Ou qualquer outra questão relacionada a distribuição ou falha de licenciamento`,
  refund_criteria: `- Uma queda do serviço da Microsoft está causando o problema
- A causa raiz pode ser atribuída a uma falha ou problema associado à Microsoft Store, Serviços do Xbox ou problemas técnicos no conteúdo.

Não é válido para itens consumíveis.`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Cannot Activate App / Product"
"Cannot Download App / Product"
"Cannot Install App / Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},

{
  request_type: "9. O cliente comprou o item mas há uma restrição",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Customer can't use the purchased product due to a restriction scenario",
  scenario: `- Cliente realiza uma compra
- O conteúdo possui alguma restrição (como idade ou mercado) 
- O cliente não consegue utilizar`,
  refund_criteria: `- O Conteúdo foi dado para o cliente (comprado como presente)
- A compra possui uma limitação
- O comprador não foi alertado sobre as restrições aplicadas na conta de usuário`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Product Not Compatible With the Customers System"
"Purchased Incorrect Version"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530 |2.2"
},
{
  request_type: "10. Conteúdo viola a política de conteúdo",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Content violates content guideline scenario",
  scenario: `- O cliente identifica uma violação na Política
- Acesse à política de conteúdo no link abaixo, para verificar maiores detalhes:
(https://url.de.m.mimecastprotect.com/s/57UjCOgmn7SN2KG1qHrsniGl16r?domain=msdn.microsoft.com)`,
  refund_criteria: `- Cliente está vendo claramente uma violação de Política
- Sempre que ocorrer`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido
- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},
{
  request_type: "11. Conteúdo/app/jogo não está mais disponível na loja",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Content/app/game no longer available in the Microsoft Store scenario",
  scenario: `- Cliente está tentando baixar um conteúdo
- Não consegue localizar o produto comprado através da Loja.
- Isto inclui compras no aplicativo (in-app / game purchase)
- Não inclui aluguel de áudio ou vídeo`,
  refund_criteria: `- Conteúdo foi removido da Loja dentro de 7 dias da compra
- Cliente ainda não instalou/usou o conteúdo`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Xbox Live

- Vá até o item Recent Activity
- Valide a instalação/utilização do jogo

Caso o cliente não tenha instalado / Utilizado

- Localize o pedido no MST
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"App No Longer Available"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},
{
  request_type: "12. Cancelamento de pré-encomenda digital",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Pre-ordered digital content cancellation scenario",
  scenario: `- Cliente deseja cancelar a compra de um produto de pré-venda
- Já foi cobrado mas ainda não está disponível para uso.`,
  refund_criteria: `- O conteúdo ainda não foi lançado / disponibilizado para o uso`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"No Longer wants App/Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},
{
  request_type: "13. Cobrança duplicada",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Duplicate charges scenario",
  scenario: `- Cliente é cobrado diversas vezes ao mesmo tempo (dentro de 15 minutos) pela mesma compra. 
- Neste cenário, consumíveis não estão cobertos

https://url.de.m.mimecastprotect.com/s/WkaLCPjno1c05xlzyC6tMixC9CY?domain=internal.support.services.microsoft.com`,
  refund_criteria: `- Compras duplicadas são identificadas como múltiplas cobranças
- Ocorreram dentro de 15 minutos para o mesmo item`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Duplicate Charge"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},
{
  request_type: "14. Foi cobrado o preço incorreto",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Incorrect price was charged scenario",
  scenario: `- Cliente não é cobrado pelo preço apresentado na Microsoft Store
- Um preço promocional não foi aplicado.`,
  refund_criteria: `- O cliente comprou um produto a um preço regular ou dentro do período promocional para a região que ele reside
- A transação é listada no MST, confirmando que o cliente foi cobrado por um preço maior.`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Customer charged incorrect price"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},
{
  request_type: "15. Problemas de qualidade de streaming",
  usage_timing: "",
  comment: "KB 4338530 | 2.2 Exceptions by scenario | Streaming quality issue scenario",
  scenario: `- Lag, excesso de buffer, ou baixa qualidade de áudio / vídeo em conteúdos de streaming`,
  refund_criteria: `- A interrupção do serviço da Microsoft está causando o problema
- O problema pode ser atribuído a algo relacionado à Microsoft`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Cannot Download App / Product"

- Insira o comentário (copiado anteriormente), clique em Next > Submit`,
  region: "LATAM EMEA",
  kb_id: "4338530|2.2"
},
{
  request_type: "17. Compras não autorizadas realizadas por menor de idade",
  usage_timing: "",
  comment: "KB 4338531 | Unauthorized purchases by a minor",
  scenario: `- Quando é uma compra realizada por menor de idade
- Não relacionado à Jogos (direcionar para https://url.de.m.mimecastprotect.com/s/CgbdCQkop1UXNWxvzuAuRiGDWHD?domain=xbox.com)`,
  refund_criteria: `- O valor da compra é menor ou igual a $500 Dólares
- O cliente contatou a Microsoft dentro dos 45 dias da transação
- A conta Microsoft não recebeu nenhum outro reembolso por esta exceção em 365 dias
- As compras devem ter sido realizadas por um menor de idade`,
  additional_note: "",
  advocate_procedure: `Através do MST, localize o grupo Orders

- Localize o pedido que o cliente deseja realizar o cancelamento
- Clique na reticências ao lado do pedido
- Selecione a opção Return Line Item
- Defina o motivo do cancelamento do pedido

"Unauthorized Purchase"

- Insira o comentário (copiado anteriormente), clique em Next > Submit

**Caso ultrapasse os $500, será necessário enviar para o Escalation`,
  region: "LATAM EMEA",
  kb_id: "4338531|2"
},
{
  request_type: "18. Reembolso Parcial de Assinatura - Portugal (Exceções Renovação)",
  usage_timing: "Cliente PT -PT que adquirie Assinatura\nEstá fora do prazo de 30 da primeira cobrança \nAssinaturas superiores a 1 mês (Ex. 3 meses, 9 meses, 1 ano)",
  comment: "KB 4338529 | 2.1 Regional Exception | customer cancels subscription after 30 days of an initial purchase or recurring billing",
  scenario: `- Cliente PT-PT que possui uma assinatura superior a 1 mês 
- Houve uma cobrança recorrente.
(Caso seja a primeira cobrança em até 30 dias, verificar a opção de Renovação)`,
  refund_criteria: `- Qualquer período após os 30 dias da primeira cobrança 
- A assinatura deve ser superior a 1 mês (ex. 3 meses, 6 meses, 1 ano)
VERIFIQUE SE O REEMBOLSO PARCIAL SERÁ APRESENTADO.
CASO CONTRÁRIO, UTILIZE A CALCULADORA`,
  additional_note: "",
  advocate_procedure: `Através do MST, no grupo Services localize a assinatura

- Clique na reticências ao lado da assinatura e clique em Cancel Subscription
- Selecione o motivo do cancelamento
- Verifique o valor que será estornado para o cliente (não esqueça que é feito o reembolso parcial)
- Insira o comentário (copiado ao lado) e clique em Next > Submit

*Caso não apresente valor para reembolso:

- Através do MST, no grupo Orders localize o Pedido
- Clique na reticências no pedido e selecione a opção Refund Line Item
- Defina o motivo do cancelamento do pedido
- Insira o comentário (copiado ao lado), clique em Next > Submit`,
  region: "EMEA",
  kb_id: "4338529|2.1"
}















  
  
];

let itemSelecionado = null;

 
function preencherSelect() {
  const select = document.getElementById('produtoReembolso');
  if (select.options.length === 1) {
    produtosMicrosoft.forEach(produto => {
      const option = document.createElement('option');
      option.value = produto.nome;
      option.textContent = produto.nome;
      select.appendChild(option);
    });
  }
}

function preencherValor() {
  const nomeSelecionado = document.getElementById('produtoReembolso').value;
  const produto = produtosMicrosoft.find(p => p.nome === nomeSelecionado);
  document.getElementById('valor').value = produto ? produto.preco : '';
}



function abrirDialogo() {
  document.getElementById('dialogo').style.display = 'flex';
  preencherSelect();
  const select = document.getElementById('tipo');
  if (select.options.length === 1) {
    dadosRefaund.forEach(item => {
      const option = document.createElement('option');
      option.value = item.request_type;
      option.textContent = item.request_type;
      select.appendChild(option);
    });
  }
}

function fecharDialogo() {
  document.getElementById('dialogo').style.display = 'none';
  document.getElementById('sr').value = '';
  document.getElementById('tipo').value = '';
  document.querySelector('.box-quandoUsar').innerHTML = '';
  document.querySelector('.box-criterios').innerHTML = '';
}

function mostrarInformacoes() {
  const tipoSelecionado = document.getElementById('tipo').value;
  itemSelecionado = dadosRefaund.find(item => item.request_type === tipoSelecionado);

  if (itemSelecionado) {
    document.querySelector('.box-quandoUsar').innerHTML = formatarTexto(itemSelecionado.refund_criteria);
    document.querySelector('.box-criterios').innerHTML = formatarTexto(itemSelecionado.scenario);
  } else {
    document.querySelector('.box-quandoUsar').innerHTML = '';
    document.querySelector('.box-criterios').innerHTML = '';
  }
}

function formatarTexto(texto) {
  return texto
    .split(' - ')
    .filter(Boolean)
    .map(linha => `<div>${linha.trim()}</div>`)
    .join('');
}


function limparCampos() {
  document.getElementById("sr").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("produtoReembolso").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("data-compra").value = "";
  document.getElementById("observacao").value = "";
}

function formatarDataBR(dataISO) {
  if (!dataISO) return "[data não selecionada]";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function gerarComentario() {
  const sr = document.getElementById("sr").value || "[SR não preenchido]";
  const produto = document.getElementById("produtoReembolso").value || "[produto não selecionado]";
  const valor = document.getElementById("valor").value || "[valor não informado]";
  const dataCompraISO = document.getElementById("data-compra").value;
  const dataCompra = formatarDataBR(dataCompraISO);
  const obs = document.getElementById("observacao").value || "[sem observação]";
  const hoje = new Date().toLocaleDateString("pt-BR");

  const kbId = itemSelecionado?.kb_id || "[KB não definido]";

  const comment = `${sr} | ${kbId}`;

  const abs = `A: Cliente deseja o reembolso do ${produto}

B: ${obs}

S: Reembolsamos o valor de ${valor} utilizando os critérios da documentação: ${kbId}

Amount Refunded: ${valor}

Effective period of the product: ${dataCompra} to ${hoje}

KB Article: ${kbId}`;

  document.getElementById("comentarioCST").textContent = comment;
  document.getElementById("comentarioABS").textContent = abs;

  document.getElementById("dialogComentario").showModal();
}



function copiarTexto(id) {
  const texto = document.getElementById(id).textContent;
  navigator.clipboard.writeText(texto).then(() => {
    alert("Texto copiado com sucesso!");
  });
}


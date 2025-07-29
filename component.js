function BotaoLateral() {
  const div = document.createElement('div');
  div.className = 'componente-lateral-emial segundo'; // adiciona a classe "segundo"
  div.onclick = function () {
    abrirDialogoEmail();
  };

  const spanIcone = document.createElement('span');
  spanIcone.className = 'icone';
  spanIcone.textContent = '📩';

  const spanTexto = document.createElement('span');
  spanTexto.className = 'texto';
  spanTexto.textContent = 'Templates E-mail';

  div.appendChild(spanIcone);
  div.appendChild(spanTexto);

  return div;
}


  function BotaoLateralTerceiro() {
    const div = document.createElement('div');
    div.className = 'componente-lateral-terceiro'; // sem ponto!

   div.onclick = function () {
  https://url.de.m.mimecastprotect.com/s/o4JWCRlpqguGgLV47FQC8i15ZPm?domain=window.opense%20Note%20Tool%20MLCSv2.html', '_blank');
};


    const spanIcone = document.createElement('span');
    spanIcone.className = 'icone';
    spanIcone.textContent = '📋';

    const spanTexto = document.createElement('span');
    spanTexto.className = 'texto';
    spanTexto.textContent = 'Case Note';

    div.appendChild(spanIcone);
    div.appendChild(spanTexto);

    return div;
  }

  // Aguarde o DOM carregar
  window.addEventListener('DOMContentLoaded', () => {
    const botaoOriginal = document.querySelector('.componente-lateral');
    if (botaoOriginal) {
      const novoBotaoTerceiro = BotaoLateralTerceiro();
      botaoOriginal.insertAdjacentElement('afterend', novoBotaoTerceiro);
    } else {
      console.warn('Botão original não encontrado!');
    }
  });


function abrirDialogoEmail() {
  // Criação do contêiner principal
  const dialog = document.createElement('div');
  dialog.className = 'dialog-container';

  // Formulário com os campos
  dialog.innerHTML = `
    <div class="dialog-content">
      <h2>Enviar E-mail ao Cliente</h2>
      <label>Nome do Cliente:</label>
      <input type="text" id="nomeCliente" />
      
      <label>Nome do Atendente:</label>
      <input type="text" id="nomeAtendente" />
      
      <label>Número do Protocolo:</label>
      <input type="text" id="numeroProtocolo" />
      
      <label>Link da DTM:</label>
      <input type="text" id="linkDTM" />

      <div class="dialog-actions">
        <button onclick="enviarEmailProtocolo()">📨 Enviar Protocolo</button>
        <button onclick="fecharDialogoEmail()">❌ Fechar</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);
}

function fecharDialogoEmail() {
  const dialog = document.querySelector('.dialog-container');
  if (dialog) document.body.removeChild(dialog);
}

function enviarEmailProtocoloa() {
  const nomeCliente = document.getElementById('nomeCliente').value;
  const nomeAtendente = document.getElementById('nomeAtendente').value;
  const numeroProtocolo = document.getElementById('numeroProtocolo').value;
  const linkDTM = document.getElementById('linkDTM').value;

  const html = `
    <html>
      <head>
        <title>Suporte Microsoft</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f3f3;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            max-height: 60px;
          }
          h2 {
            color: #0078D7;
          }
          p {
            font-size: 16px;
            margin-bottom: 14px;
            line-height: 1.6;
          }
          ul {
            padding-left: 20px;
            margin-top: 0;
          }
          .print-btn {
            text-align: right;
            margin-bottom: 20px;
          }
          .print-btn button {
            padding: 8px 12px;
            background-color: #0078D7;
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
          }
          .print-btn button:hover {
            background-color: #005ea5;
          }
        </style>
      </head>
      <body>
        <div class="print-btn">
          <button onclick="window.print()">🖨️ Imprimir / Salvar como PDF</button>
        </div>

        <div class="container">
          <div class="logo">
            <img src="file:///C:/Users/v-marcelos/Downloads/site_modularizado/logoEmialMS.jpg" alt="Logo Microsoft">
          </div>

          <h2>Obrigado por entrar em contato com o suporte da Microsoft</h2>

          <p>Olá, tudo bem?</p>
          <p>Me chamo <strong>${nomeAtendente}</strong>.</p>
          <p>Através do seu último contato no dia <strong>25/07/2025</strong> realizado conosco, foi gerado o número de Protocolo de Atendimento <strong>${numeroProtocolo}</strong>.</p>
          <p>Caso tenha qualquer dúvida ou dificuldade, não deixe de entrar em contato conosco através de um de nossos canais de atendimento, e mencionar o Protocolo acima.</p>
          <p>Na Microsoft trabalhamos para a sua satisfação e consideramos muito importante suas sugestões, reclamações ou quaisquer outras informações.</p>
          <p>Desde já agradecemos a compreensão e colaboração.</p>

          <p><strong>Obrigado por usar o Suporte Microsoft.</strong></p>

          <h3>Suporte ao Cliente Microsoft</h3>

          <p><strong>Nosso horário de atendimento:</strong></p>
          <ul>
            <li>Segunda à Sexta (Incluindo feriados) Das 09:00 às 21:00</li>
            <li>Sábados e Domingos (Incluindo feriados) Das 10:00 às 18:00</li>
          </ul>

          <p><strong>Link da DTM:</strong> <a href="${linkDTM}" target="_blank">${linkDTM}</a></p>

          <h3>Tem mais perguntas?</h3>
          <ul>
            <li>🔍 Encontre soluções na nova comunidade online da Microsoft: <a href="https://url.de.m.mimecastprotect.com/s/XjpTCVvwxmu2PAvqOhEFxiEY9Qn?domain=answers.microsoft.com">Microsoft Community</a></li>
            <li>🤖 Já conhece o Microsoft Copilot? <a href="#">Clique Aqui e Saiba Mais</a></li>
            <li>🖥️ Conheça as ofertas para aquisição do Windows: <a href="#">Clique Aqui</a></li>
            <li>📦 Promoções para o Pacote Office: <a href="#">Clique Aqui</a></li>
          </ul>

          <hr>

          <p><strong>Confidencialidade:</strong> A informação contida nesta mensagem de e-mail, incluindo quaisquer anexos, é confidencial e está reservada apenas à pessoa ou entidade para a qual foi endereçada...</p>

          <p>Marcelo Santos<br>
             Especialista em Suporte<br>
             Suporte ao Cliente Microsoft<br>
             Número do pedido de assistência: <strong>000000000000</strong></p>

          <p>📄 <a href="#">Termos de Utilização do Suporte</a><br>
             🔒 <a href="#">Declaração de Privacidade</a></p>

          <p>Microsoft Corporation<br>
             One Microsoft Way<br>
             Redmond, WA 98052</p>
        </div>
      </body>
    </html>
  `;


}


function enviarEmailProtocolo() {
  const nomeCliente = document.getElementById('nomeCliente').value;
  const nomeAtendente = document.getElementById('nomeAtendente').value;
  const numeroProtocolo = document.getElementById('numeroProtocolo').value;
  const linkDTM = document.getElementById('linkDTM').value;

  const html = `
    <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Microsoft Suporte</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f7fa;
        margin: 0;
        padding: 0;
        color: #2d2d2d;
      }
      .container {
        max-width: 740px;
        margin: auto;
        background-color: #ffffff;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      }
      .logo img {
           height: 100px;
		margin-bottom: 20px;
		width: 100%;
      }
      h1 {
        font-size: 23px;
        color: #0078D7;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      .section {
        background-color: #edf4fc;
        border-left: 4px solid #0078D7;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
		width: 700px;
      }
      .footer {
        font-size: 14px;
        color: #555;
        border-top: 1px solid #ddd;
        padding-top: 30px;
      }
      ul {
        padding-left: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      li {
        margin-bottom: 8px;
      }
      a {
        color: #0078D7;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      strong {
        color: #0078D7;
      }
	  .legal-text {
		  font-size: 10px;
		  color: #888;
		  line-height: 1.4;
		  margin-bottom: 14px;
		  width: 700px;
}
.textp{
	width: 700px;
}

#dataContato{
	color: #0078D7;
	font-weight: bold;
	
}

.nomeDoCliente{
	
	color: #0078D7;
	font-weight: bold;
}
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="data:image/png;base64,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Ghs3blyzZk25XJ4zZ855551njFm/fn2e55VKpaOjY3BwcPv27VmWXXLJJc1mc3h4+Nvf/vbIyEitVrviiiuq1erOnTufffbZLVu2/PM///O11167YcOGl156qVar/d7v/V5HR8fWrVuLhcbbb789y7KOjo6LL754+vTpr7/++rp16955551//Md//OQnP7l69erXX399z5493d3dZ5xxhlLKWvvKK68cPHhw7ty5ixYtkmhV+R8T1kEDgUDgP8/xxx//4osvvvvuu729vfJNHMdFHuEPf/jDe++9d82aNUVaITOvWLHixhtvvOSSS0ql0sqVK//8z/98xowZt99++8jIiPc+SZKPfOQjn/rUp2SAlRom3/3ud++77z6x7Vqt1vnnn/+pT32qr69PYglXr179J3/yJ3PmzLnpppuMMX/2Z3/29a9/3RgzOjr6l3/5l/V6feXKlTfddFMURVmWfeELX3j++ecl2HXRokW33XZbZ2dnkiRJkoyNjSVJUmS7HRUmJ4QMOIAIGgz2HspDO1IKmpxTxkxLYgZyZ6KZ/atuuafc1WbZZhqWjIJPfGocgUseaKUNW6mfufg3zlx8WoqBBB5swcyKCWWAgJJFYtCXoeKQWeeSOAGBFEomU74xNrRvxowzenumHzg49Mwzz3zkIx8xxjz22GONRuPyyy8vl8vDw8MS0lJcf5IkpVJJa33fffdFUTR37tzrrrsuz3NmXrRokehQW1ubGHZ/8zd/kyRJHMdr167duXNnd3f3dddd19vbG0XRSSedFMfxk08++eabb0rgTK1WazQaixcvVkrNmTNHplSPP/64MWZsbEx2ZOYFCxb09PQ8/PDDu3bt2r9//8qVK8Xu7O3tveSSSwDkef7OO+8cOnRo9uzZK1as+JllxaCCgUDgCPj0pz99yy23XH/99TfccMOyZcvEAiuVSs65LMva2trEImw0GpVKRSbxpVIpjmMJK9VaP/HEE5VK5Stf+UpfX9/Y2NgDDzzwT//0T2NjYzfeeKNYdX/913+9e/fuz3/+88uWLcvzfOvWrbfddttnPvOZ733ve977arVqrd26deuPf/zjv/3bv+3u7q5Wq/fcc8/OnTu/9rWvXX/99TNnzuzq6jLGNJvNz3/+87t37/76178+b968gwcP3nnnnddff/23vvWtOI7lao/6/Zm0a9QdrvXpQUReeShWACGKyq2RkSRJvAIiM+DxvRd3DWScRZQapNo4guE08ohsVLG5fW/nZz95KR88MLjn2c5qavJGKUW5VB11OUXGtlLLsY1ntM8kU+vUpmaNZ3jH3sAQlEE0NDgKz8uXL3/woR++9tprV155pbV227Ztxphzzz1XMt/F2ejGSZLEWjs8PAyAmS+++OKilAzGsynGxsba29tF6sRC37FjR61W6+vrEwtdAmfOOeecp556yhizY8eOnp4eOdcdd9xxwQUXnHPOOVmWMfOePXtardaSJUuOO+44SWKVa1u7dm2apm+88UZfX1+WZfV6XWZVUg0gTdNms9loNMRFUK/X5R1yzonf9Sg+/kAgMBU47bTTvvCFL/zd3/3d5z73uZNPPvljH/vYeeedJxZhkiRS6wpApVIBUIiiKKKkur/99tvf+973ZGperVb/6I/+aHBw8NFHH73mmmuOP/74Bx988JVXXrn11lvPP/98ib1fvHjx3//933/6059+6KGHrrnmGjnFa6+9dtddd7W3txtjZE1KvKmzZs1asmRJlmUAHn/8cdls/vz5zDxz5swrrrjis5/97IYNG5YuXSrhGmNjY9VqVTx8R+X+TM60lFgYL1W2HR+u8ymLhIS4VCadaGU8MMj40a6hB3a11v6UHn3L/HiX+dFu9fAe9S97sWZvvvbtsVffGx0DN0f22Xc36vdedruftPuebL71aLrz0XT7T2jf/9QDL7r31kfN/Yl2DG9U2cJYLjmf1NMS9HSnu6His8++gJnTNB0eHn7rrbe01ieddJLElVSrVQkZFTkUN2mSJIODg977LMtOOOEEiQt1zhWRoqI0tVpNPOlKqUOHDkVRNHPmTADDw8NJknjvOzs7m80mM7/zzjtdXV0rV6601u7fv//73//+V7/61YGBgSRJ6vW6c06yNZhZjHqtdbVajaKo8LBPzJ2XLeV1lLdQHnwURaVSKahgIBA4Arz3p5122n333XfjjTcODAzceuutt99+uwyJRR0rY4zMwkWl2traRNKkSvNv//ZvO+eKyiHOObE3tm/f7px76aWX2tvbzz///CzLrLWSuT979uxarfboo48aY2THs846a9q0aUWEv8hqFEUdHR2tVktC659++ul58+bNnz9ftJOZzzrrLMn0KJfLonylUmmiDfPLM+mBleEJDp7BiqBIHS4q08zykjLZ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" alt="Logo Microsoft">
      </div>

      <h1>Obrigado por entrar em contato com o suporte da Microsoft</h1>
      <p>Olá <span class="nomeDoCliente">${nomeCliente}</span>,tudo bem?</p>
      <p>Me chamo <strong>${nomeAtendente}</strong> e estou aqui para te ajudar.</p>

      <div class="section">
        <p> Através do seu último contato no dia <span id="dataContato"></span> realizado conosco, foi gerado o número de Protocolo de Atendimento <strong>${numeroProtocolo}</strong>.</p>
      </div>

      <p class="textp">Caso tenha dúvidas ou precise de mais apoio, nossa equipe está pronta para te atender. Basta informar o número de protocolo acima.</p>
      <p class="textp">Na Microsoft, prezamos pela excelência no atendimento e estamos sempre abertos a sugestões, dúvidas ou reclamações.</p>
      <p class="textp">Mais uma vez, agradecemos pela colaboração e confiança!</p>

      <div class="footer">
        <p><strong>Suporte ao Cliente Microsoft</strong></p>
        <p>🕘 Segunda à Sexta: 09h - 21h<br>
           🕘 Sábados e Domingos: 10h - 18h</p>

        <p><strong>Tem mais perguntas?</strong></p>
        <ul>
          <li>Encontre soluções de forma simples na nova comunidade online da Microsoft: <a href="https://url.de.m.mimecastprotect.com/s/tsAtCWPxynh6yBkrlIOHqioV_M0?domain=learn.microsoft.com">Microsoft Community</a></li>
          <li>Já conhece o Microsoft Copilot, a nova Inteligência Artificial da Microsoft? <a href="https://url.de.m.mimecastprotect.com/s/rIjICXQyz6t4MYJEpTQIziWJOZp?domain=microsoft.com">Clique Aqui e Saiba Mais</a></li>
          <li>Acesse a página do Windows e conheça as ofertas para aquisição do produto. <a href="https://url.de.m.mimecastprotect.com/s/B2ANCY7zA6hD6x8VGFQSWixzTz7?domain=microsoft.com">Clique Aqui</a></li>
          <li>Acesse e conheça as novidades e promoções disponíveis para o Pacote Office. <a href="https://url.de.m.mimecastprotect.com/s/cpKUCZ8AB4T7oNGKOcRT1iBarTC?domain=microsoft.com">Clique Aqui</a></li>
          <li>Encontre soluções de forma simples na nova comunidade online da Microsoft: <a href="https://url.de.m.mimecastprotect.com/s/tsAtCWPxynh6yBkrlIOHqioV_M0?domain=learn.microsoft.com/">Microsoft Community</a></li>
        </ul>

        <p class="legal-text"><strong>Observação:</strong> Será necessário entrar com uma conta Microsoft. Se não tiver uma conta Microsoft ou não conseguir acessá-la, poderá criar uma conta temporária pelo link <a href="#">Microsoft Outlook | Criar conta de email | Fazer Email grátis</a>. Caso não entre com sua conta Microsoft, você poderá ser direcionado para atendimento de suporte por chat.</p>

        <p class="legal-text">Os sites de terceiros mencionados nos e-mails que são enviados pela Microsoft são produzidos por empresas independentes. A Microsoft não oferece garantia, implícita ou não, com relação ao desempenho ou à confiabilidade desses produtos.</p>

        <p class="legal-text"><strong>Confidencialidade:</strong> A informação contida nesta mensagem de e-mail, incluindo quaisquer anexos, é confidencial e está reservada apenas à pessoa ou entidade para a qual foi endereçada. Se você não é o destinatário ou a pessoa responsável por encaminhar esta mensagem ao destinatário, você está, por meio desta, notificado que não deverá rever, retransmitir, imprimir, copiar, usar ou distribuir esta mensagem de e-mail ou quaisquer anexos. Caso você tenha recebido esta mensagem por engano, por favor, contate o remetente imediatamente e apague esta mensagem de seu computador ou de qualquer outro banco de dados. Encontre soluções de forma simples na nova comunidade online da Microsoft. Conheça a Comunidade Microsoft em https://url.de.m.mimecastprotect.com/s/RkIRC160lju6EYRJvI4U4iVmpeQ?domain=answers.microsoft.com. Muito obrigado.</p>

      <div style="
		  background-color: #fcebea;
		  border-left: 4px solid #d93025;
		  padding: 18px;
		  width: 700px;
		  max-width: auto;
		  border-radius: 8px;
		  font-size: 10px;
		  color: #4d0000;
		  margin-top: 30px;
		  line-height: 1.6;
		">
		  <p><strong>Leia os Termos de Utilização do Suporte Microsoft</strong>.</p>
		  <p>Esta mensagem da Microsoft constitui uma parte importante de um programa, serviço ou produto adquirido por si ou pela sua empresa ou no qual participa. A Microsoft respeita a sua privacidade.</p>
		  <p>Leia a nossa <a href="#" style="color: #d93025; text-decoration: underline;">Declaração de Privacidade</a>.</p>
		</div>


   <div style="
  max-width: 500px;


  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', sans-serif;
  padding: 24px;
  color: #2b2b2b;
">
  <table style="width: 100%;">
    <tr>
      <!-- Coluna da identidade -->
      <td style="width: 60%; vertical-align: top;">
        <h2 style="margin: 0; font-size: 18px; color: #0078D7;">${nomeAtendente}</h2>
        <p style="margin: 4px 0 10px; font-size: 14px;">Especialista em Suporte<br>
        Suporte ao Cliente Microsoft</p>
      </td>

      <!-- Coluna da marca -->
      <td style="width: 40%; vertical-align: bottom; text-align: right;">
        <img src="data:image/png;base64,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"
             alt="Microsoft Logo"
            style="height: 30px; width: auto; max-width: 100%; display: block; float: right; margin-left: 10px;"><br>
        <p style="font-size: 12px; color: #666; line-height: 1.4;">
          Microsoft Corporation<br>
          One Microsoft Way<br>
          Redmond, WA 98052
        </p>
      </td>
    </tr>
  </table>
</div>




      </div>
    </div>
	<script>
  const dataHoje = new Date();
  document.getElementById("dataContato").textContent = dataHoje.toLocaleDateString('pt-BR');
</script>
  </body>
</html>


  `;

  const aba = window.open('', '_blank'); // ✅ Corrigido aqui
  aba.document.write(html);
  aba.document.close();
}




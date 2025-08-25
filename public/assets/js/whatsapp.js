document.addEventListener('DOMContentLoaded', () => {

    const campoMensagem = document.getElementById('mensagem');
    const botoesProduto = document.querySelectorAll('.btn-produto');
    const botaoGerarLink = document.getElementById('gerarLinkBtn');
    const botaoLimpar = document.getElementById('btnLimpar');
    const displayContador = document.getElementById('contador-linhas');
    const SERVER_URL = '';

    let mensagemAcumulada = "";

    function atualizarContador(texto) {
        if (!texto || texto.trim() === "") {
            displayContador.textContent = '0';
            return;
        }
        const itens = texto.split('\n\n');
        displayContador.textContent = itens.length;
    }

    botoesProduto.forEach(botao => {
        botao.addEventListener('click', () => {
            const mensagemProduto = botao.dataset.message;
            if (mensagemAcumulada) {
                mensagemAcumulada += '\n\n';
            }
            mensagemAcumulada += mensagemProduto;
            campoMensagem.value = mensagemAcumulada;
            atualizarContador(mensagemAcumulada);
        });
    });

    botaoLimpar.addEventListener('click', () => {
        mensagemAcumulada = "";
        campoMensagem.value = "";
        atualizarContador("");
    });

    botaoGerarLink.addEventListener('click', async () => {
        if (!mensagemAcumulada || mensagemAcumulada.trim() === "") {
            alert('O carrinho está vazio.');
            return;
        }
        try {

            const response = await fetch(`${SERVER_URL}/api/config`);
            if (!response.ok) throw new Error('Não foi possível carregar a configuração do servidor.');
            
            const config = await response.json();
            const { whatsapp_link } = config;

            if (!whatsapp_link) throw new Error('Link do WhatsApp não encontrado na configuração.');

            const mensagemBase = "Olá! Tenho interesse nos seguintes itens:\n\n";
            const mensagemCompleta = mensagemBase + mensagemAcumulada;
            const mensagemCodificada = encodeURIComponent(mensagemCompleta);
            const linkFinal = `${whatsapp_link}?text=${mensagemCodificada}`;

            window.open(linkFinal, '_blank');
        } catch (error) {
            alert(`Falha ao gerar o link:\n${error.message}`);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {

    const campoMensagem = document.getElementById('mensagem');
    const botoesProduto = document.querySelectorAll('.btn-produto');
    const botaoGerarLink = document.getElementById('gerarLinkBtn');
    const botaoLimpar = document.getElementById('btnLimpar');
    const displayContador = document.getElementById('contador-linhas');
    const SERVER_URL = ''; 

    function atualizarContador(texto) {
        if (!texto || texto.trim() === "") {
            displayContador.textContent = '0';
            return;
        }
        const itens = texto.split('\n\n');
        displayContador.textContent = itens.length;
    }
    
    async function carregarDadosIniciais() {
        try {
            const response = await fetch(`${SERVER_URL}/api/data`);
            if (!response.ok) return;
            const data = await response.json();
            campoMensagem.value = data.selectedMessage;
            atualizarContador(data.selectedMessage);
        } catch (error) {
            console.error("Falha ao carregar dados iniciais", error);
        }
    }

    botoesProduto.forEach(botao => {
        botao.addEventListener('click', async () => {
            const mensagemProduto = botao.dataset.message;
            try {
                const response = await fetch(`${SERVER_URL}/api/update-message`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: mensagemProduto }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `O servidor respondeu com status ${response.status}`);
                }
                const data = await response.json();
                campoMensagem.value = data.new_message;
                atualizarContador(data.new_message);
            } catch (error) {
                alert(`Falha ao adicionar o item:\n${error.message}`);
            }
        });
    });

    botaoLimpar.addEventListener('click', async () => {
        try {
            const response = await fetch(`${SERVER_URL}/api/reset-message`, { method: 'POST' });
            if (!response.ok) throw new Error('Falha ao limpar a mensagem no servidor.');
            campoMensagem.value = "";
            atualizarContador("");
            alert('Mensagem reiniciada!');
        } catch (error) {
            alert(error.message);
        }
    });

    botaoGerarLink.addEventListener('click', async () => {
        try {
            const response = await fetch(`${SERVER_URL}/api/data`);
            if (!response.ok) throw new Error('Não foi possível carregar os dados do servidor.');

            const data = await response.json();
            const { whatsapp_link, selectedMessage } = data;

            if (!selectedMessage || selectedMessage.trim() === "") {
                alert('A mensagem está vazia. Adicione um item primeiro.');
                return;
            }
            const mensagemBase = "Olá! Tenho interesse nos seguintes itens:\n\n";
            const mensagemCompleta = mensagemBase + selectedMessage;
            const mensagemCodificada = encodeURIComponent(mensagemCompleta);
            const linkFinal = `${whatsapp_link}?text=${mensagemCodificada}`;

            window.open(linkFinal, '_blank');

        } catch (error) {
            console.error("Erro capturado no front-end:", error);
            alert(`Falha ao gerar o link:\n${error.message}`);
        }
    });
    carregarDadosIniciais();
});
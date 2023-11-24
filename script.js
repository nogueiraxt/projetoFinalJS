const criptoSelect = document.getElementById('criptomoedaSelect');
const criptoCard = document.getElementById('criptomoedaCard');
const nomeCripto = document.getElementById('nomeCriptomoeda');
const siglaCripto = document.getElementById('siglaCriptomoeda');
const valorCripto = document.getElementById('valorCriptomoeda');
const descricaoCripto = document.getElementById('descricaoCriptomoeda');
const logoCripto = document.getElementById('logoCriptomoeda');
const quantidadeInput = document.getElementById('quantidadeInput');
const limparButton = document.getElementById('limparButton');
const converterButton = document.getElementById('converterButton');
const resultadoConversao = document.getElementById('resultadoConversao');

let criptoData = [];

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

// ... (código anterior)

function atualizarCard() {
    const selectedId = criptoSelect.value;
    const selectedCripto = criptoData.find(cripto => cripto.id == selectedId);

    if (selectedCripto) {
        nomeCripto.textContent = `Nome: ${selectedCripto.nome}`;
        siglaCripto.textContent = `Sigla: ${selectedCripto.sigla}`;
        valorCripto.textContent = `Valor Atual: ${formatarValor(selectedCripto.valor_atual)}`;
        descricaoCripto.textContent = `Descrição: ${selectedCripto.descricao}`;
        logoCripto.src = selectedCripto.logo;
        criptoCard.classList.remove('left', 'right');
        criptoCard.classList.add('rotate');
        criptoCard.style.display = 'block';

        const dataAtual = new Date().toLocaleDateString('pt-BR');
        dataAtual.textContent = `Data Atual: ${dataAtual}`;
    } else {
        criptoCard.classList.remove('rotate');
        criptoCard.classList.add('left');
        setTimeout(() => criptoCard.style.display = 'none', 500);
    }
}

function limparCampos() {
    criptoSelect.value = '';
    quantidadeInput.value = '';
    criptoCard.style.display = 'none';
    resultadoConversao.innerHTML = '';
}

converterButton.addEventListener('click', function () {
    const quantidadeEmReais = parseFloat(quantidadeInput.value);

    if (isNaN(quantidadeEmReais)) {
        alert('Digite uma quantidade válida em reais.');
        return;
    }

    const selectedId = criptoSelect.value;
    const selectedCripto = criptoData.find(cripto => cripto.id == selectedId);

    if (selectedCripto) {
        const valorCripto = selectedCripto.valor_atual;
        const quantidadeEmCripto = quantidadeEmReais / valorCripto;

        const dataAtual = new Date();
        const dataFormatada = `${dataAtual.toLocaleDateString('pt-BR')} ${dataAtual.toLocaleTimeString('pt-BR')}`;

        // Criando um elemento de parágrafo para exibir o resultado
        const resultadoParagraph = document.createElement('p');
        resultadoParagraph.textContent = `Você teria aproximadamente ${quantidadeEmCripto.toFixed(8)} ${selectedCripto.sigla}. Convertido em: ${dataFormatada}`;

        // Removendo resultados anteriores e adicionando o novo resultado
        resultadoConversao.innerHTML = '';
        resultadoConversao.appendChild(resultadoParagraph);
    }
});

// ... (código posterior)

fetch('api.json')
    .then(response => response.json())
    .then(data => {
        criptoData = data;
        data.forEach(cripto => {
            criptoSelect.add(new Option(cripto.nome, cripto.id));
            const img = new Image();
            img.src = cripto.logo;
        });
    })
    .catch(error => console.error('Erro ao obter dados da API:', error));

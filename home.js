document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o campo de upload de arquivo
    const uploadInput = document.getElementById('upload-resumo');
    // Seleciona a área onde os resumos são exibidos
    const conteudoMain = document.querySelector('.conteudo');
    // Seleciona a mensagem
    const tooltipMessage = document.querySelector('.novo-resumo-tooltip');
    
    // Seleciona o botão do menu e o menu lateral
    const menuBtn = document.getElementById('menu-btn');
    const menuLateral = document.getElementById('menu-lateral');

    let fecharMenuLateral;

    // Adiciona o evento de clique ao botão do menu
    menuBtn.addEventListener('click', () => {
        clearTimeout(fecharMenuLateral);
        menuLateral.classList.toggle('aberto');
    });

    menuLateral.addEventListener('mouseenter', () => {
        clearTimeout(fecharMenuLateral)
    });

    menuLateral.addEventListener('mouseleave', () => {
        fecharMenuTimeout = setTimeout(() => {
            menuLateral.classList.remove('aberto');
        }, 200); 
    });

    let contadorResumos = 0; // Começa em 2, pois você já tem RESUMO-01 e RESUMO-02


    // Adiciona um "ouvinte" de evento para quando o arquivo for selecionado
    uploadInput.addEventListener('change', (event) => {
        const arquivo = event.target.files[0];

        if (arquivo) {
            contadorResumos++; // Incrementa o contador para o próximo resumo

            // Oculta a mensagem depois do primeiro resumo ser adicionado
            if (contadorResumos === 1) {
                tooltipMessage.style.display = 'none';
            }
            // Cria o novo card (a div com a classe 'resumo')
            const novoResumoDiv = document.createElement('div');
            novoResumoDiv.className = 'resumo';
            
            // Cria um título (h2) para o card
            const tituloResumo = document.createElement('h2');
            tituloResumo.textContent = `RESUMO-${String(contadorResumos).padStart(2, '0')}`;
            
            // Cria um parágrafo (p) para o nome do arquivo
            const nomeArquivo = document.createElement('p');
            nomeArquivo.textContent = arquivo.name;

            // Adiciona o título e o nome do arquivo ao card
            novoResumoDiv.appendChild(tituloResumo);
            novoResumoDiv.appendChild(nomeArquivo);

            // Encontra o botão de adicionar novo para inserir o card antes dele
            const novoBotao = document.querySelector('.novo-resumo-container');

            // Insere o novo card na tela
            conteudoMain.insertBefore(novoResumoDiv, novoBotao);

            // Limpa o valor do input para permitir que o mesmo arquivo seja adicionado novamente
            event.target.value = '';
        }
    });
});
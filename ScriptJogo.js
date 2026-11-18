let personagem = document.getElementById('personagem');
let obstaculo = document.getElementById('obstaculo');
let obstaculo2 = document.getElementById('obstaculo2');
let gameover = document.getElementById('gameover');
let moeda = document.getElementById('moeda');
let botaogameover = document.getElementById('botaogameover');
let botaoretornar = document.getElementById('botaoretornar');
let contadorMoedas = document.getElementById('contadorMoedas');
let emexecucao = false;
let Moedas = 0;
let moedasRestantes = 0;
let posicaoX = 0;
let posicaoY = 0;
let posponte = 2;
let posopcponte = 0;
let posopcponte2 = 0;
let posopcponteM = 0;
let qtdtempojogo = 60;
let tmax = 2500;
let tmin = 1000;
let tmaxM = 2500;
let tminM = 1000;
let tempo = 4000;
let tempo2 = 4000;
let tempoM = 3000;
let verificador = setInterval(verificarColisoes, 50);
let imagemAtual = 0;
let intervaloCaminhada;
let intervaloTempo; 
let jogoFinalizado = false;

window.addEventListener('resize', function() {
    if (!emexecucao) {
        novoPulo();
    }

    ObjetosAtualizados();
});

function obstaculos() {
    if (jogoFinalizado) return;
    let ponteopc1 = Math.floor(Math.random() * 3) + 1;
    while (ponteopc1 == posopcponteM || ponteopc1 == posopcponte2) {
    ponteopc1 = Math.floor(Math.random() * 3) + 1;
}
    posopcponte = ponteopc1
    obstaculo.dataset.ponte = ponteopc1;
    let ponteO = document.querySelector('.ponte' + ponteopc1);
    let centralizadorO = ponteO.getBoundingClientRect().left + (ponteO.offsetWidth / 2);
    let larguraO = 150;
    obstaculo.style.left = (centralizadorO - larguraO / 2) + 'px';
    obstaculo.classList.remove('obstaculopercorrendo');
    void obstaculo.offsetWidth;
    obstaculo.classList.add('obstaculopercorrendo');
    obstaculo.addEventListener('animationend', function() {
        posopcponte = 0;
        obstaculo.classList.remove('obstaculopercorrendo');
        obstaculo.style.display = 'none';
        tempo = Math.random() * (tmax - tmin) + tmin;
        setTimeout(obstaculos, tempo);

    }, { once: true });
}

function obstaculos2() {
        if (jogoFinalizado) return;
        let ponteopc3 = Math.floor(Math.random() * 3) + 1;
        while (ponteopc3 == posopcponteM || ponteopc3 == posopcponte) {
            ponteopc3 = Math.floor(Math.random() * 3) + 1;
        }
        posopcponte2 = ponteopc3
        obstaculo2.dataset.ponte = ponteopc3;
        let ponteO2 = document.querySelector('.ponte' + ponteopc3);
        let centralizadorO2 = ponteO2.getBoundingClientRect().left + (ponteO2.offsetWidth / 2);
        let larguraO2 = 150;
        obstaculo2.style.left = (centralizadorO2 - larguraO2 / 2) + 'px';
        obstaculo2.classList.remove('obstaculopercorrendo');
        void obstaculo2.offsetWidth;
        obstaculo2.classList.add('obstaculopercorrendo');
        obstaculo2.addEventListener('animationend', function() {
            posopcponte2 = 0;
            obstaculo2.classList.remove('obstaculopercorrendo');
            obstaculo2.style.display = 'none';
            tempo2 = Math.random() * (tmax - tmin) + tmin;
            setTimeout(obstaculos2, tempo2);
        }, { once: true });
}

function finalizarMoeda(moedaAtual) {
    if (moedaAtual.dataset.finalizada == 'true') {
        return;
    }

    moedaAtual.dataset.finalizada = 'true';
    moedaAtual.remove();

    moedasRestantes--;

    if (moedasRestantes == 0) {
        posopcponteM = 0;
        tempoM = Math.random() * (tmaxM - tminM) + tminM;
        setTimeout(moedas, tempoM);
    }
}
function moedas() {
    if (jogoFinalizado) return;
    let ponteopc2 = Math.floor(Math.random() * 3) + 1;
    do{
        ponteopc2 = Math.floor(Math.random() * 3) + 1;
    }while(ponteopc2 == posopcponte || ponteopc2 == posopcponte2)
    posopcponteM = ponteopc2; 
    
    let ponteM = document.querySelector('.ponte' + ponteopc2);

    let centralizadorM = ponteM.offsetLeft + (ponteM.offsetWidth / 2);

    let qtdM = 6 - Math.floor(Math.sqrt(Math.random() * 35));

    moedasRestantes = qtdM;

    for (let n = 0; n < qtdM; n++) {

        let MoedaClonada = moeda.cloneNode(true);

        MoedaClonada.dataset.ponte = ponteopc2;

        MoedaClonada.removeAttribute('id');

        MoedaClonada.style.top = '-150px';
        
        document.body.appendChild(MoedaClonada);
        
        MoedaClonada.classList.add('moedapercorrendo');
        
        MoedaClonada.style.left = centralizadorM - (MoedaClonada.offsetWidth / 2) + 'px';

        MoedaClonada.style.animationDelay = (n * 0.5) + 's';

        MoedaClonada.addEventListener('animationend', function() {

        finalizarMoeda(MoedaClonada);

        }, { once: true });
    }
}
setTimeout(moedas, 1250);
setTimeout(obstaculos, 1250);

function novoPulo() {
    let ponte1 = document.querySelector('.ponte1').getBoundingClientRect();
    let ponte2 = document.querySelector('.ponte2').getBoundingClientRect();

    let distancia =
        (ponte2.left + ponte2.width / 2) -
        (ponte1.left + ponte1.width / 2);

    personagem.style.setProperty('--posicaoX', ((posponte - 2) * distancia) + 'px');

    personagem.style.setProperty('--pulo16', (distancia * 0.1667) + 'px');
    personagem.style.setProperty('--pulo33', (distancia * 0.3333) + 'px');
    personagem.style.setProperty('--pulo50', (distancia * 0.5) + 'px');
    personagem.style.setProperty('--pulo67', (distancia * 0.6667) + 'px');
    personagem.style.setProperty('--pulo83', (distancia * 0.8333) + 'px');
    personagem.style.setProperty('--distanciaPulo', distancia + 'px');
}

function ObjetosAtualizados() {

    function ObjetoAlinhado(objeto) {

        let numeroPonte = objeto.dataset.ponte;

        if (!numeroPonte) return;

        let ponte = document.querySelector('.ponte' + numeroPonte);

        let centro = ponte.getBoundingClientRect().left +
                     (ponte.getBoundingClientRect().width / 2);

        let largura = objeto.getBoundingClientRect().width;

        objeto.style.left = (centro - largura / 2) + 'px';
    }

    if (obstaculo.classList.contains('obstaculopercorrendo')) {
        ObjetoAlinhado(obstaculo);
    }

    if (obstaculo2.classList.contains('obstaculopercorrendo')) {
        ObjetoAlinhado(obstaculo2);
    }

    let moedasNaTela = document.querySelectorAll('.moedapercorrendo');

    moedasNaTela.forEach(function(moedaAtual) {
        ObjetoAlinhado(moedaAtual);
    });
}

function trocarImagem() {
    personagem.src = 'https://imgur.com/j0c2X9Y.png';

    setTimeout(function() {
        personagem.src = 'https://imgur.com/QA4tr5e.png';
    }, 2000);
}

function puloe() {
            if(emexecucao){
                return;
            }

    emexecucao = true;
    clearInterval(intervaloCaminhada);
    personagem.src = 'https://imgur.com/j0c2X9Y.png';

    novoPulo();
    
    personagem.classList.remove('pularesquerda','pulardireita');

    void personagem.offsetWidth;

    personagem.classList.add('pularesquerda');
            
}
function pulod() {
    if(emexecucao){
                return;
            }

    emexecucao = true;
    clearInterval(intervaloCaminhada);
    personagem.src = 'https://imgur.com/j0c2X9Y.png';

    novoPulo();

    personagem.classList.remove('pulardireita','pularesquerda');

    void personagem.offsetWidth;

    personagem.classList.add('pulardireita');
}
personagem.addEventListener('animationend', function() {

    personagem.src = 'https://imgur.com/QA4tr5e.png';
    iniciarAndamento();

    personagem.classList.remove('pularesquerda', 'pulardireita');

    novoPulo();

    emexecucao = false;
});

function iniciarAndamento() {
    imagemAtual = 0;

    intervaloCaminhada = setInterval(function() {
        if (imagemAtual == 0) {
            personagem.src = 'https://imgur.com/j0c2X9Y.png';
            imagemAtual = 1;
        }
        else {
            personagem.src = 'https://imgur.com/QA4tr5e.png';
            imagemAtual = 0;
        }
    }, 400);
}

function pararAndamento() {
    clearInterval(intervaloCaminhada);
    personagem.src = 'https://imgur.com/QA4tr5e.png';
}

document.addEventListener('keydown', function(escolha) {

    if (emexecucao) return;

    if (posponte == 2) {
        if (escolha.key == 'ArrowLeft') {
            console.log('Pulo ativado!');
            puloe();
            posponte--;
        } else if (escolha.key == 'ArrowRight') {
            console.log('Pulo ativado!');
            pulod();
            posponte++;
        }
    } else if (posponte == 1) {

        if (escolha.key == 'ArrowRight') {
            console.log('Pulo ativado!');
            pulod();
            posponte++;
        }else if(escolha.key == 'ArrowLeft'){
            posponte = 1;
        }
    } else if (posponte == 3) {

        if (escolha.key == 'ArrowLeft') {
            console.log('Pulo ativado!');
            puloe();
            posponte--;
        }else if(escolha.key == 'ArrowRight'){
            posponte = 3;
        }
    }
});
function detectarColisaoObstaculo(){
    let pospersonagem = personagem.getBoundingClientRect()
    let posobstaculo = obstaculo.getBoundingClientRect()
    let posobstaculo2 = obstaculo2.getBoundingClientRect();
    if (
    (pospersonagem.left < posobstaculo.right && pospersonagem.right > posobstaculo.left && pospersonagem.top < posobstaculo.bottom && pospersonagem.bottom > posobstaculo.top ) || (pospersonagem.left < posobstaculo2.right && pospersonagem.right > posobstaculo2.left && pospersonagem.top < posobstaculo2.bottom && pospersonagem.bottom > posobstaculo2.top )
) {
        let posicaoObstaculoY = posobstaculo.top;
        let posicaoObstaculo2Y = posobstaculo2.top;
        let posicaoObstaculoX = posobstaculo.left;
        let posicaoObstaculo2X = posobstaculo2.left;
        let posicaoPersonagemY = pospersonagem.top;
        let posicaoPersonagemX = pospersonagem.left;
        let moedasNaTela = document.querySelectorAll('.moedapercorrendo');

        jogoFinalizado = true;
        moedasNaTela.forEach(function(moedaAtual) {
            let posMoeda = moedaAtual.getBoundingClientRect();

            moedaAtual.style.animation = 'none';
            moedaAtual.style.top = posMoeda.top + 'px';
            moedaAtual.style.left = posMoeda.left + 'px';
        })
        obstaculo.style.top = posicaoObstaculoY + 'px'
        obstaculo.style.left = posicaoObstaculoX + 'px'
        obstaculo.style.animation = 'none'

        obstaculo2.style.top = posicaoObstaculo2Y + 'px'
        obstaculo2.style.left = posicaoObstaculo2X + 'px'
        obstaculo2.style.animation = 'none'

        personagem.style.bottom = 'auto';
        personagem.style.marginLeft = '0';
        personagem.style.transform = 'none';
        personagem.style.top = posicaoPersonagemY + 'px'
        personagem.style.left = posicaoPersonagemX + 'px'
        personagem.style.animation = 'none'

        gameover.style.visibility = 'visible'

        botaogameover.style.visibility = 'visible'
        botaoretornar.style.visibility = 'visible'
        
        
        clearInterval(verificador);
        clearInterval(intervaloTempo);
        clearInterval(intervaloCaminhada);
        }
}
function detectarColisaoMoeda(){
    let pospersonagemM = personagem.getBoundingClientRect() 
    let moedasNaTela = document.querySelectorAll('.moedapercorrendo');
    moedasNaTela.forEach(function(moedaAtual){
        let posmoeda = moedaAtual.getBoundingClientRect();
        
        if (
        pospersonagemM.left < posmoeda.right && pospersonagemM.right > posmoeda.left && pospersonagemM.top < posmoeda.bottom && pospersonagemM.bottom > posmoeda.top
    ){
            finalizarMoeda(moedaAtual);

            Moedas++;

            contadorMoedas.textContent = Moedas;
    }
    }) 
}
function verificarColisoes() {
    detectarColisaoObstaculo();
    detectarColisaoMoeda();
}
intervaloTempo = setInterval(contandoTempo, 1000)
function contandoTempo(){
    qtdtempojogo--;
    contadorTempo.textContent = qtdtempojogo;
    let pospersonagemM = personagem.getBoundingClientRect()
    let posobstaculoM = obstaculo.getBoundingClientRect();
    let posobstaculo2M = obstaculo2.getBoundingClientRect();
    if(qtdtempojogo == 30){
        obstaculos2()
    }
    if(qtdtempojogo <= 0){

        let posicaoObstaculoMY = posobstaculoM.top;
        let posicaoObstaculo2MY = posobstaculo2M.top;
        let posicaoObstaculoMX = posobstaculoM.left;
        let posicaoObstaculo2MX = posobstaculo2M.left;
        let posicaoPersonagemMY = pospersonagemM.top;
        let posicaoPersonagemMX = pospersonagemM.left;
        let moedasNaTela = document.querySelectorAll('.moedapercorrendo');

        jogoFinalizado = true;
        moedasNaTela.forEach(function(moedaAtual) {
            let posMoeda = moedaAtual.getBoundingClientRect();

            moedaAtual.style.animation = 'none';
            moedaAtual.style.top = posMoeda.top + 'px';
            moedaAtual.style.left = posMoeda.left + 'px';
        })

        gameover.style.visibility = 'visible';
        botaogameover.style.visibility = 'visible';
        botaoretornar.style.visibility = 'visible';

        personagem.style.bottom = 'auto';
        personagem.style.marginLeft = '0';
        personagem.style.transform = 'none';
        personagem.style.top = posicaoPersonagemMY + 'px'
        personagem.style.left = posicaoPersonagemMX + 'px'
        personagem.style.animation = 'none'

        obstaculo.style.top = posicaoObstaculoMY + 'px'
        obstaculo.style.left = posicaoObstaculoMX + 'px'
        obstaculo.style.animation = 'none';

        obstaculo2.style.top = posicaoObstaculo2MY + 'px'
        obstaculo2.style.left = posicaoObstaculo2MX + 'px'
        obstaculo2.style.animation = 'none';

        clearInterval(verificador);
        clearInterval(intervaloTempo);
        clearInterval(intervaloCaminhada);
        
    }
   
}
novoPulo();
iniciarAndamento();
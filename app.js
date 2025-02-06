let limiteNumero = 10;
let listaDeNumerosSorteados = [];
let numeroSecreto = geradorNumeroSecreto();
let tentativas = 1;

function mensagemInicial(Tag, Texto) {
    let titulo = document.querySelector(Tag);
    titulo.innerHTML = Texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(Texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 3; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagem() {
mensagemInicial("h1", "Jogo do Número Secreto");
mensagemInicial("p", "Escolha um número de 1 a 10");
}
exibirMensagem();

function verificarChute() {
    let chute = document.querySelector("input");
    if (chute.value == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        mensagemInicial("h1", "Você achou o número secreto!");
        mensagemInicial("p", `Parabéns, você achou o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById("reiniciar").removeAttribute("disabled")
        document.getElementsByName("chute").setAttribute("disabled", true)
    } else {if (chute.value > numeroSecreto){
            mensagemInicial("h1", "O número secreto é menor");
    } else {
        mensagemInicial("h1", "O número secreto é maior");
    }
     LimparCampo();
     tentativas++;
  } 
}

function geradorNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumero + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == limiteNumero) {
        listaDeNumerosSorteados = [];
    } 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return geradorNumeroSecreto();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
       return numeroEscolhido;
    }
}
console.log(numeroSecreto);
function LimparCampo() {
    let chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
LimparCampo();
exibirMensagem();
numeroSecreto = geradorNumeroSecreto();
document.getElementById("reiniciar").setAttribute("disabled", true)
tentativas = 1;
console.log(numeroSecreto)
}

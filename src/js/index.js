var cartoes = document.querySelectorAll(".cartao");

var existeCartaoVirado = false;
var primeiroCartao, segundoCartao;

var placar = 0;
var tempo = 5;
var tempos = document.getElementById("tempo");

var intervalo = setInterval(function() {
  if ( tempo == 0) {
    tempos.style.color = 'red';
    clearInterval(intervalo);
    cartoes.forEach(function (cartao) {
      cartao.addEventListener("click", virarCartao);
    });
    return;
  }
  tempo = tempo - 1;
  document.getElementById("tempo").innerHTML = tempo;
}, 1000);

function virarCartao() {
  this.classList.add("virado");

  if (existeCartaoVirado == false) {
    existeCartaoVirado = true;
    primeiroCartao = this;
  } else {
    segundoCartao = this;
    existeCartaoVirado = false;

    if (primeiroCartao.dataset.info === segundoCartao.dataset.info) {
      primeiroCartao.removeEventListener("click", virarCartao);
      segundoCartao.removeEventListener("click", virarCartao);
      placar = placar + 1;
      document.getElementById('resultado').innerHTML = placar;
    } else {
      setTimeout(function () {
        primeiroCartao.classList.remove("virado");
        segundoCartao.classList.remove("virado");
      }, 2000);
    }
  }
}

cartoes.forEach(function (cartao) {
  cartao.addEventListener("click", virarCartao);
});
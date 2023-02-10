var cartoes = document.querySelectorAll(".cartao");

var existeCartaoVirado = false;
var primeiroCartao, segundoCartao;

var resultadosJogadores = [];

var itensStorage = localStorage.getItem("resultado");

if (itensStorage) {
  var resultadosExistentes = JSON.parse(itensStorage);
} else {
  var resultadosExistentes = [];
}

console.log(resultadosJogadores);

var placar = 0;
var tempo = 60;
var tempos = document.getElementById("tempo");

var intervalo = setInterval(function() {
  if (tempo == 0 || placar == 6) {
    clearInterval(intervalo);
    if (placar == 6) {
      alert(
        "Parabéns! Você ganhou! O seu tempo foi de " + tempo + " segundos."
      );
    } else {
      alert("Tempo esgotado!");
    }
    var nome = "";
    while (nome.length < 3) {
      nome = prompt("Digite o seu nome:");
      if (nome.length < 3) {
        alert("O nome precisa ter mais de 2 caracteres");
      }
    }
    //Criar um objeto
    var resultado = {
      nomeJogador: nome,
      pontuacao: placar,
      tempo: tempo,
    };

    resultadosExistentes.push(resultado);
    localStorage.setItem("resultado", JSON.stringify(resultadosExistentes));

    document.getElementById("recordes").style.display = "block";

    var tabela = document.getElementById("resultados");

    ordenarDados();

    resultadosExistentes.sort().forEach(function (resultado) {
      var tr = document.createElement("tr");
      var tdNome = document.createElement("td");
      tdNome.innerHTML = resultado.nomeJogador;
      var tdPontuacao = document.createElement("td");
      tdPontuacao.innerHTML = resultado.pontuacao;
      var tdTempo = document.createElement("td");
      tdTempo.innerHTML = resultado.tempo;
      tr.appendChild(tdNome);
      tr.appendChild(tdPontuacao);
      tr.appendChild(tdTempo);
      tabela.appendChild(tr);
    });
    cartoes.forEach(function (cartao) {
      cartao.removeEventListener("click", virarCartao);
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
      cartoes.forEach(function (cartao) {
        cartao.removeEventListener("click", virarCartao);
      });
      setTimeout(function () {
        cartoes.forEach(function (cartao) {
          cartao.addEventListener("click", virarCartao);
        });
        primeiroCartao.classList.remove("virado");
        segundoCartao.classList.remove("virado");
      }, 2000);
    }
  }
}

cartoes.forEach(function (cartao) {
  var numero = Math.floor(Math.random() * 12);
  cartao.style.order = numero;
});

function ordenarDados() {
  var melhorTempo = resultadosExistentes[0].tempo;
  resultadosExistentes.forEach(function (resultado) {
    if (resultado.tempo < melhorTempo) {
      resultadosExistentes.push(melhorTempo);
    }
  });
}

function reiniciarPlacar() {
  console.log(resultadosExistentes.length);
  for (var i = 2; i < resultadosExistentes.length + 2; i++) {
    var resultado = document.querySelector(`#resultados > tr:nth-child(2)`);
    if (resultado) {
      document.querySelector("#resultados").removeChild(resultado);
    }
  }

  localStorage.clear();
  alert("Placar reiniciado!");
}

function reiniciarJogo() {
    location.reload();
}

cartoes.forEach(function (cartao) {
  cartao.addEventListener("click", virarCartao);
});
/*/////////////////////////////////////////////////////////////////////////+

Trabalho Interdisciplinar 1 - Aplicações Web

Autor: Grupo Aklas
Data: 16/11/2023

/+////////////////////////////////////////////////////////////////////////*/

// URL da API JSONServer
const apiUrl = 'https://servidor--aklas.repl.co/'; 

////////////////////////////////////////////////////////////////////////////
// Funcoes nucleares

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

////////////////////////////////////////////////////////////////

function readInformacao(nome, processaDados) {
  const apipi = 'https://servidor--aklas.repl.co/'; 
    fetch(apipi + nome)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler contatos via API JSONServer:', error);
            displayMessage("Erro ao ler contatos");
        });
}

////////////////////////////////////////////////////////////////

function createInformacao(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Informacao inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir contato via API JSONServer:', error);
            displayMessage("Erro ao inserir contato");
        });
}

////////////////////////////////////////////////////////////////

function updateInformacao(id, contato, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Informacao alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar contato via API JSONServer:', error);
            displayMessage("Erro ao atualizar contato");
        });
}

////////////////////////////////////////////////////////////////

function deleteInformacao(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Informacao removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover contato via API JSONServer:', error);
            displayMessage("Erro ao remover contato");
        });
}

// Fim das funcoes nucleares
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////

function c(info1, nome1, info2, nome2, fancao)
{

  console.log("Na função " + fancao + " o valor de " + nome1 + " é " + info1 + " e o valor de " + nome2 + " é " + info2);

}

function pedir_algo(oque) {
    let nome;

    do {
        nome = prompt("Insira " + oque);

        if (!nome) {
            alert("O (A) " + oque + " é inválido(a)!");
        }
    } while (!nome);

    return nome;
}



function ir_para(arquivo)
  {

    window.location.href = arquivo + ".html";

  }

function testar_ponto(ponto) {
 // window.alert("ponto eh " + ponto);
    return new Promise((resolve, reject) => {
        readInformacao("pontos", dados => {
            let resposta = 999;

            for (let i = 0; i < dados.length; i++) {
                let info = dados[i];
                let point = info.ponto;

                if (ponto.toLowerCase() == point.toLowerCase()) {
                    resposta = i;
                  //window.alert("Alfatico " + resposta); nao ha erros aqui

                  c(resposta, "resposta", i, "i", "testar_ponto");
                  resolve(resposta);
                }
            }

        //  window.alert("Alfatico " + resposta);
          c(resposta, "resposta", ponto, "ponto", "testar_ponto");
          resolve(resposta);

        });
    });
}

function linhas_de_onibus(local, destino) {
    return new Promise((resolve, reject) => {
        testar_ponto(local)
            .then(location => {
                console.log("Resposta local:", location);

                testar_ponto(destino)
                    .then(destiny => {
                        console.log("Resposta destino:", destiny);

                        //window.alert(location + " & a " + destiny);

                      testar_linha(location)
                      .then(pontual => {


                      testar_linha(destiny)
             .then(destinal => {


               //window.alert(pontual + " & b " + destinal);

               c(pontual, "pontual", destinal, "destinal", "linhas_de_onibus");
               if (pontual === destinal) {
                   resolve(pontual);
               } else {
                   resolve(null);
               }

                                })

                      })

                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
}


function testar_linha(location, alreadyone) {
    return new Promise((resolve, reject) => {
        var resposta = 0;
        readInformacao("onibus", dados => {
            for (let i = 0; i < dados.length; i++) {
                let onibusAtual = dados[i];

              c(onibusAtual.num, "onibusAtual.local", location, "location", "testar_linha");
                if (onibusAtual.rota) {
                    for (let j = 0; j < onibusAtual.rota.length; j++) {
                        let rotaAtual = onibusAtual.rota[j];

                      //console.log(location + " [location] & (testar_linha) [rotaAtual.id] " + rotaAtual.id);
                        // Comparando o valor de "tempo" com a variável local
                        c(rotaAtual.id, "rotaAtual.id", location, "location", "testar_linha");
                        if (rotaAtual.id === location) {
                            //console.log(`Correspondência encontrada na linha ${onibusAtual.num}!`);
                            // Faça algo com a correspondência, se necessário
                            // Por exemplo, definir a resposta como verdadeira
                            resposta = onibusAtual.num;
                            resolve(resposta);
                            return;  // Saia do loop assim que encontrar uma correspondência
                        }
                    }
                }
            }
            // Se nenhum resultado for encontrado, resolva a Promise com 0
            resolve(resposta);
        });
    });
}

////////////////////////////////////////////////////////////////

// funcoes para tts

function textToSpeech(text) {
  if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;

    // Limpa as utterances antigas
    synthesis.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  } else {
    console.error('Desculpe, seu navegador não suporta a API de fala.');
  }
}
function stt(extra, output, input, ondeS) {
    document.addEventListener('DOMContentLoaded', () => {
        const containerDeSaida = document.getElementById(output);
        const botaoIniciar = document.getElementById(input);

        //console.log(`Função stt chamada para: ${extra}, ${output}, ${input}`);

        const reconhecimentoDeFala = new webkitSpeechRecognition() || SpeechRecognition();
        reconhecimentoDeFala.lang = 'pt-BR'; // Defina o idioma de reconhecimento

        reconhecimentoDeFala.onresult = (evento) => {
            const transcricao = evento.results[0][0].transcript;
            //console.log(`Resultado do reconhecimento de fala para ${output}: ${transcricao}`);

            localStorage.setItem(ondeS, transcricao);
            containerDeSaida.innerHTML = extra + `${transcricao}`;
            centraliza();
        };

        botaoIniciar.addEventListener('mousedown', () => {
            //console.log(`Botão Iniciar pressionado para ${output}`);
            reconhecimentoDeFala.start();
        });
    });
}
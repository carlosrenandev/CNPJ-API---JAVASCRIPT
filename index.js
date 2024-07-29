const inputCnpj = document.getElementById('cnpj');
const Loading = document.getElementById('loading');

async function buscarDados() {
  Loading.classList.remove('hidden');

  try {
    const response = await fetch('https://publica.cnpj.ws/cnpj/' + inputCnpj.value);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      alert("Ocorreu um erro, tente novamente!");
    }

    const dados = await response.json();

    // Atualiza o DOM com os dados obtidos
    document.getElementById('razao_social').innerHTML = dados.razao_social;
    document.getElementById('nome_fantasia').innerHTML = dados.estabelecimento.nome_fantasia;
    document.getElementById('ins_estadual').innerHTML = dados.estabelecimento.inscricoes_estaduais[0].inscricao_estadual;
    document.getElementById('cep').innerHTML = dados.estabelecimento.cep;
    document.getElementById('rua').innerHTML = dados.estabelecimento.logradouro + ', NÚMERO ' + dados.estabelecimento.numero;
    document.getElementById('bairro').innerHTML = dados.estabelecimento.bairro;
    document.getElementById('cidade').innerHTML = dados.estabelecimento.cidade.nome;
    document.getElementById('telefone').innerHTML = `(${dados.estabelecimento.ddd1}) ` + dados.estabelecimento.telefone1;
    document.getElementById('email').innerHTML = dados.estabelecimento.email;

    // Remove a classe 'hidden' para mostrar o resultado
    document.getElementById('resultado').classList.remove('hidden');

  } catch {
    alert('CNPJ não encontrado, tente novamente!');
  } finally {
    Loading.classList.add('hidden');
  }
}

function buscarInfo() {
  if (inputCnpj.value !== "") {
    buscarDados(inputCnpj);
  } else {
    alert("Por favor, preencha o campo!");
  }
}
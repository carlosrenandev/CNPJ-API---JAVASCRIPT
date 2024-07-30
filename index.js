const inputCnpj = document.getElementById('cnpj');
const Loading = document.getElementById('loading');

async function buscarInfo() {
  const cnpjLimpo = inputCnpj.value.replace(/[.\-\/]/g, '');

  if (cnpjLimpo === "") {
    document.getElementById('resultado').classList.add('hidden');
    alert("Por favor, preencha o campo!");
    return;
  }

  Loading.classList.remove('hidden');

  try {
    const response = await fetch('https://publica.cnpj.ws/cnpj/' + cnpjLimpo);
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
    document.getElementById('resultado').classList.add('hidden');
  } finally {
    Loading.classList.add('hidden');
  }
}
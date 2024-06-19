const inputCnpj = document.getElementById('cnpj')

function buscarInfo() {

  if (inputCnpj.value.length !== 0) {
    fetch('https://publica.cnpj.ws/cnpj/' + inputCnpj.value)
      .then(response => response.json())
      .then(data => {
        document.getElementById('razao_social').innerHTML = data.razao_social
        document.getElementById('nome_fantasia').innerHTML = data.estabelecimento.nome_fantasia
        document.getElementById('ins_estadual').innerHTML = data.estabelecimento.inscricoes_estaduais[0].inscricao_estadual
        document.getElementById('cep').innerHTML = data.estabelecimento.cep
        document.getElementById('rua').innerHTML = data.estabelecimento.logradouro + ', ' + 'NÚMERO ' + data.estabelecimento.numero
        document.getElementById('bairro').innerHTML = data.estabelecimento.bairro
        document.getElementById('cidade').innerHTML = data.estabelecimento.cidade.nome
        document.getElementById('telefone').innerHTML = `(${data.estabelecimento.ddd1}) ` + data.estabelecimento.telefone1
        document.getElementById('email').innerHTML = data.estabelecimento.email
        document.getElementById('resultado').classList.remove('hidden');
      })
      .catch(error => {
        alert('CNPJ não encontrado, tente novamente!\n' + error);
      })
  } else {
    alert('O campo precisa ser preenchido!')
    document.getElementById('resultado').classList.add('hidden');
    return;
  }
}
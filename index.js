const logDiv = document.getElementById('log');
const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);

var contador = document.getElementById('contadorCaracteres');
contador.textContent = '0/120';

document.addEventListener("DOMContentLoaded", recuperarDadosFormulario);

function logSubmit(event) {
    event.preventDefault();
    const logDiv = document.getElementById('log');
    const nome = document.getElementById('name').value
    const data = document.getElementById('data_nascimento').value
    var spanNome = document.getElementById('msgNome');
    logDiv.innerHTML = '';

    if (nome.trim() !== '' && data.trim() !== '') {
        if (nome.length < 3 || nome.length > 120) {
            spanNome.innerHTML = 'O nome deve ter entre 3 e 120 caracteres';
            setInterval(() => {
                spanNome.innerHTML = '';
            }, 3000);
        } else {
            salvarDadosFormulario(nome, data);
        }
    } else {
        logDiv.innerHTML = '<span class ="text-danger">Revise os dados digitados</span>'
    }
}

function formatarData(data) {
    var partes = data.split('-');
    var ano = partes[0];
    var mes = partes[1];
    var dia = partes[2];

    return dia + '/' + mes + '/' + ano;
}

document.getElementById('name').addEventListener('input', function () {
    var contador = document.getElementById('contadorCaracteres');
    var nomeInput = document.getElementById('name');
    var nome = nomeInput.value;

    contador.textContent = nome.length + '/120';
});

function salvarDadosFormulario(nome, data) {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    pessoas.push({ nome: nome, data: data });
    localStorage.setItem('pessoas', JSON.stringify(pessoas));

    adicionaPessoaTabela(pessoas);

}

function adicionaPessoaTabela(pessoas) {
    const logDiv = document.getElementById('log');
    var html = `<table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Data Nascimento</th>
      </tr>
    </thead>
    <tbody>`;
    i=0;
    pessoas.forEach(function (item) {
        var dataFormatada = formatarData(item.data);
        html += `<tr>
        <th scope="row">${i}</th>
        <td>${item.nome}</td>
        <td>${item.data}</td>
      </tr>`;
      i +=1;
    });
    html += '</table>';

    logDiv.innerHTML = html;
    document.getElementById('name').value = '';
    document.getElementById('data_nascimento').value = '';
    contador.textContent = '0/120';
}

function recuperarDadosFormulario() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    adicionaPessoaTabela(pessoas);
}



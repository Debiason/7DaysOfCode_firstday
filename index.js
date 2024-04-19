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
    const id = document.getElementById('id').value
    var spanNome = document.getElementById('msgNome');
    logDiv.innerHTML = '';

    if (nome.trim() !== '' && data.trim() !== '') {
        if (nome.length < 3 || nome.length > 120) {
            spanNome.innerHTML = 'O nome deve ter entre 3 e 120 caracteres';
            setInterval(() => {
                spanNome.innerHTML = '';
            }, 3000);
        } else {
            salvarDadosFormulario(nome, data, id);
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

function salvarDadosFormulario(nome, data, id) {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    if(id == ''){
        pessoas.push({ nome: nome, data: data });
    }else{
        pessoas[id].nome = nome;
        pessoas[id].data = data; 
    }
    
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
        <th scope="col">Ação</th>
      </tr>
    </thead>
    <tbody>`;
    var i=0;
    pessoas.forEach(function (item) {
        var dataFormatada = formatarData(item.data);
        html += `<tr>
        <th scope="row">${i}</th>
        <td>${item.nome}</td>
        <td>${dataFormatada}</td>
        <td><button id="edit_${i}" type="button" class="btn btn-primary btn-sm" 
                style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .4rem; 
                --bs-btn-font-size: .6rem;"><i class="fas fa-pencil"></i>
            </button>
            <button id="del_${i}" type="button" class="btn btn-danger btn-sm" 
                style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .4rem; 
                --bs-btn-font-size: .6rem;"><i class="fas fa-trash-alt"></i>
            </button>
        </td>
      </tr>`;
      i +=1;
    });
    html += '</table>';

    logDiv.innerHTML = html;
    document.getElementById('name').value = '';
    document.getElementById('data_nascimento').value = '';
    document.getElementById('id').value = '';
    contador.textContent = '0/120';

    pessoas.forEach(function (item, index) {
        document.getElementById(`edit_${index}`).addEventListener('click', function () {
            document.getElementById('name').value = item.nome;
            document.getElementById('data_nascimento').value = item.data;
            document.getElementById('id').value = index;
        });
    });

    pessoas.forEach(function (item, index) {
        document.getElementById(`del_${index}`).addEventListener('click', function () {
            const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
            pessoas.splice(index, 1);
            localStorage.setItem('pessoas', JSON.stringify(pessoas));
            adicionaPessoaTabela(pessoas);
        });
    });
}

function recuperarDadosFormulario() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    if (pessoas != []) {
        adicionaPessoaTabela(pessoas);    
    }
}

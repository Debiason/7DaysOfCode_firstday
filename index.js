const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);

var contador = document.getElementById('contadorCaracteres');
contador.textContent = '0/120';

function logSubmit(event) {
    event.preventDefault();
    const nome = document.getElementById('name').value
    const data = document.getElementById('data_nascimento').value
    var lista = [];
    var logDiv = document.getElementById('log');
    var spanNome = document.getElementById('msgNome');
    logDiv.innerHTML = '';

    if (nome.trim() !== '' && data.trim() !== '') {
        if (nome.length < 3 || nome.length > 120) {
            spanNome.innerHTML = 'O nome deve ter entre 3 e 120 caracteres';
            setInterval(() => {
                spanNome.innerHTML = '';
            }, 3000);
        } else {
    
            lista.push({ nome: nome, data: data });
            var html = '<ul>';
            lista.forEach(function (item) {
                var dataFormatada = formatarData(item.data);
                html += '<li>Nome: ' + item.nome + '</li>';
                html += '<li>Data: ' + dataFormatada + '</li>';
                console.log(item.nome);
                console.log(dataFormatada);
            });
            
            html += '</ul>';
            
            logDiv.innerHTML = html;
            document.getElementById('name').value = '';
            document.getElementById('data_nascimento').value = '';
            contador.textContent = '0/120';
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

document.getElementById('name').addEventListener('input', function() {
    var contador = document.getElementById('contadorCaracteres');
    var nomeInput = document.getElementById('name');
    var nome = nomeInput.value;

    contador.textContent = nome.length + '/120';
});



const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);

function logSubmit(event) {
    event.preventDefault();
    const nome = document.getElementById('name').value
    const data = document.getElementById('data_nascimento').value
    var lista = [];
    var logDiv = document.getElementById('log');
    logDiv.innerHTML = '';

    if (nome.trim() !== '' && data.trim() !== '') {
        lista.push({ nome: nome, data: data });
        var html = '<ul>';
        lista.forEach(function (item) {
            var dataFormatada = formatarData(item.data);
            html += '<li>Nome: ' + item.nome + '</li>';
            html += '<li>Data: ' + dataFormatada + '</li>';
        });

        html += '</ul>';


        console.log(item.nome);
        console.log(dataFormatada);

        logDiv.innerHTML = html;
        document.getElementById('name').value = '';
        document.getElementById('data_nascimento').value = '';
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


document.querySelector("#formulario").addEventListener("submit", cadastrarVeiculo);//adicionando o evento submit ao <form>, 
//para quando houver um evento submit, a função tal será chamada.

function cadastrarVeiculo(e){
    var modeloCarro = document.querySelector("#modeloCarro").value;
    var placaCarro = document.querySelector("#placaCarro").value;
    var time = new Date();

    var carro={
        modelo: modeloCarro,
        placa: placaCarro,
        horas: time.getHours(),
        minutos: time.getMinutes()
    }
    
    //inserindo no localStorage
    if (localStorage.getItem("patio") == null) {
        var carros = [];//aqui será armazenado a lista de carro.
        carros.push(carro);//insere um novo carro no array.
        localStorage.setItem("patio",JSON.stringify(carros));//é preciso converter objeto para string.
    } else {
        var carros = JSON.parse(localStorage.getItem("patio"));//aqui pega todos carros ja cadastrado
        //com a chave 'patio', mas é preciso converter do string para objeto para inserir um
        //novo carro abaixo.
        carros.push(carro);//insere um novo carro no array.
        localStorage.setItem("patio", JSON.stringify(carros));
    }

    document.querySelector("#formulario").reset();//reseta(limpa) os campos.
    
    mostrarPatio();
    //console.log(carro);
    e.preventDefault();//congela a informação antes de enviar, um teste somente para visualizar.
}

function excluir(placa){  
    var carros = JSON.parse(localStorage.getItem("patio"));
   
for (var i = 0; i < carros.length; i++) {    
    if (carros[i].placa == placa) {
        carros.splice(i,1);
    } 
    localStorage.setItem("patio",JSON.stringify(carros));
}

mostrarPatio()
}

function mostrarPatio(){
    var carros = JSON.parse(localStorage.getItem("patio"));
    var resultados = document.querySelector("#resultados");//seleciona o tbody do table, para inserir a lista com o for.
    
    resultados.innerHTML="";//esvazia a tabela, para ser preenchida novamente abaixo.

    for (var i = 0; i < carros.length; i++) {
        
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var horas = carros[i].horas;
        var minutos = carros[i].minutos;
    
        resultados.innerHTML += "<tr><td>"+modelo+
        "</td><td>"+placa+
        "</td><td>"+horas+":"+minutos+
        "</td><td><button class='btn btn-danger' onclick='excluir(\""+placa+"\")'>Excluir</button></td>"+
        "</tr>";
        
    }
}


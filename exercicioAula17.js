let pessoas = [{
    nome: 'Nome da Pessoa',
    idade: 30,
}];

let enderecos = [{
    cidade: 'Fortaleza',
    estado: 'CE',
    cep:'60150160'
}];

// let [{nome, idade}] = pessoas;
// let {cidade, estado, cep} = enderecos[0];

// let newArray = [nome, idade, ...enderecos]

// let returnArraWithMap = newArray.map((item) => {
//     return item;
// });

let returnArraWithMap = pessoas.map(({nome, idade},item) => {
    let {cidade, estado, cep} = enderecos[item];
    return [nome, idade, {cidade, estado, cep}];
}); 
console.log(returnArraWithMap);



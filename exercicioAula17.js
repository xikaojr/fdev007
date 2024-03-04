let pessoas = [{
    nome: 'Nome da Pessoa',
    idade: 30,
}];

let enderecos = [{
    cidade: 'Fortaleza',
    estado: 'CE',
    cep:'60150160'
}];


let returnArraWithMap = pessoas.map((pessoas, index) => ({
     ...pessoas, endereco: {...enderecos[index]}
}));

console.log(returnArraWithMap);



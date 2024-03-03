let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve] = numeros;
 console.log(uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve);
 console.log(numeros);

 let pessoas = ['pessoa1', 'pessoa2', 'pessoa3', 'pessoa4', 'pessoa5'];

 let [Pessoa1, Pessoa2, Pessoa3, Pessoa4, Pessoa5] = pessoas;
 console.log(Pessoa1, Pessoa2, Pessoa3, Pessoa4, Pessoa5);
 console.log(pessoas);

 let objeto = {
        nome: 'Carlos',
        idade: 32,
        cidade: 'São Paulo'
    };
 
    let {nome, ...props} = objeto;

    console.log(nome, props);
    console.log(objeto);

    function soma({a, b, c}){
        return a + b + c;
    }
    let {a, b, c} = {a: 10, b: 20, c: 30};
    console.log(soma({a, b, c})); 
    console.log(a, b, c);
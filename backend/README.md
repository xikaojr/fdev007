# Iniciando o projeto com o NPM
### Crie uma nova pasta e navegue até ela:
```bash
mkdir typescript-iniciantes
cd typescript-iniciantes
```

### Inicie o projeto com Npm:
```javascript
npm init -y
```
## Após esses passos, um arquivo package.json vai aparecer na raiz do projeto com um conteúdo parecido com esse:

```json
{
  "name": "typescript-iniciantes",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

## Agora, vamos adicionar o TypeScript.
- Antes de adicionarmos o pacote, temos que ter em mente que o TypeScript é uma ferramenta de desenvolvimento. Em produção, o TypeScript é compilado diretamente para JavaScript.

Portanto, iremos adicionar o TypeScript como um pacote de desenvolvimento:

```bash
npm install -D typescript
```
## Após isso, temos que criar um arquivo chamado tsconfig.json, usando o comando:

```bash
tsc --init
```

# Criando os scripts build, start e dev 

Até agora apenas adicionamos o TypeScript, porém ainda é necessário criar três scripts importantes para qualquer projeto nessa linguagem.
Esses scripts vão estar localizados no package.json:

```json
{
  "name": "typescript-iniciantes",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  },
  "devDependencies": {
    "typescript": "^3.9.7"
  }
}
```
### Para executá-los, basta escrever yarn <script> ou npm run <script>, se você estiver usando NPM.

# O script dev 
## Esse script vai servir para que, quando estivermos no ambiente de desenvolvimento, não precisemos compilar o código toda vez que fizermos alguma alteração. Para isso, vamos usar um pacote chamado ts-node-dev:

```bash
npm install -D ts-node-dev
```
### E após isso, basta adicionar o script com a flag --ignore-watch node_modules para que ele ignore a pasta node_modules:

```json
"scripts": {
  "build": "tsc",
  "start": "node build/index.js",
  "dev": "ts-node-dev --ignore-watch node_modules src/index.ts"
},
```
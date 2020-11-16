# Back-End Projeto CRUD Funcionários Allugator

>Crie, liste, atualize e exclua funcionários de sua base de dados

[![Author](https://img.shields.io/badge/author-EdersonDav-000000?style=flat-square)](https://github.com/EdersonDav)

# 📌 Índice

- [Recursos](#-recursos)
- [Instalação](#-instalação)
- [Começando](#-começando)
- [Estrutura](#-estrutura)
- [Testes](#-testes)
- [Tecnologias Usadas](#-tecnologias-usadas)
- [Créditos](#-créditos)

# 🚀 Recursos

- Leitura e atualização de txt que contém a base de dados.
- Retorna funcionários por Nome.
- Retorna funcionários por CPF.
- Retorna funcionários por Cargo.
- Retorna funcionários por Data de Cadastros.
- Retorna quantidade de funcionários agrupados por UF de Nascimento.
- Retorna funcionários por faixa salarial.
- Retorna funcionários por status.
- Criar ou atualizar funcionários, caso já exista.
- Excluir funcionário pelo número do CPF.

# 👷🏿 Instalação

**Você precisa instalar o [Node.js](https://nodejs.org/en/download/) e o [Yarn](https://yarnpkg.com/) primeiramente.**

**Para clonar o projeto via HTTPS, execute este comando:**

`git clone https://github.com/EdersonDav/Allugator-BackEnd.git`

**Ou SSH com o comando:**

`git clone git@github.com:EdersonDav/Allugator-BackEnd.git`

### Instalação de dependências

**No terminal, dentro da pasta raiz do projeto, execute o comando**

`yarn`

# 🏃🏿 Começando

### Iniciar servidor

**Por padrão o servidor vai iniciar na porta 5000, para modificar basta editar a porta no arquivo index.js**

~~~javascript
app.listen(Trocar para a porta desejada, () => {
  console.log("server running");
})
~~~

**Após as dependências serem instaladas execute o seguinte comando para o servidor iniciar:**

`yarn server`

**Para acessar a documentação das rotas no Swagger acesse:**

`http://localhost:5000/swagger/`

# 🏗️ Estrutura

### Inicialização

A inicialização do projeto parte do arquivo _**index.js**_, localizado na raiz do projeto, que importa o arquivo de rotas.

### Rotas

O arquivo de rotas está localizado em _**src/routes/index.js**_, a responsabilidade do código deste arquivo é de receber as requisições, chamar os métodos de _**EmployeesRepository.js**_ e devolver na response o retorno dos métodos.

## Repository

O arquivo _**EmployeesRepository.js**_ está localizado em _**src/repositories/EmployeesRepository.js**_, este arquivo contém um objeto com várias funções, cada uma tem a responsabilidade de receber ou não por parâmetro uma informação, fazer a validação das informações recebidas, invocando o método `dataValidation` do arquivo _**validations.js**_ localizado na mesma pasta que tem apenas a funcionalidade de validar os dados e executar um erro se necessário, e retornar as informações de acordo com a sua função.
As informações devolvidas vem do arquivo de serviço _**CreateEmployeesService.js**_

## Services

Em _**src/services**_ existem 2 arquivos de serviços, que são os _**CreateEmployeesService.js**_ e _**CreateNewDataBaseService.js**_.

**CreateEmployeesService.js** : Tem a responsabilidade de ler a base de dados .txt e retornar um array de objetos com as suas informações. Ele é chamado no inicio do arquivo _**EmployeesRepository.js**_ ou dentro dos métodos de criação ou atualização, ou no método que deleta o funcionário, assim resetando os dados.

**CreateNewDataBaseService.js** : Quando é criado um novo funcionário excluido ou atualizado, esse serviço é chamado enviando como parâmetro um array com os dados atualizados. Ao receber os dados, ele cria um novo arquivo .txt com o mesmo nome do antigo, assim substituindo o mesmo.

# 🧪 Testes

**Os testes foram feitos utilizando o [Jest](https://jestjs.io/)**

> Os arquivos de testes estão nomeados com a extensão .espec.js.

**Para rodar os testes, na pasta raiz do projetos execute o comando:**

`yarn test`

Inicialmente os teste estão validando as funcionalidades do arquivo _**EmployeesRepository.js**_.
Existe testes criados para os arquivos _**CreateEmployeesService.js**_ e _**CreateNewDataBaseService.js**_. Eles não estão sendo executados pois no teste está utilizando `setTimeout` do javascript para aguardar a leitura e atualização do txt, mas os mesmos estão interferindo na performance dos testes.

**Para rodar todos os teste, incluindo os do txt, na pasta raiz do projeto no arquivo `jest.config.js` substitua o código:**

~~~
testMatch: [
    "**/repositories/*.spec.js"
  ],
~~~

**Por:**

~~~
testMatch: [
    "**/*.spec.js"
  ],
~~~


# 👨🏿‍💻 Tecnologias Usadas
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [NodeJs](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)
* [Swagger](https://swagger.io/)

# ☕ Créditos

## <i>Ederson Davi</i>

[Github](https://github.com/EdersonDav) 👨🏿‍🎓🚀

[LinkedIn](https://www.linkedin.com/in/silvaedersonqueiroz) 👨🏿‍👔

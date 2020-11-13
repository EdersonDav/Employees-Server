const readline = require('readline');
const fs = require('fs');
const path = require('path');

const createEmployeesService = ( isTest = false) => {
  const employees = []

  let pathTXT = isTest ? path.resolve(__dirname, '..', 'database', 'fakes', 'txtTest.txt' ) :
   path.resolve(__dirname, '..', 'database','Base de dados - Funcionários.txt')

  console.log(pathTXT);

  const rl = readline.createInterface({
    input : fs.createReadStream(pathTXT)
  })

  rl.on('line',(line) => {
    if(!line) return;
    const dados = line.split(';')

    employees.push({
      dataCadastro:dados[0],
      cargo:dados[1],
      cpf:dados[2],
      nome:dados[3],
      ufNascimento:dados[4],
      salario:dados[5],
      status:dados[6]
    })
  })

  rl.on('close', () =>{
    delete employees[0]
  })

  return employees
}

module.exports =  createEmployeesService;

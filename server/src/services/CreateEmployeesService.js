import readline from 'readline';
import fs from 'fs';
import path from 'path';

const createEmployeesService = () => {
  const employees = []

  const rl = readline.createInterface({
    input : fs.createReadStream(path.resolve(__dirname, '..', 'database','Base de dados - Funcionários.txt'))
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
    for(let i = 0; i < employees.length; i++){
      if(employees[i + 1]){
        employees[i] = employees[i + 1]
      }
    }
  })

  return employees
}

export default createEmployeesService;

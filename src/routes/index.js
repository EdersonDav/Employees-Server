const express = require('express');

const employeesMethods = require('../repositories/EmployeesRepository');

const routes = express.Router();

routes.get('/search/:key', (require, response) => {
  const keyAndValue = require.params.key
  const [key, value] = keyAndValue.split("-")
  const searchEmployee = employeesMethods.search(key, value );

  if(searchEmployee.message == 'Campo inválido'){
    response.status(400).json(searchEmployee)
  }
  if(searchEmployee.length == 0){
    response.status(404).json({message: "Funcionário não encontrado"})
  }

  response.json(searchEmployee)
})

routes.get('/byState', (require, response) => {
  const byState = employeesMethods.countByState();
  response.json(byState)
})

routes.get('/salary/:range', (require, response) => {
  const range = require.params.range
  const [min, max] = range.split("-")
  const bySalaryRange = employeesMethods.salaryRange(min, max);

  if(bySalaryRange.message == 'Salario inválido' ||  bySalaryRange.message == 'O valor minímo não pode ser maior que o máximo'){
    response.status(400).json(bySalaryRange)
  }
  response.json(bySalaryRange)
})

routes.get('/', (require, response) => {
  const allEmployees = employeesMethods.getAll();
  const employees = allEmployees.filter(emp => emp != null)
  response.json(employees)
})

routes.delete('/:cpf', (require, response) => {
  const {cpf} = require.params
  const newEmployees = employeesMethods.deleteEmployee(cpf)

  if(newEmployees.message == 'CPF inválido' ||  newEmployees.message == 'CPF não encontrado'){
    response.status(400).json(newEmployees)
  }
  response.status(200).json(newEmployees)
})

routes.post('/', (require, response) => {
  const {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status} = require.body

  const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

  const newEmployees = employeesMethods.createOrUpdate(employeeCreate)

  if(newEmployees.message != "Funcionário atualizado com sucesso" || newEmployees.message != "Funcionário criado com sucesso"){
    response.status(400).json(newEmployees)
  }
  response.status(200).json(newEmployees)

})

module.exports = routes;

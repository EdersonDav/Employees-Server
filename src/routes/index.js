const express = require('express');

const employeesMethods = require('../repositories/EmployeesRepository');

const routes = express.Router();

routes.get('/search/:key', (require, response) => {
  const keyAndValue = require.params.key
  const [key, value] = keyAndValue.split("-")
  const searchEmployee = employeesMethods.search(key, value );

  if(searchEmployee.message == 'Invalid Key'){
    response.status(400).json(searchEmployee)
  }
  if(searchEmployee.length == 0){
    response.status(404).json({message: "Employees not fount"})
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

  if(bySalaryRange.message == 'Invalid Salary' ||  bySalaryRange.message == 'Minimum value cannot be greater than maximum value'){
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

  if(newEmployees.message == 'Invalid CPF' ||  newEmployees.message == 'CPF not found'){
    response.status(400).json(newEmployees)
  }
  response.status(200).json(newEmployees)
})

routes.post('/', (require, response) => {
  const {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status} = require.body

  const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

  const newEmployees = employeesMethods.createOrUpdate(employeeCreate)

  if(newEmployees.message != "Updated employee"||  newEmployees.message != "Employee created"){
    response.status(400).json(newEmployees)
  }
  response.status(200).json(newEmployees)

})

module.exports = routes;

const express = require('express');
const employeesMethods = require('../repositories/EmployeesRepository');

const routes = express.Router();

routes.get('/search', (require, response) => {
  const {key, value} = require.body
  const searchEmployee = employeesMethods.search(key, value );
  response.json(searchEmployee)
})

routes.get('/byState', (require, response) => {
  const byState = employeesMethods.countByState();
  response.json(byState)
})

routes.get('/salary', (require, response) => {
  const {min, max} = require.body
  const bySalaryRange = employeesMethods.salaryRange(min, max);
  response.json(bySalaryRange)
})

routes.get('/', (require, response) => {
  const allEmployees = employeesMethods.getAll();
  response.json(allEmployees)
})

routes.delete('/:cpf', (require, response) => {
  const {cpf} = require.params
  const newEmployees = employeesMethods.deleteEmployee(cpf)
  response.json(newEmployees)
})

routes.post('/', (require, response) => {
  const {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status} = require.body

  const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

  const newEmployees = employeesMethods.createOrUpdate(employeeCreate)
  response.json(newEmployees)
})

module.exports = routes;

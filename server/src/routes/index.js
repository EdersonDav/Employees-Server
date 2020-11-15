const express = require('express');

const employeesMethods = require('../repositories/EmployeesRepository');

const routes = express.Router();

routes.get('/search/:key', (require, response) => {
  const keyAndValue = require.params.key
  const [key, value] = keyAndValue.split("-")
  const searchEmployee = employeesMethods.search(key, value );
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
  response.json(newEmployees)
})

routes.post('/', (require, response) => {
  const {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status} = require.body

  const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

  const newEmployees = employeesMethods.createOrUpdate(employeeCreate)
  response.json(newEmployees)
})

module.exports = routes;

const express = require('express');

const employeesMethods = require('../repositories/EmployeesRepository');

const routes = express.Router();

routes.get('/search/:key', (require, response) => {
  try{
    const keyAndValue = require.params.key
    let [key, value] = keyAndValue.split("-")
    if(key == "dataCadastro"){
      const valueDate = value.split(".")
      value = `${valueDate[0]}/${valueDate[1]}/${valueDate[2]}`
    }
    const searchEmployee = employeesMethods.search(key, value );

    response.status(200).json(searchEmployee)
  }catch(err){
    response.status(400).json(err)
  }
})

routes.get('/byState', (require, response) => {
  const byState = employeesMethods.countByState();
  response.json(byState)
})

routes.get('/salary/:range', (require, response) => {
  try{
    const range = require.params.range
    const [min, max] = range.split("-")
    const bySalaryRange = employeesMethods.salaryRange(min, max);

    response.json(bySalaryRange)
  }catch(err){
    response.status(400).json(err)
  }
})

routes.get('/', (require, response) => {
  const allEmployees = employeesMethods.getAll();
  const employees = allEmployees.filter(emp => emp != null)
  response.json(employees)
})

routes.delete('/:cpf', (require, response) => {
  try{
    const {cpf} = require.params
    const newEmployees = employeesMethods.deleteEmployee(cpf)

  response.status(200).json(newEmployees)
  }catch(err){
    response.status(400).json(err)
  }

})

routes.post('/', (require, response) => {
  try{
    const {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status} = require.body

    const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

    const newEmployees = employeesMethods.createOrUpdate(employeeCreate)
    response.status(200).json(newEmployees)
  }catch(err){
    response.status(400).json(err)
  }

})

module.exports = routes;

const createEmployeesService = require('../services/CreateEmployeesService');
const createNewDataBaseService = require('../services/CreateNewDataBaseService');
const dataValidations = require('./validations');

//Criando a lista de funcionarios
let employees = createEmployeesService();
let employeesTest = [{
  "dataCadastro": "15/04/2017",
  "cargo": "Dev Jr",
  "cpf": "85235708709",
  "nome": "Pedro",
  "ufNascimento": "AP",
  "salario": "8965.30",
  "status": "ATIVO"
},
{
  "dataCadastro": "19/04/2017",
  "cargo": "AC Sr",
  "cpf": "59984408701",
  "nome": "Maria",
  "ufNascimento": "RO",
  "salario": "5312.70",
  "status": "BLOQUEADO"
},
{
  "dataCadastro": "03/04/2017",
  "cargo": "Analista Sr",
  "cpf": "51704568080",
  "nome": "Jose",
  "ufNascimento": "RJ",
  "salario": "5448.60",
  "status": "ATIVO"
}];

const employeesMethods = {
  getAll: () =>{
    //Retornando a lista completa de funcionarios
    return employeesTest
  },

  search: (key, value, isTest = false) =>{
    try{
      let employeesInFunction =  isTest ? employeesTest : employees
      dataValidations("Key", key, employeesInFunction)

      const employee = employeesInFunction.filter(emp => {
        //Fazendo um filtro se a chave do objeto for igual a key e o valor dessa chave for igual a value,
        //retornar o funcionario
        if(emp[key] == value){
          return emp;
        }
      })
      return  employee;

    }catch(e){
      return {message: e.message}
    }

  },

  countByState:(isTest = false) =>{
    let employeesInFunction = employees
      if(isTest){
        employeesInFunction = employeesTest
      }
    const countState = {}
    employeesInFunction.forEach(emp =>{
      //Percorrendo cada funcionario e verificando se no countState existe o UF do funcionario
      //se não existir, criar e setar com o valor 0 e depois adicionar mais 1 ao valor
      //se existir só adiciona mais 1 ao valor
      if(countState[emp.ufNascimento] == undefined){
        countState[emp.ufNascimento] = 0
      }
      countState[emp.ufNascimento] += 1
    })
    return countState
  },

  salaryRange:(min, max, isTest = false)=>{
    try{
      let employeesInFunction = employees
      if(isTest){
        employeesInFunction = employeesTest
      }

      dataValidations("Range", `${min}-${max}`)

      const employeesRange = employeesInFunction.filter(emp => emp.salario >= min && emp.salario <= max)

      return employeesRange

    }catch(e){
      return {message: e.message}
    }

  },

  deleteEmployee: (cpf, isTest = false)=>{
    try{
      let employeesInFunction = employees
      if(isTest){
        employeesInFunction = employeesTest
      }

      dataValidations("CPF", cpf, employeesInFunction)

      const newEmployees = employeesInFunction.filter(emp => emp.cpf != cpf)

      createNewDataBaseService(newEmployees);

      setTimeout(() => {
        employees = createEmployeesService();
      }, 1000);

      return {message: 'Deleted employee'}
    }catch(e){
      return {message: e.message}
    }
  },

  createOrUpdate: ({dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}, isTest = false)=>{
    try{
      let employeesInFunction = employees
      if(isTest){
        employeesInFunction = employeesTest
      }
      dataValidations("Date", dataCadastro)

      dataValidations("CPFCreate", cpf, employeesInFunction)

      dataValidations("UF", ufNascimento)

      dataValidations("Salary", salario)

      dataValidations("Status", status)

      const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

      const [employeeExists] = employeesInFunction.filter(emp => emp.cpf == cpf)

      const employeeIndex = employeesInFunction.indexOf(employeeExists)

      const newEmployees = employeesInFunction

      let msg =""

      if(employeeIndex != -1){
        msg = "Updated employee"
        newEmployees[employeeIndex] = employeeCreate
      }else{
        msg ="Employee created"
        newEmployees.push(employeeCreate)
      }

      createNewDataBaseService(newEmployees);

      setTimeout(() => {
        employees = createEmployeesService();
      }, 1000);

      return {message: msg}
    }catch(e){
      return {message: e.message}
    }
  }

}

module.exports = employeesMethods;

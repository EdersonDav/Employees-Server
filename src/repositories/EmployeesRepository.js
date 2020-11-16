const createEmployeesService = require('../services/CreateEmployeesService');
const createNewDataBaseService = require('../services/CreateNewDataBaseService');
const dataValidations = require('./validations');
const dataTest = require('./fake/dataTest');

//Criando a lista de funcionarios
let employees = createEmployeesService();
let employeesTest = dataTest

const employeesMethods = {
  getAll: (isTest) =>{
    let employeesInFunction =  isTest ? employeesTest : employees

    //Retornando a lista completa de funcionarios
    return employeesInFunction
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
    let employeesInFunction =  isTest ? employeesTest : employees

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
      let employeesInFunction =  isTest ? employeesTest : employees

      dataValidations("Range", `${min}-${max}`)

      const employeesRange = employeesInFunction.filter(emp => emp.salario >= min && emp.salario <= max)

      const employeesRangeSort = employeesRange.sort( (emp1, emp2) => {
        if (Number(emp1.salario) > Number(emp2.salario)) {
          return 1;
        }
        if (Number(emp1.salario) < Number(emp2.salario)) {
          return -1;
        }
        return 0;
      })

      return employeesRangeSort

    }catch(e){
      return {message: e.message}
    }

  },

  deleteEmployee: (cpf, isTest = false)=>{
    try{
      let employeesInFunction =  isTest ? employeesTest : employees

      dataValidations("CPF", cpf, employeesInFunction)

      const newEmployees = employeesInFunction.filter(emp => emp.cpf != cpf)

      if(!isTest){
        createNewDataBaseService(newEmployees);

        setTimeout(() => {
          employees = createEmployeesService();
        }, 1000);
      }else{
        employeesTest = newEmployees
      }


      return {message: 'Funcionário deletado'}
    }catch(e){
      return {message: e.message}
    }
  },

  createOrUpdate: ({dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}, isTest = false)=>{
    try{
      let employeesInFunction =  isTest ? employeesTest : employees

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
        msg = "Funcionário atualizado com sucesso"
        newEmployees[employeeIndex] = employeeCreate
      }else{
        msg ="Funcionário criado com sucesso"
        newEmployees.push(employeeCreate)
      }

      if(!isTest){
        createNewDataBaseService(newEmployees);

        setTimeout(() => {
          employees = createEmployeesService();
        }, 1000);
      }else{
        employeesTest = newEmployees
      }

      return {message: msg}
    }catch(e){
      return {message: e.message}
    }
  }

}

module.exports = employeesMethods;

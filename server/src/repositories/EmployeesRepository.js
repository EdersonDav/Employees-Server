import createEmployeesService from '../services/CreateEmployeesService';
import createNewDataBaseService from '../services/CreateNewDataBaseService';
import dataValidations from './validations'

//Criando a lista de funcionarios
let employees = createEmployeesService();

const employeesMethods = {
  getAll: () =>{
    //Retornando a lista completa de funcionarios
    return employees
  },

  search:(key, value) =>{
    try{
      dataValidations("Key", key, employees)

      const employee = employees.filter(emp => {
        //Fazendo um filtro se a chave do objeto for igual a key e o valor dessa chave for igual a value,
        //retornar o funcionario
        if(emp[key] == value){
          return emp;
        }
      })
      return employee;

    }catch(e){
      return {message: e.message}
    }

  },

  countByState:() =>{
    const countState = {}
    employees.forEach(emp =>{
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

  salaryRange:(min, max)=>{
    try{

      dataValidations("Range", `${min}-${max}`)

      const employeesRange = employees.filter(emp => emp.salario >= min && emp.salario <= max)

      return employeesRange

    }catch(e){
      return {message: e.message}
    }

  },

  deleteEmployee: (cpf)=>{
    try{

      dataValidations("CPF", cpf, employees)

      const newEmployees = employees.filter(emp => emp.cpf != cpf)

      createNewDataBaseService(newEmployees);

      setTimeout(() => {
        employees = createEmployeesService();
      }, 3000);

      return {message: 'Deleted employee'}
    }catch(e){
      return {message: e.message}
    }
  },

  createOrUpdate: ({dataCadastro, cargo, cpf, nome, ufNascimento, salario, status})=>{
    try{
      dataValidations("Date", dataCadastro)

      dataValidations("CPF", cpf, employees)

      dataValidations("UF", ufNascimento)

      dataValidations("Salary", salario)

      dataValidations("Status", status)



      const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

      const [employeeExists] = employees.filter(emp => emp.cpf == cpf)

      const employeeIndex = employees.indexOf(employeeExists)

      const newEmployees = employees

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
      }, 3000);

      return {message: msg}
    }catch(e){
      return {message: e.message}
    }
  }

}

export default employeesMethods;




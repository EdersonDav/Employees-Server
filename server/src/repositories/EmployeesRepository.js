import createEmployeesService from '../services/CreateEmployeesService';
import createNewDataBaseService from '../services/CreateNewDataBaseService';

let employees = createEmployeesService();

const employeesMethods = {
  getAll: () =>{
    return employees
  },

  search:(key, value) =>{
    const employee = employees.filter(emp => {
      if(emp[key] == value){
        return emp;
      }
    })
    return employee;
  },

  countByState:() =>{
    const countState = {}
    employees.forEach(emp =>{
      if(countState[emp.ufNascimento] == undefined){
        countState[emp.ufNascimento] = 0
      }
      countState[emp.ufNascimento] += 1
    })
    return countState
  },

  salaryRange:(min, max)=>{
    const employeesRange = employees.filter(emp => emp.salario >= min && emp.salario <= max)

    return employeesRange
  },

  deleteEmployee: (cpf)=>{
    try{
      const newEmployees = employees.filter(emp => emp.cpf != cpf)

      createNewDataBaseService(newEmployees);

      setTimeout(() => {
        employees = createEmployeesService();
      }, 3000);

      return {message: 'Employeer deleted'}
    }catch(e){
      return {message: 'Erro ao deletar'}
    }
  }

}

export default employeesMethods;




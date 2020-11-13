import createEmployeesService from '../services/CreateEmployeesService';

const employees = createEmployeesService();

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
  }
}

export default employeesMethods;




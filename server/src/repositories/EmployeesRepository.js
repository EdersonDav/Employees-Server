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
  }

}

export default employeesMethods;




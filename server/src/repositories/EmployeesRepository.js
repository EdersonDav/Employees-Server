import createEmployeesService from '../services/CreateEmployeesService';

const employees = createEmployeesService();

const employeesMethods = {

  getAll: () =>{
    return employees
  }

}

export default employeesMethods;




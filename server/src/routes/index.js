import {Router} from 'express';
import employeesMethods from '../repositories/EmployeesRepository'

const routes = Router();

routes.get('/', (require, response) => {
  const allEmployees = employeesMethods.getAll();
  response.json({allEmployees})
})


export default routes;

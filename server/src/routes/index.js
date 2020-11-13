import {Router} from 'express';
import employeesMethods from '../repositories/EmployeesRepository'

const routes = Router();

routes.get('/search', (require, response) => {
  const {key, value} = require.body
  const searchEmployee = employeesMethods.search(key, value );
  response.json({searchEmployee})
})

routes.get('/', (require, response) => {
  const allEmployees = employeesMethods.getAll();
  response.json({allEmployees})
})

export default routes;

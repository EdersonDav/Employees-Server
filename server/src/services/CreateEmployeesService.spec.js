const createEmployeesService = require('./CreateEmployeesService')

describe("Create employees", () => {
  it('should be able to create a list employees', async() =>{
    const employees = createEmployeesService(true)

    setTimeout(() => {
      expect(employees.length).toBe(4)
      expect(employees[1]).toHaveProperty("cpf")
    }, 1000);
  })
})

const createEmployeesService = require('./CreateEmployeesService')

describe("Create employees", () => {
  it('should be able to create a list employees',() =>{
    const employees = createEmployeesService('txtTest.txt')

    setTimeout(() => {
      expect(employees[0]).toBe(null || undefined)
      expect(employees.length).toBe(4)
      expect(employees[1]).toHaveProperty("dataCadastro")
    }, 1000);
  })
})

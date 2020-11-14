const employeesMethods = require('./EmployeesRepository');

describe("Search employee", () => {
  it('should be able to search for an employee', () =>{
    const searchEmployee = employeesMethods.search("nome", "Jose", true );
    expect(searchEmployee[0].status).toBe('ATIVO')
  })

  it('should not be able to search for an employee', () =>{
    const searchEmployee = employeesMethods.search("----", "Jose", true );
    expect(searchEmployee.message).toBe("Invalid Key");
  })
})

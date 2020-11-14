const employeesMethods = require('./EmployeesRepository');

describe("Search employee", () => {
  it('should be able to search for an employee', () =>{
    const employees = employeesMethods.search("nome", "Jose", true );
    expect(employees[0].status).toBe('ATIVO')
  })

  it('should not be able to search for an employee', () =>{
    const employees = employeesMethods.search("----", "Jose", true );
    expect(employees.message).toBe("Invalid Key");
  })
})

describe("List the number of employees by state", () => {

  it('should be able to list quantity employees by state', () =>{
    const employees = employeesMethods.countByState(true);
    expect(Object.keys(employees)).toEqual([ 'AP', 'RO', 'RJ' ])
    expect(employees.AP).toBe(1)
    expect(employees.RO).toBe(1)
    expect(employees.RJ).toBe(1)
  })
})

describe("List employees by range salary", () => {

  it('should be able to list employees by range salary', () =>{
    const employees = employeesMethods.salaryRange(5000.10, 6000,99, true);

    expect(employees.length).toBe(2)
    expect(employees[0].nome).toBe("Maria")
  })

  it('should be not able to list employees by range salary', () =>{
    const employees = employeesMethods.salaryRange(10000.10, 6000,99, true);

    expect(employees.message).toBe("Minimum value cannot be greater than maximum value")
  })
})

describe("Delete employee CPF", () => {

  it('should be able to deleted employee by CPF', () =>{
    const employees = employeesMethods.deleteEmployee("51704568080", true)
    const newListEmployees = employeesMethods.getAll(true)
    const employeesByCPF = employeesMethods.search("cpf", "51704568080", true );

    expect(employees.message).toBe("Deleted employee")
    expect(newListEmployees.length).toBe(2)
    expect(employeesByCPF.length).toBe(0)
  })

  it('should be not able to deleted employee by CPF', () =>{
    const employees = employeesMethods.deleteEmployee("5170456808", true)

    expect(employees.message).toBe("Invalid CPF")
  })
})

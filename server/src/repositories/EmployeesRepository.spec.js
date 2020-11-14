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

describe("Create employee", () => {
  it('should be able to create employee', () =>{
    const employeeCreate = {
      dataCadastro: "03/04/2018",
      cargo: "CEO",
      cpf: "44865722593",
      nome: "Luiza",
      ufNascimento: "RO",
      salario: "18098.50",
      status: "ATIVO"
    }
    const employees = employeesMethods.createOrUpdate(employeeCreate, true)
    const newListEmployees = employeesMethods.getAll(true)
    const employeesByCPF = employeesMethods.search("cpf", "44865722593", true );

    expect(employees.message).toBe("Employee created")
    expect(newListEmployees.length).toBe(3)
    expect(newListEmployees[2].nome).toBe("Luiza")
    expect(employeesByCPF.length).toBe(1)
  })

  it('should not be able to create an employee because of the date', () =>{
    const employeeCreate = {
      dataCadastro: "03-04-2018",
      cargo: "CEO",
      cpf: "44865722593",
      nome: "Luiza",
      ufNascimento: "RO",
      salario: "18098.50",
      status: "ATIVO"
    }

    const employees = employeesMethods.createOrUpdate(employeeCreate, true)

    expect(employees.message).toBe("Invalid Date")
  })

  it('should not be able to create an employee because of the CPF', () =>{
    const employeeCreate = {
      dataCadastro: "03/04/2018",
      cargo: "CEO",
      cpf: "444",
      nome: "Luiza",
      ufNascimento: "RO",
      salario: "18098.50",
      status: "ATIVO"
    }

    const employees = employeesMethods.createOrUpdate(employeeCreate, true)

    expect(employees.message).toBe("Invalid CPF")
  })

  it('should not be able to create an employee because of the state', () =>{
    const employeeCreate = {
      dataCadastro: "03/04/2018",
      cargo: "CEO",
      cpf: "44865722593",
      nome: "Luiza",
      ufNascimento: "R",
      salario: "18098.50",
      status: "ATIVO"
    }

    const employees = employeesMethods.createOrUpdate(employeeCreate, true)

    expect(employees.message).toBe("Invalid UF")
  })

  it('should not be able to create an employee because of the salary', () =>{
    const employeeCreate = {
      dataCadastro: "03/04/2018",
      cargo: "CEO",
      cpf: "44865722593",
      nome: "Luiza",
      ufNascimento: "RO",
      salario: "1809T8.50",
      status: "ATIVO"
    }

    const employees = employeesMethods.createOrUpdate(employeeCreate, true)

    expect(employees.message).toBe("Invalid Salary")
  })

  it('should not be able to create an employee because of the status', () =>{
    const employeeCreate = {
      dataCadastro: "03/04/2018",
      cargo: "CEO",
      cpf: "44865722593",
      nome: "Luiza",
      ufNascimento: "RO",
      salario: "18098.50",
      status: "NA"
    }

    const employees = employeesMethods.createOrUpdate(employeeCreate, true)

    expect(employees.message).toBe("Invalid Status")
  })

})

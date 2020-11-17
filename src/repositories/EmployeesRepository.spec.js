const employeesMethods = require('./EmployeesRepository');

describe("Search employee", () => {
  it('should be able to search for an employee', () =>{
    const employees = employeesMethods.search("nome", "Jose", true );
    expect(employees[0].status).toBe('ATIVO')
  })

  it('should not be able to search for an employee', () =>{
    const employees = employeesMethods.search("----", "Jose", true );
    expect(employees.message).toBe("Campo inválido");
  })
})

describe("List the number of employees by state", () => {

  it('should be able to list quantity employees by state', () =>{
    const employees = employeesMethods.countByState(true);
    const employeesObject = [
      { sigla: 'AP', value: 1 },
      { sigla: 'RO', value: 1 },
      { sigla: 'RJ', value: 1 }
    ]
    expect(employees).toEqual(employeesObject)
  })
})

describe("List employees by range salary", () => {

  it('should be able to list employees by range salary', () =>{
    const employees = employeesMethods.salaryRange(5000.10, 6000,99, true);

    const employeesSort = Number(employees[0].salario) <= Number(employees[1].salario)

    expect(employees.length).toBe(2)
    expect(employees[0].nome).toBe("Maria")
    expect(employeesSort).toBe(true)
  })

  it('should be not able to list employees by range salary', () =>{
    const employees = employeesMethods.salaryRange(10000.10, 6000,99, true);

    expect(employees.message).toBe("O valor minímo não pode ser maior que o máximo")
  })
})

describe("Create employee", () => {
  it('should be able to create employee', () =>{
    const employeeCreate = {
      dataCadastro: "03/04/2018",
      cargo: "CEO",
      cpf: "44865722598",
      nome: "Luiza",
      ufNascimento: "RO",
      salario: "18098.50",
      status: "ATIVO"
    }

    const oldEmployeesByCPF = employeesMethods.search("cpf", "44865722598", true );
    const employees = employeesMethods.createOrUpdate(employeeCreate, true)
    const employeesByCPF = employeesMethods.search("cpf", "44865722598", true );

    expect(oldEmployeesByCPF.length).toBe(0)
    expect(employees.message).toBe("Funcionário criado com sucesso")
    expect(employeesByCPF[0].nome).toBe("Luiza")
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

    expect(employees.message).toBe("Data inválida")
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

    expect(employees.message).toBe("CPF inválido")
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

    expect(employees.message).toBe("UF inválido")
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

    expect(employees.message).toBe("Salário inválido")
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

    expect(employees.message).toBe("Status inválido")
  })

})

describe("Delete employee CPF", () => {
  it('should be able to deleted employee by CPF', () =>{
    const oldListEmployees = employeesMethods.getAll(true)
    const employees = employeesMethods.deleteEmployee("51704568080", true)
    const newListEmployees = employeesMethods.getAll(true)
    const employeesByCPF = employeesMethods.search("cpf", "51704568080", true );

    expect(employees.message).toBe("Funcionário deletado")
    expect(newListEmployees.length).toEqual(oldListEmployees.length - 1)
    expect(employeesByCPF.length).toBe(0)
  })

  it('should be not able to deleted employee by CPF', () =>{
    const employees = employeesMethods.deleteEmployee("5170456808", true)

    expect(employees.message).toBe("CPF inválido")
  })
})

describe("Upate employee", () => {
  it('should be able to update employee', () =>{
    const employeeUpate = {
      dataCadastro: "15/04/2017",
      cargo: "Dev Pleno",
      cpf: "85235708709",
      nome: "Pedro",
      ufNascimento: "AP",
      salario: "8965.30",
      status: "BLOQUEADO"
    }
    const oldListEmployees = employeesMethods.getAll(true)
    const employees = employeesMethods.createOrUpdate(employeeUpate, true)
    const newListEmployees = employeesMethods.getAll(true)
    const employeesByCPF = employeesMethods.search("cpf", "85235708709", true );

    expect(employees.message).toBe("Funcionário atualizado com sucesso")
    expect(newListEmployees.length).toEqual(oldListEmployees.length)
    expect(employeesByCPF[0].cargo).toBe("Dev Pleno")
  })
})


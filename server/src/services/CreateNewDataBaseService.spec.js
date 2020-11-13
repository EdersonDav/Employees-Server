const createEmployeesService = require('./CreateEmployeesService')
const createNewDataBaseService = require('./CreateNewDataBaseService')

describe("Create new data base", () => {
  it('should be able to create a new file txt', () =>{
    const oldListEmployees = createEmployeesService('txtTest.txt')

    const newEmployees = oldListEmployees

    createNewDataBaseService(newEmployees, 'txtTest2.txt')

    setTimeout(() => {
      const newListEmployees = createEmployeesService('txtTest2.txt')

      setTimeout(() => {
        expect(newListEmployees[0]).toEqual(oldListEmployees[0])
        expect(newListEmployees.length).toEqual(oldListEmployees.length)
        expect(newListEmployees[1]).toHaveProperty("dataCadastro")
      }, 1000);

    }, 2000);

  })
})

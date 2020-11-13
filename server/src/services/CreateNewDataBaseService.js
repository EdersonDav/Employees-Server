const fs = require('fs');

const CreateNewDataBase = (employees, isTest = "") =>{
  const pathTXT = !isTest ? 'src/database/Base de dados - Funcionários.txt':
  `src/database/fakes/${isTest}`

  const dataL1 = "DataCad;Cargo;Cpf;Nome;UfNasc;Salario;Status\n"

  fs.writeFile(pathTXT,"", (error) => {
    if (error) throw new Error("Path not found");

    const stream = fs.createWriteStream(pathTXT)

    stream.once('open', () =>{
      stream.write(dataL1)
      employees.forEach(emp => {
        stream.write(`\n${emp.dataCadastro};${emp.cargo};${emp.cpf};${emp.nome};${emp.ufNascimento};${emp.salario};${emp.status};\n`);
      });
      stream.end();
    })
  })
}

module.exports = CreateNewDataBase

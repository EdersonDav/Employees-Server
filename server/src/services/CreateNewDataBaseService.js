const fs = require('fs');

const CreateNewDataBase = async (employees) =>{
  const pathTXT = 'src/database/Base de dados - Funcionários.txt'
  const dataL1 = "DataCad;Cargo;Cpf;Nome;UfNasc;Salario;Status\n"

  fs.writeFile(pathTXT,"", (error) => {
    if (error) throw error;

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

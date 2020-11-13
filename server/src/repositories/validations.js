const dataValidation= ( type, data, employees = null)=>{
  switch (type) {
    case "CPF":
      //Verificando se CPF existe na base
      const employeeExists = employees.filter(emp => emp.cpf == data)

      //Verificando se CPF é numero e se tem o tamanho de 11
      if(isNaN(data) || data.length != 11){
        throw new Error("Invalid CPF")

        //Caso CPF não seja encontrado
      }else if(employeeExists.length <= 0){
        throw new Error("CPF not found")
      }
      break;

    case "Key":
      //allKeys é um array que tem todas as chaves nos employees
      const allKeys = Object.keys(employees[1])

      //Verificando se o data existe no allKeys
      if(!allKeys.includes(data)){
        throw new Error("Invalid Key")
      }
      break;

    case "Range":
      //Separando valor minimo e maximo
      const [min,max] = data.split("-")
      if(min > max){
        throw new Error("Minimum value cannot be greater than maximum value")
      }
      break;

    case "Date":
      //Verificando se a data está utilizando /
      if(data.includes('/')){
        const date = data.split('/')

        //Verificando se foram passados dia, mes e ano
        if(date.length != 3){
          throw new Error("Invalid Date")

          //Verificando se dia mes e ano são numeros
        }else if(isNaN(date[0]) == true || isNaN(date[1]) == true || isNaN(date[2]) == true){
          throw new Error("Invalid Date")

          //Verificando se dia e mes tem 2 digitos e ano tem 4 digitos
        }else if(date[0].length != 2 || date[1].length != 2 || date[2].length != 4){
          throw new Error("Invalid Date")
        }

        //Caso não esteja utilizando /
      }else{
        throw new Error("Invalid Date")
      }

      break;

    case "UF":
      if(data.length != 2){
        throw new Error("Invalid UF")
      }
      break;

    case "Salary":
      //Verificando se o salario é um numero
      if(isNaN(data)){
        throw new Error("Invalid Salary")
      }
      break;

    case "Status":
      if(data != "ATIVO" && data != "BLOQUEADO" ){
        throw new Error("Invalid Status")
      }
      break;
  }
}

module.exports = dataValidation

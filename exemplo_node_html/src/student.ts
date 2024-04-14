class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
  idade?: number;
}

function greeter(person: Person) {
  return "FALA GALERINHA OLHA O NOME DA FULANA: , " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
document.body.textContent = greeter(user);
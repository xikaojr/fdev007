// Definindo uma interface para representar um usuário
interface User {
  id: number;
  name: string;
  email: string;
}

// Definindo uma classe para representar um serviço de usuários
class UserService {
  private users: User[] = [];

  // Adiciona um novo usuário
  addUser(user: User) {
    this.users.push(user);
  }

  // Retorna todos os usuários
  getUsers(): User[] {
    return this.users;
  }
}

// Função principal da aplicação
function main() {
  // Instanciando o serviço de usuários
  const userService = new UserService();

  // Adicionando alguns usuários
  userService.addUser({ id: 1, name: 'Alice', email: 'alice@example.com' });
  userService.addUser({ id: 2, name: 'Bob', email: 'bob@example.com' });
  userService.addUser({ id: 3, name: 'Charlie', email: 'charlie@example.com' });

  // Obtendo e imprimindo os usuários
  const users = userService.getUsers();
  console.log('Lista de Usuários:');
  users.forEach(user => {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
  });
}

// Chamando a função principal
main();

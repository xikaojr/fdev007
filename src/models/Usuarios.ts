import fs from 'fs';
import path from 'path';

type Usuario = {
  id?: string;
  nome: string;
  login: string;
  senha: string;
}

class UsuariosModel {
  async login(login: string, senha: string) {
    const usuarios: Usuario[] = this.readUsuariosFile();
    const usuario: Usuario | undefined = usuarios.find(user => user.login === login && user.senha === senha);
    return usuario ? [usuario] : [];
  }

  getTotalRegister() {
    const usuarios = this.readUsuariosFile();
    return Promise.resolve([{ total: usuarios.length }]);
  }

  findAll(pesquisa: string) {
    const usuarios: Usuario[] = this.readUsuariosFile();

    let filteredUsers = [...usuarios];
    if (pesquisa) {
      const searchTerm = pesquisa.toLowerCase();
      filteredUsers = usuarios.filter(user =>
        user.nome.toLowerCase().includes(searchTerm) ||
        user.login.toLowerCase().includes(searchTerm)
      );
    }

    return Promise.resolve(filteredUsers);
  }

  findOne(id: string) {
    const usuarios: Usuario[] = this.readUsuariosFile();
    const usuario: Usuario | undefined = usuarios.find(user => user.id === id);
    return Promise.resolve(usuario ? [usuario] : []);
  }

  create(data: Usuario) {
    const usuarios = this.readUsuariosFile();
    const newUsuario = { ...data, id: Date.now().toString() };
    usuarios.push(newUsuario);
    this.writeUsuariosFile(usuarios);
    return Promise.resolve([newUsuario]);
  }

  update(data: [], id: string) {
    const usuarios: Usuario[] = this.readUsuariosFile();
    const index: number = usuarios.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const updatedUsuario = { ...usuarios[index], ...data };
    usuarios[index] = updatedUsuario;
    this.writeUsuariosFile(usuarios);
    return Promise.resolve([updatedUsuario]);
  }

  delete(id: string) {
    const usuarios: Usuario[] = this.readUsuariosFile();
    const index: number = usuarios.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const deletedUsuario = usuarios.splice(index, 1)[0];
    this.writeUsuariosFile(usuarios);
    return Promise.resolve([deletedUsuario]);
  }

  readUsuariosFile() {
    const filePath = path.join(__dirname, 'db', 'usuarios.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  }

  writeUsuariosFile(data: Usuario[]) {
    const filePath = path.join(__dirname, 'db', 'usuarios.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}

export default UsuariosModel;
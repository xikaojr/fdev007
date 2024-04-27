import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type Usuario = {
  id?: string;
  nome: string;
  login: string;
  senha: string;
}

interface UsuarioParams {
  id: string;
  nome: string;
  login: string;
  // Outras propriedades do usuário
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
  findAll({ nome, login, id }: { nome?: string; login?: string; id?: string }): Promise<Usuario[]> {
    let usuarios: Usuario[] = this.readUsuariosFile();
    const filtrosAtivos = Object.keys({ nome, login, id }).filter(chave => !!{ nome, login, id }[chave]);

    if (filtrosAtivos.length === 0) {
      return Promise.resolve(usuarios);
    }

    return Promise.resolve(usuarios.filter(usuario => {
      return (!nome || usuario.nome === nome) &&
        (!login || usuario.login === login) &&
        (!id || usuario.id === id);
    }));
  }

  findOne(id: string) {
    const usuarios: Usuario[] = this.readUsuariosFile();
    const usuario: Usuario | undefined = usuarios.find(user => user.id === id);
    return Promise.resolve(usuario);
  }

  create(data: Usuario) {
    const usuarios: Usuario[] = this.readUsuariosFile();
    const newUsuario = { ...data, id: uuidv4() };

    let findUser: Usuario | undefined = usuarios.find(user => user.login === newUsuario.login);

    if (findUser) return Promise.resolve({
      "msg": "Usuário já existe no banco de dados!",
      "status": 400
    });

    usuarios.push(newUsuario);
    this.writeUsuariosFile(usuarios);
    return Promise.resolve(newUsuario);
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
    return Promise.resolve([]);
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
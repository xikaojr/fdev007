import { v4 as uuidv4 } from 'uuid';
import AbstractModel from './Abstract';
import { Usuario } from '../types/index'

interface UsuarioParams {
  id?: string;
  nome?: string;
  login?: string;
}

interface Params {
  [key: string]: string; // Tipagem genérica para os parâmetros
}

class UsuariosModel extends AbstractModel {
  constructor() {
    super('usuarios.json');
  }
  async login(login: string, senha: string) {
    const usuarios: Usuario[] = this.readFile();
    const usuario: Usuario | undefined = usuarios.find(user => user.login === login
      && user.senha === senha);
    return usuario;
  }

  getTotalRegister() {
    const usuarios = this.readFile();
    return Promise.resolve([{ total: usuarios.length }]);
  }

  find(params: Params): Promise<Usuario[]> {
    const { nome, login, id }: UsuarioParams = params;
    
    let usuarios: Usuario[] = this.readFile();
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

  findById(id: string) {
    const usuarios: Usuario[] = this.readFile();
    const usuario: Usuario | undefined = usuarios.find(user => user.id === id);
    return Promise.resolve(usuario);
  }

  create(data: Usuario) {
    const usuarios: Usuario[] = this.readFile();
    const newUsuario = { ...data, id: uuidv4() };

    let findUser: Usuario | undefined = usuarios.find(user => user.login === newUsuario.login);

    if (findUser) return Promise.resolve({
      "msg": "Usuário já existe no banco de dados!",
      "status": 400
    });

    usuarios.push(newUsuario);
    this.writeFile(usuarios);
    return Promise.resolve(newUsuario);
  }

  update(data: [], id: string) {
    const usuarios: Usuario[] = this.readFile();
    const index: number = usuarios.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const updatedUsuario = { ...usuarios[index], ...data };
    usuarios[index] = updatedUsuario;
    this.writeFile(usuarios);
    return Promise.resolve([]);
  }

  delete(id: string): Promise<void> {
    const usuarios: Usuario[] = this.readFile();
    const index: number = usuarios.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve();
    }

    usuarios.splice(index, 1)[0];
    this.writeFile(usuarios);
    return Promise.resolve();
  }

}
export default UsuariosModel;
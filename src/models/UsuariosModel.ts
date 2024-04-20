import UsuariosRepository from '../repository/UsuariosRepository';

class UsuariosModel {

    private repository: UsuariosRepository;

    constructor() {
        this.repository = new UsuariosRepository();
    }

    async login(login: string, senha: string) {
        return await this.repository.login(login, senha);
    }

    async getAllUsers(page: number, pesquisa?: string) {
        return await this.repository.findAll(page, pesquisa);
    }

    async getUserById(id: number) {
        return await this.repository.findOne(id);
    }

    async createUser(data: any) {
        return await this.repository.create(data);
    }

    async updateUser(data: any, id: number) {
        return await this.repository.update(data, id);
    }

    async deleteUser(id: number) {
        return await this.repository.delete(id);
    }
}

export default UsuariosModel;
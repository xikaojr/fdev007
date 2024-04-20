import { Request, Response } from 'express';
import UsuariosModel from "../models/Usuarios";
import jwt from 'jsonwebtoken';

class UsuariosController {
  async login(request: Request, response: Response) {
    const login = request.body.login;
    const senha = request.body.senha;
    const model = new UsuariosModel();
    const data = await model.login(login, senha);
    if (data[0] !== undefined) {
      const usuario = data[0];
      const dataUsuario = {
        id: usuario.id,
        nome: usuario.nome,
        login: usuario.login
      };
      const token = jwt.sign(
        dataUsuario,
        'sis-iw-0928eji0ici43083-90k494830-94398',
        { expiresIn: 60 * 60 }
      );
      return response.json({
        token: token
      })
    }
    return response.json({ message: 'Usuário ou senha inválido.' });
  }

  async findAll(request: Request, response: Response) {
    const model = new UsuariosModel();
    const pesquisa: string = <string>request.query.pesquisa;

    const data = await model.findAll(pesquisa);
    return response.json(data);
  }

  async findOne(request: Request, response: Response) {
    const id: string = request.params.id;
    const model = new UsuariosModel();
    const data = await model.findOne(id);
    return response.json(data);
  }

  async create(request: Request, response: Response) {
    const body = request.body;
    const model = new UsuariosModel();
    const data = await model.create(body);
    return response.json(data);
  }

  async update(request: Request, response: Response) {
    const body = request.body;
    const id: string = request.params.id;
    const model = new UsuariosModel();
    const data = await model.update(body, id);
    return response.json(data);
  }

  async delete(request: Request, response: Response) {
    const id: string = request.params.id;
    const model = new UsuariosModel();
    const data = await model.delete(id);
    return response.json(data);
  }
}

export default UsuariosController;
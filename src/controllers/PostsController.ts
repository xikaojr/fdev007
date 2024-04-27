import { Request, Response } from 'express';
import UsuariosModel from "../models/Usuarios";
import jwt from 'jsonwebtoken';
import PostsModel from '../models/Posts';


type PostsParams = {
    id?: string,
    title?: string,
    content?: string,
    userId?: string,
    createdAt?: string,
    updatedAt?: string
}


class PostsController {
    async login(request: Request, response: Response) {
        const { login, senha } = request.body;
        const model = new UsuariosModel();
        const data = await model.login(login, senha);
        if (data !== undefined) {
          const usuario = data;
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
        const model = new PostsModel();
        const { id }: PostsParams = request.query;
        const data = await model.findAll({ id });
        return response.json(data);
      }
    
      async findOne(request: Request, response: Response) {
        const id: string = request.params.id;
        const model = new PostsModel();
        const data = await model.findOne(id);
    
        if (!data)
          return response.status(404).json({ message: "Usuário não encontrado" });
    
        return response.json(data);
      }
    
      async create(request: Request, response: Response) {
        const body = request.body;
        const model = new PostsModel();
        const data = await model.create(body);
        return response.json(data);
      }
    
      async update(request: Request, response: Response) {
        const body = request.body;
        const { id }: { id: string } = request.body;
        const model = new PostsModel();
        const data = await model.update(body, id);
        return response.status(204).send();
      }
    
      async delete(request: Request, response: Response) {
        const id: string = request.params.id;
        const model = new PostsModel();
        const data = await model.delete(id);
        return response.json(data);
      }
}



export default PostsController;
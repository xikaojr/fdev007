import { Request, Response } from 'express';
import PostsModel from "../models/Posts";
import jwt from 'jsonwebtoken';

interface PostParams {
  id?: string;
  title?: string;
  userId?: string;
}

interface DecodedUser {
  id: string;
  nome: string;
  login: string;
}

class PostsController {
  async findAll(request: Request, response: Response) {
    const model = new PostsModel();
    const { title, userId, id }: PostParams = request.query;
    const data = await model.findAll({ title, userId, id });
    return response.json(data);
  }

  async findOne(request: Request, response: Response) {
    const id: string = request.params.id;
    const model = new PostsModel();
    const data = await model.findOne(id);

    if (!data)
      return response.status(404).json({ message: "Post não encontrado" });

    return response.json(data);
  }

  async create(request: Request, response: Response) {
    const body = request.body;
    const model = new PostsModel();
    const token: string = <string>request.headers.authorization;
    const decodedToken = jwt.verify(token.split(' ')[1], 'sis-iw-0928eji0ici43083-90k494830-94398') as DecodedUser;

    if (!body.userId)
      body.userId = decodedToken.id;

    if (!body.createdAt)
      body.createdAt = new Date().toISOString();

    if (!body.updatedAt)
      body.updatedAt = new Date().toISOString();

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
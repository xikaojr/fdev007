import { Request, Response } from 'express';
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
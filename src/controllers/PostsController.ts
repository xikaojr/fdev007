import { Request, Response } from 'express';
import PostsModel from '../models/Posts';
import jwt from 'jsonwebtoken';

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
        try {
            const model = new PostsModel();
            const { id }: PostsParams = request.query;
            const data = await model.findAll({ id });
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar posts' });
        }
    }
    
    async findOne(request: Request, response: Response) {
        try {
            const id: string = request.params.id;
            const model = new PostsModel();
            const data = await model.findOne(id);
    
            if (!data)
                return response.status(404).json({ message: "Usuário não encontrado" });
    
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar o post' });
        }
    }
    
    async create(request: Request, response: Response) {
        try {
            const token = request.headers['authorization'];
            if (!token) {
                return response.status(401).json({ message: 'Token não informado' });
            }
    
            const decodedToken = jwt.verify(token as string, 'sis-iw-0928eji0ici43083-90k494830-94398');
            const userId = (decodedToken as any).userId;
    
            const body = request.body;
            const model = new PostsModel();
            const data = await model.create(body, userId);
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao criar o post' });
        }
    }
    
    async update(request: Request, response: Response) {
        try {
            const body = request.body;
            const id: string = request.params.id;
            const model = new PostsModel();
            const data = await model.update(body, id);
            return response.status(204).send(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao atualizar o post' });
        }
    }
    
    async delete(request: Request, response: Response) {
        try {
            const  id: string  = request.params.id;
            const model = new PostsModel();
            const data = await model.delete(id);
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao excluir o post' });
        }
    }
}

export default PostsController;
import { Request, Response } from 'express';
import LikesModel from '../models/Likes';
import jwt from 'jsonwebtoken';


type LikesParams = {
    id?: string,
    postId?: string,
    userId?: string,
    createdAt?: string,
    updatedAt?: string
}


class  LikesController {
    async findAll(request: Request, response: Response) {
        try {
            const model = new LikesModel();
            const { id }: LikesParams = request.params; 
            const data = await model.findAll({ id });
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar likes' }); 
        }
    }

    async findOne(request: Request, response: Response) {
        try {
            const id: string = request.params.id; 
            const model = new LikesModel();
            const data = await model.findOne(id);
    
            if (!data)
                return response.status(404).json({ message: "Like não encontrado" });
    
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar o like' });
        }
    }

    async create(request: Request, response: Response) {
        try {
            
            const token: string = <string>request.headers.authorization;
           
            const decodedToken = jwt.verify(token.split(' ')[1], 'sis-iw-0928eji0ici43083-90k494830-94398');
            const body = request.body;
            const userId = (decodedToken as any).userId;

         if (!body.userId) {
            body.userId = decodedToken;
            }


            const model = new LikesModel();
            const data = await model.create(body, userId);
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao deixar o like' });
        }
    }
    
    async update(request: Request, response: Response) {
        try {
            const body = request.body;
            const id: string = request.params.id;
            const model = new LikesModel();
            const data = await model.update(body, id);
            return response.status(204).send(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao atualizar o like' });
        }
    }
    
    async delete(request: Request, response: Response) {
        try {
            const  id: string  = request.params.id;
            const model = new LikesModel();
            const data = await model.delete(id);
            return response.json(data);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao excluir o like' });
        }
    }


}

export default LikesController;
import { Request, Response } from 'express';

interface Model {
  find(params: any): Promise<any>;
  findById(id: any): Promise<any>;
  create(data: any): Promise<any>;
  update(id: any, data: any): Promise<any>;
  delete(id: any): Promise<void>;
}

interface ErrorResponse {
  message: string;
}

abstract class AbstractController {
  protected model: Model;

  constructor(model: Model) {
    this.model = model;
  }
  
  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.model.find(req.query);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  findOne = async (req: Request, res: Response): Promise<void | ErrorResponse> => {
    try {
      const { id } = req.params;
      const data = await this.model.findById(id);
      if (!data) {
        res.status(404).json({ message: 'Record not found' });
      }
      res.json(data);
    } catch (error) {
      console.error('Error fetching record:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  create = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.createdAt)
        req.body.createdAt = new Date().toISOString();

      if (!req.body.updatedAt)
        req.body.updatedAt = new Date().toISOString();

      // Verifica se this.model está definido
      if (!this.model) {
        throw new Error('Model is not defined');
      }

      const data = await this.model.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating record:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }


  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.model.update(id, req.body);
      if (!data) {
        res.status(404).json({ message: 'Record not found' });
      }
      res.json(data);
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.model.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default AbstractController;
import express from 'express'
import UsuariosController from '../controllers/UsuariosController';
const usuariosRouter = express.Router();
const usuariosController = new UsuariosController();

usuariosRouter.post('/usuarios', usuariosController.create);
usuariosRouter.get('/usuarios', usuariosController.findAll);
usuariosRouter.get('/usuarios/:id', usuariosController.findOne);
usuariosRouter.put('/usuarios', usuariosController.update);
usuariosRouter.delete('/usuarios/:id', usuariosController.delete);

export default usuariosRouter;
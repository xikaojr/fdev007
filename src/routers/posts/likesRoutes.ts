import express from "express";
import LikesController from "../../controllers/LikesController";
const likesRouter = express.Router();
const likesController = new LikesController();

likesRouter.post('/likes', likesController.create); 
likesRouter.get('/likes', likesController.findAll); 
likesRouter.get('/likes/:id', likesController.findOne); 
likesRouter.put('/likes/:id', likesController.update); 
likesRouter.delete('/likes/:id', likesController.delete); 

export default likesRouter;
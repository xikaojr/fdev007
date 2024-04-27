import express from "express";
import PostsController from "../../controllers/PostsController";
const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.post('/posts', postsController.create);
postsRouter.get('/posts', postsController.findAll);
postsRouter.get('/posts/:id', postsController.findOne);
postsRouter.put('/posts/:id', postsController.update);
postsRouter.delete('/posts/:id', postsController.delete);

export default postsRouter;


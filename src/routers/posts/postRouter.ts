import express from 'express'
import PostsController from '../../controllers/PostsController';
import LikesController from '../../controllers/LikesController';

const postsRouter = express.Router();
const postsController = new PostsController();
const likesController = new LikesController();

postsRouter.post('/posts', postsController.create);
postsRouter.post('/posts/like', likesController.create);
postsRouter.get('/posts', postsController.findAll);
postsRouter.get('/posts/:id', postsController.findOne);
postsRouter.put('/posts', postsController.update);
postsRouter.delete('/posts/:id', postsController.delete);

export default postsRouter;
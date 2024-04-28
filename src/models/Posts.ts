import { v4 as uuidv4 } from 'uuid';
import AbstractModel from './Abstract';
import { Post } from '../types/index'

interface PostParams {
  id?: string;
  title?: string;
  userId?: string;
}

class PostsModel extends AbstractModel {
  constructor() {
    super('posts.json');
  }
  getTotalRegister() {
    const posts = this.readFile();
    return Promise.resolve([{ total: posts.length }]);
  }
  findAll({ title, userId, id }: PostParams): Promise<Post[]> {
    let posts: Post[] = this.readFile();
    const filtrosAtivos = Object.keys({ title, userId, id }).filter(chave => !!{ title, userId, id }[chave]);

    if (filtrosAtivos.length === 0) {
      return Promise.resolve(posts);
    }

    return Promise.resolve(posts.filter(post => {
      return (!title || post.title === title) &&
        (!userId || post.userId === userId) &&
        (!id || post.id === id);
    }));
  }

  findOne(id: string) {
    const posts: Post[] = this.readFile();
    const usuario: Post | undefined = posts.find(post => post.id === id);
    return Promise.resolve(usuario);
  }

  create(data: Post) {
    const posts: Post[] = this.readFile();
    const newPost = { ...data, id: uuidv4() };

    let findUser: Post | undefined = posts.find(user => user.title === newPost.title);

    if (findUser) return Promise.resolve({
      "msg": "Post já existe no banco de dados com este title!",
      "status": 400
    });

    posts.push(newPost);
    this.writeFile(posts);
    return Promise.resolve(newPost);
  }

  update(data: [], id: string) {
    const posts: Post[] = this.readFile();
    const index: number = posts.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const updatedPost = { ...posts[index], ...data };
    posts[index] = updatedPost;
    this.writeFile(posts);
    return Promise.resolve([]);
  }

  delete(id: string): Promise<void> {
    const usuarios: Post[] = this.readFile();
    const index: number = usuarios.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve();
    }

    usuarios.splice(index, 1)[0];
    this.writeFile(usuarios);
    return Promise.resolve();
  }

}

export default PostsModel;
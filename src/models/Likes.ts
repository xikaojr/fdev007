import { v4 as uuidv4 } from 'uuid';
import AbstractModel from './Abstract';
import { Like } from '../types/index'

interface LikeParams {
  id?: string;
  userId?: string;
  postId?: string;
}

export default class Likes extends AbstractModel {
  constructor() {
    super('likes.json');
  }
  find({ postId, userId, id }: LikeParams): Promise<Like[]> {
    let posts: Like[] = this.readFile();
    const filtrosAtivos = Object.keys({ postId, userId, id }).filter(chave => !!{ postId, userId, id }[chave]);

    if (filtrosAtivos.length === 0) {
      return Promise.resolve(posts);
    }

    return Promise.resolve(posts.filter(post => {
      return (!postId || post.postId === postId) &&
        (!userId || post.userId === userId) &&
        (!id || post.id === id);
    }));
  }

  findById(id: string) {
    const likes: Like[] = this.readFile();
    const usuario: Like | undefined = likes.find(post => post.id === id);
    return Promise.resolve(usuario);
  }

  create(data: Like) {
    const likes: Like[] = this.readFile();
    const newLike = { ...data, id: uuidv4() };
    likes.push(newLike);
    this.writeFile(likes);
    return Promise.resolve(newLike);
  }

  update(data: [], id: string) {
    const likes: Like[] = this.readFile();
    const index: number = likes.findIndex(l => l.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const updatedLike = { ...likes[index], ...data };
    likes[index] = updatedLike;
    this.writeFile(likes);
    return Promise.resolve([]);
  }

  delete(id: string): Promise<void> {
    const usuarios: Like[] = this.readFile();
    const index: number = usuarios.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve();
    }

    usuarios.splice(index, 1)[0];
    this.writeFile(usuarios);
    return Promise.resolve();
  }
}
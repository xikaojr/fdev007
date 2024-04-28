import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type Post = {
  id?: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface PostParams {
  id?: string;
  title?: string;
  userId?: string;
}

class PostsModel {
  getTotalRegister() {
    const posts = this.PostsreadPostsFile();
    return Promise.resolve([{ total: posts.length }]);
  }
  findAll({ title, userId, id }: PostParams): Promise<Post[]> {
    let posts: Post[] = this.PostsreadPostsFile();
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
    const posts: Post[] = this.PostsreadPostsFile();
    const usuario: Post | undefined = posts.find(post => post.id === id);
    return Promise.resolve(usuario);
  }

  create(data: Post) {
    const posts: Post[] = this.PostsreadPostsFile();
    const newPost = { ...data, id: uuidv4() };

    let findUser: Post | undefined = posts.find(user => user.title === newPost.title);

    if (findUser) return Promise.resolve({
      "msg": "Post já existe no banco de dados com este title!",
      "status": 400
    });

    posts.push(newPost);
    this.writePostsFile(posts);
    return Promise.resolve(newPost);
  }

  update(data: [], id: string) {
    const posts: Post[] = this.PostsreadPostsFile();
    const index: number = posts.findIndex(user => user.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const updatedPost = { ...posts[index], ...data };
    posts[index] = updatedPost;
    this.writePostsFile(posts);
    return Promise.resolve([]);
  }

  delete(id: string) {
    const posts: Post[] = this.PostsreadPostsFile();
    const index: number = posts.findIndex(post => post.id === id);

    if (index === -1) {
      return Promise.resolve([]);
    }

    const deletedPost = posts.splice(index, 1)[0];
    console.log(deletedPost);
    
    this.writePostsFile(posts);
    return Promise.resolve([deletedPost]);
  }

  PostsreadPostsFile() {
    const filePath = path.join(__dirname, 'db', 'posts.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  }

  writePostsFile(data: Post[]) {
    const filePath = path.join(__dirname, 'db', 'posts.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}

export default PostsModel;
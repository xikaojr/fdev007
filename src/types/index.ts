export type Like = {
  id?: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export type Post = {
  id?: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type Usuario = {
  id?: string;
  nome: string;
  login: string;
  senha: string;
}
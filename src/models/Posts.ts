import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type Post = {
    id?: string,
    content: string,
    userId: string, 
    createdAt: string,
    updatedAt: string
}

class PostsModel {
    getTotalRegister() {
        const posts = this.readPostsFile(); 
        return Promise.resolve([{ total: posts.length }]);
    }

    findAll({ id }: { id?: string }): Promise<Post[]> { 
        let posts: Post[] = this.readPostsFile();
        if (!id) return Promise.resolve(posts);
        return Promise.resolve(posts.filter(post => post.id === id));
    }

    findOne(id: string) {
        const posts: Post[] = this.readPostsFile();
        return Promise.resolve(posts.find(post => post.id === id));
    }

    create(data: Post, userId: string) {
        const posts: Post[] = this.readPostsFile();
        const newPost = { ...data, id: uuidv4(), userId };
        posts.push(newPost);
        this.writePostsFile(posts);
        return Promise.resolve(newPost);
    }

    update(data: Post, id: string) { 
        const posts: Post[] = this.readPostsFile();
        const index: number = posts.findIndex(post => post.id === id);
        if (index === -1) return Promise.resolve(null);
        posts[index] = { ...posts[index], ...data };
        this.writePostsFile(posts);
        return Promise.resolve(posts[index]);
    }

    delete(id: string) {
        const posts: Post[] = this.readPostsFile();
        const index: number = posts.findIndex(post => post.id === id);
        if (index === -1) return Promise.resolve(null);
        const deletedPost = posts.splice(index, 1)[0];
        this.writePostsFile(posts);
        return Promise.resolve(deletedPost);
    }

    readPostsFile() {
        const filePath = path.join(__dirname, 'db', 'posts.json'); 
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData) as Post[];
    }

    writePostsFile(data: Post[]) {
        const filePath = path.join(__dirname, 'db', 'posts.json'); 
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}

export default PostsModel;

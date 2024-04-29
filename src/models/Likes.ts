import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type Like = {
    id?: string,
    postId: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}


class LikesModel {
    getTotalRegister() {
        const likes = this.readPostsFile(); 
        return Promise.resolve([{ total: likes.length }]);
    }

    findAll({ id }: { id?: string }): Promise<Like[]> { 
        let likes: Like[] = this.readPostsFile();
        if (!id) return Promise.resolve(likes);
        return Promise.resolve(likes.filter(like => like.id === id));
    }

    findOne(id: string) {
        const likes: Like[] = this.readPostsFile();
        return Promise.resolve(likes.find(like => like.id === id));
    }

    create(data: Like, userId: string) {
        const likes: Like[] = this.readPostsFile();
        const newPost = { ...data, id: uuidv4(), userId };
        likes.push(newPost);
        this.writePostsFile(likes);
        return Promise.resolve(newPost);
    }

    update(data: Like, id: string) { 
        const likes: Like[] = this.readPostsFile();
        const index: number = likes.findIndex(like => like.id === id);
        if (index === -1) return Promise.resolve(null);
        likes[index] = { ...likes[index], ...data };
        this.writePostsFile(likes);
        return Promise.resolve(likes[index]);
    }

    delete(id: string) {
        const likes: Like[] = this.readPostsFile();
        const index: number = likes.findIndex(like => like.id === id);
        if (index === -1) return Promise.resolve(null);
        const deletedPost = likes.splice(index, 1)[0];
        this.writePostsFile(likes);
        return Promise.resolve(deletedPost);
    }

    readPostsFile() {
        const filePath = path.join(__dirname, 'db', 'posts.json'); 
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData) as Like[];
    }

    writePostsFile(data: Like[]) {
        const filePath = path.join(__dirname, 'db', 'posts.json'); 
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}



export default LikesModel;
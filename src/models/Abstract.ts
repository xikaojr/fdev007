import fs from 'fs';
import path from 'path';

abstract class BaseModel {
  abstract find(params: any): Promise<any>;
  abstract findById(id: any): Promise<any>;
  abstract create(data: any): Promise<any>;
  abstract update(id: any, data: any): Promise<any>;
  abstract delete(id: string): Promise<void>;
  abstract readFile(): any[]
  abstract writeFile(data: any): Promise<void>;
}

export default abstract class AbstractModel implements BaseModel {
  constructor(protected fileName: string) { }
  find(params: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findById(id: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: any, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  readFile<T>(): T[] {
    const filePath = path.join(__dirname, 'db', this.fileName);
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  }

  writeFile(data: any): Promise<void> {
    const filePath = path.join(__dirname, 'db', this.fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
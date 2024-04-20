import mysql from 'mysql';

class MySQLConnection {
  private config: mysql.ConnectionConfig;

  constructor() {
    this.config = {
      host: 'localhost',
      user: 'root',
      password: 'senha',
      database: 'nome_do_banco'
    };
  }

  async query(sql: string, values?: any[]): Promise<any> {
    const connection = mysql.createConnection(this.config);

    try {
      await this.connect(connection);
      const results = await this.executeQuery(connection, sql, values);
      return results;
    } finally {
      await this.close(connection);
    }
  }

  private connect(connection: mysql.Connection): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Conectado ao MySQL');
        resolve();
      });
    });
  }

  private executeQuery(connection: mysql.Connection, sql: string, values?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  private close(connection: mysql.Connection): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Conexão encerrada');
        resolve();
      });
    });
  }
}

export default MySQLConnection;
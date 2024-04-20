import MySQLConnection from '../../config/MySQLConnection';

class UsuariosRepository {

    private con: MySQLConnection;

    constructor() {
        this.con = new MySQLConnection();
    }

    async login(login: string, senha: string) {
        const sql = "SELECT * FROM usuarios WHERE login = ? AND senha = ?";
        const dados = [login, senha];
        const resultados = await this.con.query(sql, dados);
        return resultados;
    }

    async getTotalRegister() {
        const paginas = await this.con.query("SELECT count(id) as total FROM usuarios");
        return paginas;
    }

    async findAll(page: number, pesquisa?: string) {
        const paginas = await this.getTotalRegister();
        const paginacao = this.paginate(page, 5, paginas[0].total);

        let sql = `SELECT * FROM usuarios LIMIT ${paginacao.limit} OFFSET ${paginacao.offset}`;
        if (pesquisa) {
            sql = `
                SELECT * 
                FROM usuarios 
                WHERE 
                nome like '%${pesquisa}%'
                OR login like '%${pesquisa}%'
                LIMIT ${paginacao.limit} 
                OFFSET ${paginacao.offset}`;
        }

        const resultados = await this.con.query(sql);
        return resultados;
    }

    async findOne(id: number) {
        const sql = "SELECT * FROM usuarios WHERE id = ?";
        const dados = [id];
        const resultados = await this.con.query(sql, dados);
        return resultados;
    }

    async create(data: any) {
        const sql = "INSERT INTO usuarios SET ?";
        const resultados = await this.con.query(sql, data);
        return resultados;
    }

    async update(data: any, id: number) {
        const sql = "UPDATE usuarios SET ? WHERE id = ?";
        const dados = [data, id];
        const resultados = await this.con.query(sql, dados);
        return resultados;
    }

    async delete(id: number) {
        const sql = "DELETE FROM usuarios WHERE id = ?";
        const dados = [id];
        const resultados = await this.con.query(sql, dados);
        return resultados;
    }

    private paginate(pagina_atual: number, total_por_pagina: number, total_registros: number): { limit: number, offset: number, qtde_paginas: number } {
        let qtde_paginas = Math.floor(total_registros / total_por_pagina);
        const resto_divisao = total_registros % total_por_pagina;

        if (resto_divisao > 0) {
            qtde_paginas++;
        }

        let offset = 0;
        if (pagina_atual > 1) {
            const pagina = pagina_atual - 1;
            offset = pagina * total_por_pagina;
        }

        const dados_paginacao = {
            limit: total_por_pagina,
            offset: offset,
            qtde_paginas: qtde_paginas
        };

        return dados_paginacao;
    }
}

export default UsuariosRepository;
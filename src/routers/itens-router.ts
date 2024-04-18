import express from 'express'
import Item from '../models/item'
const itensRouter = express.Router()

itensRouter.post('/itens', (req, res) => {
    let {nome, descricao} = req.body;
    const item: Item = {
        nome: nome,
        descricao: descricao
    }
    item.id = 123;
    res.status(201).json(item)
})
itensRouter.get('/itens', (req, res) => {
    const itens: Item[] = [
        {
            id: 1,
            nome: 'Produto 1',
            descricao: 'Descrição do produto 1'
        },
        {
            id: 2,
            nome: 'Produto 2',
            descricao: 'Descrição do produto 2'
        }
    ]

    res.status(200).json(itens)
})
itensRouter.get('/itens/:id', (req, res) => {
    const id: number = +req.params.id

    if (isNaN(id)) {
        res.status(400).json({
            msg: "Parametro inválido!",
            status: 400
        });
        return false;
    }

    const item: Item = {
        id: id,
        nome: `Produto ${id}`,
        descricao: `Descrição do produto ${id}`
    }
    res.status(200).json(item)
})
itensRouter.put('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    const item: Item = req.body
    res.status(204).send()
})
itensRouter.delete('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    res.status(204).send()
})
export default itensRouter
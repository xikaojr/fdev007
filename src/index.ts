import express from 'express'
// import itensRouter from './routers/itens-router'
import cors from 'cors'

const PORT = 8000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send('Bem-vindo!')
})
app.use(cors({
  origin: '*'
}))
// app.use('/api', itensRouter)
app.use('/console', (req, res) => {
  console.log(req.headers)
  console.log(req.body)
})

app.use((req, res) => {
  res.status(404).send('Rota não encontrada!')
})
// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${PORT}`)
})
import express from 'express'
import itensRouter from './routers/itens-router'
import cors from 'cors'

// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
// App Express
const app = express()
// Endpoint raiz
// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Rotas
app.get('/', (req, res) => {
  res.send('Bem-vindo!')
})
// Cors
app.use(cors({
  origin: '*'
}))

//ROTAS
app.use('/api', itensRouter)

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
  res.status(404).send('Rota não encontrada!')
})
// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
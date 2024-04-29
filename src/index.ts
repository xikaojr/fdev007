import express from 'express'
import cors from 'cors'
import PublicRoutes from './routers/public-routes';
import PrivateRoutes from './routers/private-routes';

const PORT = 8009
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: '*'
}))

app.use(PublicRoutes);
app.use('/api', PrivateRoutes)


app.use((req: any, res: any) => {
  res.status(404).send('Rota não encontrada!')
})
// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${PORT}`)
})
import express from 'express';

const app = express();
app.use(express.json());

interface RequestBody {
  name: string;
  email: string;
  status: boolean;
}

app.post('/', (request, response) => {
  const user = request.body as RequestBody;
  const status: string = user.status === true ? 'Ativo' : 'Inativo';
  return response.send({
    message: `Olá ${user.name} seu e-email é ${user.email} e seu status está ${status}`,
  });
});

app.listen(4000, () => console.log('Listening 4000'));
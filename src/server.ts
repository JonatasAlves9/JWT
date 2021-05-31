import 'reflect-metadata';

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';

const app = express();
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor Iniciado na porta 3333!');
});
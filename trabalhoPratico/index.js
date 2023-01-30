import express from 'express';
import Route from './trabalhoPratico.js';

const app = express();

app.use(express.json());

app.use('/marcas', Route);

app.listen(3001, () => {
  console.log('API Started.');
});

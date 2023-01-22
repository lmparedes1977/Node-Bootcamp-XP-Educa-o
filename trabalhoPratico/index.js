import express from 'express';
import trabalhoPratico from './trabalhoPratico.js';

const app = express();

app.use(express.json());

app.use('/marcas', trabalhoPratico);

app.listen(3000, () => {
  console.log('API Started.');
});

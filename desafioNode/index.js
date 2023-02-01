import express from 'express';
import DesafioRouter from './routes/desafio.routes.js';

const app = express();

global.pedidosJson = './pedidos.json';

app.use(express.json());
app.use(express.static('public'));
app.use('/deliveri-api', DesafioRouter);
app.listen(3000, () => {
  console.log('API Started');
});

//https://github.com/ghdeassis/igti-bootcamp-nodejs-module1

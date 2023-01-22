import express from 'express';
import carrosRouter from './carrosRouter.js';
import winston from 'winston';

const { combine, printf, label, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${level} ${message} ${label} : ${timestamp}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-logs.log' }),
  ],
  format: combine(label({ label: 'app node bootcamp' }), timestamp(), myFormat),
});

logger.silly('Silly log');
logger.debug('debug log');
logger.info('info log');
logger.verbose('verbose log');
logger.warn('warn log');
logger.error('error log');
logger.log('Info', 'Hello with parameter');

const app = express();
app.use(express.json());

app.use(express.static('img')); /////////////// serve arquivo estaticamente ///////////////////////

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use('/carros', carrosRouter); //////////////// usando router com o .use()  /////////////////

app.get('/teste', (req, res) => {
  res.end();
});

//// caso de erro síncrono
app.get('/teste/erro', (req, res) => {
  throw new Error('Deu ruim');
});

//// caso de erro ASSINCRONO
app.post('/teste/erroAssincrono', async (req, res, next) => {
  try {
    throw new Error('Deu ruim');
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log('erro 1');
  next(err);
});

app.use((err, req, res, next) => {
  /////  tratamento de erros
  console.log('erro 2');
  res.status(500).send('OOOhh, ocorreu um erro inesperado...');
});

app.listen(3000, () => {
  console.log('API started');
});

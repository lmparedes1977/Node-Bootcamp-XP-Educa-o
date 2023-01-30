import { error, timeStamp } from 'console';
import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';

const router = express.Router();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, timestamp, label, message }) => {
  return `${timestamp} - [${label}] - ${level} : ${message}`;
});

global.arq = 'accounts.json';
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.name || account.saldo == null) {
      throw new Error('Nome e Saldo precisam ser preenchidos');
    }
    const data = JSON.parse(await fs.readFile(global.arq));
    console.log(data);
    account = { id: data.nextId++, name: account.name, saldo: account.saldo };
    data.accounts.push(account);
    logger.info(`POST /account ${JSON.stringify(account)}`);
    await fs.writeFile(global.arq, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.readFile(global.arq));
    res.send(data.accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.readFile(global.arq));
    const account = data.accounts.find(
      account => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.readFile(global.arq));
    const index = data.accounts.findIndex(acc => acc.id === req.params.id);
    if (index < 0) {
      throw new Error('Conta Inexistente');
    }
    data.accounts = data.accounts.filter(
      account => account.id !== parseInt(req.params.id)
    );
    await fs.writeFile(global.arq, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await fs.readFile(global.arq, next));
    const index = data.accounts.findIndex(acc => acc.id === account.id);
    if (index < 0) {
      throw new Error('Registro Não Encontrado.');
    }
    if (!account.id || !account.name || account.saldo == null) {
      throw new Error('Nome e Saldo precisam ser preenchidos');
    }
    data.accounts[index] = account;
    await fs.writeFile(global.arq, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateSaldo', async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await fs.readFile(global.arq));
    const index = data.accounts.findIndex(acc => acc.id === account.id);
    if (index < 0) {
      throw new Error('Registro Não Encontrado.');
    }
    if (!account.id || account.saldo == null) {
      throw new Error('Nome e Saldo precisam ser preenchidos');
    }
    data.accounts[index].saldo = account.saldo;
    await fs.writeFile(global.arq, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;

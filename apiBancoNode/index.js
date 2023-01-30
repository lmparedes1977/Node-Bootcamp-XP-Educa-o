import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';
// import cors from 'cors';

// app.use(cors());  // precisa instalar o cors (npm install cors)

const app = express();
app.use(express.json());

app.use('/accounts', accountsRouter);

app.listen(3001, async () => {
  try {
    await fs.readFile('accounts.json');
    logger.info('API Starded');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    fs.writeFile('accounts.json', JSON.stringify(initialJson))
      .then(() => {
        logger.info('API Starded e file criated');
      })
      .catch(err => {
        logger.error(err);
      });
  }
});

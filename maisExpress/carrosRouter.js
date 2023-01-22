import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('/carros GET');
  res.send('Root do /carros');
});

router.get('/precos', (req, res) => {
  console.log('/carros/precos GET');
  res.send('rota precos do /carros');
});

export default router;

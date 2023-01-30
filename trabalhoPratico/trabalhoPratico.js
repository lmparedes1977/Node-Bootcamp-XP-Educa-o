import express from 'express';
import fct from './functions.js';

const router = express.Router();

router.get('/maisModelos', fct.maisModelos);
router.get('/menosModelos', fct.menosModelos);
router.get('/listaMaisModelos/:X', fct.listaMaisModelos);
router.get('/listaMenosModelos/:X', fct.listaMenosModelos);
router.get('/listaModelos/:marca', fct.listaModelos);

router.use((err, req, res, next) => {
  console.log(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;

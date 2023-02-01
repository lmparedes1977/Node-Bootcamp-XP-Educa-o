import express from 'express';
import DesafioController from '../controllers/desafio.controller.js';

const router = express.Router();

router.post('/novo-pedido', DesafioController.createPedido);
router.put('/altera-pedido/:id', DesafioController.updatePedido);
router.patch('/altera-status/:id', DesafioController.updateStatusPedido);
router.delete('/exclui-pedido/:id', DesafioController.deletePedido);
router.get('/consulta-pedido/:id', DesafioController.getPedido);
router.get(
  '/total-pedidos-cliente/:cliente',
  DesafioController.totalPedidosCliente
);
router.get(
  '/mais-vendidos-produto/:produto',
  DesafioController.totalPedidosProduto
);
// router.get('/mais-vendidos/:X', DesafioController.produtosMaisVendidos);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
  console.log(err);
});

export default router;

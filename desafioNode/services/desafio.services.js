import DesafioRepository from '../repositories/desafio.repository.js';

async function criaPedido(pedido) {
  return await DesafioRepository.salvaNovoPedido(pedido);
}

export default criaPedido;

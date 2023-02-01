import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function createPedido(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    let pedido = req.body;
    if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
      throw new Error('Obrigatórios Cliente, Produto e Valor');
    }
    let novoPedido = {
      id: dados.nextId++,
      cliente: pedido.cliente,
      produto: pedido.produto,
      valor: pedido.valor,
      entregue: false,
      timestamp: new Date(),
    };
    dados.pedidos.push(novoPedido);
    await writeFile(global.pedidosJson, JSON.stringify(dados, null, 2));
    res.send(novoPedido);
  } catch (err) {
    next(err);
  }
}

async function updatePedido(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    let index = dados.pedidos.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }
    dados.pedidos[index].cliente = req.body.cliente;
    dados.pedidos[index].produto = req.body.produto;
    dados.pedidos[index].valor = req.body.valor;
    dados.pedidos[index].timestamp = new Date();
    await writeFile(global.pedidosJson, JSON.stringify(dados, null, 2));
    res.send(dados.pedidos[index]);
  } catch (err) {
    next(err);
  }
}

async function updateStatusPedido(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    let index = dados.pedidos.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }
    dados.pedidos[index].entregue = req.body.entregue;
    dados.pedidos[index].timestamp = new Date();
    await writeFile(global.pedidosJson, JSON.stringify(dados, null, 2));
    res.send(dados.pedidos[index]);
  } catch (err) {
    next(err);
  }
}

async function deletePedido(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    let index = dados.pedidos.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }
    let removido = dados.pedidos.splice(index, 1);
    await writeFile(global.pedidosJson, JSON.stringify(dados, null, 2));
    res.send(removido);
  } catch (err) {
    next(err);
  }
}

async function getPedido(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    let index = dados.pedidos.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }
    res.send(dados.pedidos[index]);
  } catch (err) {
    next(err);
  }
}

async function totalPedidosCliente(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    console.log(req.params.cliente);
    let comprasCliente = dados.pedidos.filter(
      ped => ped.cliente === req.params.cliente
    );
    if (comprasCliente.length === 0) {
      throw new Error('Registro não encontrado.');
    }
    let somaPedidos = 0;
    for (let i = 0; i < comprasCliente.length; i++) {
      if (comprasCliente[i].entregue === true)
        somaPedidos += parseFloat(comprasCliente[i].valor);
    }
    res.send(`Total de compras do cliente é ${somaPedidos}`);
  } catch (err) {
    next(err);
  }
}

async function totalPedidosProduto(req, res, next) {
  try {
    let dados = JSON.parse(await readFile(global.pedidosJson));
    let totalProduto = dados.pedidos.filter(
      ped => ped.produto === req.params.produto
    );
    if (totalProduto.length === 0) {
      throw new Error('Registro não encontrado.');
    }
    let somaPedidos = 0;
    for (let i = 0; i < totalProduto.length; i++) {
      if (totalProduto[i].entregue === true)
        somaPedidos += parseFloat(totalProduto[i].valor);
    }
    res.send(`Total de compras do produto é ${somaPedidos}`);
  } catch (err) {
    next(err);
  }
}

async function produtosMaisVendidos(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

export default {
  createPedido,
  updatePedido,
  updateStatusPedido,
  deletePedido,
  getPedido,
  totalPedidosCliente,
  totalPedidosProduto,
  produtosMaisVendidos,
};

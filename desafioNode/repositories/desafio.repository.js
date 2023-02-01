const { readFile, writeFile } = fs;

async function salvaNovoPedido(pedido) {
  let dados = JSON.parse(await readFile(global.pedidosJson));
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
  return pedido;
}

export default salvaNovoPedido;

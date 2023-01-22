import express from 'express';

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('HELLO WORLD');
// });

// app.post('/', (req, res) => {
//   res.send('Post OK');
// });

app.all('/testeAll', (req, res) => {
  // trabalha com todos os tipos de requisição
  res.send(req.method);
});

app.get('/teste?', (req, res) => {
  res.send('? permite omitir a úlimia letra do nome da rota');
});

app.get('/buzz+', (req, res) => {
  res.send('+ permite reproduzir infinitamente a ultima letra do nome da rota');
});

app.get('/one*blue', (req, res) => {
  res.send(
    'permite acesso à rota mesmo com qualquer letra ou palavra ocupando o lugar do *'
  );
});

app.get('/comUma(palavra)?', (req, res) => {
  // + permite omissão do útlimo caractere do nome da rota
  res.send(
    'o () reproduz o efeito do ? e do + com uma palavra ao invés de um caractere.'
  );
});

/////////////// PARAMETROS DE ROTA /////////////////////////

app.get('/testarParametros/:param', (req, res) => {
  res.send(
    req.params.param +
      ' : depois da barra torna o que vem a seguir um valor a ser utilizado'
  );
});

///////////////  PARAMETROS VIA QUERY ///////////////////

app.get('/testeQuery', (req, res) => {
  res.send(req.query);
});

///////////// MULTIPLOS HANDLERS COM NEXT /////////////////

app.get(
  '/testeMultiplosCallbacks',
  (req, res, next) => {
    console.log('callback 1');
    next();
  },
  (req, res, next) => {
    console.log('Callback 2');
    next();
  },
  (req, res) => {
    //res.send('Callback 3');
    res.end();
  }
);

///////////// NEXT COM ARRAY /////////////////

const call1 = (req, res, next) => {
  console.log('callback1');
  next();
};
const call2 = (req, res, next) => {
  console.log('callback2');
  next();
};
const call3 = (req, res, next) => {
  console.log('callback3');
  res.send('Feitoooooo!');
};

app.get('/nextComArray', [call1, call2, call3]);

////////////////////// ROUTE ///////////////////////////

app
  .route('/testeDeRoute')
  .get((req, res) => {
    res.send('Recebi get');
  })
  .post((req, res) => {
    res.send('Recebi post');
  })
  .delete((req, res) => {
    res.send('Recebi delete');
  });

app.listen(3000, () => {
  console.log('Subiu');
});

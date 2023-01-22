import fs from 'fs'; // utilizando callbacks //////////////////////////////

function fileComCallback() {
  fs.writeFile('teste.txt', 'teste teste\nteste', err => {
    if (err) {
      console.log(err);
    } else {
      pass;
    }
  });
  let lista = [];
  fs.readFile('teste.txt', 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      lista = data.split(' ');
      console.log(lista);
    }
  });
  fs.appendFile('teste.txt', '\nappendFile', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Gravou');
    }
  });
}
//fileComCallback();

function fileSincrono() {
  fs.appendFileSync('teste.txt', 'append síncrono\n');
}
//fileSincrono();

import { promises as pr } from 'fs';
import { stdin } from 'process';

function fileComThen() {
  pr.appendFile('teste.txt', '\nAppend com Promises') /// com then - cath
    .then(() => {
      pass;
    })
    .catch(err => {
      console.log(err);
    });
}
//fileComThen();

async function init() {
  try {
    const data = await pr.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    consol.log(err);
  }
}
//init();

async function writeReadJson() {
  try {
    const lista = ['Gol', 'Fuca', 'Dênis'];
    const carros = { carros: lista };
    await pr.writeFile('carros.json', JSON.stringify(carros));

    const dados = JSON.parse(await pr.readFile('carros.json'));
    dados.carros.push('Chevete');
    console.log(dados);
  } catch (err) {
    console.log(err);
  }
}

//writeReadJson();

import readline from 'readline';

function leDoUsuario() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Digite um número: ', num => {
    console.log(num);
    rl.close();
  });
}
//leDoUsuario();
import { EventEmitter } from 'events';

function emissorEventos() {
  const eE = new EventEmitter();

  eE.on('eventoTeste', obj => {
    console.log(obj);
  });
  ///// pode ser exportado para para ouvir eventos de outros arquivos que o importam.
  eE.emit('eventoTeste', 'Gotcha!!!');
}
emissorEventos();

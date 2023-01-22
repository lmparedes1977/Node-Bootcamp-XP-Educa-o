import express from 'express';
import { promises as pr } from 'fs';

const router = express.Router();

router.get('/maisModelos', (req, res) => {
  res.send(maisModelos());
});

router.get('/menosModelos', (req, res) => {
  res.send(menosModelos());
});

router.get('/listaMaisModelos/:X', (req, res) => {
  res.send(listaMaisModelos(X));
});

router.get('/listaMenosModelos/:X', (req, res) => {
  res.send(listaMenosModelos(X));
});

router.get('/listaModelos/:marca', (req, res) => {
  res.send(listaModelos(marca));
});

async function maisModelos() {
  try {
    const carros = JSON.parse(await pr.readFile('./car-list.json'));
    let maior = 0;
    let brand = [];
    for (let i = 0; i < carros.length; i++) {
      if (carros[i].models.length > maior) {
        maior = carros[i].models.length;
      }
    }
    for (let i = 0; i < carros.length; i++) {
      if (carros[i].models.length === maior) {
        brand.push(carros[i].brand);
      }
    }
    if (brand.length === 1) {
      return brand[0];
    } else {
      return brand;
    }
  } catch (err) {
    console.log(err);
  }
}

async function menosModelos() {
  try {
    const carros = JSON.parse(await pr.readFile('./car-list.json'));
    let menor = 999;
    let brand = [];
    for (let i = 0; i < carros.length; i++) {
      if (carros[i].models.length < menor) {
        menor = carros[i].models.length;
      }
    }
    for (let i = 0; i < carros.length; i++) {
      if (carros[i].models.length === menor) {
        brand.push(carros[i].brand);
      }
    }
    if (brand.length === 1) {
      return brand[0];
    } else {
      return brand;
    }
  } catch (err) {
    console.log(err);
  }
}

async function listaMaisModelos(x) {
  try {
    let carros = JSON.parse(await pr.readFile('./car-list.json'));

    let marcas = [];
    for (let i = 0; i < x; i++) {
      let maior = 0;
      let index = 0;
      for (let j = 0; j < carros.length; j++) {
        if (carros[j].models.length > maior) {
          maior = carros[j].models.length;
          index = j;
        }
      }
      marcas.push(carros[index].brand + ' - ' + maior.toString());
      carros = carros.filter(carro => carro.brand != carros[index].brand);
    }
    console.log(marcas);
  } catch (err) {
    console.log(err);
  }
}
listaModelos('Hummer');
async function listaMenosModelos(x) {
  try {
    let carros = JSON.parse(await pr.readFile('./car-list.json'));
    let marcas = [];
    for (let i = 0; i < x; i++) {
      let menor = 999;
      let index = 0;
      for (let j = 0; j < carros.length; j++) {
        if (carros[j].models.length < menor) {
          menor = carros[j].models.length;
          index = j;
        }
      }
      marcas.push(carros[index].brand + ' - ' + menor.toString());
      carros = carros.filter(carro => carro.brand != carros[index].brand);
    }
    console.log(marcas);
  } catch (err) {
    console.log(err);
  }
}

async function listaModelos(marca) {
  try {
    const carros = JSON.parse(await pr.readFile('./car-list.json'));
    for (let i = 0; i < carros.length; i++) {
      if (carros[i].brand === marca) {
        console.log(carros[i].models);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default {
  listaMaisModelos,
  listaMenosModelos,
  maisModelos,
  menosModelos,
  router,
  listaModelos,
};

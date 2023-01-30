import { promises as pr } from 'fs';
import Router from './trabalhoPratico.js';

async function maisModelos(req, res, next) {
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
      res.send(brand[0]);
    } else {
      res.send(brand);
    }
  } catch (err) {
    next(err);
  }
}

async function menosModelos(req, res, next) {
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
      res.send(brand[0]);
    } else {
      res.send(brand);
    }
  } catch (err) {
    next(err);
  }
}

async function listaMaisModelos(req, res, next) {
  try {
    let n_marcas = req.params.X;
    let carros = JSON.parse(await pr.readFile('./car-list.json'));
    let marcas = [];
    for (let i = 0; i < n_marcas; i++) {
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
    res.send(marcas);
  } catch (err) {
    next(err);
  }
}

async function listaMenosModelos(req, res, next) {
  try {
    let n_marcas = req.params.X;
    let carros = JSON.parse(await pr.readFile('./car-list.json'));
    let marcas = [];
    for (let i = 0; i < n_marcas; i++) {
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
    res.send(marcas);
  } catch (err) {
    next(err);
  }
}

async function listaModelos(req, res, next) {
  try {
    let marca = req.params.marca;
    const carros = JSON.parse(await pr.readFile('./car-list.json'));
    let brd = '';
    for (let i = 0; i < carros.length; i++) {
      if (carros[i].brand === marca) {
        brd = carros[i].models;
      }
    }
    res.send(brd);
  } catch (err) {
    next(err);
  }
}

export default {
  listaMaisModelos,
  listaMenosModelos,
  listaModelos,
  maisModelos,
  menosModelos,
};

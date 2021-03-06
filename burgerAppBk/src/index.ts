import express from 'express';
const app = express();
import Logger from './utils/Logger.js';
import db from './db/sequelize.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const { productos, categorias, variantes } = db.models;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

import setearRutas from './routes.js';
setearRutas(app);

app.listen(process.env.PORT || 8080, async () => {
  Logger.success('listening at port' + process.env.PORT);
  await db.sync({ force: true });
  Logger.success('db created');

  await categorias.bulkCreate([
    {
      titulo: 'Promos',
      subtitulo: 'aprovecha los mejores precios',
    },
    {
      titulo: 'Hamburguesas',
    },
    {
      titulo: 'Nuggets',
    },
  ]);

  await productos.bulkCreate([
    {
      titulo: 'Promo Enero',
      descripcion:
        'Más que una promo es un regalo. Blend de Carne de 125g, doble cheddar, mayonesa, mostaza y Ketchup. Simple, sin porción de papas',
      precio: 350,
      imagen:
        'https://okdiario.com/img/2021/12/09/hamburguesas-caseras-rellenas-de-queso-cheddar.jpg',
      categoriaId: 1,
    },
    {
      titulo: 'Promo Febrero',
      descripcion:
        'Más que una promo es un regalo. Blend de Carne de 200g, triple cheddar, mayonesa, mostaza y Ketchup. Simple, sin porción de papas',
      precio: 500,
      imagen: 'https://pbs.twimg.com/media/D2xbqDzX0AEvISJ.jpg:large',
      categoriaId: 1,
    },
    {
      titulo: 'Superburger',
      descripcion:
        'Hamburguesa triple con cheddar bacon crujiente, salsa cremolati, cebolla caramelizada',
      precio: 1500,
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjq5qmQwi_dBn5Z5s6CtRd7cUW5yRNBH5mw&usqp=CAU',
      categoriaId: 2,
    },
    {
      titulo: 'Hiperburguer',
      descripcion:
        'Hamburguesa triple con cheddar bacon crujiente, salsa cremolati, cebolla caramelizada',
      precio: 1200,
      imagen:
        'https://chefeel.com/chefgeneralfiles/2021/07/front-view-burger-on-stand-scaled-880x587.jpg',
      categoriaId: 2,
    },
    {
      titulo: 'Nuggets de pollo',
      descripcion: 'Nuggets de pollo con salsa barbacoa y cheddar',
      precio: 800,
      imagen:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/que-comes-cuando-comes-nuggets-elle-1629456066.jpg',
      categoriaId: 3,
    },
    {
      titulo: 'Nuggets HD',
      descripcion:
        'Nuggets de pollo con puré de papas y ensalada de lechuga,tomate',
      precio: 900,
      imagen:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/que-comes-cuando-comes-nuggets-elle-1629456066.jpg',
      categoriaId: 3,
    },
  ]);

  await variantes.bulkCreate([
    { titulo: 'Simple', precio: 150, productoId: 1 },
    { titulo: 'Doble', precio: 250, productoId: 1 },
    { titulo: 'Triple', precio: 350, productoId: 1 },
    { titulo: 'Simple', precio: 150, productoId: 2 },
    { titulo: 'Doble', precio: 250, productoId: 2 },
    { titulo: 'Triple', precio: 350, productoId: 2 },
  ]);
});

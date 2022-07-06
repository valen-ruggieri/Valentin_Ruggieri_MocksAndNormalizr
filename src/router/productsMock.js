const express = require("express");
const routerMock = express.Router();
// Herramienta para poder crear datos de manera aleatoria
const { faker } = require("@faker-js/faker");

// Ruta de productos
routerMock.get("/productos-test", (req, res) => {
  // Array de mock de productos
  const productos = [];

  // Ciclo de creacion de datos de manera aleatoria proprocionando los campos requeridos para cada producto
  for (let i = 0; i < 6; i++) {
    const randomProduct = faker.commerce.productName();
    const randomPrice = faker.commerce.price();
    const randomImg = faker.image.image(480, 860, true);
    const randomDescription = faker.commerce.productDescription();
    const randomCode = faker.random.alphaNumeric(4);

    // Incorporacion de los productos al mock
    productos.push({
      titulo: randomProduct,
      precio: randomPrice,
      img: randomImg,
      descripcion: randomDescription,
      codigo: randomCode,
    });
  }
  // Renderizado de la vista junto con el array de datos creado
  res.render("productos.ejs", { productos });
});

module.exports = routerMock;

const { faker } = require("@faker-js/faker");

const express = require("express");
const routerMock = express.Router();

routerMock.get("/productos-test", (req, res) => {
  const productos = [];

  for (let i = 0; i < 6; i++) {
    const randomProduct = faker.commerce.productName();
    const randomPrice = faker.commerce.price();
    const randomImg = faker.image.imageUrl(480, 860, "", true);
    const randomDescription = faker.commerce.productDescription();
    const randomCode = faker.random.alphaNumeric(4);
    productos.push({
      titulo: randomProduct,
      precio: randomPrice,
      img: randomImg,
      descripcion: randomDescription,
      codigo: randomCode,
    });
  }

  res.render("productos.ejs", { productos });
});

module.exports = routerMock;

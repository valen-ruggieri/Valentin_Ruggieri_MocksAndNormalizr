const express = require("express");
const routerNormalizr = express.Router();

// Controlador de la base de datos
const chatDao = require("../DAOs/swicht");
// Herraminetas para normalizar y desnormalizar los datos, como tambien su esquema 
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// Esquema de mensajes 
const inputAutorSchema = new schema.Entity("autors",{},{ idAttribute: "nombre" });
const inputTextSchema = new schema.Entity("message", {}, { idAttribute: "id" });
const messageSchema = new schema.Array({
  autor: inputAutorSchema,
  message: inputTextSchema,
});

// Array de mensajes local
const chat = [];

// Ruta de para mostar los mensajes del chat desnormalizando los datos y renderizandolo en una vista
routerNormalizr.get("/chat", async (req, res) => {
  if (chat.length > 0) {
    const allMap = await chatDao.getById(1);
    const countCompression = Math.round(
      (JSON.stringify(allMap).length / JSON.stringify(chat).length) * 100);
    const desChat = denormalize(allMap.result, messageSchema, allMap.entities);
    const messages = desChat.map((entities) => ({
      ...entities.autor,
      ...entities.message,
    }));

    return res.render("chatPage.ejs", { messages, countCompression });
  }
  res.render("chatPage.ejs", { messages: "", countCompression: 0 });
});

// Ruta para agregar mensajes al chat y luego normalizar el mismo enviandolo a la base de datos 
routerNormalizr.post("/chat", async (req, res) => {
  const { nombre, apellido, edad, alias, avatar, text } = req.body;
  const date = new Date();
  const dateNow = ` ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  let id = Math.floor(Math.random() * 100);
  chat.push({autor: { id, nombre, apellido, edad, alias, avatar },
            message: { id, text, date: dateNow }});
  const chatNormalize = normalize(chat, messageSchema);
  if (chat.length == 1) {await chatDao.create({ chat: chatNormalize, id: 1 });
  } else {await chatDao.updateById(1, { chat: chatNormalize });}
  res.redirect("/api/chat");
});
// Ruta para eliminar los mensasjes del chat alojados de manera externa en la base de datos como tambien de manera local
routerNormalizr.get("/chat/delete", async (req, res) => {
  chat.splice(0, chat.length);
  await chatDao.deleteById(1);
  res.redirect("/api/chat");
});

module.exports = routerNormalizr;

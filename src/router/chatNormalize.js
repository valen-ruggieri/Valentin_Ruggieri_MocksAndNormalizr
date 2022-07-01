const express = require("express");
const routerNormalizr = express.Router();
const { inspect } = require("util");
const normalizr = require("normalizr");
const SQLChat = require("../DAOs/chats/SQLChat");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
const chatDB = new SQLChat();
const print = (obj) => {
  console.log(inspect(obj, false, 12, true));
};
const inputAutorSchema = new schema.Entity(
  "autors",
  {},
  { idAttribute: "nombre" }
);
const inputTextSchema = new schema.Entity("message", {}, { idAttribute: "id" });
const messageSchema = new schema.Array({
  autor: inputAutorSchema,
  message: inputTextSchema,
});

const chat = [];

routerNormalizr.get("/chat", async (req, res) => {
  if (chat.length > 0) {
    const all = await chatDB.getById(1);
    const allMap = JSON.parse(all[0].chat);
    console.log(allMap);
    const desChat = denormalize(allMap.result, messageSchema, allMap.entities);
    await chatDB.initChat();

    const messages = desChat.map((entities) => ({
      ...entities.autor,
      ...entities.message,
    }));
    return res.render("chatPage.ejs", { messages });
  }
  res.render("chatPage.ejs", { messages: "" });
});

routerNormalizr.post("/chat", async (req, res) => {
  const { nombre, apellido, edad, alias, avatar, text } = req.body;
  const date = new Date();
  const dateNow = ` ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  let id = Math.floor(Math.random() * 100);
  chat.push({
    autor: { id, nombre, apellido, edad, alias, avatar },
    message: { id, text, date: dateNow },
  });
  const chatNormalize = normalize(chat, messageSchema);
  console.log(JSON.stringify(chat).length);
  console.log(JSON.stringify(chatNormalize).length);
  console.log(
    (JSON.stringify(chatNormalize).length / JSON.stringify(chat).length) * 100
  );

  const chatNormalzr = JSON.stringify(chatNormalize);

  await chatDB.updateById(1, { chat: chatNormalzr });

  res.redirect("/api/chat");
});

routerNormalizr.get("/chat/delete", async (req, res) => {
  chat.splice(0, chat.length);
  await chatDB.updateById(1, { chat: "" });

  res.redirect("/api/chat");
});
module.exports = routerNormalizr;

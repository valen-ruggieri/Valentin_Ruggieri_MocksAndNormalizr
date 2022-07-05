const express = require("express");
const routerNormalizr = express.Router();
const { inspect } = require("util");
const normalizr = require("normalizr");
const SQLChat = require("../DAOs/chats/SQLChat");
const chatDao = require("../DAOs/swicht");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

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
    const allMap = await chatDao.getById(1)
    const countCompression = Math.round((JSON.stringify(allMap).length / JSON.stringify(chat).length) * 100);
    const desChat = denormalize(allMap.result, messageSchema, allMap.entities);
    const messages = desChat.map((entities) => ({
      ...entities.autor,
      ...entities.message,
    }));
  
    return res.render("chatPage.ejs", { messages, countCompression });
  }

    
   
  res.render("chatPage.ejs", { messages: "", countCompression:0 });
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
  const chatNormalizr = JSON.stringify(chatNormalize)
if(chat.length == 1 ){await chatDao.create({ chat: chatNormalize, id:1 })}
else{await chatDao.updateById(1, { chat: chatNormalize})}


  

  res.redirect("/api/chat");
});

routerNormalizr.get("/chat/delete", async (req, res) => {
  chat.splice(0, chat.length);
  await chatDao.deleteById(1);

  res.redirect("/api/chat");
});
module.exports = routerNormalizr;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  chat: { type: Object, unique: false, required: true },
  id: { type: Number, unique: true, required: true },
});

module.exports = chatSchema;

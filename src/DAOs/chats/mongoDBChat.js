const MongoDBClass = require("../../containers/MongoDBClass");
const chatSchema = require("../../models/chats");

class MongoDBChat extends MongoDBClass {
  constructor() {
    super("Chats", chatSchema);
  }
}

module.exports = MongoDBChat;

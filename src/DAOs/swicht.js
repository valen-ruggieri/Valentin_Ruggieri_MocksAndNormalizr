require("dotenv").config();
let chatDao;
switch (process.env.DB_CONNECTION) {
  case "mongoDB":
    
    const MongoDBChat = require("./chats/mongoDBChat");
    chatDao = new MongoDBChat();
    console.log("mongoDB active");
    break;
  case "firebase":
    const FirebaseChat = require("./chats/FirebaseChat");
    chatDao = new FirebaseChat();
    console.log("firebaseDB active");
    break;
  case "SQL":
    const SQLChat = require("./chats/SQLChat");
    chatDao = new SQLChat();
    console.log("SQL active");
    break;
  default:
    throw new Error("No se ha definido una conexión a la base de datos");
}

module.exports =  chatDao ;

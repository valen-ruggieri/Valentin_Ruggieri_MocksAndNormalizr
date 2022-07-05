require("dotenv").config();
const http = require('http')
const app = require('./app');
const server = http.createServer(app);
require('./config/mongoDBConfig')
const PORT = 8080;
server.listen(PORT , console.log(`Servidor listo en el puerto ${PORT} ✅`))


const http = require('http')
const app = require('./app')
const server = http.createServer(app);
const PORT = 8080;
server.listen(PORT , console.log(`Servidor listo en el puerto ${PORT} ✅`))
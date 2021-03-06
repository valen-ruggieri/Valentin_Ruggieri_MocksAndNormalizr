require('dotenv').config()

const options = {
  mysql: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "shop",
    },
    pool: { min: 0, max: 10 },
  },

  sqlite3: {
    client: "sqlite3",
    connection: { filename: "./src/database/chat.db" },
    useNullAsDefault: true,
  },
};

module.exports= options;
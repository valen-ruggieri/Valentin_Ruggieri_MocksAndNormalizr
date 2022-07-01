const knex = require("knex");
const options = require("../config/SQLconfig");
const database = knex(options.sqlite3);
class SQLClass {
  constructor(tableName) {
    this.database = database;
    this.table = tableName;
  }

  async initChat() {
    await this.database.schema.hasTable(this.table).then(async (exists) => {
      if (!exists) {
        await this.database.schema.createTable(this.table, (table) => {
          table.increments('id').primary()
          table.json("chat");
        });
        
      }
    });
  
  }
  async deleteChat() {
    await this.database.schema.dropTable(this.table);
  }
  async getAll() {
    try {
      const all = await this.database.from(this.table).select("*");

      return all;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      let one = await this.database
        .from(this.table)
        .select("chat")
        .where("id", id);
    
      return one;
    } catch (error) {
      throw new Error(err);
    }
  }

  async countAll() {
    try {
      const all = await this.database.count().from(this.table);
      return all[0]["count(*)"];
    } catch (error) {
      throw new Error(err);
    }
  }
  async create(doc) {
    try {
      await this.database(this.table).insert(doc);
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteById(id) {
    try {
      await this.database.from(this.table).where("_id", id).del();
    } catch (error) {
      throw new Error(err);
    }
  }

  async deleteAll() {
    try {
      await this.database(this.table).del();
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateById(id, doc) {
    try {
      await this.database(this.table).where("id", id).update(doc);
    } catch (error) {
      throw new Error(err);
    }
  }
}

module.exports = SQLClass;

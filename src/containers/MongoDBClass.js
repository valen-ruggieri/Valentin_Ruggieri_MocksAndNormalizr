const mongoose = require("mongoose");



class MongoDBClass {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }
  async getAll() {
    try {
      const all = await this.collection.find().lean();
      return all;
    } catch (error) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const one = await this.collection.find({id:id}).lean();
      return one[0].chat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countAll() {
    try {
      const all = await this.collection.find().count();
      return all;
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(doc) {
    try {
      await this.collection.create(doc);
     
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteById(id) {
    try {
      const one = await this.collection.findOneAndDelete({id:id}).deleteOne();
     
    } catch (error) {
      throw new Error(err);
    }
  }
  async deleteAll() {
    try {
      const all = await this.collection.deleteMany();
    } catch (error) {
      throw new Error(err);
    }
  }
  async updateById(id, doc) {
    try {
      const  doctEdit = JSON.stringify(doc)
    await this.collection.findOneAndUpdate({id:id}, doc);
    } catch (error) {
      throw new Error(err);
    }
  }
}

module.exports = MongoDBClass;
const mongoose = require("mongoose");
const UserModel =  require("./userSchema.js");

class DaoUsers {
    constructor() {
        this.dao = UserModel;
    }
    async create(object){
       const doc = await this.dao.create(object);
        const {passwordHash,...dtoOut}=doc._doc
        return dtoOut
    }
    async list(){
        return await this.dao.find();
    }
    async delete(id){
        return await this.dao.findByIdAndDelete(id);
    }
    async get(id){
        const doc = await this.dao.findById(id);
        const {passwordHash,...dtoOut}=doc?._doc
        return dtoOut
    }
    async getByEmail(object){
        const doc = await this.dao.findOne(object);
        return doc?._doc
    }
    async update(dtoIn){
        const doc =  await this.dao.findByIdAndUpdate(dtoIn.id,dtoIn, {
            returnDocument: "after"
        })
        const {passwordHash,...dtoOut}=doc._doc
        return dtoOut
    }
}

module.exports = new DaoUsers();
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnetion");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("user");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    console.log(user);
    const hashedPassword = hashPassword(user.password);

    return this.getCollections().insertOne({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      role: "admin",
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteUser (objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }
}

module.exports = User;
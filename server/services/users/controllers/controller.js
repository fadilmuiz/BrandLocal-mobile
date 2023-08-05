const { getDatabase } = require("../config/mongoConnetion");
const { ObjectId } = require("mongodb");
const User = require("../models/user-model");

module.exports = {

  findAllUsers: async (req, res, next) => {
    try {
      // const db = getDatabase();
      // const users = db.collection("users");
      // const data = await users.find().toArray();

      const data = await User.findAll();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { email, username, password, phoneNumber, address } = req.body;
      // const users = getDatabase().collection("user");

      // const newUser = await users.insertOne({
      //   username, email, password, phoneNumber, address
      // }); 
      // pake query susah dihash langsung
      const newUser = await User.createUser({
        username, email, password, phoneNumber, address
      });
      res.status(201).json({ id: newUser.insertedId, email });
    } catch (err) {
      console.log(err);
    }
  },

  findUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      // const db = getDatabase();
      // const users = db.collection("users");
      // const foundUser = await users.findOne({
      //   _id: new ObjectId(id),
      // });
      const foundUser = await User.findById(id);

      if (!foundUser) throw { name: "User not found" };

      res.status(200).json(foundUser);
    } catch (err) {
      console.log(err);
    }

  },

  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDeleted = await User.deleteUser(id);

      if (isDeleted) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};
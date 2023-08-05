const Redis = require("ioredis");
const axios = require("axios");
require("dotenv").config();

const redis = new Redis(11466, process.env.REDIS_URL);

const USER_SERVER_URL = process.env.USER_SERVER_URL || "http://localhost:4001";

class Controller {
  static async readUser(req, res, next) {
    try {
      let usersCache = await redis.get("user");
      // console.log(usersCache, ">>>>>>>>>>>>>>>>");
      if (usersCache) {
        let usersResult = JSON.parse(usersCache);
        return res.status(200).json(usersResult);
      }

      const response = await axios.get(`${USER_SERVER_URL}`);

      redis.set("user", JSON.stringify(response.data));

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async readUserByid(req, res, next) {
    try {
      const id = req.params.id;
      const response = await axios.get(`${USER_SERVER_URL}${id}`);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async addUser(req, res, next) {
    try {
      const inputData = req.body;
      const response = await axios.post(`${USER_SERVER_URL}/users`, inputData);

      redis.del("user");

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      await axios.delete(`${USER_SERVER_URL}/users/${id}`);

      res.status(200).json({
        message: `User with id ${id} has been deleted`,
      });
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = Controller;
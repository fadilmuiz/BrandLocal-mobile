const Redis = require("ioredis");
const axios = require("axios");
require("dotenv").config();
const redis = new Redis(11466, process.env.REDIS_URL);
const SERVER_PRODUCT = process.env.SERVER_PRODUCT || "http://localhost:4002";

class Controller {
  static async readProduct(req, res, next) {
    try {
      let productChace = await redis.get("product")

      if (productChace) {
        let productResult = JSON.parse(productChace);
        return res.status(200).json(productResult);
      }

      const response = await axios.get(`${SERVER_PRODUCT}/clothes`);
      redis.set("product", JSON.stringify(response.data));
      res.status(200).json(response.data);

    } catch (err) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async addProduct(req, res, next) {
    try {
      const dataInput = req.body
      const response = await axios.post(`${SERVER_PRODUCT}/clothes`, dataInput)

      redis.del("product")
      res.status(201).json(response.data);

    } catch (err) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async detailProduct(req, res, next) {
    try {
      const id = req.params.id;

      const response = await axios.get(`${SERVER_PRODUCT}/clothes/${id}`);
      res.status(200).json(response.data);
    } catch (err) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async editProduct(req, res, next) {
    try {
      const id = req.params.id;
      const dataInput = req.body;

      const response = await axios.put(`${APP_SERVER_URL}/clothes/${id}`,dataInput);

      redis.del("product");
      res.status(201).json(response.data);
    } catch (err) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;

      const response = await axios.delete(`${APP_SERVER_URL}/clothes/${id}`);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = Controller


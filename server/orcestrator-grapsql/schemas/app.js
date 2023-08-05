require("dotenv").config();
const APP_SERVER_URL = process.env.APP_SERVICE_URL || "http://localhost:4002";
const USER_SERVER_URL = process.env.USER_SERVICE_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");

// const redis = new Redis(11466, process.env.REDIS_URL);
const redis = new Redis({
  port: 11466, // Redis port
  host: "redis-11466.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "sOEUIY7LwfGypUQJagXCd566wq9328v2",
});

const typeDefs = `#graphql
# === DEFINE TYPES ===
  type Category {
    name: String
  }

  type Image {
    imgUrl1: String,
    imgUrl2: String,
    imgUrl3: String,
  }

  type Product {
    id: ID,
    name: String,
    slug: String,
    description: String,
    price: String,
    mainImg: String,
    categoryId: Int,
    authorId: Int,
    Category: Category,
    Image: [Image]
  }

  type productDetail {
    id: ID,
    name: String,
    slug: String,
    description: String,
    price: String,
    mainImg: String,
    categoryId: Int,
    authorId: Int,
    Category: Category,
    Image: [Image]
  }

  type addProductResponse {
    name: String,
    description: String,
    price: String,
    mainImg: String,
    categoryId: Int
  }

  type deleteProductResponse {
    message: String
  }

  type editProductResponse {
    message: String
  }

  input productInput {
    name: String,
    description: String,
    price: String,
    mainImg: String,
    categoryId: Int,
  }

  # === QUERIES AND MUTATIONS ===
  type Query {
    product: [Product],
    productDetail(productId: ID): productDetail
  }

  type Mutation {
    addProduct(productData: productInput): addProductResponse,
    deleteProduct(productId: ID): deleteProductResponse,
    editProduct(productId: ID, productData: productInput): editProductResponse
  }
`;

const resolvers = {
  Query: {
    product: async () => {
      try {
        let productCache = await redis.get("product");

        if (productCache) {
          let productResult = JSON.parse(productCache);
          return productResult;
        }

        const { data } = await axios.get(`${APP_SERVER_URL}/clothes`);
        redis.set("product", JSON.stringify(data));
        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    productDetail: async (_, { productId }) => {
      try {
        let { data } = await axios.get(`${APP_SERVER_URL}/clothes/${productId}`);
        // console.log(data, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");

        const authorId = data.authorId;
        // console.log(authorId,"<<<<<<<<<<<<");

        // const { data: authorData } = await axios.get(
        //   `${USER_SERVER_URL}/user/${authorId}`
        // );

        // data.authorName = authorData.username;

        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
      }
    },
  },

  Mutation: {
    addProduct: async (_, { productData }) => {
      try {
        const { data } = await axios.post(`${APP_SERVER_URL}/clothes`, productData);

        redis.del("product");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    deleteProduct: async (_, { productId }) => {
      try {
        const { data } = await axios.delete(
          `${APP_SERVER_URL}/clothes/${productId}`
        );

        redis.del("product");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    editProduct: async (_, args) => {
      try {
        const { productId } = args;

        const { data } = await axios.put(
          `${APP_SERVER_URL}/clothes/${productId}`,
          args
        );

        redis.del("product");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

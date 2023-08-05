require("dotenv").config();
const USER_SERVER_URL = process.env.USER_SERVICE_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");

// const redis = new Redis(16391, process.env.REDIS_URL);
const redis = new Redis({
  port: 11466, // Redis port
  host: "redis-11466.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "sOEUIY7LwfGypUQJagXCd566wq9328v2",
});

const typeDefs = `#graphql
  # === DEFINE TYPES ===
  type User {
    _id: ID!,
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

  input inputData {
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

  type addUserResponse {
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

  type deleteUserResponse {
    message: String
  }

  # === QUERIES AND MUTATIONS ===
  type Query {
    users: [User],
    userDetail(userId: ID!): User
  }

  type Mutation {
    addUser(newInput: inputData): addUserResponse,
    deleteUser(userId: ID!): deleteUserResponse
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        let usersCache = await redis.get("user");

        if (usersCache) {
          let usersResult = JSON.parse(usersCache);
          // console.log(usersCache);
          return usersResult;
        }

        const { data } = await axios.get(`${USER_SERVER_URL}/user`);
        redis.set("user", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    userDetail: async (_, { userId }) => {
      try {
        const { data } = await axios.get(`${USER_SERVER_URL}/${userId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const { newInput } = args;

        const { data } = await axios.post(`${USER_SERVER_URL}/`, newInput);

        redis.del("user");

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteUser: async (_, { userId }) => {
      try {
        const { data } = await axios.delete(
          `${USER_SERVER_URL}/${userId}`
        );
        // redis.del("user");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// Import package
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: appTypeDefs,
  resolvers: appResolvers,
} = require("./schemas/app");

// const {
//   typeDefs: colorTypeDefs,
//   resolvers: colorResolvers,
// } = require("./schemas/color");

(async () => {
  // Define Server
  const server = new ApolloServer({
    // Jadi typeDefs di sini bisa menerima array
    typeDefs: [userTypeDefs, appTypeDefs],
    // sama seperti typeDefs, resolvers juga bisa menerima array
    resolvers: [userResolvers, appResolvers],
    // Ini supaya kita tetap bisa membuka explorer sekalipun di production
    introspection: true,
    // (in real case yang digunakan adalah sebagai berikut)
    // introspection: process.env.NODE_ENV !== 'production'
  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
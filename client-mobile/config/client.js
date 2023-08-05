import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://iproject.fadilmuiz.online',
  cache: new InMemoryCache(),
});

export default client
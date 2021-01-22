import { ApolloClient, InMemoryCache } from "@apollo/client";
import { typeDefs, resolvers } from "./client.schema";

const cache = new InMemoryCache({});

export default new ApolloClient({
  // uri: process.env.GRAPQHL_ENDPOINT,
  cache,
  typeDefs,
  resolvers
});

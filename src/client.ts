import { ApolloClient, InMemoryCache } from "@apollo/client";
import { typeDefs, resolvers } from "./client.schema";

const cache = new InMemoryCache({});

export default new ApolloClient({
  uri: "https://v4mg9.sse.codesandbox.io/",
  cache
});

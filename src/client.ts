import { ApolloClient, InMemoryCache } from "@apollo/client";
import typeDefs from "./client.schema";

const cache = new InMemoryCache({
  typePolicies: {
    ThemeObject: {
      fields: {
        type: {}
      }
    }
  }
});

export default new ApolloClient({
  uri: process.env.GRAPQHL_ENDPOINT,
  cache,
  typeDefs
});

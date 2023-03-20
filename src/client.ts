import { DefaultOptions, ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client/core/index.js";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import dotenv from "dotenv";

dotenv.config();

const httpLink = createHttpLink({
  uri: `${process.env.API_URL}/graphql`,
  credentials: "include",
  fetch,
});

const authLink = setContext((_, context) => {
  return {
    headers: {
      ...context.headers,
      authorization: process.env.API_TOKEN ? `Bearer ${process.env.API_TOKEN}` : "",
    },
  };
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }
  if (networkError) {
    console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`);
  }
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
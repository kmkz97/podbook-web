// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'https://dev-api.fathom.fm/graphql'
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Auth link with better token handling
const authLink = setContext((_, { headers }) => {
    // Get the token from localStorage or your auth context
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2RpdW1fdXNlcl9ndWlkIjoiMzZjMTU5MzYtODJmMi00OThhLWFhMTktMTdmNDZhMjhlODYzIn0.fKe_S4oiljArr9BfGT7IGczOUmIAjEq_eCgi37IRrCA';
    
    // Ensure the token is properly formatted
    const authHeader = token ? { 
      authorization: `${token.replace(/^Bearer\s+/i, '')}` 
    } : {};
  
    return {
      headers: {
        ...headers,
        ...authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
  });  

// Combine the links
const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
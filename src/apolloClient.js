import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'https://fa58-110-44-126-21.ngrok-free.app/graphql', 
  cache: new InMemoryCache(),
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); 

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', 
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(), 
});

export default client;

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { environment } from '../../../environments/environment';


// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client: ApolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.server + 'graph',
  }),
});

function provideClient(): ApolloClient {
  return client;
}

export {
  provideClient,
  client
}
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const ColonyTypeQuery = gql`

  query colonytype {
    id
    name
    description
  }
  
`;

 interface ColonyTypeQueryResponse { 
  colonytype
}

export {
ColonyTypeQuery,
ColonyTypeQueryResponse
}
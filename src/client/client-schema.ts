import { GraphQLSchema } from 'graphql';
import clientQueries from './client-queries';
import clientMutations from './client-mutations';



const ClientSchema =
 new GraphQLSchema({
    query:clientQueries,
    mutation:clientMutations
});

export default ClientSchema;
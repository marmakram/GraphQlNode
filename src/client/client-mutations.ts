import { GraphQLObjectType} from 'graphql';
import { ClientExecutionResponseType } from '../../models/client/client-type';
import { ClientFilterCriteriaArgs, ClientCreateArgs, ClientUpdateArgs } from '../../models/client/client-args';
import { ClientHandler } from '../../handlers/client/client-handler';
import { Client, ClientFilterCriteria  } from '../../models/client/client-model';
import { BooleanExecutionResponseType } from '../../models/base-type';
import { omit } from 'lodash';

export default new GraphQLObjectType({
    name: 'ClientMutations',
    description: 'Client mutations',
    fields: () => {
        const handler = new ClientHandler();
        return {
            Create: {
                type: ClientExecutionResponseType,
                args: ClientCreateArgs, 
                async resolve(root, args, { user }) {
                    const client = <Client>args.data;
                    return handler.Create(client);
                }
            },
            Update:{
              type: BooleanExecutionResponseType,
              args:ClientUpdateArgs,
              async resolve (root, args, {user}) {
                const client = <Client>args.data;
                const criteria = <ClientFilterCriteria>args.criteria;
                return handler.Update(client, criteria);
              }
            },
            Delete:{
              type:BooleanExecutionResponseType,
              args:ClientFilterCriteriaArgs,
              async resolve (root, args, {user}) {
                const criteria = <ClientFilterCriteria>args;
                return handler.Delete(criteria);
              }
            }
        }
    }
});
import { GraphQLObjectType, GraphQLResolveInfo} from 'graphql';
import { ClientSearchCriteriaArgs, ClientFilterCriteriaArgs } from '../../models/client/client-args';
import { ClientSearchResultType, ClientExecutionResponseType } from '../../models/client/client-type';
import { ClientHandler } from '../../handlers/client/client-handler';
import { ClientSearchCriteria, ClientFilterCriteria } from '../../models/client/client-model';
import { getAttributesFromGraphQlInfo, getUserCountriesAndAreas } from '../../utils';
import { MyUserHandler } from '../../handlers/my-user/my-user-handler';

export default new GraphQLObjectType({
    name: 'ClientQueries',
    description: 'client queries',
    fields: () => {
        const handler = new ClientHandler(); 
        const userHandler = new MyUserHandler(); 
        return {
            Get: {
                type: ClientSearchResultType,
                args: ClientSearchCriteriaArgs,
                async resolve(root, args, {}, info:GraphQLResolveInfo) {
                    const attributes = getAttributesFromGraphQlInfo(info);
                    console.log(attributes);
                                        
                    const criteria = <ClientSearchCriteria> args.criteria || {};
                    let userId = criteria.UserId;
                    delete criteria.UserId;
                    let userRes = await userHandler.Get({Id:userId,attributes:['Id','FirstName','LastName',
                    'UserName','CountryId', 'CityId','AreaId','GrantLevel','UserType',{UserAreas:['Id','CountryId','CityId','AreaId']}]});
                    let user = userRes.Result[0];
                    const userAreas = getUserCountriesAndAreas(user);
                    if(!criteria.CountryId && !criteria.StateOrGovernorateId && !criteria.StateOrGovernorateIds
                        && !criteria.AreaOrRegionId && ! criteria.AreaOrRegionIds)
                    {
                        if(userAreas.countryIds.length>0){
                            criteria.CountryId = userAreas.countryIds;
                        }else if(userAreas.cityIds.length>0 ){
                            criteria.StateOrGovernorateId = userAreas.cityIds;
                        } else if(userAreas.areaIds.length>0){
                            criteria.AreaOrRegionId = userAreas.areaIds;
                        }     
                    }
                    criteria.attributes = attributes;
                    return handler.Get(criteria);
                }
            },
            GetOne: {
                type: ClientExecutionResponseType,
                args: ClientFilterCriteriaArgs, 
                resolve(root, args, {}, info:GraphQLResolveInfo) {
                    const attributes = getAttributesFromGraphQlInfo(info);
                    const criteria = <ClientFilterCriteria> args.criteria || {};
                    criteria.attributes = attributes;
                    return handler.GetOne(criteria);
                }
            }
                // ,  GetOneOld: {
                //     type: ClientExecutionResponseType,
                //     args: ClientFilterCriteriaArgs,
                //     resolve(root, args, { user }) {
                //         const criteria = <ClientFilterCriteria> args;
                //         return handler.GetOne(criteria);
                //     }
                // }
            }
        }
    
});

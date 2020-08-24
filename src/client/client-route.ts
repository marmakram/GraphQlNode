
import { Router } from 'express';
import { ExecutionResponse } from '../common/support/execution-response';
import { deleteNullValues } from '../common/support';
import ClientSchema from './client-schema';

export const client = Router();
client.post('/check-offer', async (req, res) => {
  try {
    let response = new ExecutionResponse<number>();
    const data = req.body;
    /* let offerRes = await offersSettingHandler.Get({
      Id: data.OffersSettingId, OfferType: data.OfferType.split(','), attributes: ['Id', 'clientCriteria',
        'OfferSubType', 'ForAllClients', 'ApplyOfferOnAll']
    });
    let promises = await Promise.all(offerRes.Result.map(async offer => {

      if (!offer.ForAllClients && offer.clientCriteria) {
        let clientCriteria = <ClientSearchCriteria>JSON.parse(offer.clientCriteria);

        deleteNullValues(clientCriteria);
      }
  })); */
    res.status(200).send(response);
    return res;

  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});
/* client.post('/', graphqlHTTP((req, res, gql) => ({
  schema: ClientSchema,
  graphiql: true,
  pretty: true,
  context: { user: req.user }
}))); */
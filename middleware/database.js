import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'


// CHOOSE VALID DATABASE, CURRENT DATA SCHEMA IS: 
// {"_id":"5f558173d39cbcc01b4fe8e2","date":"2020-09-07T00:46:08.476Z","calories":{"label":"Calories","total":1840,"target":1840,"variant":15},"carbs":{"label":"Carbs","total":190,"target":160,"variant":15},"fat":{"label":"Fat","total":55,"target":60,"variant":10},"protein":{"label":"Protein","total":120,"target":165,"variant":10}}


const uri = "your-mongo-db-acess-string";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('fitManagerApp');
    return next();
}
  
const middleware = nextConnect();

middleware.use(database);
  
export default middleware;



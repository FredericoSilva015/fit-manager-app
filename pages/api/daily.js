import nextConnect from 'next-connect';
import middleware from '../../middleware/database'
import { ObjectId } from 'mongodb'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
    const { date } = req.query
    const objID = new ObjectId()
    const dataModel = { 
        "_id": objID, 
        "date": date, 
        "calories": { 
            "label": "Calories", 
            "total": 0, 
            "target": 0, 
            "variant": 0 
        }, 
        "carbs": { 
            "label": "Carbs", 
            "total": 0, 
            "target": 0, 
            "variant": 0 
        }, 
        "fat": { 
            "label" : "Fat", 
            "total": 0, 
            "target": 0, 
            "variant": 0 
        }, 
        "protein": { 
            "label" : "Protein", 
            "total": 0, 
            "target": 0, 
            "variant": 0 
        }
    }

    let doc = {}

    if( date ){
        doc = await req.db.collection('sample1').findOne( {date: new Date(date)} )
    } else {
        doc = await req.db.collection('sample1').findOne()
    }

    if( !doc ){
        doc = dataModel
    }

    res.json( doc );
});

handler.post(async (req, res) => {
    let data = Object.assign(req.body);
    data = JSON.parse(data)
    delete data._id
    data.date = new Date(data.date)

    try {
        await req.db.collection('sample1').updateOne({date: new Date(data.date)}, {$set:data}, {upsert: true})
    } catch (err) {
        console.log(err);
    }
  
    res.json({message: 'ok'});
})

export default handler;

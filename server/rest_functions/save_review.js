const {CONNECTION_URL,DATABASE_NAME,COLLECTION_NAME} = require('../constants');
const {MongoClient} = require('mongodb');
const client = new MongoClient(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true });


async function saveReview(movie_id,date,review){
    try{
        await client.connect();
        result = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).updateOne({"id": movie_id},{'$set':{"date":date,"review":review}});
        return result;
    } catch (error){
        console.error(error);
    }
    finally{
        await client.close();
    }
}
module.exports={saveReview};
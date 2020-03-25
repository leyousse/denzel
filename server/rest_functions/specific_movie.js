const {CONNECTION_URL,DATABASE_NAME,COLLECTION_NAME} = require('../constants');
const {MongoClient} = require('mongodb');
const client = new MongoClient(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true });


async function specificMovie(specific_movie_id){
    try{
        var query = {id: specific_movie_id};
        await client.connect();
        const smovie = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).findOne({$query :query});
        return smovie;
    } catch (error){
        console.error(error);
    }
    finally{
        await client.close();
    }
}
module.exports={specificMovie};
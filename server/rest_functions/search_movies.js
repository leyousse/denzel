const {CONNECTION_URL,DATABASE_NAME,COLLECTION_NAME} = require('../constants');
const {MongoClient} = require('mongodb');
const client = new MongoClient(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true });


async function searchMovies(limit,metascore){
    try{
        await client.connect();
        const tab = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).find({metascore: { $gte: metascore }}).limit(limit).sort({ metascore: -1 }).toArray();
        console.log(tab);
        if (movies.length > 0) resolve(movies);
        return tab;
    } catch (error){
        console.error(error);
    }
    finally{
        await client.close();
    }
}
module.exports={searchMovies};
const {CONNECTION_URL,DATABASE_NAME,COLLECTION_NAME} = require('../constants');
const MongoClient = require('mongodb').MongoClient;
const imdb = require('../imdb');
const client = new MongoClient(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true });

async function populate(){
    try{
        await client.connect();
        await client.db("Denzel_movies").collection("denzel");
        await createList(client);
        console.log(`Connected to ${DATABASE_NAME}!`);
    } catch (error){
        console.error(error);
    }
    finally{
        await client.close();
    }
}


async function createList(client){
    const movies = await imdb('nm0000243');
    console.log(JSON.stringify(movies, null, 2));
    const result = await client.db("Denzel_movies").collection("denzel").insertMany(movies);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

module.exports={populate};

const {CONNECTION_URL,DATABASE_NAME,COLLECTION_NAME} = require('../constants');
const {MongoClient} = require('mongodb');
const client = new MongoClient(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true });


async function mustWatch(){
    try{
        await client.connect();
        const movies = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).find().toArray();
        const awesome = movies.filter(movie => movie.metascore >= 70);
        if (awesome.length > 0){
            return awesome[Math.floor(Math.random()*awesome.length)];}
        else 
            console.log("There is no movie found with a metascore over 70");
    } catch (error){
        console.error(error);
    }
    finally{
        await client.close();
    }
}
module.exports={mustWatch};
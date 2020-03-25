const Express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const pop = require("./rest_functions/pop_data");
const mw = require("./rest_functions/must_watch");
const sp = require("./rest_functions/specific_movie");
const {CONNECTION_URL,DATABASE_NAME,DENZEL_IMDB_ID,COLLECTION_NAME,PORT} = require("./constants");
const imdb = require("./imdb");
var app = Express();

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());
app.options('*', cors());


//REST endpoint: n°1 - Populate the database with all the Denzel's movies from IMDb
app.get("/movies/populate/nm0000243", async (request, response) => {
    try {
        pop.populate();
        const movies=await imdb(DENZEL_IMDB_ID);
        response.json({ total: movies.length });
    } catch (error) {
      throw(error);
    }
  });

//REST endpoint: n°2 - Fetch a random must-watch movie
app.get("/movies", async (request, response) => {
  const must_watch_movie = await mw.mustWatch();
  response.send(must_watch_movie);
});

//REST endpoint: n°3 - Fetch a specific movie.
app.get("/movies/:id", async (request,response) =>{
  const specific_movie_id = request.params.id;
  const specific_movie = await sp.specificMovie(specific_movie_id);
  response.send(specific_movie);
});

app.listen(9292);
console.log('📡 Running on port 9292');